import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  message: string = '';
  type: string = '';
  icon: string = '';
  private iconMap: { [key: string]: string } = {
    success: 'fa-regular fa-circle-check',
    error: 'fa-regular fa-circle-xmark',
    info: 'fa-solid fa-info',
    warning: 'fa-solid fa-triangle-exclamation',
  };

  showToast(message: string, type: string = 'info', duration: number = 5000): void {
    this.message = message;
    this.type = type;
    this.icon = this.iconMap[type]

    setTimeout(() => {
      this.clearToast();
    }, duration);
  }

  clearToast(): void {
    this.message = '';
    this.type = '';
  }
}
