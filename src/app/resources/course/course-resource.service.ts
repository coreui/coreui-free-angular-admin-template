import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/services/api/api.service';
import { Resource } from 'src/app/core/utils/resource/resource';
import { CourseInterface } from 'src/app/models/course/course';

@Injectable({
  providedIn: 'root'
})
export class CourseResourceService extends Resource<CourseInterface> {

  constructor(apiService: ApiService) {
    super('/courses', apiService);
  }
}
