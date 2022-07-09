import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Book } from '../models/books';
import { CreateBook } from '../models/create-book';
import { CreateBookResponse } from '../models/create-book-response';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  _url: string = environment.api;

  constructor(private _http: HttpClient) {}

  getBooksByServiceId(serviceId: string): Observable<Book[]> {
    const params = new HttpParams().set('serviceId', serviceId);
    return this._http.get<Book[]>(`${this._url}/books`, { params });
  }

  getBooksByProfessionalEmail(email: string): Observable<Book[]> {
    const params = new HttpParams().set('email', email);
    return this._http.get<Book[]>(`${this._url}/books/professional`, {
      params,
    });
  }

  saveBook(book: CreateBook): Observable<CreateBookResponse[]> {
    return this._http.post<CreateBookResponse[]>(`${this._url}/books`, book);
  }
}
