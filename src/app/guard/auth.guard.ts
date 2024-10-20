import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthenticationService, UserService } from '../services';
import { User } from '../models';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  user:User = {};
  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthenticationService
  ) {
    this.userService.returnUser().subscribe((user) =>{
      this.user = user as User;
    });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    if (this.authService.isAuthenticated()) {
      if(route.data["role"]) {
        if(route.data["role"] == this.user.role) {
          return new Promise(function (resolve, _reject) {
            setTimeout(resolve, 350, true);
          });
        }else{
          this.router.navigate(['/login']);
          return false;
        }
      }else{
        return new Promise(function (resolve, _reject) {
          setTimeout(resolve, 350, true);
        });
      }
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
