import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { LoginService } from './data-access/login.service'
import { AccountForm } from './interface/AccountForm'

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  constructor(private service: LoginService) {}

  isRegister = false
  accountForm: AccountForm = {
    login: '',
    nickname: '',
    email: '',
    password: ''
  }

  registerToggle() {
    this.isRegister = !this.isRegister
  }

  formSubmit() {
    if (!this.isRegister) {
      this.service
        .login(this.accountForm.login, this.accountForm.password)
        .subscribe()
    } else {
      this.service.register(this.accountForm).subscribe()
    }
  }
}
