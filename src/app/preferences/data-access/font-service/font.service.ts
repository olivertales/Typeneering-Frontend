import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class FontService {
  constructor(private http: HttpClient) {}

  getGoogleFont(fontName: string) {
    return this.http.get(`https://fonts.googleapis.com/css2?family=${fontName}`)
  }
}
