import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal-orcamento-rejeitado',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './modal-orcamento-rejeitado.component.html',
  styleUrl: './modal-orcamento-rejeitado.component.scss',
})
export class ModalOrcamentoRejeitadoComponent {
  @Input() isOpen: boolean = false;
  @Output() fecha = new EventEmitter<void>();
  @Output() rejeita = new EventEmitter<string>();

  justificativaRejeicao: string = '';

  confirmaRejeicao() {
    this.rejeita.emit(this.justificativaRejeicao);
    this.fechaModalRejeicao();
  }

  fechaModalRejeicao() {
    this.isOpen = false;
    this.justificativaRejeicao = "";
    this.fecha.emit();
  }
}
