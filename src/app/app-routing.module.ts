import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/authguard/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegisterComponent } from './pages/register/register.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';

const routes: Routes = [
  { path:'', component: LoginComponent },
  { path:'register', component: RegisterComponent },
  { path:'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path:':username', component: ProfileComponent, canActivate: [AuthGuard] },
  { path:'reset', component: ResetPasswordComponent},
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
