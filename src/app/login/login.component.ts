import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Toast } from 'bootstrap';
import { map, take } from 'rxjs';
import { StaticLabels } from '../shared/constants/static-labels';
import { User } from '../shared/models/user-model';
import { AuthenticationService } from '../shared/services/authentication.service';
import {
  loginSuccess,
  setAuthData,
  setTokenLocalStorage,
} from './store/actions/auth.actions';
import { AppState } from './store/app.state';
import { AuthState } from './store/reducers/auth.reducer';

declare var window: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  footerTextLabel: string = StaticLabels.FOOTER_TEXT_VALUE;
  toastMessageError: string = StaticLabels.LOGIN_TOAST_MESSAGE_ERROR;
  loginH4Message: string = StaticLabels.LOGIN_H4_MESSAGE;
  loginH1MessageTitle: string = StaticLabels.LOGIN_H1_TITLE_MESSAGE;

  user: User = { email: '', password: '' };

  loading: boolean = false;

  loginGroup: FormGroup = new FormGroup({});
  enabledSubmitButton: boolean = false;

  @ViewChild('toastAuth', { static: true })
  toastEl!: ElementRef<HTMLDivElement>;
  toast: Toast | null = null;

  authPage$ = this._store.select('app').pipe(map((e) => e));

  isAuthenticated = false;

  constructor(
    private _store: Store<{ app: AuthState }>,
    private store: Store<AppState>,
    private _authService: AuthenticationService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.toast = new Toast(this.toastEl.nativeElement, {});

    // this.authPage$
    //   .pipe(take(1))
    //   .subscribe((data) => (this.isAuthenticated = data.isAuthenticated));

    this.loginGroup = new FormGroup({
      email: new FormControl(this.user.email, [Validators.required]),
      password: new FormControl(this.user.password, [Validators.required]),
    });
  }

  submitLogin(): void {
    if (this.loginGroup.invalid) {
      return;
    }

    this.loading = true;

    let user: User = {
      email: this.loginGroup.get('email')?.value,
      password: this.loginGroup.get('password')?.value,
    };

    this._authService.login(user).subscribe({
      next: (data) => {
        this.setLoginState(data.email, data.idToken);
      },
      error: (error) => {
        this.toast?.show();
        this.loading = false;
      },
      complete: () => {
        console.info('request finished');
        this.loading = false;
      },
    });
  }

  private setLoginState(email: string, token: string): void {
    this._store.dispatch(
      loginSuccess({
        email: email,
        token: token,
        isAuthenticated: true,
        errorMessage: '',
      })
    );

    //this._store.dispatch(setTokenLocalStorage({ email, token }));

    //this._router.navigate(['home']);
  }
}
