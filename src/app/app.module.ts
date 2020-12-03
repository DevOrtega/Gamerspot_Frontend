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
import { ProfileStatisticsApexComponent } from './components/profile-statistics-apex/profile-statistics-apex.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './interceptors/jwt/jwt.interceptor';
import { ErrorInterceptor } from './interceptors/error/error.interceptor';
import { appInitializer } from './initializers/app.initializer';
import { AuthService } from './services/auth/auth.service';
import { ProfileStatisticsComponent } from './components/profile-statistics/profile-statistics.component';
import { ProfileRankingComponent } from './components/profile-ranking/profile-ranking.component';
import { LolStatisticsComponent } from './components/lol-statistics/lol-statistics.component';
import { ProfileStatisticsNodataComponent } from './components/profile-statistics-nodata/profile-statistics-nodata.component';
import { ProfileStatisticsMainComponent } from './components/profile-statistics-main/profile-statistics-main.component';
import { ProfilePostsComponent } from './components/profile-posts/profile-posts.component';
import { ProfileEditorComponent } from './components/profile-editor/profile-editor.component';
import { FeedsPostComponent } from './components/feed-post/feed-post.component';
import { FeedsGetComponent } from './components/feed-get/feed-get.component';
import { PrettyJsonPipe } from './pretty-json.pipe';
import { TftStatisticsComponent } from './components/tft-statistics/tft-statistics.component';
import { AddPlayersComponent } from './components/add-players/add-players.component';


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
    NavbarComponent,
    ProfileStatisticsComponent,
    ProfileStatisticsApexComponent,
    ProfileRankingComponent,
    ProfileStatisticsNodataComponent,
    ProfileStatisticsMainComponent,
    ProfilePostsComponent,
    LolStatisticsComponent,
    ProfileEditorComponent,
    FeedsPostComponent,
    FeedsGetComponent,
    PrettyJsonPipe,
    TftStatisticsComponent,
    AddPlayersComponent
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
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
