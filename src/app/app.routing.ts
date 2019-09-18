import { NgModule} from "@angular/core"
import { Routes , RouterModule  } from "@angular/router";
import { FormsModule, FormGroup,ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from "./home/home.component";
import { SignupComponent } from './user/signup/signup.component';
import { UserComponent } from './user/user.component';
import { SigninComponent } from './user/signin/signin.component';
import { UserService } from './_services/user.service';
import { AuthGuard } from './_guards/auth.guard';
import { AdminComponent } from './admin/admin.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { RoleGuard } from './_guards/role.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './_guards/auth.interceptor';
import { ApiService } from './_services/api.service';
import { AuthenticationService } from './_services/authentication.service';


let routes: Routes = [
    { path: "", redirectTo: "home", pathMatch: 'full' }, 
    { 
      path: "login",component:UserComponent,
      children : [
                     { path : '' , component:SigninComponent},
                     { path : 'signup' , component:SignupComponent}
                 ]
    },
    { path: "home", component: HomeComponent  ,canActivate:[AuthGuard]  },
    { path :"admin" ,component :AdminComponent ,canActivate:[AuthGuard,RoleGuard],data:{roles:['admin']}},
    { path :"forbidden" ,component :ForbiddenComponent }
  ];

@NgModule({
    declarations:[HomeComponent,UserComponent,SignupComponent,SigninComponent,AdminComponent,ForbiddenComponent
    ],
    imports:[
        RouterModule.forRoot(routes),FormsModule,BrowserModule,ReactiveFormsModule
    ],
    providers:[
      AuthenticationService,ApiService,UserService,AuthGuard,RoleGuard,
      {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor , multi:true}
    ],
    exports:[RouterModule,FormsModule,BrowserModule]
})
export class RoutingModule{
}





