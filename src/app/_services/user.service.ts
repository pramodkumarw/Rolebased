import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { environment } from 'src/environments/environment';
import {  HttpHeaders } from '@angular/common/http';


@Injectable()
export class UserService {

  rootUrl;
  constructor(private api: ApiService) {
    this.rootUrl = environment.rootUrl;
  }

  getUserClaims() {
    var url = `${this.rootUrl}/api/values`;
    return this.api.Get(url, null);
  }

  getAllRoles() {
    var reqHeader = new HttpHeaders({ "no-auth": "true" });
    return this.api.Get(this.rootUrl + "/api/GetAllRoles", reqHeader);
  }
}