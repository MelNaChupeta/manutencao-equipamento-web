import { Injectable } from '@angular/core';
import { TokenService } from '../services';
import { User } from '../models/user';
import { jwtDecode } from "jwt-decode";
import { BehaviorSubject } from 'rxjs';

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
    const usuario:User = jwtDecode(token, { header: false }) as User;
    this.usuarioSubject.next(usuario);
  }

  returnUser() {
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
