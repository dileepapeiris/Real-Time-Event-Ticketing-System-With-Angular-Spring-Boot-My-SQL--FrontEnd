import { EventService } from '../Service/Auth/Event/event.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EventConfigureComponent } from '../event-configure/event-configure.component';
import { Router } from '@angular/router';
import { AuthService } from '../Service/Auth/auth.service';

@Component({
  selector: 'app-homepage-view-all-events',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './homepage-view-all-events.component.html',
  styleUrl: './homepage-view-all-events.component.css',
})
export class HomepageViewAllEventsComponent {
  events: any[] = [];

  constructor(
    private eventService: EventService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
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
      console.log('Navigating to ticket purchase with event ID:', eventId);
      this.router.navigate(['/ticketPurchase', eventId]).then(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top after navigation
      });
    } else {
      console.log('User not logged in, navigating to register page');
      this.router.navigate(['/registerAsCustomer']).then(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top after navigation
      });
    }
  }
}
