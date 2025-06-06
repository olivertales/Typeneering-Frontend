import { DestroyRef, Injectable } from '@angular/core';
import { JWTModel } from '../interface/JWTModel';
import { HttpClient, HttpContext } from '@angular/common/http';
import { AUTHENTICATED_REQUEST } from '../interceptors/authInterceptor';
import { tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ApiResultResponse } from '../interface/ApiResultResponse';
import { LoginRequest } from '../interface/LoginRequest';
import { RegisterRequest } from '../interface/RegisterRequest';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private accessTokenStr = 'access_token';
  private refreshTokenStr = 'refresh_token';
  private expireStr = 'expires_in';
  private endpointUrl = `user`;
  constructor(
    private http: HttpClient,
    private destroyRef: DestroyRef,
  ) {}

  login(body: LoginRequest) {
    return this.http
      .post<JWTModel>(`${this.endpointUrl}/login`, body, {
        context: new HttpContext().set(AUTHENTICATED_REQUEST, false),
      })
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap({
          next: (value) => {
            try {
              this.setAuth(value);
            } catch (error) {
              alert(error);
            }
            alert(value);
          },
          error: (err) => alert(err),
        }),
      );
  }

  register(body: RegisterRequest) {
    return this.http
      .post<ApiResultResponse>(`${this.endpointUrl}/register`, body, {
        context: new HttpContext().set(AUTHENTICATED_REQUEST, false),
      })
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap({
          next: (val) => {
            alert(val);
          },
          error: (err) => {
            alert(err);
          },
        }),
      );
  }

  refresh(jwtCookie: JWTModel) {
    return this.http
      .post<JWTModel>(
        `${this.endpointUrl}/refresh`,
        { refreshToken: jwtCookie.refreshToken },
        { context: new HttpContext().set(AUTHENTICATED_REQUEST, false) },
      )
      .pipe(
        takeUntilDestroyed(),
        tap({
          next: (res) => {
            this.setAuth(res);
          },
          error: () => this.logoff(),
        }),
      );
  }

  logoff() {
    return;
  }

  getAuth() {
    const accessToken = localStorage.getItem(this.accessTokenStr);
    const refreshToken = localStorage.getItem(this.refreshTokenStr);
    const expires = localStorage.getItem(this.expireStr);

    if (!accessToken || !refreshToken) return null;

    return new JWTModel(
      accessToken,
      refreshToken,
      new Number(expires).valueOf(),
    );
  }

  setAuth(jwt: JWTModel) {
    localStorage.setItem('access_token', jwt.accessToken);
    localStorage.setItem('refresh_token', jwt.refreshToken);
    localStorage.setItem('expires_in', jwt.expiresIn.toString());
  }
}
