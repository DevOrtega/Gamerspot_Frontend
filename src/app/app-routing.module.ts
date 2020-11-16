import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserloginGuard } from './guards/userlogin/userlogin.guard';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegisterComponent } from './pages/register/register.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';

const routes: Routes = [
  { path:'login', component: LoginComponent },
  { path:'register', component: RegisterComponent },
  //{ path:'', component: HomeComponent },
  { path:':username', component: ProfileComponent, canActivate:[UserloginGuard] },
  { path:'reset', component: ResetPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
