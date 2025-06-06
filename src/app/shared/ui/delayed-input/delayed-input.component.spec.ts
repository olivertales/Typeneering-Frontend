import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DelayedInputComponent } from './delayed-input.component'

describe('DelayedInputComponent', () => {
  let component: DelayedInputComponent
  let fixture: ComponentFixture<DelayedInputComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DelayedInputComponent]
    }).compileComponents()

    fixture = TestBed.createComponent(DelayedInputComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
