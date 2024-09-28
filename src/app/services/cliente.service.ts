import { UserService } from './user.service';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user'
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SignJWT, generateKeyPair } from 'jose';

@Injectable({
    providedIn: 'root'
})

export class ClienteService {
     constructor(
                private router:Router, 
                private http: HttpClient, 
                private userService: UserService) {}

    private secretKey = new TextEncoder().encode('your-256-bit-secret'); 
    url:string = "";

    signup(user: User){

        return this.http.post<User>(`${this.url+ 'auth'}`, {user});

    }

    returnUser(): Observable<User>{
        return this.userService.returnUser();
    }

}