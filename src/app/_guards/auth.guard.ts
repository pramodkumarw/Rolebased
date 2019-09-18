import { Injectable } from "@angular/core";
import {  CanActivate,  ActivatedRouteSnapshot,  RouterStateSnapshot,  Router} from "@angular/router";
import { UserService } from "../_services/user.service";
import { AuthenticationService } from '../_services/authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private userService: UserService,private authService:AuthenticationService) {}

  canActivate( next: ActivatedRouteSnapshot,  state: RouterStateSnapshot  ): boolean {
    if (this.authService.getToken() != null) {
      return true;
    } else {
      this.router.navigate(["login"]);
      return false;
    }
  }
}
