import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './pages/profile/profile.component';
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
import { ProfileStatisticsLolComponent } from './components/profile-statistics-lol/profile-statistics-lol.component';
import { ProfileStatisticsNodataComponent } from './components/profile-statistics-nodata/profile-statistics-nodata.component';
import { ProfileStatisticsMainComponent } from './components/profile-statistics-main/profile-statistics-main.component';
import { ProfilePostsComponent } from './components/profile-posts/profile-posts.component';
import { ProfileEditorComponent } from './components/profile-editor/profile-editor.component';
import { PostCreateComponent } from './components/post-create/post-create.component';
import { PostGetComponent } from './components/post-get/post-get.component';
import { PrettyJsonPipe } from './pretty-json.pipe';
import { ProfileStatisticsTftComponent } from './components/profile-statistics-tft/profile-statistics-tft.component';
import { AddPlayersComponent } from './components/add-players/add-players.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    ResetPasswordComponent,
    NavbarComponent,
    ProfileStatisticsComponent,
    ProfileStatisticsApexComponent,
    ProfileRankingComponent,
    ProfileStatisticsNodataComponent,
    ProfileStatisticsMainComponent,
    ProfilePostsComponent,
    ProfileStatisticsLolComponent,
    ProfileEditorComponent,
    PostCreateComponent,
    PostGetComponent,
    PrettyJsonPipe,
    ProfileStatisticsTftComponent,
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
    DatePipe,
    { provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [AuthService] },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
