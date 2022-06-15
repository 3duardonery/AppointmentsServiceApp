import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { User } from '../models/user-model';
import { AuthResponse } from '../models/auth-response';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  _url: string = environment.api;

  constructor(private _http: HttpClient) {}

  login(user: User): Observable<AuthResponse> {
    return this._http
      .post<AuthResponse>(`${this._url}/authentication`, user)
      .pipe(catchError(this.handleError));
  }

  logout() {
    localStorage.clear();
  }

  getToken(): string {
    return localStorage.getItem('authentication_data') ?? '';
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
