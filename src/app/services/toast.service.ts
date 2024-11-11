import { Injectable,ViewChild } from '@angular/core';
import { ToastComponent } from '../components/toast/toast.component';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  @ViewChild(ToastComponent) toasterComponent!: ToastComponent;

  register(toaster: ToastComponent) {
    this.toasterComponent = toaster;
  }

  show(message: string, type: 'success' | 'error' | 'info' | 'warning', duration?: number) {
    this.toasterComponent?.showToast(message, type, duration);
  }
}
