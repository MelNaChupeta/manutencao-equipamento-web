import { Injectable } from '@angular/core';
import { funcionario } from '../models/funcionario';
import { User } from '../models/user'

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  LS_CHAVE = "funcionarios";
  
  constructor() { }

  listarTodos(): funcionario[]{
    const funcionarios = localStorage[this.LS_CHAVE];

    return funcionarios? JSON.parse(funcionarios) : [];
  }

  inserir(funcionario: funcionario): void{
    const funcionarios = this.listarTodos();

    funcionario.id = new Date().getTime();

    funcionarios.push(funcionario);

    localStorage[this.LS_CHAVE] = JSON.stringify(funcionarios); 
  }

  buscarPorId(id: number): funcionario | undefined {
    const funcionarios = this.listarTodos();

    return funcionarios.find(funcionario => funcionario.id ===id);
  }

  atualizar(funcionario: funcionario): void{
    const funcionarios = this.listarTodos();

    funcionarios.forEach((obj, index, objs) => { //obj: o elemento corrente do laço
      if (funcionario.id === obj.id) {           //index: o índice do elemento corrente
        objs[index] = funcionario                //objs: o vetor usado para a chamada de forEach
      }
    });

    localStorage[this.LS_CHAVE] = JSON.stringify(funcionarios);
  }

  remover(id: number): void{
    let funcionarios = this.listarTodos();

    funcionarios = funcionarios.filter(funcionario => funcionario.id !== id);

    localStorage[this.LS_CHAVE] = JSON.stringify(funcionarios);
  }
}
