import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { ColorEvent } from 'ngx-color'
import { ColorSketchModule } from 'ngx-color/sketch'
import { ColorUtils } from './utils/ColorUtils'
import { DelayedInputComponent } from '../shared/ui/delayed-input/delayed-input.component'
import { Preference } from './interfaces/Preference'
import { PreferencesService } from './data-access/preferences.service'
import { AppSetupService } from '../core/data-access/app-setup.service'

@Component({
  selector: 'app-preferences',
  imports: [ColorSketchModule, FormsModule, DelayedInputComponent],
  templateUrl: './preferences.component.html',
  styleUrl: './preferences.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreferencesComponent implements OnInit {
  documentStyle = document.documentElement.style
  textColor = ''
  preferences: Preference[] = []

  constructor(
    private service: PreferencesService,
    private appSetup: AppSetupService
  ) {}

  ngOnInit(): void {
    this.service.loadPreferences().subscribe({
      next: (prefs) => (this.preferences = prefs)
    })
  }

  changeFontSize(event: Event) {
    const inputElement = event.target as HTMLInputElement
    const cssVariable = '--typing-font-size'
    this.documentStyle.setProperty(cssVariable, inputElement.value + 'px')
  }

  changeFontWeight(event: Event) {
    const inputElement = event.target as HTMLInputElement
    const cssVariable = '--typing-font-weight'
    this.documentStyle.setProperty(cssVariable, inputElement.value)
  }

  changeFontFamily(font: string) {
    const cssVariable = '--typing-font-family'
    this.documentStyle.setProperty(cssVariable, font, 'monospace')
  }

  changeTextColor(event: ColorEvent) {
    const cssVariable = '--typing-text-color'
    const color = ColorUtils.rgbToString(event.color.rgb)
    this.textColor = `${color}`
    this.documentStyle.setProperty(cssVariable, `${color}`)
  }

  changePreference(event: Event | ColorEvent, id: number) {
    let value = undefined
    const colorEvent = event as ColorEvent
    if (colorEvent) {
      value = ColorUtils.rgbToString(colorEvent.color.rgb)
    } else {
      const element = (event as Event).target as HTMLInputElement
      value = element.value
    }

    const preference = this.preferences.find((pref) => pref.id === id)
    if (!preference) return alert('No preference found?')

    this.service.changePreference(value, id, preference.name).subscribe({
      next: (res) => {
        alert(res)
      }
    })
  }
}
