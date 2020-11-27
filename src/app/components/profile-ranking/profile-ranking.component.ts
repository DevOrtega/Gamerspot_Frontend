import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-profile-ranking',
  templateUrl: './profile-ranking.component.html',
  styleUrls: ['./profile-ranking.component.css']
})
export class ProfileRankingComponent implements OnInit {
  games: { gameName: string, gameUser: string }[];

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.games = this.authService.userData.games;
  }

  existGames(): boolean {
    if (this.games && this.games.length > 0) return true;
   
    return false;
  }
}
