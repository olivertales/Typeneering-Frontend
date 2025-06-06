import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class AppSetupService {
  applyUserPreferences(preferences: Map<string, string>) {
    const docStyle = document.documentElement.style
    for (const [preference, value] of preferences) {
      docStyle.setProperty(preference, value)
    }
  }

  applyLocalPreferences() {
    const docStyle = document.documentElement.style
    for (let index = 0; index < localStorage.length; index++) {
      const preference = localStorage.key(index)
      if (preference && preference.slice(0, 2) === '--')
        docStyle.setProperty(preference, localStorage.getItem(preference))
    }
  }
}
