import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { CreateEventComponent } from '../pages/createevent/createevent.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { LoginComponent } from '../pages/login/login.component';
import { VolunteerTimePipe } from './volunteer-time.pipe';
import { VolunteerDurationPipe } from './volunteer-duration.pipe';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';

const appRoutes: Routes = [
  { path: 'create-event', component: CreateEventComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];


@NgModule({
  declarations: [
    AppComponent,
    CreateEventComponent,
    DashboardComponent,
    LoginComponent,
    VolunteerTimePipe,
    VolunteerDurationPipe
  ],
  imports: [
    BrowserModule,
    FormsModule, 
    HttpModule,
    JsonpModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
