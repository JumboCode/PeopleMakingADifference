import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, 
    HttpModule,
    JsonpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
