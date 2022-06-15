import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class PagesGuard implements CanActivate {
  canActivate() {
    console.log(localStorage.getItem('authentication_data'));

    return localStorage.getItem('authentication_data') != null;
  }
}
