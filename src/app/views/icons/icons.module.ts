import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardModule, GridModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';

import { CoreUIIconsComponent } from './coreui-icons.component';
import { IconsRoutingModule } from './icons-routing.module';
import { DocsComponentsModule } from '@docs-components/docs-components.module';

@NgModule({
  imports: [
    IconsRoutingModule,
    CardModule,
    GridModule,
    IconModule,
    CommonModule,
    DocsComponentsModule
  ],
  declarations: [
    CoreUIIconsComponent
  ]
})
export class IconsModule {
}
