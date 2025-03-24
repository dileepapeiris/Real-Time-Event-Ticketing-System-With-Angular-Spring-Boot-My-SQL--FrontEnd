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
import { VendordashbordnavbarComponent } from "../vendordashbordnavbar/vendordashbordnavbar.component";

@Component({
  selector: 'app-vendordashboard',
  standalone: true,
  imports: [CommonModule,
    VendorSignupComponent,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    VendordashbordnavbarComponent],
  templateUrl: './vendordashboard.component.html',
  styleUrl: './vendordashboard.component.css'
})
export class VendordashboardComponent {
  events: Event[] = []; // Specify the array type
  // Alert states
  showAlert: boolean = false;
  alertType: 'success' | 'error' | null = null;
  alertMessage: string = '';

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

  deleteEvent(eventId: number): void {
    const token = 'Bearer ' + this.authService.getToken();
    this.http.delete(`http://localhost:8080/events/${eventId}`, {
      headers: { Authorization: token },
    }).subscribe(
      (response) => {
        // On success, remove the event from the local events array
        this.events = this.events.filter(event => event.id !== eventId);
        this.showAlertWithMessage(
          'Event Deleted successfully!',
          'success'
        );
      },
      (error) => {
        console.error('Error deleting event:', error);
      }
    );
  }

  showAlertWithMessage(message: string, type: 'success' | 'error'): void {
    this.alertType = type; // Set the alert type (success or error)
    this.alertMessage = message; // Set the dynamic message
    this.showAlert = true; // Show the alert
    const alertMessageElement = document.getElementById('alert-message');
    if (alertMessageElement) {
      alertMessageElement.textContent = message; // Set the message text
    }

    setTimeout(() => {
      this.showAlert = false; // Hide the alert after 3 seconds
    }, 3000);
  }
  

  
  
}


