import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user'
import { Router } from '@angular/router';
import { Categoria } from '../models';
import { environment } from '../../environments/environment';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class CategoriaService {
    constructor(private http: HttpClient) {}
    LS_CHAVE = "categorias";
    url:string = environment.URL_API;

    register(categoria: Categoria){
        return this.http.post<Categoria>(`${this.url+ '/categoria/registrar'}`, categoria);
    }
    
    update(categoria: Categoria){
        return this.http.put<Categoria>(`${this.url+ '/categoria/alterar/'+categoria.id}`, categoria);
    }
    
    findById(id:Number) {
        return this.http.get<Categoria>(`${this.url+ '/categoria/'+id}`);
    }
    
    delete(id?:Number){
        return this.http.delete<Categoria>(`${this.url+ '/categoria/deletar/'+id}`);
    }

    findAll(): Observable<Categoria[]> {
        return this.http.get<Categoria[]>(`${this.url+ '/categoria'}`);
    }

}