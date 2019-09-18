import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { environment } from 'src/environments/environment';
import { Observable,throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable()
export class ApiService{

    constructor(private api:HttpClient){}

    Get(url:string,headers:HttpHeaders){
        return this.api.get(url,{headers:headers}).pipe(
            catchError(this.handleError)
        );      
    }

    Post(url:string,data:any,headers:HttpHeaders){
        var serviceUrl=environment.rootUrl.concat("/",url);
        return this.api.post(serviceUrl,data,{headers:headers}).pipe(
            catchError(this.handleError)
        )
    }



    handleError(error) :Observable<string>{
        let msg :string="";
        if( error.error instanceof ErrorEvent){
        msg="client side error"
        }
        else{
        msg="server side error";
        }
        return throwError(msg);
    }
        

  

}