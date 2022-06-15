import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './shared/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'AgendamentosOnlineApp';

  constructor(
    private _authService: AuthenticationService,
    private _router: Router
  ) {}

  logout(event: Event): void {
    this._authService.logout();
    this._router.navigate(['login']);
  }
}
