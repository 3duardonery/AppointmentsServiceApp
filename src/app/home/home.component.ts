import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Modal } from 'bootstrap';
import { AuthState } from '../login/store/reducers/auth.reducer';
import { AuthenticationService } from '../shared/services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  showModal: boolean = false;
  modal: Modal | null = null;
  loading: boolean = false;
  constructor(
    private _store: Store<{ app: AuthState }>,
    private _authService: AuthenticationService,
    private _router: Router
  ) {}

  // @ViewChild('add_appointment_modal', { static: true })
  // modalElement!: ElementRef<HTMLDivElement>;

  ngOnInit(): void {
    // this.modal = new Modal(this.modalElement.nativeElement, {});
  }

  openModal(): void {
    this._router.navigate(['appointments/create']);
    // this.showModal = true;

    // event?.preventDefault();
    // this.modal?.show();
  }
}
