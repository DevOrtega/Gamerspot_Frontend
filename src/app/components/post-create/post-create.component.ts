import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create..component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  @Output() createPostEmitter = new EventEmitter();

  public newPost: FormGroup;
  public writting: boolean = false;

  constructor(private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.newPost = this.formBuilder.group({
      text: ['', Validators.required]
    });
    this.isWritting();
  }

  get f() {
    return this.newPost.controls;
  }

  onSubmit(): void {
    this.writting = false;
    this.createPostEmitter.emit(this.newPost['controls'].text.value);
    this.newPost.reset();
  }

  isWritting(): void {
    this.writting = false;
  }
}
