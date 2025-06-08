import { inject } from '@angular/core'
import { Observable } from 'rxjs'
import { UserDataService } from '../data-access/user-data.service'
import { AppSetupService } from '../data-access/app-setup.service'

export function applicationStartup():
  | Observable<unknown>
  | Promise<unknown>
  | void {
  const userService = inject(UserDataService)
  const appSetup = inject(AppSetupService)
  const user = userService.getUser()
  if (user) return appSetup.applyUserPreferences(user.userPreferences)

  return appSetup.applyLocalPreferences()
}
