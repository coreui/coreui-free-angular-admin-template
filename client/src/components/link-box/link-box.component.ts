import { CommonModule } from '@angular/common';
import { Component, input, signal, effect, DestroyRef, inject, ChangeDetectionStrategy } from '@angular/core';
import { IconDirective } from '@coreui/icons-angular';
import { ButtonModule } from '@coreui/angular';
import { cilLink, cibInstagram, cibTwitch } from '@coreui/icons';

@Component({
    selector: 'app-link-box',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        IconDirective,
        ButtonModule
    ],
    templateUrl: './link-box.component.html',
    styleUrl: './link-box.component.scss'
})

export class LinkBoxComponent {
  private destroyRef = inject(DestroyRef);

  title = input<string>('');
  linkName = input<string>('');
  linkUrl = input<string>('');
  icon = input<string[]>(cilLink);
  color = input<string>('#000000'); // Default color

  isLargeScreen = signal(false);

  constructor() {
    this.checkScreenSize();
    
    // Use effect for proper cleanup
    effect(() => {
      const resizeHandler = () => {
        const screenWidth = window.innerWidth;
        this.isLargeScreen.set(screenWidth > 1000);
      };
      
      window.addEventListener('resize', resizeHandler);
      
      this.destroyRef.onDestroy(() => {
        window.removeEventListener('resize', resizeHandler);
      });
    });
  }

  private checkScreenSize() {
    this.isLargeScreen.set(window.innerWidth > 1000);
  }

  goTo() {
    console.log('Link clicked:', this.linkUrl());
    if (this.linkUrl()) {
        window.open(this.linkUrl(), '_blank');
    }
}
}

export const icons = {
    cilLink,
    cibInstagram,
    cibTwitch
  };