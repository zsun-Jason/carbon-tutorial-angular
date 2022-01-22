import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingPageComponent } from './landing-page/landing-page.component';
import { 
    BreadcrumbModule, 
    GridModule, 
    ButtonModule, 
    TabsModule, 
    ListModule} from 'carbon-components-angular';
    
import { HomeRoutingModule } from './home-routing.module';
import { InfoModule } from '../info/info.module';


@NgModule({
  declarations: [
    LandingPageComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    GridModule,
    ListModule,
    BreadcrumbModule,
    ButtonModule,
    TabsModule,
    InfoModule
  ]
})
export class HomeModule { }
