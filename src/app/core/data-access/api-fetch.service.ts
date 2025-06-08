import { DestroyRef, Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

@Injectable({
  providedIn: 'root'
})
export class ApiFetchService {
  constructor(
    private http: HttpClient,
    private destroyRef: DestroyRef
  ) {}

  get<TReturn>(endpoint: string, id?: number, headers?: HttpHeaders) {
    return this.http
      .get<TReturn>(`${endpoint}/${id || ''}`, { headers: headers })
      .pipe(takeUntilDestroyed(this.destroyRef))
  }

  post<TReturn, TBody>(endpoint: string, body: TBody) {
    return this.http
      .post<TReturn>(`${endpoint}`, body)
      .pipe(takeUntilDestroyed(this.destroyRef))
  }

  put<TReturn, TBody>(endpoint: string, body: TBody) {
    return this.http
      .put<TReturn>(`${endpoint}`, body)
      .pipe(takeUntilDestroyed(this.destroyRef))
  }

  patch<TReturn, TBody>(endpoint: string, body: TBody, id?: number) {
    return this.http
      .patch<TReturn>(`${endpoint}/${id || ''}`, body)
      .pipe(takeUntilDestroyed(this.destroyRef))
  }

  delete<TReturn>(endpoint: string, id?: number) {
    return this.http
      .delete<TReturn>(`${endpoint}/${id || ''}`)
      .pipe(takeUntilDestroyed(this.destroyRef))
  }
}
