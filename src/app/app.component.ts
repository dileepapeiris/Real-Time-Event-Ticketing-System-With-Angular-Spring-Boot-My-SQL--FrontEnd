import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarHomepageComponent } from './navbar-homepage/navbar-homepage.component';
import { HomePageComponent } from './home-page/home-page.component';
import { FooterComponent } from './footer/footer.component';

import { IStaticMethods } from 'preline/preline';
declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarHomepageComponent,
    HomePageComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'OOP-FRONTEND';
}
