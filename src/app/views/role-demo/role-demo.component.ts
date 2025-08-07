import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { CardComponent, CardHeaderComponent, CardBodyComponent } from '@coreui/angular';
import { AuthService, User } from '../../services/auth.service';
import { NavigationService } from '../../services/navigation.service';
import { INavData } from '@coreui/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-role-demo',
  templateUrl: './role-demo.component.html',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent
  ],
  providers: [AuthService, NavigationService]
})
export class RoleDemoComponent implements OnInit, OnDestroy {
  currentUser: User | null = null;
  selectedRole: string = '';
  currentNavItems: INavData[] = [];
  successMessage: string = '';
  private subscriptions = new Subscription();

  constructor(
    private authService: AuthService,
    private navigationService: NavigationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Check for logout message in query params
    this.route.queryParams.subscribe(params => {
      if (params['message']) {
        this.successMessage = params['message'];
        setTimeout(() => { this.successMessage = ''; }, 5000);
      }
    });

    // Check for logout message in router state
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state?.['message']) {
      this.successMessage = navigation.extras.state['message'];
      setTimeout(() => { this.successMessage = ''; }, 5000);
    }

    // Subscribe to current user changes
    this.subscriptions.add(
      this.authService.currentUser$.subscribe((user: User | null) => {
        this.currentUser = user;
        if (user) {
          this.selectedRole = localStorage.getItem('selectedRole') || user.roles?.[0] || '';
        }
      })
    );

    // Subscribe to navigation changes
    this.subscriptions.add(
      this.navigationService.currentNavItems$.subscribe((navItems: INavData[]) => {
        this.currentNavItems = navItems;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  getRoleDescription(role: string): string {
    switch (role) {
      case 'Admin':
        return 'Full access to all features including administration, user management, and system settings.';
      case 'User':
        return 'Standard access with limited features focused on viewing data and basic operations.';
      default:
        return 'Standard user access with basic permissions.';
    }
  }

  getNavItemsForRole(role: string): INavData[] {
    return this.navigationService.getNavItemsForRole(role);
  }
} 