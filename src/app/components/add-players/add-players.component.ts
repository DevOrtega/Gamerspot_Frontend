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
@Component({
  selector: 'app-add-players',
  templateUrl: './add-players.component.html',
  styleUrls: ['./add-players.component.css']
})
export class AddPlayersComponent implements OnInit, OnDestroy {
  @Input() player;
  @Input() modalIndex;
  @Output() playerToDelete = new EventEmitter();
  public userProfileData: User;
  public user: any;
  public players: Gamer[];
  public playersOnTeam: Gamer[];
  public playersOnSponsor: Gamer[];
  private usernameParam: string;
  public playerToAdd: string;

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
      this.showPlayers();

      if (this.userProfileData.team || user.team) {

        this.showPlayersOnTeam();
      } else {
        this.showPlayersOnSponsor();
      }
    });


  }

  public exist(): boolean {
    if (this.players) {
      return true;
    }

    return false;
  }

  isEmpty(): boolean {
    if (this.exist() && this.players.length === 0) return true;

    return false;
  }

  private showPlayers() {
    this.gamerService.getGamers().subscribe(players => {

      this.players = players;

      this.players.sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return dateB - dateA;
      });

      return this.players;
    });
  }

  private showPlayersOnTeam() {
    this.userService.getUserByUsername(this.usernameParam).subscribe(user => {
      this.user = user;
      if (this.userProfileData.team !== undefined) {
        if (user.team._id == this.userProfileData.team._id) {

          this.gamerService.getGamers(this.userProfileData.team._id).subscribe(players => {

            this.playersOnTeam = players;

            this.playersOnTeam.sort((a, b) => {
              const dateA = new Date(a.createdAt).getTime();
              const dateB = new Date(b.createdAt).getTime();
              return dateB - dateA;
            });

            return this.playersOnTeam;
          });
        } else {
          this.gamerService.getGamers(user.team._id).subscribe(players => {
            this.playersOnTeam = players;
            this.playersOnTeam.sort((a, b) => {
              const dateA = new Date(a.createdAt).getTime();
              const dateB = new Date(b.createdAt).getTime();
              return dateB - dateA;
            });
            return this.playersOnTeam;
          });
        }
      } else {
        this.gamerService.getGamers(user.team._id).subscribe(players => {

          this.playersOnTeam = players;

          this.playersOnTeam.sort((a, b) => {
            const dateA = new Date(a.createdAt).getTime();
            const dateB = new Date(b.createdAt).getTime();
            return dateB - dateA;
          });

          return this.playersOnTeam;
        });
      }
    });
  }

  private showPlayersOnSponsor() {
    let team = "";
    this.userService.getUserByUsername(this.usernameParam).subscribe(user => {
      this.user = user;
      if (this.userProfileData.sponsor !== undefined) {
        if (user.sponsor._id == this.userProfileData.sponsor._id) {

          this.gamerService.getGamers(team, this.userProfileData.sponsor._id).subscribe(players => {

            this.playersOnSponsor = players;

            this.playersOnSponsor.sort((a, b) => {
              const dateA = new Date(a.createdAt).getTime();
              const dateB = new Date(b.createdAt).getTime();
              return dateB - dateA;
            });

            return this.playersOnSponsor;
          });
        } else {
          this.gamerService.getGamers(team, user.sponsor._id).subscribe(players => {
            this.playersOnSponsor = players;
            this.playersOnSponsor.sort((a, b) => {
              const dateA = new Date(a.createdAt).getTime();
              const dateB = new Date(b.createdAt).getTime();
              return dateB - dateA;
            });
            return this.playersOnSponsor;
          });
        }
      } else {
        this.gamerService.getGamers(team, user.sponsor._id).subscribe(players => {

          this.playersOnSponsor = players;

          this.playersOnSponsor.sort((a, b) => {
            const dateA = new Date(a.createdAt).getTime();
            const dateB = new Date(b.createdAt).getTime();
            return dateB - dateA;
          });

          return this.playersOnSponsor;
        });
      }
    });

  }

  removePlayer(player_id) {
    if (this.userProfileData.team) {
      this.teamService.deletePlayer(this.userProfileData.team._id, player_id);
      this.showPlayersOnTeam();
    }
    else {
      this.sponsorService.deletePlayer(this.userProfileData.sponsor._id, player_id);
      this.showPlayersOnSponsor();
    }
  }

  emitToDelete() {
    // this.playerToDelete.emit(this.post);
  }

  addPlayer() {
    if (this.userProfileData.team) {
      this.teamService.addPlayer(this.userProfileData.team._id, this.playerToAdd);
      this.showPlayersOnTeam();
    }
    else {
      this.sponsorService.addPlayer(this.userProfileData.sponsor._id, this.playerToAdd);
      this.showPlayersOnSponsor();
    }
  }

  onChangePlayer(player_id) {
    this.playerToAdd = player_id;
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
