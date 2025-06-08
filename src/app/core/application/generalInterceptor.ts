import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpRequest
} from '@angular/common/http'
import { environment } from '../../../environments/environment.development'
import { catchError, debounceTime, of, retry, throwError } from 'rxjs'
import { ApiErrorResponse } from '../interface/ApiErrorResponse'

const apiUrl = environment.apiUrl
const defaultRetry = 3
const defaultDebounce = 0.5 * 1000

export function generalInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) {
  const apiReq = req.clone({
    url: `${apiUrl}/${req.url}`
  })

  return next(apiReq).pipe(
    retry(defaultRetry),
    debounceTime(defaultDebounce),
    catchError((err: HttpErrorResponse) => {
      if (err.error instanceof Error)
        return of(
          new ApiErrorResponse(
            err.status,
            undefined,
            err.type.toString(),
            err.message
          )
        )

      return throwError(() => err.error as ApiErrorResponse)
    })
  )
}
