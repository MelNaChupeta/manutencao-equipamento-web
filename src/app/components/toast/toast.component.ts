import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
})
export class ToastComponent implements OnInit {
  toasts: Toast[] = [];
  icon: string = '';
  private iconMap: { [key: string]: string } = {
    success: 'fa-regular fa-circle-check',
    error: 'fa-regular fa-circle-xmark',
    info: 'fa-solid fa-info',
    warning: 'fa-solid fa-triangle-exclamation',
  };

  ngOnInit(): void {}

  showToast(
    message: string,
    type: 'success' | 'error' | 'info' | 'warning',
    duration = 3000
  ): void {
    const id = Date.now();

    this.icon = this.iconMap[type] || 'fa-solid fa-info';
    this.toasts.push({ id, message, type, duration });

    setTimeout(() => this.removeToast(id), duration);
  }

  removeToast(id: number): void {
    this.toasts = this.toasts.filter((toast) => toast.id !== id);
  }
}
