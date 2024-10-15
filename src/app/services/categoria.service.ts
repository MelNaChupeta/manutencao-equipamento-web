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
    LS_CHAVE = "categorias";
    url:string = environment.URL_API;

    register(categoria: Categoria){
        //return this.http.post<Categoria>(`${this.url+ '/categoria/register'}`, {categoria});
        const categorias = this.findAll();

        categoria.id = new Date().getTime();

        categorias.push(categoria);

        localStorage[this.LS_CHAVE] = JSON.stringify(categorias); 
    }
    
    update(categoria: Categoria){
        //return this.http.put<Categoria>(`${this.url+ '/categoria/update/'+categoria.id}`, {categoria});
        const categorias = this.findAll();

        categorias.forEach((obj, index, objs) => {
          if (categoria.id === obj.id) {          
            objs[index] = categoria              
          }
        });
    
        localStorage[this.LS_CHAVE] = JSON.stringify(categorias);
    }
    
    findById(id:Number) {
        //return this.http.get<Categoria>(`${this.url+ '/categoria/'+id}`);
        const categorias = this.findAll();

        return categorias.find(c => c.id ===id);
    }
    
    delete(id?:Number){
        //return this.http.delete<Categoria>(`${this.url+ '/categoria/'+id}`);
        let categorias = this.findAll();

        categorias = categorias.filter(c => c.id !== id);

        localStorage[this.LS_CHAVE] = JSON.stringify(categorias);
    }

    findAll(): Categoria[] {
        //return this.http.get<Categoria[]>(`${this.url+ '/categoria/all'}`);
        const funcionarios = localStorage[this.LS_CHAVE];

        return funcionarios? JSON.parse(funcionarios) : [];
    }

}