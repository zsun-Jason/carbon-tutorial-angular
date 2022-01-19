import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AddModule } from "@carbon/icons-angular"
import { UIShellModule} from 'carbon-components-angular';
import { HeaderComponent } from './header/header.component';

import {  NotificationModule,  UserAvatarModule,  AppSwitcherModule} from '@carbon/icons-angular';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
		FormsModule,
    AppRoutingModule,
    UIShellModule,
    AddModule,   
    NotificationModule,
    UserAvatarModule,
    AppSwitcherModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  
 }
