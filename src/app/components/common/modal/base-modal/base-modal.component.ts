import { ElementRef, EventEmitter, HostListener, Output, AfterViewInit, ViewChild, Component } from '@angular/core';
import { fromEvent, Observable, zip } from 'rxjs';
import { Options } from '../../../../models';
import { ModalService } from '../../../../services/modal.service';

@Component({
  template: ''
})
export abstract class BaseModalComponent implements AfterViewInit {
  @Output() closeModal = new EventEmitter<void>();
  @Output() confirmModal = new EventEmitter<void>();
  
  options!: Options | undefined;
  modalAnimationEnd!: Observable<Event>;
  modalLeaveAnimation!: string;
  overlayLeaveAnimation!: string;
  overlayAnimationEnd!: Observable<Event>;
  modalLeaveTiming!: number;
  overlayLeaveTiming!: number;
  
  constructor(
    protected modalService: ModalService,
    protected element: ElementRef
  ) {}
  
  @HostListener('document:keydown.escape')
  onEscape() {
    this.modalService.close();
  }
  
  onConfirm() {
    this.confirmModal.emit();
    this.modalService.close();
  }
  
  onClose() {
    this.closeModal.emit();
    this.modalService.close();
  }
  
  ngAfterViewInit() {
    this.options = this.modalService.options;
    this.addOptions();
    this.addEnterAnimations();
  }
  
  addEnterAnimations() {
    this.element.nativeElement.style.animation =
    this.options?.animations?.modal?.enter || '';
  }

  addOptions() {
    this.element.nativeElement.style.minWidth =
    this.options?.size?.minWidth || 'auto';
    this.element.nativeElement.style.width = this.options?.size?.width || 'auto';
    this.element.nativeElement.style.maxWidth =
    this.options?.size?.maxWidth || 'auto';
    this.element.nativeElement.style.minHeight =
      this.options?.size?.minHeight || 'auto';
      this.element.nativeElement.style.height =
      this.options?.size?.height || 'auto';
      this.element.nativeElement.style.maxHeight =
      this.options?.size?.maxHeight || 'auto';
      
    this.modalLeaveAnimation = this.options?.animations?.modal?.leave || '';
    this.overlayLeaveAnimation = this.options?.animations?.overlay?.leave || '';
    this.modalAnimationEnd = this.animationendEvent(this.element.nativeElement);

   
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
    this.element.nativeElement.style.animation = this.modalLeaveAnimation;
    
    if (
      !this.options?.animations?.modal?.leave &&
      !this.options?.animations?.overlay?.leave
    ) {
      this.modalService.options = undefined;
      this.element.nativeElement.remove();
      return;
    }

    this.removeElementIfNoAnimation(
      this.element.nativeElement,
      this.modalLeaveAnimation
    );
    
  
    zip(this.modalAnimationEnd).subscribe(() => {
        this.element.nativeElement.remove();
    });

    this.modalService.options = undefined;
  }

  get title() {
    return this.modalService.options?.title;
  }
  get body() {
    return this.modalService.options?.body;
  }

  getAnimationTime(animation: string) {
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
