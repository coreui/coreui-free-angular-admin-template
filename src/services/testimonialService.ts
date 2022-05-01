import { Injectable, Inject } from '@angular/core';
import { HttpClient,HttpResponse } from "@angular/common/http";
 import { Testimonial } from '../models/Testimonial';

 
@Injectable()
export class TestimonialService {
 
  constructor(private httpClient: HttpClient, @Inject("url") private url: string) { }
 
  GetAll(invitationCode: string) {
    return this.httpClient.get<Testimonial[]>(this.url + "api/testimonial/" + invitationCode );
  }
  PostAdd(data: Testimonial) {
    return this.httpClient.post(this.url + "api/testimonial/postadd", data);
  }
  PutUpdate(data: Testimonial) {
    return this.httpClient.put(this.url + "api/testimonial/putupdate", data);
  }
  Remove(id: number) {
    return this.httpClient.delete(this.url + "api/testimonial/remove/" + id);
  }
}