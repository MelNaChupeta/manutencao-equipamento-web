import { Component } from '@angular/core';
import { ToastService } from '../../../services/toast.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent {
  constructor(public toastService: ToastService) {}

  icon:string = ''

  clearToast(): void {
    this.toastService.clearToast();
  }

}






// import { Component } from '@angular/core';
// import { ToastService } from './toast.service';

// @Component({
//   selector: 'app-toast',
//   templateUrl: './toast.component.html',
//   styleUrls: ['./toast.component.css'],
// })
// export class ToastComponent {
//   constructor(public toastService: ToastService) {}
// }
