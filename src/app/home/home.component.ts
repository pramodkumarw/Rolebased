import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  userClaims;
  authService:AuthenticationService;

  constructor(private route:Router,private user:UserService,private auth:AuthenticationService) {
   this.authService=auth;
  }

  ngOnInit(){
    this.user.getUserClaims().subscribe((res:any)=>{
      this.userClaims=res;
    },(error:HttpErrorResponse)=>{
      console.log(error);
    });
  }

  logout(){  
    this.authService.deleteUser();
    this.route.navigate(['/login'])
  }

}
