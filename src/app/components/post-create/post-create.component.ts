import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Tag } from 'src/app/interfaces/tag';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create..component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  @Output() createPostEmitter = new EventEmitter();

  public newPost: FormGroup;
  public writting: boolean = false;
  private regexTag: RegExp = new RegExp('^#\\w+$');
  private newTag:Tag;

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
    const post = this.hasTags(this.newPost['controls'].text.value);
    this.createPostEmitter.emit(post);
    this.newPost.reset();
  }

  hasTags(text: string) {    
    text = text.trim();

    const textWords = text.split(' ');
    let tags: Tag[] = [];

    textWords.forEach(word => {
      if (this.regexTag.test(word)) {
        tags.push({'name': word});
      }
    });

    if (tags.length > 0) {
      return {
        'text': text,
        'tags': tags
      }
    } else {
      return {
        'text': text
      }
    }
  }

  isWritting(): void {
    this.writting = false;
  }
}
