import { Directive, Input, TemplateRef, ViewContainerRef, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ACLService } from '../services/acl.service';

@Directive({
  selector: '[appAcl], [appAclFeature], [appAclResource], [appAclRoute]',
  standalone: true
})
export class ACLDirective implements OnInit, OnDestroy {
  @Input() appAcl: string | string[] = '';
  @Input() appAclResource: string = '';
  @Input() appAclAction: string = '';
  @Input() appAclFeature: string = '';
  @Input() appAclRoute: string = '';
  @Input() appAclOperator: 'AND' | 'OR' = 'OR';

  private subscription: Subscription = new Subscription();
  private hasPermission: boolean = false;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private aclService: ACLService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.aclService.currentRole$.subscribe(() => {
        this.checkPermission();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private checkPermission(): void {
    let hasPermission = false;

    // Check role-based permission
    if (this.appAcl) {
      if (Array.isArray(this.appAcl)) {
        if (this.appAclOperator === 'AND') {
          hasPermission = this.appAcl.every(role => 
            this.aclService.getCurrentRole() === role
          );
        } else {
          hasPermission = this.appAcl.some(role => 
            this.aclService.getCurrentRole() === role
          );
        }
      } else {
        hasPermission = this.aclService.getCurrentRole() === this.appAcl;
      }
    }

    // Check resource-based permission
    if (this.appAclResource && this.appAclAction) {
      hasPermission = this.aclService.hasPermission(this.appAclResource, this.appAclAction);
    }

    // Check feature-based permission
    if (this.appAclFeature) {
      hasPermission = this.aclService.canUseFeature(this.appAclFeature);
    }

    // Check route-based permission
    if (this.appAclRoute) {
      hasPermission = this.aclService.canAccessRoute(this.appAclRoute);
    }

    // Update view
    if (hasPermission !== this.hasPermission) {
      this.hasPermission = hasPermission;
      this.updateView();
    }
  }

  private updateView(): void {
    if (this.hasPermission) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
