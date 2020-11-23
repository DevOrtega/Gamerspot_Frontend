import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-feed-post',
  templateUrl: './feed-post.component.html',
  styleUrls: ['./feed-post.component.css']
})
export class FeedsPostComponent implements OnInit {

  @Output() feedEmitter = new EventEmitter();

  public newFeed:FormGroup;
  public writting:boolean = false;

  constructor(private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.newFeed = this.formBuilder.group({
      text: ['', Validators.required]
    });
    this.isWritting();
  }
  get f() {
    return this.newFeed.controls;
  }

  async onSubmit(){
    this.writting = false;
    this.feedEmitter.emit(this.newFeed['controls'].text.value);
    this.newFeed.reset();
  }

  isWritting() {
    this.writting = false;
  }

}
