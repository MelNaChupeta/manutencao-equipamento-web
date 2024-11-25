import { UserService } from './user.service';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user'
import { Router } from '@angular/router';
import { delay, Observable, of } from 'rxjs';
import { SignJWT, generateKeyPair } from 'jose';
import { Client } from '../models';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class ClienteService {
     constructor(
                private router:Router, 
                private http: HttpClient, 
                private userService: UserService) {}

    private secretKey = new TextEncoder().encode('your-256-bit-secret'); 

   /*signup(client: Client){
        return this.http.post<Client>(`${this.url+ 'auth'}`, {client});
    }*/

    LS_CHAVE = "clientes";
    url:string = environment.URL_API;

    signup(cliente: Client){
        return this.http.post<Client>(`${this.url+ '/cliente/registrar'}`, cliente);
    }
    
    update(cliente: Client){
        //return this.http.put<Client>(`${this.url+ '/client/update/'+Client.id}`, {Client});
        let clientes= this.findAll();

        clientes.forEach((obj, index, objs) => {
          if (cliente.id === obj.id) {          
            objs[index] = cliente              
          }
        });
    
        localStorage[this.LS_CHAVE] = JSON.stringify(clientes);
        return of(cliente).pipe(delay(1000));
    }
    
    findById(id:Number) {
        //return this.http.get<Client>(`${this.url+ '/Client/'+id}`);
        let clientes= this.findAll();

        return of(clientes.find(c => c.id ===id)).pipe(delay(1000));
    }
    
    delete(id?:Number){
        //return this.http.delete<Client>(`${this.url+ '/Client/'+id}`);
        let clientes= this.findAll();

        clientes = clientes.filter(c => c.id !== id);

        localStorage[this.LS_CHAVE] = JSON.stringify(clientes);
        return of().pipe(delay(1000));
    }

    findAll(): Client[] {
        //return this.http.get<Client[]>(`${this.url+ '/Client/all'}`);
        const clientes = localStorage[this.LS_CHAVE];

        return clientes? JSON.parse(clientes) : [];
    }

   
}