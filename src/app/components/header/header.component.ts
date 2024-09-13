import { Component, OnDestroy, Renderer2, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSignOut , faGear , faUser } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,FontAwesomeModule ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy{
  @ViewChild('menu') menu!: ElementRef;
  @ViewChild('menuButton') menuButton!: ElementRef;
  @ViewChild('navButton') navButton!: ElementRef;
  @ViewChild('nav') nav!: ElementRef;
  
  faSignOut = faSignOut;
  faGear = faGear;
  faUser = faUser;
 
  menuActive:boolean = false;
  navActive:boolean = false;
  
  constructor(private renderer: Renderer2) {}
  
  ngOnInit(): void {
     this.renderer.listen('body', 'click', (e) => {
      if(e.target!==this.menu.nativeElement && !this.menu.nativeElement.contains(e.target)
        && e.target!==this.nav.nativeElement && !this.nav.nativeElement.contains(e.target)
        && e.target!==this.navButton.nativeElement && !this.navButton.nativeElement.contains(e.target)
        &&e.target!==this.menuButton.nativeElement && !this.menuButton.nativeElement.contains(e.target)){
          this.menuActive=false;
          this.navActive=false;
      }
    });
  } 

  ngOnDestroy(): void {
    
  }

  toggleMenu () {
    this.menuActive = !this.menuActive;
  }
  toggleNav () {
    this.navActive = !this.navActive;
  }
}