import { CacheService } from './../../../core/services/cache/cache.service';
import { CourseResourceService } from './../../../resources/course/course-resource.service';

import { CourseInterface } from './../../../models/course/course';
import { AfterViewChecked, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { IconDirective } from '@coreui/icons-angular';
import {
  BorderDirective,
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  CardFooterComponent,
  CardGroupComponent,
  CardHeaderComponent,
  CardImgDirective,
  CardLinkDirective,
  CardSubtitleDirective,
  CardTextDirective,
  CardTitleDirective,
  ColComponent,
  GutterDirective,
  ListGroupDirective,
  ListGroupItemDirective,
  RowComponent,
  TabDirective,
  TabPanelComponent,
  TabsComponent,
  TabsContentComponent,
  TabsListComponent,
  TextColorDirective,
} from '@coreui/angular';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    RowComponent,
    ColComponent,
    TextColorDirective,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    CardTitleDirective,
    CardTextDirective,
    ButtonDirective,
    CardSubtitleDirective,
    CardLinkDirective,
    RouterLink,
    ListGroupDirective,
    ListGroupItemDirective,
    CardFooterComponent,
    BorderDirective,
    CardGroupComponent,
    GutterDirective,
    CardImgDirective,
    TabsComponent,
    TabsListComponent,
    IconDirective,
    TabDirective,
    TabsContentComponent,
    TabPanelComponent,
    CommonModule
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss',
})
export class IndexComponent implements OnInit, OnDestroy {
  private courseResourceService = inject(CourseResourceService);
  private cacheService = inject(CacheService);
  private router = inject(Router);

  courses: CourseInterface[] = [];

  ngOnInit(): void {
    this.courses = this.cacheService.get<CourseInterface[]>('courses');
    this.courseResourceService.query().subscribe({
      next: (r) => {
        this.courses = r.content.data;
      }
    })
  }

  ngOnDestroy(): void {
    this.cacheService.set('courses', this.courses);
  }

  open(course: CourseInterface) {
    this.cacheService.set('course', course, true);
    this.router.navigate(['/courses', course.id], {
      state: {
        title: '1'
      }
    });
  }
}
