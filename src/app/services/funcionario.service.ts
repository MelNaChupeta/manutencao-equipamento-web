import { Injectable } from '@angular/core';
import { Funcionario } from '../models/funcionario';
import { User } from '../models/user'
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { Observable } from 'rxjs';



//mocks:
import mockEfetuarManutencao from '../mocks/mockEfetuarManutencao.json';
import mockFinalizarSolicitacao from '../mocks/mockFinalizarSolicitacao.json';
import mockSolicitacoesAbertas from '../mocks/mockHomeStaffSolicitacoes.json';
import mockListaFuncionarios from '../mocks/mockListaFuncionarios.json';
import mockOrcamento from '../mocks/mockOrcamento.json';
import mockVerSolicitacoes from '../mocks/mockVerSolicitacoes.json';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class FuncionarioService {

  LS_CHAVE = "funcionarios";
  url:string = environment.URL_API;

  constructor(
    private router: Router,
    private http: HttpClient,
    private userService: UserService) {}

  private secretKey = new TextEncoder().encode('your-256-bit-secret');

  funcionario(funcionario: Funcionario){
    return this.http.post<Funcionario>(`${this.url+ 'auth'}`, {funcionario});
  }

  returnUser(): Observable<User>{
    return this.userService.returnUser();
}

  listarTodos(): Observable<Funcionario[]>{
    return this.http.get<Funcionario[]>(`${this.url}/funcionario`);

  }

  inserir(funcionario: Funcionario): Observable<Funcionario>{
    return this.http.post<Funcionario>(`${this.url}/funcionario/registrar` ,funcionario);
  }

  buscarPorId(id: number): Observable<Funcionario> {
    return this.http.get<Funcionario>(`${this.url}/funcionario/${id}`);
  }

  atualizar(funcionario: Funcionario): Observable<Funcionario>{
    return this.http.put<Funcionario>(`${this.url}/funcionario/alterar/${funcionario.id}` ,funcionario);
  }

  remover(id: number): Observable<any>{
    return this.http.delete<Funcionario>(`${this.url}/funcionario/deletar/${id}`);
  }

  listarSolicitacoesAbertas(): any[] {
    const solicitacoes = mockSolicitacoesAbertas;
    return solicitacoes ? solicitacoes : [];
  }

  listarTodasSolicitacoes(): any[] {
    const solicitacoes = mockVerSolicitacoes;
    return solicitacoes ? solicitacoes : [];
  }

  getManutencaoData(id: number) {
    const data = mockEfetuarManutencao;
    const manutencao = data.find((obj) => obj.id === id);
    return manutencao ? manutencao : {};
  }

  getFuncionariosList(): Funcionario[] {
    const data = mockListaFuncionarios;
    return data ? data : [];
  }

  getOrcamento(id: number) {
    const data = mockOrcamento;
    const orcamento = data.find((obj) => obj.id === id);
    return orcamento ? orcamento : {};
  }

  getSolicitacaoInfo(id: number) {
    const data = mockFinalizarSolicitacao;
    const solicitacao = data.find((obj) => obj.id === id);
    return solicitacao ? solicitacao : {};
  }
}