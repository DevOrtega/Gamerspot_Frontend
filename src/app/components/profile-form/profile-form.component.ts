import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.css']
})
export class ProfileFormComponent implements OnInit {

  @Output() saveEmitter = new EventEmitter();

  public newProfile:FormGroup;

  public roles: string[]  = ['user', 'team', 'sponsor'];
  public countries: string[] = ['spain', 'eeuu'];
  //public roleSelected:string = '';

  public submitted:boolean = false;
  private roleSelected:string = '';

  constructor(private formBuilder:FormBuilder) { }

  onChangeRole(data) {
    this.newProfile['controls'].role.setValue(data);
  }

  onChangeCountry(data) {
    this.newProfile['controls'].country.setValue(data);
  }


  ngOnInit(): void {
    this.newProfile = this.formBuilder.group({
      role: ['', Validators.required],
      country: ['', Validators.required],
      //validates date format yyyy-mm-dd
      bornDate: ['', Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)],
      biography: [''],
      'gameList': this.formBuilder.array([this.initGame()]),
      'linkList': this.formBuilder.array([this.initLink()])
    });
  }


  onSubmit() {
    this.submitted = true;
    if ( this.newProfile.invalid ) {
      return;
    }
    alert('niiiice'+ JSON.stringify(this.newProfile.value, null, 6));
    this.emitSave();
  }

  emitSave() {
    this.saveEmitter.emit(this.newProfile['controls']);
  }

  //LINK
  addLink() {
    const control = <FormArray>this.newProfile.controls['linkList'];
    control.push(this.initLink());
  }
  removeLink(i: number) {
    const control = <FormArray>this.newProfile.controls['linkList'];
    control.removeAt(i);
  }
  initLink() {
    return this.formBuilder.group({
      'L': ['']
    });
  }

  //GAME
  get gamesData() {
    return <FormArray>this.newProfile.get('gameList');
  }

  //GAME
  addGame() {
    const control = <FormArray>this.newProfile.controls['gameList'];
    control.push(this.initGame());
  }
  initGame() {
    return this.formBuilder.group({
      'G': ['']
    });
  }
  removeGame(i) {
    const control = <FormArray>this.newProfile.controls['gameList'];
    control.removeAt(i);
  }

  get f() {
    return this.newProfile.controls;
  }

  onReset() {
    this.submitted = false;
    this.newProfile.reset();
  }

}
