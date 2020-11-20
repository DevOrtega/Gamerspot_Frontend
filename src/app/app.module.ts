import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
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
import { DatePipe } from '@angular/common';
import { PlayerstatisticsComponent } from './components/playerstatistics/playerstatistics.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './interceptors/jwt/jwt.interceptor';
import { ErrorInterceptor } from './interceptors/error/error.interceptor';
import { appInitializer } from './initializers/app.initializer';
import { AuthService } from './services/auth/auth.service';
import { TrackerggInterceptor } from './interceptors/trackergg/trackergg.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    ProfileDataComponent,
    ProfileFormComponent,
    ResetPasswordComponent,
    PlayerstatisticsComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    CookieService,
    DatePipe,
    { provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [AuthService] },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TrackerggInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
