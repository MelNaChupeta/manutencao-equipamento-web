import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Categoria } from '../models';
import { environment } from '../../environments/environment';
import { Observable, of } from 'rxjs';
import { Receita } from '../models/receita';

@Injectable({
    providedIn: 'root'
})

export class ReceitaService {
    constructor(private http: HttpClient) {}
    url:string = environment.URL_API;

    findByPeriodo(dataInicial?:string , dataFinal?:string): Observable<Receita[]> {
        let params = new HttpParams();
        
        if (dataInicial && dataFinal) {
            params = params.set('dataFinal', dataFinal);
            params = params.set('dataInicial', dataInicial);

        }
        return this.http.get<Receita[]>(`${this.url+ '/receita/periodo'}` , {params});
    }
    
    findByCategoria(idCategoria?:string): Observable<Receita[]> {
        let params = new HttpParams();
        
        if (idCategoria) 
            params = params.set('idCategoria', idCategoria);

        return this.http.get<Receita[]>(`${this.url+ '/receita/categoria'}` , {params});
    }

}