import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CacheService } from 'src/app/core/services/cache/cache.service';
import { CourseInterface } from 'src/app/models/course/course';
import { CourseResourceService } from 'src/app/resources/course/course-resource.service';

@Component({
  selector: 'app-show',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './show.component.html',
  styleUrl: './show.component.scss'
})
export class ShowComponent implements OnInit {
  private courseResourceService = inject(CourseResourceService);
  private activatedRoute = inject(ActivatedRoute);
  private cacheService = inject(CacheService);

  course?: CourseInterface;

  ngOnInit(): void {
    this.activatedRoute.snapshot.data['title'] = '1'
    this.course = this.cacheService.get<CourseInterface>('course');
    this.courseResourceService.get(this.activatedRoute.snapshot.params['id']).subscribe({
      next: c => {
        this.course = c;
      }
    })
  }
}
