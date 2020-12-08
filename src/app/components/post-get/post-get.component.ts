import { PostView } from 'src/app/interfaces/post-view';
import { Component, EventEmitter, Input, OnInit, Output, AfterViewChecked, AfterViewInit } from '@angular/core';
import { UsersService } from 'src/app/services/users/users.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Post } from 'src/app/interfaces/post';

@Component({
  selector: 'app-post-get',
  templateUrl: './post-get.component.html',
  styleUrls: ['./post-get.component.css']
})
export class PostGetComponent implements OnInit, AfterViewInit {
  @Input() post: Post;
  @Input() modalIndex: any;
  @Output() deletePostEmitter = new EventEmitter();

  public postView: PostView;
  private regexTag: RegExp = new RegExp('^#\\w+$');

  constructor(private userService: UsersService, private authService: AuthService) { }

  ngOnInit(): void {

    this.makePost();

    console.log('empezamos!!')
  }

  emitToDelete() {
    this.deletePostEmitter.emit(this.post);
  }

  itsMe() {
    return this.authService.itsMe(this.post.owner.username);
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  private makePost() {
    this.postView = {
      _id: this.post._id,
      username: this.post.owner.username,
      name: this.userService.getName(this.post.owner),
      role: this.userService.getRole(this.post.owner),
      text: this.post.text,
      photoUrl: this.post.owner.photoUrl,
      tags: this.post.tags,
      createdAt: this.userService.formatDateToMMMMDDYYYY(this.post.createdAt)
    }
  }

  ngAfterViewInit(): void {
    this.makeTags();
  }

  private makeTags() {
    const selectPosts = document.getElementById(this.modalIndex);
    selectPosts.innerHTML = selectPosts.innerHTML.replace(/#(\w+)/g,
      `<a class="tag-link" style="color:rgb(51,159,255)" href="/tags/$1">#$1</a>`
    );
  }
}
