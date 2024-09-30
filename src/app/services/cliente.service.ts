import { UserService } from './user.service';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user'
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SignJWT, generateKeyPair } from 'jose';
import { Client } from '../models';

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

    signup(client: Client){

        return this.http.post<Client>(`${this.url+ 'auth'}`, {client});

    }

    returnUser(): Observable<User>{
        return this.userService.returnUser();
    }

}