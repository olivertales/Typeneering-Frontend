import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  input,
  output,
  viewChild
} from '@angular/core'
import { LetterComponent } from '../../ui/letter/letter.component'
import { GameData } from '../../interface/GameData'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'typingbox',
  imports: [LetterComponent, FormsModule],
  templateUrl: './typingbox.component.html',
  styleUrl: './typingbox.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TypingBoxComponent {
  text = input.required<string>()
  active = false
  inputChars: number
  correctInputChars: number
  correctWords = computed(() => Math.floor(this.correctInputChars / 5) || 0)
  letterIndex: number
  inputText: string[]
  timerSeconds = 2
  gameDataEmitter = output<GameData>()

  private textDisplayChild = viewChild.required('textDisplay', {
    read: ElementRef
  })
  private nonResponsiveKeys = [
    'Shift',
    'Control',
    'Escape',
    'CapsLock',
    'Alt',
    'Meta',
    'AltGraph',
    'Symbol',
    'SymbolLock',
    'Home',
    'Delete',
    'End',
    'Fn',
    'FnLock',
    'NumLock',
    'ScrollLock',
    'Hyper',
    'Super',
    'ArrowLeft',
    'ArrowUp',
    'ArrowDown',
    'ArrowRight',
    'PageDown',
    'PageUp',
    'Insert'
  ]

  constructor() {
    this.inputChars = 0
    this.correctInputChars = 0
    this.letterIndex = 0
    this.inputText = []
  }

  keyCheck(event: KeyboardEvent): void {
    const key = event.key
    if (this.nonResponsiveKeys.includes(key)) return event.preventDefault()

    const textString = this.text()
    const textLetter = textString[this.letterIndex]

    const textareaElement = event.target as HTMLTextAreaElement
    const textValue = textareaElement.value
    const start = textareaElement.selectionStart

    switch (key) {
      case 'Backspace':
        if (this.letterIndex > 0) this.letterIndex--

        if (this.inputChars > 0) this.inputChars--

        if (
          this.correctInputChars > 0 &&
          textString[this.letterIndex] === this.inputText[this.letterIndex]
        )
          this.correctInputChars--

        this.inputText.pop()
        break

      case 'Tab': {
        event.preventDefault()
        const tabValue = ' '
        if (textLetter === '\n') return
        const isCorrectInput =
          textString[this.letterIndex] === tabValue &&
          textString[this.letterIndex + 1] === tabValue

        this.inputText[this.letterIndex] = tabValue
        if (textString[this.letterIndex + 1] === '\n') {
          textareaElement.value = textValue.substring(0, start) + tabValue
          this.letterIndex++
          this.inputChars++

          if (isCorrectInput) this.correctInputChars++
        } else {
          this.inputText[this.letterIndex + 1] = tabValue
          textareaElement.value = textValue.substring(0, start) + '  '
          this.inputChars += 2
          this.letterIndex += 2

          if (isCorrectInput) this.correctInputChars += 2
        }
        break
      }

      case 'Enter':
        this.inputChars++
        if (textLetter !== '\n') {
          event.preventDefault()
          return
        }

        if (textLetter === '\n') this.correctInputChars++

        this.inputText[this.letterIndex] = '\n'
        this.letterIndex++
        break

      default: {
        if (textLetter === '\n') {
          event.preventDefault()
          return
        }
        this.inputChars++
        this.inputText[this.letterIndex] = key
        if (key === textLetter) this.correctInputChars++

        this.letterIndex++
        break
      }
    }

    textareaElement.scroll(0, textareaElement.scrollHeight)
  }

  textFocus(event: Event) {
    event.preventDefault()
    const textElement = event.target as HTMLTextAreaElement
    textElement.selectionStart = this.letterIndex
  }

  textScroll(event: Event) {
    const textAreaElement = event.target as HTMLTextAreaElement
    const scrollVal = textAreaElement.scrollTop
    const textWindowElement = this.textDisplayChild()
      .nativeElement as HTMLDivElement
    textWindowElement.scroll({ top: scrollVal })
  }

  private emitResults() {
    const results = {
      correctWords: this.correctWords(),
      timer: this.timerSeconds,
      correctInputChars: this.correctInputChars,
      inputChars: this.inputChars,
      wordsPerMinute: this.correctWords() / this.timerSeconds || 0
    }
    this.gameDataEmitter.emit(results)
  }

  startGame() {
    this.active = true
    setTimeout(() => this.emitResults(), this.timerSeconds * 1000)
  }
}
