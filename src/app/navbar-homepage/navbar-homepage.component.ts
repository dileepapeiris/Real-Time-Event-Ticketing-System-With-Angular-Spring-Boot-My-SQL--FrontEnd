import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../Service/Auth/auth.service';

@Component({
  selector: 'app-navbar-homepage',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './navbar-homepage.component.html',
  styleUrls: ['./navbar-homepage.component.css'],
})
export class NavbarHomepageComponent {
  constructor(public authService: AuthService) {}  // Made authService public to use in the template
}
