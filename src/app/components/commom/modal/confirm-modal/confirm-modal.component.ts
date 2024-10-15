import { Component, ElementRef } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';
import { BaseModalComponent } from '../base-modal/base-modal.component';

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  imports: [],
  templateUrl: './confirm-modal.component.html',
  styleUrl: './confirm-modal.component.scss'
})
export class ConfirmModalComponent extends BaseModalComponent {
  constructor(
    modalService: ModalService,
    element: ElementRef
  ) {
    super(modalService, element);
  }

  
}

