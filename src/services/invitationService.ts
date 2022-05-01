import { Injectable, Inject } from '@angular/core';
import { HttpClient,HttpResponse } from "@angular/common/http";
 import { Invitation } from '../models/Invitation';
 import { map,catchError,tap } from "rxjs/operators";
 import { Observable } from 'rxjs'; //Adım 3

 
@Injectable()
export class InvitationService {
 
  constructor(private httpClient: HttpClient, @Inject("url") private url: string) { }
 
  GetAll() {
    return this.httpClient.get(this.url + "api/invitation/getall");
  }
  GetSingle(invitationCode: string) {
    return this.httpClient.get(this.url + "api/invitation/" + invitationCode );
  }
  Add(invitation: Invitation) {
    return this.httpClient.post(this.url + "api/invitation/", invitation);
  }
  Update(invitation: Invitation) {
    return this.httpClient.put(this.url + "api/invitation/", invitation);
  }
  Delete(invitationCode: string) {
    return this.httpClient.delete(this.url + "api/invitation/" + invitationCode); 
  }
}