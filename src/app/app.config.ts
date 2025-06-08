import {
  ApplicationConfig,
  provideAppInitializer,
  provideZoneChangeDetection
} from '@angular/core'
import { provideRouter } from '@angular/router'
import { routes } from './app.routes'
import {
  provideClientHydration,
  withEventReplay
} from '@angular/platform-browser'
import { provideHttpClient, withInterceptors } from '@angular/common/http'
import { authInterceptor } from './core/application/authInterceptor'
import { generalInterceptor } from './core/application/generalInterceptor'
import { applicationStartup } from './core/application/applicationStartup'

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withInterceptors([authInterceptor, generalInterceptor])),
    provideAppInitializer(applicationStartup)
  ]
}
