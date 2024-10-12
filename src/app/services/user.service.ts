import { Injectable } from '@angular/core';
import { TokenService } from '../services';
import { User } from '../models/user';
import { jwtDecode } from "jwt-decode";
import { BehaviorSubject, Observable } from 'rxjs';
import { Client } from '../models';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usuarioSubject = new BehaviorSubject<User>({});
  constructor(private tokenService: TokenService) {
    if (this.tokenService.hasToken()) {
      this.decodeJWT();
    }
  }

  private decodeJWT() {
    const token = this.tokenService.returnToken();
    const usuario = jwtDecode<User>(token) as User;
    this.usuarioSubject.next(usuario);
  }

  returnUser() : Observable<User> {
    return this.usuarioSubject.asObservable();
  }

  saveToken(token: string) {
    this.tokenService.saveToken(token);
    this.decodeJWT();
  }

  logout() {
    this.tokenService.deleteToken();
    this.usuarioSubject.next({});
  }

  isLoggedIn() {
    return this.tokenService.hasToken();
  }
}
