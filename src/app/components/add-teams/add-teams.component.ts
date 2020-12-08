import {
  Component, OnInit, EventEmitter,
  Input,
  Output, OnDestroy
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Gamer } from 'src/app/interfaces/gamer';
import { GamersService } from 'src/app/services/gamers/gamers.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TeamsService } from 'src/app/services/teams/teams.service';
import { User } from 'src/app/interfaces/user';
import { SponsorsService } from 'src/app/services/sponsors/sponsors.service';
import { UsersService } from 'src/app/services/users/users.service';
import { Team } from 'src/app/interfaces/team';
@Component({
  selector: 'app-add-teams',
  templateUrl: './add-teams.component.html',
  styleUrls: ['./add-teams.component.css']
})
export class AddTeamsComponent implements OnInit, OnDestroy {
  @Input() player;
  @Input() modalIndex;
  @Output() playerToDelete = new EventEmitter();
  public userProfileData: User;
  public user: any;
  public teams: Team[];
  public playersOnTeam: Gamer[];
  public teamsOnSponsor: Team[];
  private usernameParam: string;
  public teamToAdd: string;

  private getParamsSubscription: Subscription;
  private removePlayerSubscription: Subscription;

  constructor(private gamerService: GamersService, private authService: AuthService, private route: ActivatedRoute, private teamService: TeamsService, private sponsorService: SponsorsService, private userService: UsersService) {
    this.userProfileData = JSON.parse(JSON.stringify(this.authService.userData));

  }

  ngOnInit(): void {
    this.getParamsSubscription = this.route.parent.params.subscribe(params => {
      this.usernameParam = params['username'];
    })
    this.userService.getUserByUsername(this.usernameParam).subscribe(user => {
      this.showTeams();
      this.showTeamsOnSponsor();
    });


  }

  public exist(): boolean {
    if (this.teams) {
      return true;
    }

    return false;
  }

  isEmpty(): boolean {
    if (this.exist() && this.teams.length === 0) return true;

    return false;
  }

  private showTeams() {
    this.teamService.getTeams().subscribe(teams => {

      this.teams = teams;

      this.teams.sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return dateB - dateA;
      });

      return this.teams;
    });
  }

  private showTeamsOnSponsor() {
    let player = "";
    this.userService.getUserByUsername(this.usernameParam).subscribe(user => {
      this.user = user;
      if (this.userProfileData.sponsor !== undefined) {
        if (user.sponsor._id == this.userProfileData.sponsor._id) {
          this.teamService.getTeams(player, this.userProfileData.sponsor._id).subscribe(teams => {

            this.teamsOnSponsor = teams;

            this.teamsOnSponsor.sort((a, b) => {
              const dateA = new Date(a.createdAt).getTime();
              const dateB = new Date(b.createdAt).getTime();
              return dateB - dateA;
            });

            return this.teamsOnSponsor;
          });
        } else {
          this.teamService.getTeams(player, user.sponsor._id).subscribe(teams => {
            this.teamsOnSponsor = teams;
            this.teamsOnSponsor.sort((a, b) => {
              const dateA = new Date(a.createdAt).getTime();
              const dateB = new Date(b.createdAt).getTime();
              return dateB - dateA;
            });
            return this.teamsOnSponsor;
          });
        }
      } else {
        this.teamService.getTeams(player, user.sponsor._id).subscribe(teams => {

          this.teamsOnSponsor = teams;

          this.teamsOnSponsor.sort((a, b) => {
            const dateA = new Date(a.createdAt).getTime();
            const dateB = new Date(b.createdAt).getTime();
            return dateB - dateA;
          });

          return this.teamsOnSponsor;
        });
      }
    });

  }

  removeTeam(team_id) {
      this.sponsorService.deleteTeam(this.userProfileData.sponsor._id, team_id);
      this.showTeamsOnSponsor();
  }

  emitToDelete() {
    // this.playerToDelete.emit(this.post);
  }

  addTeam() {
      this.sponsorService.addTeam(this.userProfileData.sponsor._id, this.teamToAdd);
      this.showTeamsOnSponsor();
  }

  onChangeTeam(team_id) {
    this.teamToAdd = team_id;
  }

  public isTeam = ((user: User) => this.userService.isTeam(user));

  ngOnDestroy(): void {
    if (this.getParamsSubscription) {
      this.getParamsSubscription.unsubscribe();
    }

    if (this.removePlayerSubscription) {
      this.removePlayerSubscription.unsubscribe();
    }

  }

}
