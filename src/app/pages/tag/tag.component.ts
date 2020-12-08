import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { TagsService } from 'src/app/services/tags/tags.service';
import { PostsService } from 'src/app/services/posts/posts.service';

import { Post } from '../../interfaces/post';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit, OnDestroy {
  tagnameParam: string;
  tagPosts: Post[];

  getParamsSubscriptor: Subscription;
  getTagSubscriptor: Subscription;

  constructor(
    private tagService: TagsService,
    private route: ActivatedRoute,
    private postService: PostsService
  ) {

  }

  ngOnInit(): void {
    this.showTag();
  }

  showTag() {
    this.getParamsSubscriptor = this.route.params.subscribe(params => {
      this.tagnameParam = params['name'];

      this.getParamsSubscriptor = this.tagService.getTagByName(this.tagnameParam)
      .subscribe(tag => {
        this.tagPosts = tag.posts;

        this.tagPosts.sort((a,b) => {
          const dateA = new Date(a.createdAt).getTime();
          const dateB = new Date(b.createdAt).getTime();
          return dateB - dateA;
        });
      });
    });
  }

  deletePost(post: Post): void {
    this.tagPosts = this.tagPosts.filter(f => {
      return f._id != post._id
    });
    this.postService.deletePost(post)
    .subscribe(response => {
      return response;
    })
  }

  ngOnDestroy(): void {
    if (this.getParamsSubscriptor) {
      this.getParamsSubscriptor.unsubscribe();
    }

    if (this.getTagSubscriptor) {
      this.getTagSubscriptor.unsubscribe();
    }
  }
}
