import { Component } from '@angular/core';
import { NavbarHomepageComponent } from '../navbar-homepage/navbar-homepage.component';
import { FooterComponent } from '../footer/footer.component';

import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomepageViewAllEventsComponent } from '../homepage-view-all-events/homepage-view-all-events.component';


@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [NavbarHomepageComponent, FooterComponent,RouterModule,CommonModule,HomepageViewAllEventsComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {}
