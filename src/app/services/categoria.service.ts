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
        //return this.http.post<Categoria>(`${this.url+ '/categoria/register'}`, {categoria});
        let categorias= JSON.parse(localStorage[this.LS_CHAVE]) as Categoria[];

        categoria.id = new Date().getTime();

        categorias.push(categoria);

        localStorage[this.LS_CHAVE] = JSON.stringify(categorias); 
        return of(categoria).pipe(delay(1000));
    }
    
    update(categoria: Categoria){
        //return this.http.put<Categoria>(`${this.url+ '/categoria/update/'+categoria.id}`, {categoria});
        let categorias= JSON.parse(localStorage[this.LS_CHAVE]) as Categoria[];

        categorias.forEach((obj, index, objs) => {
          if (categoria.id === obj.id) {          
            objs[index] = categoria              
          }
        });
    
        localStorage[this.LS_CHAVE] = JSON.stringify(categorias);
        return of(categoria).pipe(delay(1000));
    }
    
    findById(id:Number) {
        //return this.http.get<Categoria>(`${this.url+ '/categoria/'+id}`);
        let categorias= JSON.parse(localStorage[this.LS_CHAVE]) as Categoria[];

          return of(categorias.find(c => c.id ===id)).pipe(delay(1000));
    }
    
    delete(id?:Number){
        //return this.http.delete<Categoria>(`${this.url+ '/categoria/'+id}`);
        let categorias= JSON.parse(localStorage[this.LS_CHAVE]) as Categoria[];

        categorias = categorias.filter(c => c.id !== id);

        localStorage[this.LS_CHAVE] = JSON.stringify(categorias);
        return of().pipe(delay(1000));
    }

    findAll(): Observable<Categoria[]> {
        //return this.http.get<Categoria[]>(`${this.url+ '/categoria/all'}`);
        let categorias= JSON.parse(localStorage[this.LS_CHAVE]) as Categoria[];

        return of(categorias?categorias:[]).pipe(delay(1000));
    }

}