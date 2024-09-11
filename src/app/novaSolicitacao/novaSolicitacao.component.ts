// TODO: ver pq ngIf e ngModel não funcionam

import { Component } from '@angular/core';

interface Solicitation {
  descricaoEquipamento: string;
  categoria: string;
  descricaoDefeito: string;
  estado: string;
  dataHora: Date;
}

@Component({
  selector: 'home',
  template: `
    <div class="main-content-container">
      <h1>Nova solicitação de manutenção</h1>
      <form (ngSubmit)="onSubmit()" class="flex flex-col gap-5 mt-7">
        <div class="flex flex-col gap-2">
          <label for="descricaoEquipamento">Descrição do equipamento:</label>
          <textarea
            class="input"
            id="descricaoEquipamento"
            name="descricaoEquipamento"
            required
          ></textarea>
        </div>

        <div class="flex flex-col gap-2">
          <label for="categoria">Categoria do equipamento:</label>
          <select class="input" id="categoria" name="categoria" required>
            <option value="" disabled selected hidden>Selecione</option>
            <option value="categoria1">Categoria 1</option>
            <option value="categoria2">Categoria 2</option>
          </select>
        </div>

        <div class="flex flex-col gap-2">
          <label for="descricaoDefeito">Descrição do defeito:</label>
          <textarea
            class="input"
            id="descricaoDefeito"
            name="descricaoDefeito"
            required
          ></textarea>
        </div>

        <button class="btn-primary mt-7" type="submit">Solicitar</button>
      </form>

      <!-- <div *ngIf="solicitacaoEnviada" class="mt-5"> -->
      <div class="mt-5">
        <h2>Solicitação Enviada!</h2>
        <p>
          <strong>Descrição do equipamento:</strong>
          {{ solicitacao.descricaoEquipamento }}
        </p>
        <p>
          <strong>Categoria do equipamento:</strong> {{ solicitacao.categoria }}
        </p>
        <p>
          <strong>Descrição do defeito:</strong>
          {{ solicitacao.descricaoDefeito }}
        </p>
        <p><strong>Estado:</strong> {{ solicitacao.estado }}</p>
        <p><strong>Data e Hora:</strong> {{ solicitacao.dataHora }}</p>
      </div>
    </div>
  `,
  standalone: true,
})
export class NovaSolicitacaoComponent {
  solicitacao: Solicitation = {
    descricaoEquipamento: '',
    categoria: '',
    descricaoDefeito: '',
    estado: 'ABERTA',
    dataHora: new Date(),
  };

  solicitacaoEnviada = false;

  onSubmit() {
    this.solicitacao.dataHora = new Date();
    this.solicitacaoEnviada = true;

    console.log('foi enviado:', this.solicitacao);
  }
}
