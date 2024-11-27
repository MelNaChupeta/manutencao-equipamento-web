import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Funcionario, Solicitacao } from "../models";
import { UserService } from "./user.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
  
export class SolicitacaoService {
  
    url:string = environment.URL_API;
  
    constructor(
      private http: HttpClient,
      private userService: UserService) {}
  
  
    registrar(solicitacao: Solicitacao){
      return this.http.post<Solicitacao>(`${this.url}/solicitacao/registrar`,  {idCategoria:solicitacao.categoria?.id , 
                                                                                    descricaoProblema : solicitacao.descricaoProblema , 
                                                                                    descricaoEquipamento : solicitacao.descricaoEquipamento});
    }
    
    efeturarOrcamento(solicitacao: Solicitacao){
      return this.http.post<Solicitacao>(`${this.url}/solicitacao/efetuarOrcamento/${solicitacao.id}`,  {id:solicitacao.id , 
                                                                                    valorOrcamento : solicitacao.orcamento?.valorOrcamento });
    }

    buscarTodas(): Observable<Solicitacao[]> {
        return this.http.get<Solicitacao[]>(`${this.url}/solicitacao`);
    }
    
    buscarPorFiltros(hoje: boolean, todas: boolean, dataAbertura: string): Observable<Solicitacao[]> {
        let params = new HttpParams();
        
        if (hoje !== undefined) {
          params = params.set('hoje', hoje.toString());
        }
        if (todas !== undefined) {
          params = params.set('todas', todas.toString());
        }
        if (dataAbertura) {
          params = params.set('dataAbertura', dataAbertura);
        }
    
        return this.http.get<Solicitacao[]>(`${this.url}/solicitacao`, { params });
    }

    findById(id:string) : Observable<Solicitacao>{
      return this.http.get<Solicitacao>(`${this.url}/solicitacao/` + id);
    }
}