import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Output() logoutEvent = new EventEmitter<void>();
  @Input() user: User;

  constructor() { }

  ngOnInit(): void {}

  logout() {
    this.logoutEvent.emit();
  }
}
