import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CookieService } from "ngx-cookie-service";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProfileDataComponent } from './components/profile-data/profile-data.component';
import { ProfileFormComponent } from './components/profile-form/profile-form.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import {DatePipe} from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    ProfileDataComponent,
    ProfileFormComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [CookieService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
