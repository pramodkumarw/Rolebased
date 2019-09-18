import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from "rxjs/operators";
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router:Router){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.headers.get('no-auth') == "true")
        return next.handle(req.clone());

    if (localStorage.getItem('userToken') != null) {
        const clonedreq = req.clone({
            headers: req.headers.set("Authorization", "Bearer " + localStorage.getItem('userToken'))
        });
        return next.handle(clonedreq);
    }
    else {
        this.router.navigateByUrl('/login');
    }
}


}
