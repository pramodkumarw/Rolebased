import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/_services/user.service";
import { Router } from "@angular/router";
import { HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { AuthenticationService } from "src/app/_services/authentication.service";
import { User } from 'src/app/_models/user';

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.css"]
})
export class SigninComponent implements OnInit {
  isError: boolean;
  errorMessage:string;
  constructor(private userService: UserService, private router: Router,private authService: AuthenticationService) {}

  ngOnInit() {}

  onSubmit(username, password) {
    this.authService.userAuthenticate(username, password).subscribe(
      (user:User) => {          
        console.log(user);
        this.router.navigate(["home"]);
      },
      (error) => {
        this.isError = true;
        this.errorMessage=error;
      }
    );
  }
}
