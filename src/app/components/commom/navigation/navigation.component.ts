import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { CurrentPathService } from '../../../services';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent implements OnInit {
  currentPath: string = '';

  constructor(
    private location: Location,
    private currentPathService: CurrentPathService
  ) { }

  ngOnInit(): void {
    this.currentPathService.getCurrentPath().subscribe(path => {
      this.currentPath = path;
    });
  }

  goBack(): void {
    this.location.back();
  }
}