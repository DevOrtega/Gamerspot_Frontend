import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileStatisticsComponent } from './components/profile-statistics/profile-statistics.component';
import { ProfileStatisticsApexComponent } from './components/profile-statistics-apex/profile-statistics-apex.component';
import { ProfileRankingComponent } from './components/profile-ranking/profile-ranking.component';
import { AuthGuard } from './guards/authguard/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileStatisticsNodataComponent } from './components/profile-statistics-nodata/profile-statistics-nodata/profile-statistics-nodata.component';
import { ProfileStatisticsMainComponent } from './components/profile-statistics-main/profile-statistics-main/profile-statistics-main.component';
import { ProfilePostsComponent } from './components/profile-posts/profile-posts/profile-posts.component';

const routes: Routes = [
  { path:'', component: LoginComponent },
  { path:'register', component: RegisterComponent },
  { path:'home', component: HomeComponent, canActivate: [AuthGuard] },
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
          { path: 'nodata', component: ProfileStatisticsNodataComponent }
        ]
      },
      { path: 'ranking', component: ProfileRankingComponent }
    ],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
