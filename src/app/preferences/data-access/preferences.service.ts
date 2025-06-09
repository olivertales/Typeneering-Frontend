import { Injectable } from '@angular/core'
import { ApiFetchService } from '../../core/data-access/api-fetch.service'
import { ApiResultResponse } from '../../core/interface/ApiResultResponse'
import { UserPreferenceRequest } from '../interfaces/UserPreferenceRequest'
import { Preference } from '../interfaces/Preference'
import { tap } from 'rxjs'
import { AppSetupService } from '../../core/data-access/app-setup.service'
import { UserDataService } from '../../core/data-access/user-data.service'

@Injectable({
  providedIn: 'root'
})
export class PreferencesService {
  endpoint = 'preference'
  userEndpoint = 'user-preference'

  constructor(
    private apiFetch: ApiFetchService,
    private appSetup: AppSetupService,
    private userData: UserDataService
  ) {}

  loadPreferences() {
    return this.apiFetch.get<Preference[]>(this.endpoint)
  }

  changePreference(value: string, id: number, name: string) {
    return this.apiFetch
      .put<
        ApiResultResponse,
        UserPreferenceRequest
      >(`${this.userEndpoint}/${id}`, { value: value })
      .pipe(
        tap({
          next: () => {
            if (this.userData.getUser())
              this.userData.changePreference(name, value)
            else localStorage.setItem(name, value)

            this.appSetup.applyPreference(name, value)
          }
        })
      )
  }
}
