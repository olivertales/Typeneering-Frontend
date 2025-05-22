import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ColorEvent } from 'ngx-color';
import { ColorSketchModule } from 'ngx-color/sketch'
import { ColorUtils } from './utils/ColorUtils';
import { DelayedInputComponent } from '../shared/ui/delayed-input/delayed-input.component';

@Component({
  selector: 'app-preferences',
  imports: [ColorSketchModule, FormsModule, DelayedInputComponent],
  templateUrl: './preferences.component.html',
  styleUrl: './preferences.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreferencesComponent {
  documentStyle = document.documentElement.style
  textColor = ''

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
}
