import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { EstadoSolicitacao, Funcionario, Solicitacao } from "../models";
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
    
    efeturarManutencao(solicitacao: Solicitacao){
      return this.http.post<Solicitacao>(`${this.url}/solicitacao/efetuarManutencao/${solicitacao.id}`,  {id:solicitacao.id , 
                                                                                                          descricaoManutencao : solicitacao.descricaoManutencao,
                                                                                                          orientacaoCliente: solicitacao.orientacaoCliente });
    }
    
    redirecionar(solicitacao: Solicitacao){
      return this.http.post<Solicitacao>(`${this.url}/solicitacao/redirecionar/${solicitacao.id}`,  {idFuncionario:solicitacao.funcionario?.id });
    }
    
    
    aprovar(id:Number){
      return this.http.post<Solicitacao>(`${this.url}/solicitacao/aprovar/${id}`,{});
    }
    
    rejeitar(solicitacao: Solicitacao){
      return this.http.post<Solicitacao>(`${this.url}/solicitacao/rejeitar/${solicitacao.id}`,{justificativaRejeicao:solicitacao.justificativaRejeicao});
    }

    pagar(id:Number){
      return this.http.post<Solicitacao>(`${this.url}/solicitacao/pagar/${id}`,{});
    }
    
    resgatar(id:Number){
      return this.http.post<Solicitacao>(`${this.url}/solicitacao/resgatar/${id}`,{});
    }
    
    finalizar(id:Number){
      return this.http.post<Solicitacao>(`${this.url}/solicitacao/finalizar/${id}`,{});
    }

    buscarTodas(): Observable<Solicitacao[]> {
        return this.http.get<Solicitacao[]>(`${this.url}/solicitacao`);
    }
    
    buscarPorFiltros(filtros : {hoje?: boolean, 
                                todas?: boolean, 
                                dataAberturaInicial?: string, 
                                dataAberturaFinal?: string , 
                                estadoAtual? : EstadoSolicitacao}): Observable<Solicitacao[]> {
        let params = new HttpParams();
        
        if (filtros.hoje !== undefined) 
            params = params.set('hoje', filtros.hoje.toString());
        
        if (filtros.todas !== undefined) 
            params = params.set('todas', filtros.todas.toString());

        if (filtros.dataAberturaInicial) 
            params = params.set('dataAberturaInicial', filtros.dataAberturaInicial);

        if (filtros.dataAberturaFinal) 
            params = params.set('dataAberturaFinal', filtros.dataAberturaFinal);
        
        if (filtros.estadoAtual) 
           params = params.set('estadoAtual', filtros.estadoAtual);
    
        return this.http.get<Solicitacao[]>(`${this.url}/solicitacao`, { params });
    }

    findById(id:number) : Observable<Solicitacao>{
      return this.http.get<Solicitacao>(`${this.url}/solicitacao/` + id);
    }
}