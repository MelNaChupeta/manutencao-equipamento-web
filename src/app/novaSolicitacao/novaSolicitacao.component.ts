import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
            [(ngModel)]="solicitacao.equipmentDescription"
            required
          ></textarea>
        </div>

        <div class="flex flex-col gap-2">
          <label for="categoria">Categoria do equipamento:</label>
          <select
            class="input"
            id="categoria"
            name="categoria"
            [(ngModel)]="solicitacao.category"
            required
          >
            <option
              *ngFor="let categoria of categorias"
              [value]="categoria.value"
            >
              {{ categoria.label }}
            </option>
          </select>
        </div>

        <div class="flex flex-col gap-2">
          <label for="descricaoDefeito">Descrição do defeito:</label>
          <textarea
            class="input"
            id="descricaoDefeito"
            name="descricaoDefeito"
            [(ngModel)]="solicitacao.defectDescription"
            required
          ></textarea>
        </div>

        <button class="btn-primary mt-7" type="submit">Solicitar</button>
      </form>

      <div *ngIf="solicitacaoEnviada" class="mt-5">
        <h2>Solicitação Enviada!</h2>
        <p>
          <strong>Descrição do equipamento:</strong>
          {{ solicitacaoSend.equipmentDescription }}
        </p>
        <p>
          <strong>Categoria do equipamento:</strong> {{ solicitacaoSend.category }}
        </p>
        <p>
          <strong>Descrição do defeito:</strong>
          {{ solicitacaoSend.defectDescription }}
        </p>
        <p><strong>Estado:</strong> {{ solicitacaoSend.status }}</p>
        <p><strong>Data e Hora:</strong> {{ solicitacaoSend.datetime | date:'dd/MM/yyyy HH:mm' }}</p>
        </div>
    </div>
  `,
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class NovaSolicitacaoComponent {
  solicitacao = {
    equipmentDescription: '',
    category: 'notebook',
    defectDescription: '',
    status: 'ABERTA',
    datetime: new Date(),
  };

  solicitacaoSend = {
    equipmentDescription: '',
    category: 'notebook',
    defectDescription: '',
    status: 'ABERTA',
    datetime: new Date(),
  };

  categorias: { value: string; label: string }[] = [
    { value: 'notebook', label: 'Notebook' },
    { value: 'desktop', label: 'Desktop' },
    { value: 'impressora', label: 'Impressora' },
    { value: 'mouse', label: 'Mouse' },
    { value: 'teclado', label: 'Teclado' },
    { value: 'microfone', label: 'Microfone' },
  ];

  solicitacaoEnviada = false;

  onSubmit() {
    this.solicitacao.datetime = new Date();
    
    this.solicitacaoSend.category = this.solicitacao.category
    this.solicitacaoSend.equipmentDescription = this.solicitacao.equipmentDescription
    this.solicitacaoSend.defectDescription = this.solicitacao.defectDescription
    this.solicitacaoSend.status = this.solicitacao.status
    this.solicitacaoSend.datetime = this.solicitacao.datetime
    
    this.solicitacaoEnviada = true;

    console.log('enviado isso:', this.solicitacao);

    this.solicitacao = {
      equipmentDescription: '',
      category: 'notebook',
      defectDescription: '',
      status: 'ABERTA',
      datetime: new Date(),
    };
  



  }
}
