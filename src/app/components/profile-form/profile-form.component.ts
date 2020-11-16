import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Userprofileform } from 'src/app/interfaces/userprofileform';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.css']
})
export class ProfileFormComponent implements OnInit {

  @Input() userProfile:Userprofileform;
  @Output() saveEmitter = new EventEmitter();

  public newProfile:FormGroup;
  public countries: string[] = ['spain', 'eeuu'];
  public submitted:boolean = false;
  public gameUser:string = '';
  public gameName:string = '';
  public linkName:string = '';
  public dateFormated:string = '';
  private dateWithoutZ;
  private gameGroups = [];
  private linkGroups = [];

  constructor(private formBuilder:FormBuilder, private datePipe:DatePipe) { }

  onChangeCountry(data) {
    this.newProfile['controls'].country.setValue(data);
  }

  ngOnInit(): void {

    this.userProfile.gameList.forEach(game => {
      this.gameName = game.gameName;
      this.gameUser = game.gameUser;
      this.gameGroups.push(this.initGame());
    });
    this.userProfile.linkList.forEach(link =>{
      this.linkName = link.link;
      this.linkGroups.push(this.initLink());
    });

    this.dateWithoutZ = this.userProfile.bornDate.toString().substring(0, this.userProfile.bornDate.toString().length - 1);
    this.dateFormated = this.datePipe.transform(this.dateWithoutZ,"yyyy-MM-dd");

    this.newProfile = this.formBuilder.group({
      //role: ['', Validators.required],
      country: [this.userProfile.country, Validators.required],
      //validates date format yyyy-mm-dd
      bornDate: [this.dateFormated, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)],
      biography: [this.userProfile.biography],
      'gameList': this.formBuilder.array(this.gameGroups),
      'linkList': this.formBuilder.array(this.linkGroups)
    });
  }

  onSubmit() {
    this.submitted = true;
    if ( this.newProfile.invalid ) {
      return;
    }
    //alert('niiiice'+ JSON.stringify(this.newProfile.value, null, 6));
    this.emitSave();
  }

  //LINK
  addLink() {
    const control = <FormArray>this.newProfile.controls['linkList'];
    control.push(this.newLink());
  }
  removeLink(i: number) {
    const control = <FormArray>this.newProfile.controls['linkList'];
    control.removeAt(i);
  }
  initLink() {
    return this.formBuilder.group({
      'link': [this.linkName]
    });
  }
  newLink() {
    return this.formBuilder.group({
      'link': ['']
    });
  }

  //GAME
  get gamesData() {
    return <FormArray>this.newProfile.get('gameList');
  }
  addGame() {
    const control = <FormArray>this.newProfile.controls['gameList'];
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
    const control = <FormArray>this.newProfile.controls['gameList'];
    control.removeAt(i);
  }

  emitSave() {
    let userToEmit = {
      country: this.newProfile['controls'].country.value,
      bornDate: this.newProfile['controls'].bornDate.value,
      gameList: this.newProfile['controls'].gameList.value,
      linkList: this.newProfile['controls'].linkList.value,
      biography: this.newProfile['controls'].biography.value
    };

    this.saveEmitter.emit(userToEmit);
  }

  get f() {
    return this.newProfile.controls;
  }

  onReset() {
    this.submitted = false;
    this.newProfile.reset();
  }

}
