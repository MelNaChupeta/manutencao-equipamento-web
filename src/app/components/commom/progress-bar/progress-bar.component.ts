import { Component, Input } from '@angular/core';
import { ProgressService } from '../../../services/progress.service';
import { FontAwesomeModule, IconDefinition } from '@fortawesome/angular-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [
    FontAwesomeModule,
    CommonModule,
  ],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss'
})
export class ProgressBarComponent {
  //@Input() progress: number = 0;
  faLoading:IconDefinition = faCircleNotch;
  isLoading: boolean = false;
  constructor(private progressService: ProgressService) {}

  /*ngOnInit() {
    this.progressService.getProgress().subscribe(progress => {
      this.progress = progress;
    });
  }*/


  ngOnInit(): void {
    this.progressService.getProgressStatus().subscribe(status => {
      this.isLoading = status;
    });
  }
}
