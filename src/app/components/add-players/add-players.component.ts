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

  public players: Gamer[];
  private usernameParam: string;
  public playerToAdd: string;

  private getParamsSubscription: Subscription;
  private removePlayerSubscription: Subscription;

  constructor(private gamerService: GamersService, private authService: AuthService, private route: ActivatedRoute, private teamService: TeamsService) {
    this.userProfileData = JSON.parse(JSON.stringify(this.authService.userData));
   }

  ngOnInit(): void {
    this.getParamsSubscription = this.route.parent.params.subscribe(params => {
      this.usernameParam = params['username'];
    })

    this.showPlayers();
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

      this.players.sort( (a,b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return dateB - dateA;
      });

      return this.players;
    });
  }

  removePlayer(player) {
    this.removePlayerSubscription = this.gamerService.removeGamer(player).subscribe(() => {
      this.showPlayers()
    })
  }

  emitToDelete() {
   // this.playerToDelete.emit(this.post);
  }

  addPlayer(){
    this.teamService.addPlayer(this.userProfileData.team._id,this.playerToAdd)
  }

  onChangePlayer(player_id){
    this.playerToAdd=player_id;

  }

  ngOnDestroy():void {
    if (this.getParamsSubscription) {
      this.getParamsSubscription.unsubscribe();
    }

    if (this.removePlayerSubscription) {
      this.removePlayerSubscription.unsubscribe();
    }

  }

}
