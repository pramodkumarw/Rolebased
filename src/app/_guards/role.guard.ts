import { Injectable } from "@angular/core";
import {CanActivate,  ActivatedRouteSnapshot,  RouterStateSnapshot,  Router} from "@angular/router";
import { UserService } from "../_services/user.service";
import { AuthenticationService } from '../_services/authentication.service';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private router: Router, private authService:AuthenticationService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (localStorage.getItem("userToken") != null) {
      let roles = next.data["roles"] as Array<string>;
      if (roles) {
        var match = this.authService.isUserinRoles(roles);
        if (match) return true;
        else {
          this.router.navigate(["/forbidden"]);
          return false;
        }
      } else return true;
    } else {
      this.router.navigate(["login"]);
    }
  }
}
