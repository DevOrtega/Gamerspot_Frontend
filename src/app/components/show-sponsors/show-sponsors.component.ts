import {
  Component, OnInit, OnDestroy
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SponsorsService } from 'src/app/services/sponsors/sponsors.service';
import { User } from 'src/app/interfaces/user';
import { Sponsor } from 'src/app/interfaces/sponsor';
import { UsersService } from 'src/app/services/users/users.service';
@Component({
  selector: 'app-add-players',
  templateUrl: './show-sponsors.component.html',
  styleUrls: ['./show-sponsors.component.css']
})
export class ShowSponsorsComponent implements OnInit, OnDestroy {
  public userProfileData: User;
  public sponsors: Sponsor[];
  private usernameParam: string;
  public user: any;

  private getParamsSubscription: Subscription;

  constructor(private authService: AuthService, private route: ActivatedRoute, private sponsorService: SponsorsService, private userService: UsersService) {
    this.userProfileData = JSON.parse(JSON.stringify(this.authService.userData));
  }

  ngOnInit(): void {
    this.getParamsSubscription = this.route.parent.params.subscribe(params => {
      this.usernameParam = params['username'];
    })

    this.showSponsors();
  }

  public exist(): boolean {
    if (this.sponsors) {
      return true;
    }

    return false;
  }

  isEmpty(): boolean {
    if (this.exist() && this.sponsors.length === 0) return true;

    return false;
  }

  private showSponsors() {
    this.userService.getUserByUsername(this.usernameParam).subscribe(user => {
      this.user = user

      if (this.userProfileData.gamer !== undefined) {
        if (user.gamer._id == this.userProfileData.gamer._id) {
          this.sponsors = this.userProfileData.gamer.sponsors;
        } else {
          this.sponsors = user.gamer.sponsors;
        }

      } else {
        this.sponsors = user.gamer.sponsors;

      }
    });
  }

  ngOnDestroy(): void {
    if (this.getParamsSubscription) {
      this.getParamsSubscription.unsubscribe();
    }

  }

}
