import { Routes } from '@angular/router'
import { HomeComponent } from './home/home.component'

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then((comp) => comp.LoginComponent)
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./profile/profile.component').then(
        (comp) => comp.ProfileComponent
      )
  },
  {
    path: 'preferences',
    loadComponent: () =>
      import('./preferences/preferences.component').then(
        (comp) => comp.PreferencesComponent
      )
  },
  {
    path: 'statistics',
    loadComponent: () =>
      import('./statistics/statistics.component').then(
        (comp) => comp.StatisticsComponent
      )
  }
]
