import { Injectable, Inject } from '@angular/core';
import { HttpClient,HttpResponse } from "@angular/common/http";
 import { Image } from '../models/Image';
 import { map,catchError,tap } from "rxjs/operators";
 import { Observable } from 'rxjs'; //Adım 3
@Injectable()
export class ImageService {
 
  constructor(private httpClient: HttpClient, @Inject("url") private url: string) { }
 
  GetAll() {
    return this.httpClient.get(this.url + "api/image/getall");
  }
  GetList(invitationCode: string) {
    var images = this.httpClient.get<Image[]>(this.url + "api/image/" + invitationCode );
    return images;
  }
  GetSingle(invitationCode: string) {
    var images = this.httpClient.get(this.url + "api/image/" + invitationCode )
    .pipe(map(Response => Response));
    return images;
  }
  PostAdd(personel: Image) {
    return this.httpClient.post(this.url + "api/image/postadd", personel);
  }
  PutUpdate(personel: Image) {
    return this.httpClient.put(this.url + "api/image/putupdate", personel);
  }
  Remove(id: number) {
    return this.httpClient.delete(this.url + "api/image/remove/" + id);
  }
}