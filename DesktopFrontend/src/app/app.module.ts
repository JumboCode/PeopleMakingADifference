import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { CreateEventComponent } from '../pages/createevent.component';

import { AppComponent } from './app.component';

const appRoutes: Routes = [
  { path: 'create-event', component: CreateEventComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    CreateEventComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, 
    HttpModule,
    JsonpModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
