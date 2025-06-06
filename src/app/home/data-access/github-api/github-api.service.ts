import { Injectable } from '@angular/core'
import { request } from '@octokit/request'
import type { OctokitResponse, RequestParameters } from '@octokit/types'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class GithubApiService {
  private githubAuthToken = ''
  private githubRequest = request.defaults({
    mediaType: { format: 'raw' },
    headers: { authorization: `token ${this.githubAuthToken}` },
    type: 'public',
    method: 'Get'
  })

  getContentRequest(
    url: string,
    options?: RequestParameters
  ): Observable<OctokitResponse<string, number>> {
    return new Observable<OctokitResponse<string, number>>((observer) => {
      this.githubRequest(url, options)
        .then((result) => {
          observer.next(result)
          observer.complete()
        })
        .catch((err) => {
          observer.error(err)
        })
    })
  }
}
