import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { AsyncPipe } from '@angular/common';


@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive,AsyncPipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  _authService = inject(AuthService);
  isLoggedIn:any;

  constructor() { 
  this.isLoggedIn = this._authService.userData;
  }

  signOut() {
    this._authService.signOut();
  }
}
