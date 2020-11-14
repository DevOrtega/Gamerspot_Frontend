import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { UsersService } from 'src/app/services/users/users.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  fieldTextType: boolean;

  constructor(private _location: Location, private formBuilder: FormBuilder, private userService: UsersService) { }

  ngOnInit() {
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
    //await this.userService.getUserByUsername(this.loginForm.value.userName);
  }

  onReset() {
    this.submitted = false;
    this.loginForm.reset();
  }

}
