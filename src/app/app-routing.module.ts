import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileStatisticsComponent } from './components/profile-statistics/profile-statistics.component';
import { ProfileStatisticsApexComponent } from './components/profile-statistics-apex/profile-statistics-apex.component';
import { ProfileRankingComponent } from './components/profile-ranking/profile-ranking.component';
import { AuthGuard } from './guards/authguard/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { LolStatisticsComponent } from './components/lol-statistics/lol-statistics.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileStatisticsNodataComponent } from './components/profile-statistics-nodata/profile-statistics-nodata.component';
import { ProfileStatisticsMainComponent } from './components/profile-statistics-main/profile-statistics-main.component';
import { ProfilePostsComponent } from './components/profile-posts/profile-posts.component';
import { ProfileEditorComponent } from './components/profile-editor/profile-editor.component';
import { TftStatisticsComponent } from './components/tft-statistics/tft-statistics.component';

const routes: Routes = [
  { path:'', component: LoginComponent },
  { path:'register', component: RegisterComponent },
  { path:'home', component: HomeComponent },
  { path:':username',
    component: ProfileComponent,
    children: [
      { path: '', component: ProfilePostsComponent },
      { path: 'posts', component: ProfilePostsComponent },
      { path: 'statistics',
        component: ProfileStatisticsComponent,
        children: [
          { path: '', component: ProfileStatisticsMainComponent },
          { path: 'apex', component: ProfileStatisticsApexComponent },
          { path:'lol', component: LolStatisticsComponent },
          { path:'tft', component: TftStatisticsComponent },
          { path: 'nodata', component: ProfileStatisticsNodataComponent }
        ]
      },
     // { path: 'ranking', component: ProfileRankingComponent },
      { path: 'configuration', component: ProfileEditorComponent }
    ],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
