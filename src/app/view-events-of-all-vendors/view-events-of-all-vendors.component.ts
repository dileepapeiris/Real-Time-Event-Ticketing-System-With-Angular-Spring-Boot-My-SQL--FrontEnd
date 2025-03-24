import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarHomepageComponent } from '../navbar-homepage/navbar-homepage.component';
import { EventService } from '../Service/Auth/Event/event.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FooterComponent } from "../footer/footer.component";
import { AuthService } from '../Service/Auth/auth.service';

@Component({
  selector: 'app-view-events-of-all-vendors',
  standalone: true,
  imports: [CommonModule, NavbarHomepageComponent, FooterComponent],
  templateUrl: './view-events-of-all-vendors.component.html',
  styleUrls: ['./view-events-of-all-vendors.component.css'],
})
export class ViewEventsOfAllVendorsComponent implements OnInit {
  events: any[] = [];

  constructor(
    private eventService: EventService,
    private router: Router,
    private authService: AuthService

  ) {}

  ngOnInit(): void {
    this.fetchEvents();
  }

  fetchEvents(): void {
    this.eventService.getAllEvents().subscribe(
      (data) => {
        this.events = data;
      },
      (error) => {
        console.error('Error fetching events', error);
      }
    );
  }

  navigate(eventId: number): void {
    if (this.authService.isAuthenticated()) {
      // If user is authenticated, navigate to ticket purchase page
      console.log('Navigating to ticket purchase with event ID:', eventId);
      this.router.navigate(['/ticketPurchase', eventId]);
    } else {
      // If user is not authenticated, navigate to register page
      console.log('User not logged in, navigating to register page');
      this.router.navigate(['/registerAsCustomer']);
    }
  }
  


}
