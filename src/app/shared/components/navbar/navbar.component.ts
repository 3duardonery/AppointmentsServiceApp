import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, take } from 'rxjs';
import { selectAuthState } from 'src/app/login/store/app.state';
import { AuthState } from 'src/app/login/store/reducers/auth.reducer';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  @Output() logOffOutput: EventEmitter<any> = new EventEmitter();

  //authPage$ = this._store.select('app').pipe(map((e) => e));

  isAuthenticated = false;

  getState!: Observable<any>;

  constructor(private _store: Store<AuthState>) {
    this.getState = this._store.select(selectAuthState);
  }

  ngOnInit(): void {
    console.log(localStorage.getItem('authentication_data') != null);

    this.isAuthenticated = localStorage.getItem('authentication_data') != null;
  }

  logOffOutputHandler(): void {
    this.logOffOutput.emit();
  }
}
