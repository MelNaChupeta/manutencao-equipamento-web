import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-modal-orcamento-aprovado',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-orcamento-aprovado.component.html',
  styleUrl: './modal-orcamento-aprovado.component.scss',
})
export class ModalOrcamentoAprovadoComponent {
  @Input() isOpen: boolean = false;
  @Input() message: string = '';

  close() {
    this.isOpen = false;
  }
}
