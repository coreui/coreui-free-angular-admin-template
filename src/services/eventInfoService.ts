import { Injectable, Inject } from '@angular/core';
import { HttpClient,HttpResponse } from "@angular/common/http";
 import { EventInfo } from '../models/EventInfo';

 
@Injectable()
export class EventInfoService {
 
  constructor(private httpClient: HttpClient, @Inject("url") private url: string) { }
 
  GetAll(invitationCode: string) {
    return this.httpClient.get<EventInfo[]>(this.url + "api/eventInfo/"+ invitationCode );
  }
  PostAdd(eventInfo: EventInfo) {
    return this.httpClient.post(this.url + "api/eventInfo/postadd", eventInfo);
  }
  PutUpdate(eventInfo: EventInfo) {
    return this.httpClient.put(this.url + "api/eventInfo/putupdate", eventInfo);
  }
  Remove(id: number) {
    return this.httpClient.delete(this.url + "api/eventInfo/remove/" + id);
  }
}