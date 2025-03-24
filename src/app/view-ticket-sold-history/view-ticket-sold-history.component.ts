import { Component } from '@angular/core';
import { AuthService } from '../Service/Auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Event } from '../Interfaces/event';

import { VendorSignupComponent } from '../vendor-signup/vendor-signup.component';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { VendordashbordnavbarComponent } from '../vendordashbordnavbar/vendordashbordnavbar.component';

@Component({
  selector: 'app-view-ticket-sold-history',
  standalone: true,
  imports: [
    CommonModule,
    VendorSignupComponent,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    VendordashbordnavbarComponent,
  ],
  templateUrl: './view-ticket-sold-history.component.html',
  styleUrl: './view-ticket-sold-history.component.css',
})
export class ViewTicketSoldHistoryComponent {
  events: Event[] = []; // Specify the array type

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {
    this.fetchVendorEvents();
  }

  // Fetch events for the vendor
  fetchVendorEvents(): void {
    const token = 'Bearer ' + this.authService.getToken();
    this.http
      .get<Event[]>('http://localhost:8080/events/mine', {
        headers: { Authorization: token },
      })
      .subscribe(
        (response) => {
          this.events = response; // Store the fetched events
        },
        (error) => {
          console.error('Error fetching events:', error);
          console.error('Error details:', error.error); // Log detailed error message
        }
      );
  }

  // Navigate to the event configuration dashboard with the eventId
  navigate(eventId: number): void {
    this.router.navigate(['/ticketSoldHistoy', eventId]);
  }
}
