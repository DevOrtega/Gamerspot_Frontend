import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';

// import custom validator to validate that password and confirm password fields match
import { PasswordMatch } from '../../validators/password.validator';
import { UsersService } from 'src/app/services/users/users.service';
import { User } from 'src/app/interfaces/user';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;
  public submitted = false;
  public fieldTextType: boolean;
  public repeatFieldTextType: boolean;
  public roles: string[]  = ['User', 'Team', 'Sponsor'];
  public countries: string[] = ['Spain', 'EEUU'];

  constructor(private formBuilder: FormBuilder, private _location: Location, private userService: UsersService, private router: Router) { }

  onChangeRole(data) {
    this.registerForm['controls'].role.setValue(data);
  }

  onChangeCountry(data) {
    this.registerForm['controls'].country.setValue(data);
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      name: ['', Validators.required],
      role: ['', Validators.required],
      country: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: PasswordMatch('password', 'confirmPassword')
    });
  }

  // convenience getter for easy access to form fields
  get form() {
    return this.registerForm.controls;
  }

  backClicked() {
    this._location.back();
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  toggleRepeatFieldTextType() {
    this.repeatFieldTextType = !this.repeatFieldTextType;
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.saveUser();
  }

  async saveUser() {
    let newUser : User = {
      username: this.registerForm.value.username,
      name: this.registerForm.value.name,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      role: this.registerForm.value.role,
      country: this.registerForm.value.country
    }
    //await this.userService.registerUser(newUser);
    this.router.navigateByUrl('home');
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

}
