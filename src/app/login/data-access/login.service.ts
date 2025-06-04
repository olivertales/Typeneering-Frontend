import { Injectable } from '@angular/core';
import { AccountForm } from '../interface/AccountForm';
import { AuthService } from '../../core/data-access/auth.service';
import { concatMap } from 'rxjs';
import { UserDataService } from '../../core/data-access/user-data.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private auth: AuthService,
    private userData: UserDataService,
  ) {}

  login(login: string, password: string) {
    return this.auth
      .login({
        username: login,
        password: password,
      })
      .pipe(concatMap(() => this.userData.reloadUser()));
  }

  register(form: AccountForm) {
    return this.auth
      .register({
        password: form.password,
        username: form.login,
        email: form.email || null,
        nickname: form.nickname || null,
      })
      .pipe(concatMap(() => this.login(form.login, form.password)));
  }
}
