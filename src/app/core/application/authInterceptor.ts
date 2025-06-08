import {
  HttpContextToken,
  HttpEvent,
  HttpHandlerFn,
  HttpRequest
} from '@angular/common/http'
import { inject } from '@angular/core'
import { AuthService } from '../data-access/auth.service'
import { Observable } from 'rxjs'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

export const AUTHENTICATED_REQUEST = new HttpContextToken(() => true)

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  if (!req.context.get(AUTHENTICATED_REQUEST)) {
    return next(req)
  }

  const authService = inject(AuthService)

  let jwt = authService.getAuth()

  if (jwt && jwt.expiresIn < new Date().getTime()) {
    authService
      .refresh(jwt)
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (res) => (jwt = res),
        error: () => (jwt = null)
      })
  }

  if (!jwt) return next(req)

  const authReq = req.clone({
    headers: req.headers.append('Authorization', `Bearer ${jwt.accessToken}`)
  })

  return next(authReq)
}
