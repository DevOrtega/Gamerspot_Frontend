import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Userprofiledata } from 'src/app/interfaces/userprofiledata';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CountriesService } from 'src/app/services/countries/countries.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-profile-editor',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.css']
})
export class ProfileEditorComponent implements OnInit, OnDestroy {
  public userProfileData: Userprofiledata;
  public newProfile: FormGroup;
  public countries: string[];
  public submitted: boolean = false;
  public gameUser: string = '';
  public gameName: string = '';
  public link: string = '';
  public dateFormated: string = '';
  private gameGroups = [];
  private linkGroups = [];

  public games: string[] = [
    "Apex",
    "League Of Legends"
  ]

  public currentName: string;

  loading = false;
  error = '';

  private getParamsSubscription: Subscription;
  private getUserSubscription: Subscription;
  private editUserSubscription: Subscription;
  private getCountriesSubscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService,
    private userService: UsersService,
    private countryService: CountriesService
  ) {}

  setCurrentName(data: string) {
    this.currentName = data;
  }

  onChangeCountry(data: string) {
    console.log(data);
    this.newProfile['controls'].country.setValue(data);
  }

  ngOnInit(): void {
    this.getParamsSubscription = this.route.parent.params.subscribe(params => {
      if (params.username !== this.auth.userData.username) {
        this.router.navigate([`/${this.auth.userData.username}`]);
      }
    })

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
    this.getUserSubscription = this.userService.profile.subscribe(user => {
      this.userProfileData = user;
      this.getCurrentName();
    });

    this.userProfileData.games.forEach(game => {
      this.gameName = game.gameName;
      this.gameUser = game.gameUser;
      this.gameGroups.push(this.initGame());
    });

    this.userProfileData.links.forEach(link =>{
      this.link = link.link;
      this.linkGroups.push(this.initLink());
    });

    let dateFormated = '';

    if (this.userProfileData.bornDate) {
      let dateWithoutZ = this.userProfileData.bornDate.toString().substring(0, this.userProfileData.bornDate.toString().length - 1);
      this.dateFormated = this.datePipe.transform(dateWithoutZ,"yyyy-MM-dd");
    }

    this.newProfile = this.formBuilder.group({
      name: ['', Validators.required],
      password: [''],
      country: [this.userProfileData.country, Validators.required],
      //validates date format yyyy-mm-dd
      bornDate: [dateFormated, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)],
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
    //alert('niiiice'+ JSON.stringify(this.newProfile.value, null, 6));
    this.saveUser();
  }

  //LINK
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

  //GAME
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
      password: this.newProfile['controls'].name.value,
      role: role,
      country: this.newProfile['controls'].country.value,
      bornDate: newBornDate,
      games: this.newProfile['controls'].games.value,
      links: this.newProfile['controls'].links.value,
      biography: this.newProfile['controls'].biography.value
    }

    if (!user.password) {
      delete user.password;
      console.log(user);
    }

    this.loading = true;
    this.editUserSubscription = this.userService.editUser(this.userProfileData.username, user)
    .subscribe(() => {
      window.location.reload();
    },
    err => {
      this.error = err;
      this.loading = false;
    });
  }

  get f() {
    return this.newProfile.controls;
  }

  public isGamer(): boolean {
    if (this.userProfileData.gamer && Object.entries(this.userProfileData.gamer).length > 0) {
      return true;
    }

    return false;
  }

  public isTeam(): boolean {
    if (this.userProfileData.team && Object.entries(this.userProfileData.team).length > 0) {
      return true;
    }

    return false;
  }

  public isSponsor(): boolean {
    if (this.userProfileData.sponsor && Object.entries(this.userProfileData.sponsor).length > 0) {
      return true;
    }

    return false;
  }

  public getCurrentName(): void{
    if (this.isGamer()) {
      this.currentName = this.userProfileData.gamer.name;
    }
    if (this.isTeam()) {
      this.currentName = this.userProfileData.team.name;
    }
    if (this.isSponsor()) {
      this.currentName = this.userProfileData.sponsor.name;
    }
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
