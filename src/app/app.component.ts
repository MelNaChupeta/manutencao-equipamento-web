import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { NavigationComponent } from './components/common/navigation/navigation.component';
import { UserService } from './services';
import { User } from './models';
import { CommonModule } from '@angular/common';
import { ToastComponent } from "./components/common/toast/toast.component";


@Component({
  selector: 'app-root',
  template: ` <nav>
      <a routerLink="/">Home</a>
      <a routerLink="/signup">Cadastro</a>
      <a routerLink="/login">Login</a>
    </nav>
    <router-outlet />`,
  standalone: true,
  imports: [RouterLink, RouterOutlet, HeaderComponent, NavigationComponent, CommonModule, ToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'manutencao-equipamento-web';
  user:User = {};
  constructor( 
    private userService: UserService
  ) {
    this.userService.returnUser().subscribe((user) =>{
      this.user = user as User;
    });
  }

  
}

