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

    signup( cpf:String, nome: string, email:string, celular: string, cep: string, endereco: string, bairro: string, cidade: string, estado: string){

        return this.http.post<User>(`${this.url+ 'auth'}`, {cpf, nome, email, celular, cep, endereco, bairro, cidade, estado});

    }

    returnUser(): Observable<User>{
        return this.userService.returnUser();
    }

}