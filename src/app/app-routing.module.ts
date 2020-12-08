import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileStatisticsComponent } from './components/profile-statistics/profile-statistics.component';
import { ProfileStatisticsApexComponent } from './components/profile-statistics-apex/profile-statistics-apex.component';
import { ProfileRankingComponent } from './components/profile-ranking/profile-ranking.component';
import { AuthGuard } from './guards/authguard/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { ProfileStatisticsLolComponent } from './components/profile-statistics-lol/profile-statistics-lol.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileStatisticsNodataComponent } from './components/profile-statistics-nodata/profile-statistics-nodata.component';
import { ProfileStatisticsMainComponent } from './components/profile-statistics-main/profile-statistics-main.component';
import { ProfilePostsComponent } from './components/profile-posts/profile-posts.component';
import { ProfileEditorComponent } from './components/profile-editor/profile-editor.component';
import { ProfileStatisticsTftComponent } from './components/profile-statistics-tft/profile-statistics-tft.component';
import { AddPlayersComponent } from './components/add-players/add-players.component';
import { ShowTeamComponent } from './components/show-team/show-team.component';
import { PrettyJsonPipe } from './pretty-json.pipe';
import { ShowSponsorsComponent } from './components/show-sponsors/show-sponsors.component';
//import { AddPlayersComponent } from './components/add-players/add-players.component';

const routes: Routes = [
  { path:'', component: HomeComponent },
  { path:'login', component: LoginComponent },
  { path:'register', component: RegisterComponent },
  { path:':username', component: ProfileComponent,
    children: [
      { path: '', component: ProfilePostsComponent },
      { path: 'posts', component: ProfilePostsComponent },
      { path: 'statistics',
        component: ProfileStatisticsComponent,
        children: [
          { path: '', component: ProfileStatisticsMainComponent },
          { path: 'apex', component: ProfileStatisticsApexComponent },
          { path:'lol', component: ProfileStatisticsLolComponent },
          { path:'tft', component: ProfileStatisticsTftComponent },
          { path: 'nodata', component: ProfileStatisticsNodataComponent }
        ]
      },
     // { path: 'ranking', component: ProfileRankingComponent },
      { path: 'players', component: AddPlayersComponent },
      { path: 'team', component: ShowTeamComponent },
      { path: 'sponsors', component: ShowSponsorsComponent },
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
