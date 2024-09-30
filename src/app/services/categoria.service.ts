import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user'
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Categoria } from '../models';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class CategoriaService {
     constructor(private http: HttpClient) {}

    url:string = environment.URL_API;

    register(categoria: Categoria){
        return this.http.post<Categoria>(`${this.url+ '/categoria/register'}`, {categoria});
    }
    
    update(categoria: Categoria){
        return this.http.put<Categoria>(`${this.url+ '/categoria/update'}`, {categoria});
    }
    
    findById(id:number){
        return this.http.get<Categoria>(`${this.url+ '/categoria/'+id}`);
    }
    
    delete(id:number){
        return this.http.delete<Categoria>(`${this.url+ '/categoria/'+id}`);
    }

}