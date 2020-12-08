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
  public sponsorsOnPlayer: Sponsor[];
  public sponsorsOnTeam: Sponsor[];
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

    this.userService.getUserByUsername(this.usernameParam).subscribe(user => {
      if (user.gamer==undefined) {
        this.showSponsorsOnTeam();
      }
      else{
      if (this.userProfileData.gamer !==undefined || user.gamer!==undefined) {
        this.showSponsorsOnPlayer();
      } else {
        this.showSponsorsOnTeam();
      }
    }
    })
  }

  public exist(): boolean {
    if (this.sponsorsOnPlayer) {
      return true;
    }

    return false;
  }

  isEmpty(): boolean {
    if (this.exist() && this.sponsorsOnPlayer.length === 0) return true;

    return false;
  }

  private showSponsorsOnPlayer() {
    this.userService.getUserByUsername(this.usernameParam).subscribe(user => {
      this.user = user

      if (this.userProfileData.gamer !== undefined) {
        if (user.gamer._id == this.userProfileData.gamer._id) {
          this.sponsorsOnPlayer = this.userProfileData.gamer.sponsors;
        } else {
          this.sponsorsOnPlayer = user.gamer.sponsors;
        }

      } else {
        this.sponsorsOnPlayer = user.gamer.sponsors;

      }
      console.log(this.sponsorsOnPlayer)

    });
  }

  private showSponsorsOnTeam() {
    this.userService.getUserByUsername(this.usernameParam).subscribe(user => {
      this.user = user

      if (this.userProfileData.team !== undefined) {
        if (user.team._id == this.userProfileData.team._id) {
          this.sponsorsOnTeam = this.userProfileData.team.sponsors;
        } else {
          this.sponsorsOnTeam = user.team.sponsors;
        }

      } else {
        this.sponsorsOnTeam = user.team.sponsors;

      }
    });
  }

  ngOnDestroy(): void {
    if (this.getParamsSubscription) {
      this.getParamsSubscription.unsubscribe();
    }

  }

}
