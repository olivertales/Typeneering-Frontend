import { DestroyRef, Injectable } from '@angular/core'
import { JWTModel } from '../interface/JWTModel'
import { HttpClient, HttpContext } from '@angular/common/http'
import { AUTHENTICATED_REQUEST } from '../application/authInterceptor'
import { tap, throwError } from 'rxjs'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { ApiResultResponse } from '../interface/ApiResultResponse'
import { LoginRequest } from '../interface/LoginRequest'
import { RegisterRequest } from '../interface/RegisterRequest'
import { CookieError } from '../../shared/errors/CookieError'
import { Router } from '@angular/router'
import { UserDataService } from './user-data.service'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private accessTokenStr = 'access_token'
  private refreshTokenStr = 'refresh_token'
  private expireStr = 'expires_in'
  private endpointUrl = `user`
  constructor(
    private http: HttpClient,
    private destroyRef: DestroyRef,
    private router: Router,
    private user: UserDataService
  ) {}

  login(body: LoginRequest) {
    return this.http
      .post<JWTModel>(`${this.endpointUrl}/login`, body, {
        context: new HttpContext().set(AUTHENTICATED_REQUEST, false)
      })
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap({
          next: (res) => {
            try {
              this.setAuth(res)
            } catch {
              throwError(() => new CookieError())
            }
          }
        })
      )
  }

  register(body: RegisterRequest) {
    return this.http
      .post<ApiResultResponse>(`${this.endpointUrl}/register`, body, {
        context: new HttpContext().set(AUTHENTICATED_REQUEST, false)
      })
      .pipe(takeUntilDestroyed(this.destroyRef))
  }

  refresh(jwtCookie: JWTModel) {
    return this.http
      .post<JWTModel>(
        `${this.endpointUrl}/refresh`,
        { refreshToken: jwtCookie.refreshToken },
        { context: new HttpContext().set(AUTHENTICATED_REQUEST, false) }
      )
      .pipe(
        takeUntilDestroyed(),
        tap({
          next: (res) => {
            try {
              this.setAuth(res)
            } catch {
              throwError(() => new CookieError())
            }
          },
          error: () => this.logoff()
        })
      )
  }

  logoff() {
    localStorage.removeItem(this.accessTokenStr)
    localStorage.removeItem(this.refreshTokenStr)
    localStorage.removeItem(this.expireStr)
    this.user.logoffUser()
    this.router.navigate([this.router.url])
  }

  getAuth() {
    const accessToken = localStorage.getItem(this.accessTokenStr)
    const refreshToken = localStorage.getItem(this.refreshTokenStr)
    const expires = localStorage.getItem(this.expireStr)

    if (!accessToken || !refreshToken) return null

    return new JWTModel(
      accessToken,
      refreshToken,
      new Number(expires).valueOf()
    )
  }

  setAuth(jwt: JWTModel): void | never {
    localStorage.setItem(this.accessTokenStr, jwt.accessToken)
    localStorage.setItem(this.refreshTokenStr, jwt.refreshToken)
    localStorage.setItem(this.expireStr, jwt.expiresIn.toString())
  }
}
