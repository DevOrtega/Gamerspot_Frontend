import {
  Component, OnInit, OnDestroy
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TeamsService } from 'src/app/services/teams/teams.service';
import { User } from 'src/app/interfaces/user';
import { Team } from 'src/app/interfaces/team';
import { UsersService } from 'src/app/services/users/users.service';
@Component({
  selector: 'app-add-players',
  templateUrl: './show-team.component.html',
  styleUrls: ['./show-team.component.css']
})
export class ShowTeamComponent implements OnInit, OnDestroy {
  public userProfileData: User;
  public team: Team;
  private usernameParam: string;
  public user: any;

  private getParamsSubscription: Subscription;

  constructor(private authService: AuthService, private route: ActivatedRoute, private teamService: TeamsService, private userService: UsersService) {
    this.userProfileData = JSON.parse(JSON.stringify(this.authService.userData));
  }

  ngOnInit(): void {
    this.getParamsSubscription = this.route.parent.params.subscribe(params => {
      this.usernameParam = params['username'];
    })
    this.showTeams();
  }

  public exist(): boolean {
    if (this.team) {
      return true;
    }

    return false;
  }

  /* isEmpty(): boolean {
     if (this.exist() && this.team.length === 0) return true;

     return false;
   }*/

  private showTeams() {
    this.userService.getUserByUsername(this.usernameParam).subscribe(user => {
      this.user = user;
      if (this.userProfileData.gamer !== undefined) {
        if (user.gamer._id == this.userProfileData.gamer._id) {
          this.team = this.userProfileData.gamer.team;
        } else {
          this.team = user.gamer.team;
        }
      } else {
        this.team = user.gamer.team;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.getParamsSubscription) {
      this.getParamsSubscription.unsubscribe();
    }

  }

}
