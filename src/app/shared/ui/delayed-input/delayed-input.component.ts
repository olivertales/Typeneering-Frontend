import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  input,
  OnDestroy,
  output
} from '@angular/core'
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  Subscription
} from 'rxjs'

@Component({
  selector: 'delayed-input',
  imports: [],
  templateUrl: './delayed-input.component.html',
  styleUrl: './delayed-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DelayedInputComponent implements AfterViewInit, OnDestroy {
  inputChangeEmitter = output<string>()
  value = input('')
  label = input('')
  private valueSub?: Subscription
  private delayedSubject$ = new BehaviorSubject(this.value() || '')

  ngAfterViewInit() {
    this.valueSub = this.delayedSubject$
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe({
        next: (value) => this.inputChangeEmitter.emit(value)
      })
  }

  ngOnDestroy(): void {
    this.valueSub?.unsubscribe()
  }

  onInput(event: Event) {
    const element = event.target as HTMLInputElement
    this.delayedSubject$.next(element.value)
  }
}
