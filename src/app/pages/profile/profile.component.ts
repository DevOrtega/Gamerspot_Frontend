import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UsersService } from 'src/app/services/users/users.service';
import { PostsService } from 'src/app/services/posts/posts.service';

import { User } from '../../interfaces/user';
import { Link } from '../../interfaces/link';
import { Game } from '../../interfaces/game';
import { Post } from 'src/app/interfaces/post';
import { Profilephotos } from 'src/app/interfaces/profilephotos';
import { ProfilephotosService } from 'src/app/services/firebase/profilephotos.service';
import { ButtonsService } from 'src/app/services/buttons/buttons.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  private usernameParam: string;
  public userProfileData: User;
  public userPostsData: Post[];

  private getParamsSubscriptor: Subscription;
  private getUserSubscriptor: Subscription;
  private getPostsSubscriptor: Subscription;

  activeButton: string;

  public profilePhotos: Profilephotos[];
  public noPhoto: boolean;
  private photoSubscription: Subscription;
  private editPhotoSubscription: Subscription;

  public loading:boolean = false;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private userService: UsersService,
    private postService: PostsService,
    private buttonService: ButtonsService,
    private photoService: ProfilephotosService
  ) {

  }

  ngOnInit(): void {
    this.getParamsSubscriptor = this.route.params.subscribe(params => {
      this.usernameParam = params['username'];

      if (this.authService.itsMe(this.usernameParam)) {
        this.userProfileData = JSON.parse(JSON.stringify(this.authService.userData));

        this.userProfileData.createdAt = this.userService.formatDateToDDMMYYYY(this.userProfileData.createdAt);

        if (this.userProfileData.bornDate) {
          this.userProfileData.bornDate = this.userService.formatDateToDDMMYYYY(this.userProfileData.bornDate);
        }

        if (this.userProfileData.photoUrl) this.showPhoto();
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
          }
        })

        this.getUserSubscriptor = this.userService.getUserByUsername(this.usernameParam)
        .pipe(first())
        .subscribe({
          next: user => {
            this.userProfileData = user;

            this.userProfileData.createdAt = this.userService.formatDateToDDMMYYYY(this.userProfileData.createdAt);

            if (this.userProfileData.bornDate) {
              this.userProfileData.bornDate = this.userService.formatDateToDDMMYYYY(this.userProfileData.bornDate);
            }

            if (this.userProfileData.photoUrl) this.showPhoto();
          }
        })
      }

      this.getPostsSubscriptor = this.postService.getPosts(this.usernameParam)
      .pipe(first())
      .subscribe((posts: Post[]) => this.userPostsData = posts)
    })
  }

  public showPhoto() {
    this.photoSubscription = this.photoService.getPhotoByUsername(this.userProfileData.username).
    getDownloadURL().subscribe(photo => {
      this.userProfileData.photoUrl = photo;
      this.loading = false;
      let user: any = {
        photoUrl: this.userProfileData.photoUrl
      }
      this.editPhotoProfile(this.userProfileData)

      return this.userProfileData.photoUrl;
    })
  }

  public editPhotoProfile(user) {
    this.editPhotoSubscription = this.userService.editUser(this.userProfileData.username, user)
    .subscribe()
  }

  public upload($event) {

    this.photoService.postPhoto($event.target.files[0], this.userProfileData.username)
    .then(()=>{
      this.loading = true;
      setTimeout(() => {
        this.showPhoto();
      }, 1000);
    })
  }

  public itsMe = ((username: string) => this.authService.itsMe(username));
  public isGamer = ((user: User) => this.userService.isGamer(user));
  public isTeam = ((user: User) => this.userService.isTeam(user));
  public isSponsor = ((user: User) => this.userService.isSponsor(user));

  public existGames(games: Game[]): boolean {
    if (games && games.length > 0) {
      return true;
    }

    return false;
  }

  public existLinks(links: Link[]): boolean {
    if (links && links.length > 0) {
      return true;
    }

    return false;
  }

  public setActive = ((buttonName: string) => this.buttonService.setActive(buttonName));
  public isActive = ((buttonName: string) => this.buttonService.isActive(buttonName));

  ngOnDestroy(): void {
    if (this.getParamsSubscriptor) {
      this.getParamsSubscriptor.unsubscribe();
    }

    if (this.getUserSubscriptor) {
      this.getUserSubscriptor.unsubscribe();
    }

    if (this.getPostsSubscriptor) {
      this.getPostsSubscriptor.unsubscribe();
    }

    if (this.photoSubscription) {
      this.photoSubscription.unsubscribe();
    }

    if (this.editPhotoSubscription) {
      this.editPhotoSubscription.unsubscribe();
    }
  }
}
