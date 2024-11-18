import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  // constructor() { }
  message: string = ''; // Mensagem atual do toast
  type: string = ''; // Tipo do toast ('success', 'error', etc.)

  showToast(message: string, type: string = 'info'): void {
    this.message = message;
    this.type = type;

    // Remove o toast automaticamente após 5 segundos
    setTimeout(() => {
      this.clearToast();
    }, 5000);
  }

  clearToast(): void {
    this.message = '';
    this.type = '';
  }

}
