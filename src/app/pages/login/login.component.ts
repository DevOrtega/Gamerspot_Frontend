import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { UsersService } from 'src/app/services/users/users.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ApexstatisticsService } from 'src/app/services/playerstatistics/apexstatistics.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public submitted = false;
  public fieldTextType: boolean;

  constructor(
    private _location: Location,
    private formBuilder: FormBuilder,
    private userService: UsersService,
    private router: Router,
    private cookieService: CookieService,
    private apexstatistics: ApexstatisticsService
  ) { }

  private cookie;
  ngOnInit() {
    const data = this.apexstatistics.getPlayerStatistics("twitch _ apryze");
    console.log("Entro por aqui");
    console.log("Y te muestro data?: " + data);

    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  backClicked() {
    this._location.back();
  }

  /*
  // convenience getter for easy access to form fields*/
  get form() {
    return this.loginForm.controls;
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.checkLoginData();
  }

  async checkLoginData() {
    let userData = {
      username: this.loginForm.value.userName,
      password: this.loginForm.value.password
    };
    let data = await this.userService.postToken(userData);
    this.cookieService.get('refresh_token');
    this.router.navigateByUrl(`${userData.username}`);
  }

  onReset() {
    this.submitted = false;
    this.loginForm.reset();
  }

  ngOnDestroy() {
    this.userService.setUserProfile(this.loginForm.value.userName);
  }

}
