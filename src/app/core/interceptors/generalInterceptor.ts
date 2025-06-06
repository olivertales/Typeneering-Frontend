import { HttpHandlerFn, HttpRequest } from '@angular/common/http'
import { environment } from '../../../environments/environment.development'
import { debounceTime, retry } from 'rxjs'

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

  return next(apiReq).pipe(retry(defaultRetry), debounceTime(defaultDebounce))
}
