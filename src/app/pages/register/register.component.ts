import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordMatch } from '../../validators/password.validator';
import { UsersService } from 'src/app/services/users/users.service';
import { User } from 'src/app/interfaces/user';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { first, concatMap } from 'rxjs/operators';
import { CountriesService } from 'src/app/services/countries/countries.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm: FormGroup;
  submitted = false;
  fieldTextType: boolean;
  repeatFieldTextType: boolean;
  roles: string[]  = ['Gamer', 'Team', 'Sponsor'];
  countries: string[];

  loading = false;
  error = '';

  private getCountriesSubscription: Subscription;
  private registerUserSubscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private userService: UsersService,
    private countryService: CountriesService
  ) {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  onChangeRole(data) {
    this.registerForm['controls'].role.setValue(data);
  }

  onChangeCountry(data) {
    this.registerForm['controls'].country.setValue(data);
  }

  ngOnInit() {
    this.loading = true;
    this.getCountriesSubscription = this.countryService.getCountries()
    .subscribe({
      next: countries => {
        const countriesObj : any = Object.values({ ...countries });
        this.countries = countriesObj.map((country: { name: any; }) => country.name);
      },
      error: error => {
        this.error = error;
        this.loading = false;
      }
    })

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

  get form() {
    return this.registerForm.controls;
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

  public saveUser(): void {
    let newUser = {...this.registerForm.value};

    delete newUser.confirmPassword;

    this.loading = true;
    this.registerUserSubscription = this.registerUser(newUser).pipe(
      concatMap(() => this.loginUser(newUser.username, newUser.password))
      ).subscribe(() => {
        this.router.navigate(['/'])
      },
      err => {
        this.error = err;
        this.loading = false;
      });
  }

  registerUser(user: User): Observable<User> {
    return this.userService.registerUser(user);
  }

  loginUser(username: string, password: string): Observable<User> {
    this.loading = true;

    return this.authService.login(username, password)
    .pipe(first());
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

  ngOnDestroy() {
    if (this.getCountriesSubscription) {
      this.getCountriesSubscription.unsubscribe();
    }

    if (this.registerUserSubscription){
      this.registerUserSubscription.unsubscribe();
    }
  }
}
