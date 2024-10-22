import { Component, ElementRef, OnInit } from '@angular/core';
import { FontAwesomeModule, IconDefinition } from '@fortawesome/angular-fontawesome';
import { faWrench } from '@fortawesome/free-solid-svg-icons';
import { ModalService } from '../../../../services/modal.service';
import { BaseModalComponent } from '../base-modal/base-modal.component';

@Component({
  selector: 'app-alert-modal',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './alert-modal.component.html',
  styleUrl: './alert-modal.component.scss'
})
export class AlertModalComponent  extends BaseModalComponent implements OnInit {
  faWrench:IconDefinition = faWrench;

  constructor(
    modalService: ModalService,
    element: ElementRef
  ) {
    super(modalService, element);
  }
  ngOnInit(): void {
    const that = this;
    setTimeout(function() {
     // that.onClose();
    },2000);
  }

  
}

