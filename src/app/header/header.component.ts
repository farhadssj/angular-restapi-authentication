import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AppRoute } from '../constants/app-route';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isUserLoggedIn = false;

  constructor(private authService: AuthService, private router: Router) {
    this.isUserLoggedIn = this.authService.isUserLogin();
  }

  onLogoutUser(){
    // An API call will be here
    this.authService.removeUserSession();
    this.router.navigate([AppRoute.LOGIN_ROUTE]);
  }
}
