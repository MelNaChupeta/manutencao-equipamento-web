import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nova-solicitacao',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './nova-solicitacao.component.html',
  styleUrl: './nova-solicitacao.component.scss'
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
