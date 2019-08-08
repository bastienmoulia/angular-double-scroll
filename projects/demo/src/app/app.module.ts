import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AngularDoubleScrollModule } from 'angular-double-scroll';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularDoubleScrollModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
