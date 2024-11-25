import { UserService } from './user.service';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user'
import { Router } from '@angular/router';
import { delay, Observable, of } from 'rxjs';
import { SignJWT, generateKeyPair } from 'jose';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class AuthenticationService {
     constructor(private router:Router, 
                private http: HttpClient, 
                private userService: UserService) {}

    private secretKey = new TextEncoder().encode('your-256-bit-secret'); // Use a strong secret key        
    url = environment.URL_API;
    //url:string = "";

    login(email?:string , password?:String){
        return this.http.post<any>(`${this.url+ '/auth'}`, {email,password});
    }

    logout(): void{
        this.userService.logout();
    }

    isAuthenticated(): boolean {
        return this.userService.isLoggedIn();
    }

    returnUser(): Observable<User>{
        return this.userService.returnUser();
    }
}