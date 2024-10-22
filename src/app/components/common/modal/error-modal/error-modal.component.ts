import { Component, ElementRef } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';
import { BaseModalComponent } from '../base-modal/base-modal.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {  IconDefinition ,  faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-error-modal',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './error-modal.component.html',
  styleUrl: './error-modal.component.scss'
})
export class ErrorModalComponent extends BaseModalComponent {
  faCircleExclamation:IconDefinition = faCircleExclamation;

  constructor(
    modalService: ModalService,
    element: ElementRef
  ) {
    super(modalService, element);
  }

  
}
