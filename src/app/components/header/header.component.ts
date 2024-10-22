import { Component, OnDestroy, Renderer2, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSignOut , faGear , faUser, IconDefinition , faComputer , faPerson ,faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import { User } from '../../models/user';
import { UserService } from '../../services';
import { Router } from '@angular/router';
import { UserRole } from '../../models/userRole';
import { ProgressBarComponent } from '../common/progress-bar/progress-bar.component';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, ProgressBarComponent ],
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
  faMoneyBill:IconDefinition = faMoneyBill;
 
  menuActive:boolean = false;
  navActive:boolean = false;
  logged:boolean = false;
  
  user: User = {};

  isDarkMode: boolean = false;
  nextTheme:string = 'Trocar tema';
  nextIcon:string = 'fa-sun';

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

    const theme = localStorage.getItem('theme');

    if (theme === 'dark') {
      this.isDarkMode = true;
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
      this.nextTheme = 'Modo claro';
      this.nextIcon = 'fa-sun';
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      this.nextTheme = 'Modo escuro';
      this.nextIcon = 'fa-moon';

    }
    
    if(!theme){
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      this.nextTheme = 'Modo claro';
      this.nextIcon = 'fa-sun';
    }

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
    this.router.navigate(["/cadastro"]);
  }

  signout(): void {
    this.userService.logout();
    this.router.navigate(["/login/"]);
  }
  
  goHome():void {
    if(this.userService.isLoggedIn()){
      if(this.user.role == UserRole.funcionario) {
        this.router.navigate(["/inicio/funcionarios"]);
      }else{
        this.router.navigate(["/inicio/clientes"]);
      }
    }else{
      this.router.navigate(["/login"]);
    }
  }

  switchTheme():void {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      localStorage.setItem('theme', 'dark');
      this.nextTheme = 'Modo claro';
      this.nextIcon = 'fa-sun';
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      localStorage.setItem('theme', 'light');
      this.nextTheme = 'Modo escuro';
      this.nextIcon = 'fa-moon';
    }

  }
}