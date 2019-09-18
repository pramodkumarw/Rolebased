import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { User } from "../_models/user";
import { BehaviorSubject, Observable } from "rxjs";
import { map,retry } from "rxjs/operators";

@Injectable()
export class AuthenticationService {
  rootUrl: string = "";
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private api: ApiService) {
    this.rootUrl = environment.rootUrl;
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  userAuthenticate(username, password) {
    let data = `username=${username}&password=${password}&grant_type=password`;
    var headers = new HttpHeaders({
      "Content-Type": environment.contentType.urlEncoded,
      "no-auth": "true"
    });

    return this.api.Post("token", data, headers).pipe(
      retry(1),
      map((res: any) => {
        if (res.access_token && res.user) {
          var user: User = JSON.parse(res.user);
          localStorage.setItem("userToken",res.access_token);
          localStorage.setItem("currentUser", JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
        return user;
      })
    );
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  isUserAuthenticated() {
    if (this.getToken() != null) {
      return true;
    }
    return false;
  }

  getToken() {
    return localStorage.getItem("userToken");
  }

  isUserinRoles(allowedRoles): boolean {
    var isMatch = false;
    var user: User = JSON.parse(localStorage.getItem("currentUser"));
    var userRoles: string[] = user.roles;
    allowedRoles.forEach(element => {
      if (userRoles.indexOf(element) > -1) {
        isMatch = true;
        return false;
      }
    });
    return isMatch;
  }

  saveUser(token: string, user: User) {
    localStorage.setItem("userToken", token);
    localStorage.setItem("currentUser", JSON.stringify(user));
  }

  deleteUser() {
    localStorage.removeItem("userToken");
    localStorage.removeItem("currentUser");
  }
}
