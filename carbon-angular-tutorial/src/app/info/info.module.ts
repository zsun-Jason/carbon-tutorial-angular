import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoCardComponent } from './info-card/info-card.component';
import { InfoSectionComponent } from './info-section/info-section.component';

import { PersonModule } from "@carbon/icons-angular/";
import { GlobeModule } from "@carbon/icons-angular";
import { ApplicationModule } from "@carbon/icons-angular";


import { GridModule } from 'carbon-components-angular';


@NgModule({
  declarations: [
    InfoCardComponent,
    InfoSectionComponent
  ],
  imports: [
    CommonModule,
    GridModule,    
    PersonModule,
    GlobeModule,
    ApplicationModule,
  ],
  exports: [InfoCardComponent, InfoSectionComponent]
})
export class InfoModule {
  
}
