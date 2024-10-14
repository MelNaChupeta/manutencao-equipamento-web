import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Observable, fromEvent, zip } from 'rxjs';
import { Options } from '../../../models';
import { ModalService } from '../../../services/modal.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [ReactiveFormsModule,
    CommonModule ,],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent implements AfterViewInit {
  @ViewChild('modal') modal!: ElementRef<HTMLDivElement>;
  @ViewChild('overlay') overlay!: ElementRef<HTMLDivElement>;
  options!: Options | undefined;
  modalAnimationEnd!: Observable<Event>;
  modalLeaveAnimation!: string;
  overlayLeaveAnimation!: string;
  overlayAnimationEnd!: Observable<Event>;
  modalLeaveTiming!: number;
  overlayLeaveTiming!: number;

  constructor(
    private modalService: ModalService,
    private element: ElementRef
  ) {}

  @HostListener('document:keydown.escape')
  onEscape() {
    this.modalService.close();
  }

  onClose() {
    this.modalService.close();
  }

  ngAfterViewInit() {
    this.options = this.modalService.options;
    this.addOptions();
    this.addEnterAnimations();
  }

  addEnterAnimations() {
    this.modal.nativeElement.style.animation =
      this.options?.animations?.modal?.enter || '';
    this.overlay.nativeElement.style.animation =
      this.options?.animations?.overlay?.enter || '';
  }

  addOptions() {
    // Applying desired styles
    this.modal.nativeElement.style.minWidth =
      this.options?.size?.minWidth || 'auto';
    this.modal.nativeElement.style.width = this.options?.size?.width || 'auto';
    this.modal.nativeElement.style.maxWidth =
      this.options?.size?.maxWidth || 'auto';
    this.modal.nativeElement.style.minHeight =
      this.options?.size?.minHeight || 'auto';
    this.modal.nativeElement.style.height =
      this.options?.size?.height || 'auto';
    this.modal.nativeElement.style.maxHeight =
      this.options?.size?.maxHeight || 'auto';
  
    // Storing ending animation in variables
    this.modalLeaveAnimation = this.options?.animations?.modal?.leave || '';
    this.overlayLeaveAnimation = this.options?.animations?.overlay?.leave || '';
    // Adding an animationend event listener to know when animations ends     
    this.modalAnimationEnd = this.animationendEvent(this.modal.nativeElement);
    this.overlayAnimationEnd = this.animationendEvent(
      this.overlay.nativeElement
    );
    // Get to know how long animations are
    this.modalLeaveTiming = this.getAnimationTime(this.modalLeaveAnimation);
    this.overlayLeaveTiming = this.getAnimationTime(this.overlayLeaveAnimation);
  }

  animationendEvent(element: HTMLDivElement) {
    return fromEvent(element, 'animationend');
  }

  removeElementIfNoAnimation(element: HTMLDivElement, animation: string) {
    if (!animation) {
      element.remove();
    }
  }

  close() {
    this.modal.nativeElement.style.animation = this.modalLeaveAnimation;

    // Goal here is to clean up the DOM to not keep unnecessary <app-modal> element
    // No animations on both elements:
    if (
      !this.options?.animations?.modal?.leave &&
      !this.options?.animations?.overlay?.leave
    ) {
      this.modalService.options = undefined;
      this.element.nativeElement.remove();
      return;
    }

    // Remove element if not animated
    this.removeElementIfNoAnimation(
      this.modal.nativeElement,
      this.modalLeaveAnimation
    );
    
    
    zip(this.modalAnimationEnd).subscribe(() => {
        this.element.nativeElement.remove();
    });

    this.modalService.options = undefined;
  }

  getAnimationTime(animation: string) {
    // Example animation = 'fade-in 0.8s'    
    let animationTime = 0;
    const splittedAnimation = animation.split(' ');
    for (const expression of splittedAnimation) {
      const currentValue = +expression.replace(/s$/, '');
      if (!isNaN(currentValue)) {
        animationTime = currentValue;
        break;
      }
    }

    return animationTime;
  }
}