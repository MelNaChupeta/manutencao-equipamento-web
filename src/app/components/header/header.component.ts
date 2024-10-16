import { Component, OnDestroy, Renderer2, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSignOut , faGear , faUser, IconDefinition , faComputer , faPerson } from '@fortawesome/free-solid-svg-icons';
import { User } from '../../models/user';
import { UserService } from '../../services';
import { Router } from '@angular/router';
import { UserRole } from '../../models/userRole';
import { ProgressBarComponent } from '../commom/progress-bar/progress-bar.component';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,FontAwesomeModule , ProgressBarComponent ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy{
  
  @ViewChild('menu') menu!: ElementRef;
  @ViewChild('menuButton') menuButton!: ElementRef;
  @ViewChild('navButton') navButton!: ElementRef;
  @ViewChild('nav') nav!: ElementRef;
  
  faSignOut:IconDefinition = faSignOut;
  faGear:IconDefinition = faGear;
  faUser:IconDefinition = faUser;
  faComputer:IconDefinition = faComputer;
  faPerson:IconDefinition = faPerson;
 
  menuActive:boolean = false;
  navActive:boolean = false;
  logged:boolean = false;
  
  user: User = {};

  constructor(private renderer: Renderer2, 
              private userService: UserService,
              private router: Router) {
  }
  
  ngOnInit(): void {
     this.renderer.listen('body', 'click', (e) => {
      if(e.target!==this.menu?.nativeElement && !this.menu?.nativeElement.contains(e.target)
        && e.target!==this.nav?.nativeElement && !this.nav?.nativeElement.contains(e.target)
        && e.target!==this.navButton?.nativeElement && !this.navButton?.nativeElement.contains(e.target)
        && e.target!==this.menuButton?.nativeElement && !this.menuButton?.nativeElement.contains(e.target)){
          this.menuActive=false;
          this.navActive=false;
      }
    });
    
    this.userService.returnUser().subscribe((user) =>{
      this.user = user as User;
    });
  } 

  ngOnDestroy(): void {
    
  }

  toggleMenu (): void {
    this.menuActive = !this.menuActive;
  }

  toggleNav (): void {
    this.navActive = !this.navActive;
  }

  login(): void {
    this.router.navigate(["/login/"]);
  }

  signin(): void {
    this.router.navigate(["/signup"]);
  }

  signout(): void {
    this.userService.logout();
    this.router.navigate(["/login/"]);
  }
  
  goHome():void {
    if(this.userService.isLoggedIn()){
      if(this.user.role == UserRole.funcionario) {
        this.router.navigate(["/home-staff"]);
      }else{
        this.router.navigate(["/home"]);
      }
    }else{
      this.router.navigate(["/login"]);
    }
  }
}