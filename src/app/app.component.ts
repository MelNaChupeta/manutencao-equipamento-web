import { Component, ViewChild, AfterViewInit} from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { ToastComponent } from './components/toast/toast.component';
import { ToastService } from './services/toast.service';
import { NavigationComponent } from './components/common/navigation/navigation.component';
import { UserService } from './services';
import { User } from './models';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  template: ` <nav>
      <a routerLink="/">Home</a>
      <a routerLink="/signup">Cadastro</a>
      <a routerLink="/login">Login</a>
    </nav>
    <router-outlet />`,
  standalone: true,
  imports: [RouterLink, RouterOutlet , HeaderComponent , NavigationComponent ,CommonModule, ToastComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit {

  @ViewChild(ToastComponent) toasterComponent!: ToastComponent;

  title = 'manutencao-equipamento-web';

  user:User = {};

  constructor( 
    private userService: UserService,
    private toastService: ToastService
  ) {
    this.userService.returnUser().subscribe((user) =>{
      this.user = user as User;
    });
  }

  ngAfterViewInit(): void {
    this.toastService.register(this.toasterComponent);
  }
}

