import { Injectable } from '@angular/core';
import { funcionario } from '../models/funcionario';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';

// import { Solicitacao } from '../../models/solicitacao';
// import { environment } from '../../../environments/environment';

//mocks:
import mockEfetuarManutencao from '../mocks/mockEfetuarManutencao.json';
import mockFinalizarSolicitacao from '../mocks/mockFinalizarSolicitacao.json';
import mockSolicitacoesAbertas from '../mocks/mockHomeStaffSolicitacoes.json';
import mockListaFuncionarios from '../mocks/mockListaFuncionarios.json';
import mockOrcamento from '../mocks/mockOrcamento.json';
import mockVerSolicitacoes from '../mocks/mockVerSolicitacoes.json';

@Injectable({
  providedIn: 'root',
})
export class FuncionarioService {
  LS_CHAVE = 'funcionarios';

  constructor(
    private router: Router,
    private http: HttpClient,
    private userService: UserService
  ) {}

  private secretKey = new TextEncoder().encode('your-256-bit-secret');
  url: string = '';

  funcionario(funcionario: funcionario) {
    return this.http.post<funcionario>(`${this.url + 'auth'}`, { funcionario });
  }

  listarTodos(): funcionario[] {
    const funcionarios = localStorage[this.LS_CHAVE];

    return funcionarios ? JSON.parse(funcionarios) : [];
  }

  inserir(funcionario: funcionario): void {
    const funcionarios = this.listarTodos();

    funcionario.id = new Date().getTime();

    funcionarios.push(funcionario);

    localStorage[this.LS_CHAVE] = JSON.stringify(funcionarios);
  }

  buscarPorId(id: number): funcionario | undefined {
    const funcionarios = this.listarTodos();

    return funcionarios.find((funcionario) => funcionario.id === id);
  }

  atualizar(funcionario: funcionario): void {
    const funcionarios = this.listarTodos();

    funcionarios.forEach((obj, index, objs) => {
      //obj: o elemento corrente do laço
      if (funcionario.id === obj.id) {
        //index: o índice do elemento corrente
        objs[index] = funcionario; //objs: o vetor usado para a chamada de forEach
      }
    });

    localStorage[this.LS_CHAVE] = JSON.stringify(funcionarios);
  }

  remover(id: number): void {
    let funcionarios = this.listarTodos();

    funcionarios = funcionarios.filter((funcionario) => funcionario.id !== id);

    localStorage[this.LS_CHAVE] = JSON.stringify(funcionarios);
  }

  listarSolicitacoesAbertas(): any[] {
    // const solicitacoes = localStorage[this.LS_CHAVE];
    const solicitacoes = mockSolicitacoesAbertas;
    // return solicitacoes? JSON.parse(solicitacoes) : [];
    return solicitacoes ? solicitacoes : [];
  }

  getManutencaoData(id: number) {
    const data = mockEfetuarManutencao;
    const manutencao = data.find((obj) => obj.id === id);
    return manutencao ? manutencao : {};
  }

  getFuncionariosList(): funcionario[] {
    const data = mockListaFuncionarios
    return data?data:[] 
  }

  getOrcamento(id: number) {
    const data = mockOrcamento;
    const orcamento = data.find((obj) => obj.id === id);
    return orcamento ? orcamento : {};

  }
}
