import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  AuthState,
  isAuthenticated,
  seletcToken,
} from 'src/app/login/store/reducers/auth.reducer';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  @Output() logOffOutput: EventEmitter<any> = new EventEmitter();

  isAuthenticated$ = this.store.select(isAuthenticated);

  constructor(private store: Store<AuthState>) {}

  ngOnInit(): void {}

  logOffOutputHandler(): void {
    this.logOffOutput.emit();
  }
}
