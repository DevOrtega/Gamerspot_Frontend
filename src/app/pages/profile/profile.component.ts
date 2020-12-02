import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UsersService } from 'src/app/services/users/users.service';
import { User } from '../../interfaces/user'
import { FeedsService } from 'src/app/services/feeds/feeds.service';
import { Post } from 'src/app/interfaces/post';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  private usernameParam: string;
  public userProfileData: User;
  public userPostsData: Post[];
  public isGamer: boolean;
  public isTeam: boolean;
  public isSponsor: boolean;
  public itsMe: boolean;

  private getParamsSubscriptor: Subscription;
  private getUserSubscriptor: Subscription;
  private getPostsSubscriptor: Subscription;

  activeButton: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private userService: UsersService,
    private postService: FeedsService
  ) {
    this.activeButton = 'btn1';
  }
    
  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    this.getParamsSubscriptor = this.route.params.subscribe(params => {
      this.usernameParam = params['username'];
    })

    if (this.authService.itsMe(this.usernameParam)) {
      this.userProfileData = JSON.parse(JSON.stringify(this.authService.userData));

      this.userProfileData.createdAt = this.userService.formatDateToDDMMYYYY(this.userProfileData.createdAt);

      if (this.userProfileData.bornDate) {
        this.userProfileData.bornDate = this.userService.formatDateToDDMMYYYY(this.userProfileData.bornDate);
      }

      this.isGamer = this.userService.isGamer(this.userProfileData);
      this.isTeam = this.userService.isTeam(this.userProfileData);
      this.isSponsor = this.userService.isSponsor(this.userProfileData);
      this.itsMe = this.authService.itsMe(this.userProfileData.username);
    } else {
      this.getUserSubscriptor = this.userService.getUserByUsername(this.usernameParam)
      .pipe(first())
      .subscribe({
        next: user => {
          this.userProfileData = user;

          this.userProfileData.createdAt = this.userService.formatDateToDDMMYYYY(this.userProfileData.createdAt);

          if (this.userProfileData.bornDate) {
            this.userProfileData.bornDate = this.userService.formatDateToDDMMYYYY(this.userProfileData.bornDate);
          }

          this.isGamer = this.userService.isGamer(this.userProfileData);
          this.isTeam = this.userService.isTeam(this.userProfileData);
          this.isSponsor = this.userService.isSponsor(this.userProfileData);
          this.itsMe = this.authService.itsMe(this.userProfileData.username);
        }
      })
    }

    this.getPostsSubscriptor = this.postService.getPosts(this.usernameParam)
    .pipe(first())
    .subscribe((posts: Post[]) => this.userPostsData = posts)
  }

  public existPhoto(): boolean {
    if (this.userProfileData.photoUrl) {
      return true;
    }

    return false;
  }

  public existProfile(): boolean {
    if (this.getUserSubscriptor) {
      return this.getUserSubscriptor.closed;
    }

    return true;
  }

  public setActive(buttonName: string): void {
    this.activeButton = buttonName;
  }

  isActive(buttonName: string): boolean {
    return this.activeButton === buttonName;
  }

  ngOnDestroy() {
    if (this.getParamsSubscriptor) {
      this.getParamsSubscriptor.unsubscribe();
    }

    if (this.getUserSubscriptor) {
      this.getUserSubscriptor.unsubscribe();
    }

    if (this.getPostsSubscriptor) {
      this.getPostsSubscriptor.unsubscribe();
    }
  }
}
