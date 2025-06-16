import { Component, signal, inject } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { DocsExampleComponent } from '@docs-components/public-api';
import {
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  CarouselCaptionComponent,
  CarouselComponent,
  CarouselControlComponent,
  CarouselIndicatorsComponent,
  CarouselInnerComponent,
  CarouselItemComponent,
  ColComponent,
  RowComponent
} from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';

export type Slide = { id: number, src: SafeUrl | string, title: string, subtitle: string };

@Component({
  selector: 'app-carousels',
  templateUrl: './carousels.component.html',
  styleUrls: ['./carousels.component.scss'],
  imports: [RowComponent, ColComponent, CardComponent, CardHeaderComponent, CardBodyComponent, DocsExampleComponent, CarouselComponent, CarouselInnerComponent, CarouselItemComponent, CarouselControlComponent, CarouselIndicatorsComponent, CarouselCaptionComponent, ButtonDirective, IconDirective]
  // providers: [{ provide: CarouselConfig, useClass: CarouselCustomConfig  }]
})
export class CarouselsComponent {
  private domSanitizer = inject(DomSanitizer);



  readonly imageSrc: string[] = ['assets/images/angular.jpg', 'assets/images/react.jpg', 'assets/images/vue.jpg', 'https://picsum.photos/id/1/800/400', 'https://picsum.photos/id/1026/800/400', 'https://picsum.photos/id/1031/800/400'];
  readonly slidesLight: string[] = ['data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_1607923e7e2%20text%20%7B%20fill%3A%23AAA%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_1607923e7e2%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23F5F5F5%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22285.9296875%22%20y%3D%22217.75625%22%3EFirst%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E', 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa20%20text%20%7B%20fill%3A%23BBB%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa20%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23EEE%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22247.3203125%22%20y%3D%22218.3%22%3ESecond%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E', 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa21%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa21%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23E5E5E5%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22277%22%20y%3D%22218.3%22%3EThird%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E'];
  readonly slides: Slide[][] = [];

  constructor() {
    const domSanitizer = this.domSanitizer;

    this.slides[0] = [{
      id: 0,
      src: domSanitizer.bypassSecurityTrustUrl(this.imageSrc[0]),
      title: 'First slide',
      subtitle: 'Nulla vitae elit libero, a pharetra augue mollis interdum.'
    }, {
      id: 1,
      src: domSanitizer.bypassSecurityTrustUrl(this.imageSrc[1]),
      title: 'Second slide',
      subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    }, {
      id: 2,
      src: domSanitizer.bypassSecurityTrustUrl(this.imageSrc[2]),
      title: 'Third slide',
      subtitle: 'Praesent commodo cursus magna, vel scelerisque nisl consectetur.'
    }];

    this.slides[1] = [{
      id: 0, src: this.imageSrc[3], title: 'First slide', subtitle: 'Nulla vitae elit libero, a pharetra augue mollis interdum.'
    }, {
      id: 1, src: this.imageSrc[4], title: 'Second slide', subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    }, {
      id: 2, src: this.imageSrc[5], title: 'Third slide', subtitle: 'Praesent commodo cursus magna, vel scelerisque nisl consectetur.'
    }];

    this.slides[2] = [{
      id: 0,
      src: domSanitizer.bypassSecurityTrustUrl(this.slidesLight[0]),
      title: 'First slide',
      subtitle: 'Nulla vitae elit libero, a pharetra augue mollis interdum.'
    }, {
      id: 1,
      src: domSanitizer.bypassSecurityTrustUrl(this.slidesLight[1]),
      title: 'Second slide',
      subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    }, {
      id: 2,
      src: domSanitizer.bypassSecurityTrustUrl(this.slidesLight[2]),
      title: 'Third slide',
      subtitle: 'Praesent commodo cursus magna, vel scelerisque nisl consectetur.'
    }];
  }

  onItemChange($event: any): void {
    // console.log('Carousel onItemChange', $event);
  }

  readonly interval = signal(5000);

  toggleInterval() {
    this.interval.update((value) => value ? 0 : 2500);
  }
}
