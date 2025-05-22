import { Component, input } from '@angular/core';

@Component({
  selector: 'letter',
  imports: [],
  templateUrl: './letter.component.html',
  styleUrl: './letter.component.scss'
})
export class LetterComponent {
  letter = input.required<string>()
  correct = input<boolean>()
}
