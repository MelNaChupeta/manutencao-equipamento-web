import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Solicitacao } from '../solicitacoes';

@Component({
  selector: 'app-modal-pagamento',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-pagamento.component.html',
  styleUrl: './modal-pagamento.component.scss',
})
export class ModalPagamentoComponent {
  @Input() isOpen: boolean = false;
  @Input() solicitacao?: Solicitacao;
  @Output() fecha = new EventEmitter<void>();
  @Output() paga = new EventEmitter<string>();

  confirmaPagamento() {
    this.paga.emit();
    this.fechaModalPagamento();
  }

  fechaModalPagamento() {
    this.isOpen = false;
    this.fecha.emit();
  }
}
