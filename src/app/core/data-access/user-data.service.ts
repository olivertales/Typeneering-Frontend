import { Injectable } from '@angular/core'
import { UserData } from '../interface/UserData'
import { ApiFetchService } from './api-fetch.service'
import { tap } from 'rxjs'
import { AppSetupService } from './app-setup.service'
import { UserError } from '../../shared/errors/UserError'

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private user: UserData | null = null

  constructor(
    private apiFetch: ApiFetchService,
    private appSetup: AppSetupService
  ) {}

  getUser() {
    return this.user
  }

  changePreference(name: string, value: string): void | never {
    if (!this.user) throw new UserError()

    this.user.userPreferences.set(name, value)
  }

  reloadUser() {
    return this.apiFetch.get<UserData>('user').pipe(
      tap({
        next: (user) => {
          this.user = user
          this.appSetup.applyUserPreferences(user.userPreferences)
        }
      })
    )
  }

  logoffUser() {
    this.user = null
  }
}
