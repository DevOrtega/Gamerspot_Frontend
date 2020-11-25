import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CountriesService } from 'src/app/services/countries/countries.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-profile-editor',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.css']
})
export class ProfileEditorComponent implements OnInit, OnDestroy {
  public userProfileData: User;
  public countries: string[];

  public userRole: string;
  public userPublicName: string;
  public isGamer: boolean;
  public isTeam: boolean;
  public isSponsor: boolean;
  public formattedDate: string;

  public newProfile: FormGroup;
  public submitted: boolean = false;
  public gameUser: string = '';
  public gameName: string = '';
  public link: string = '';
  private gameGroups = [];
  private linkGroups = [];

  public games: string[] = [
    "Apex",
    "League Of Legends"
  ]

  private getParamsSubscription: Subscription;
  private getUserSubscription: Subscription;
  private editUserSubscription: Subscription;
  private getCountriesSubscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private userService: UsersService,
    private countryService: CountriesService
  ) {
    this.userProfileData = JSON.parse(JSON.stringify(this.authService.userData));

    this.userRole = this.userService.getRole(this.userProfileData);
    this.userPublicName = this.userService.getName(this.userProfileData);
    this.isGamer = this.userService.isGamer(this.userProfileData);
    this.isTeam = this.userService.isTeam(this.userProfileData);
    this.isSponsor = this.userService.isSponsor(this.userProfileData);
  }

  onChangeCountry(data: string) {
    this.newProfile['controls'].country.setValue(data);
  }

  ngOnInit(): void {
    if (this.userProfileData.gamer && this.userProfileData.gamer.bornDate) {
      console.log(this.userProfileData.gamer.bornDate)
      console.log(this.userProfileData)
      this.formattedDate = this.userService.formatDateToYYYYMMDD(this.userProfileData.gamer.bornDate);
    }

    this.getParamsSubscription = this.route.parent.params.subscribe(params => {
      if (this.userProfileData.username !== params.username) {
        this.router.navigate([`/${this.userProfileData.username}`]);
      }
    })

    this.getCountriesSubscription = this.countryService.getCountries()
    .subscribe({
      next: countries => {
        const countriesObj : any = Object.values({ ...countries });
        this.countries = countriesObj.map((country: { name: any; }) => country.name);
      }
    })

    this.userProfileData.games.forEach(game => {
      this.gameName = game.gameName;
      this.gameUser = game.gameUser;
      this.gameGroups.push(this.initGame());
    });

    this.userProfileData.links.forEach(link =>{
      this.link = link.link;
      this.linkGroups.push(this.initLink());
    });

    this.newProfile = this.formBuilder.group({
      name: [this.userPublicName, Validators.required],
      password: [''],
      country: [this.userProfileData.country, Validators.required],
      bornDate: [this.formattedDate], // Validates date format 'yyyy-mm-dd'
      biography: [this.userProfileData.biography],
      'games': this.formBuilder.array(this.gameGroups),
      'links': this.formBuilder.array(this.linkGroups)
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.newProfile.invalid) {
      return;
    }

    this.saveUser();
  }

  // LINK 
  addLink() {
    const control = <FormArray>this.newProfile.controls['links'];
    control.push(this.newLink());
  }

  removeLink(i: number) {
    const control = <FormArray>this.newProfile.controls['links'];
    control.removeAt(i);
  }

  initLink() {
    return this.formBuilder.group({
      'link': [this.link]
    });
  }

  newLink() {
    return this.formBuilder.group({
      'link': ['']
    });
  }

  // GAME
  get gamesData() {
    return <FormArray>this.newProfile.get('games');
  }

  addGame() {
    const control = <FormArray>this.newProfile.controls['games'];
    control.push(this.newGame());
  }

  initGame() {
    return this.formBuilder.group({
        'gameName': [this.gameName], 'gameUser': [this.gameUser]
    })
  }

  newGame() {
    return this.formBuilder.group({
        'gameName': [''], 'gameUser': ['']
    })
  }

  removeGame(i) {
    const control = <FormArray>this.newProfile.controls['games'];
    control.removeAt(i);
  }

  saveUser() {
    let role: string;

    if (this.userProfileData.gamer) {
      role = 'Gamer';
    } else if (this.userProfileData.team) {
      role = 'Team';
    } else {
      role = 'Sponsor';
    }

    let newBornDate = this.newProfile['controls'].bornDate.value;

    if (newBornDate) {
      newBornDate = Date.parse(newBornDate);
    } else {
      newBornDate = null;
    }

    let user: any = {
      name: this.newProfile['controls'].name.value,
      password: this.newProfile['controls'].password.value,
      role: role,
      country: this.newProfile['controls'].country.value,
      bornDate: Date.parse(this.newProfile['controls'].bornDate.value),
      games: this.newProfile['controls'].games.value,
      links: this.newProfile['controls'].links.value,
      biography: this.newProfile['controls'].biography.value
    }

    if (!user.password) {
      delete user.password;
    }

    this.editUserSubscription = this.userService.editUser(this.userProfileData.username, user)
    .subscribe(() => {
      //window.location.reload();
    })
  }

  get f() {
    return this.newProfile.controls;
  }

  ngOnDestroy(): void {
    if (this.getParamsSubscription) {
      this.getParamsSubscription.unsubscribe();
    }

    if (this.getCountriesSubscription) {
      this.getCountriesSubscription.unsubscribe();
    }

    if (this.getUserSubscription) {
      this.getUserSubscription.unsubscribe();
    }

    if (this.editUserSubscription) {
      this.editUserSubscription.unsubscribe();
    }
  }
}
