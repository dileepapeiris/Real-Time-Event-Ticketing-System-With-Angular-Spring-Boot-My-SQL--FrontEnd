import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../Service/Auth/auth.service';
import { EventConfig } from '../Interfaces/event-config';
import { EventService } from '../Service/Auth/Event/event.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VendordashbordnavbarComponent } from "../vendordashbordnavbar/vendordashbordnavbar.component";

@Component({
  selector: 'app-event-configure',
  templateUrl: './event-configure.component.html',
  styleUrls: ['./event-configure.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, VendordashbordnavbarComponent],
})
export class EventConfigureComponent implements OnInit {
  logEntries: string[] = [];
  eventId: number | null = null;
  selectedEventConfig: EventConfig = {
    maxCapacity: 0,
    totalTickets: 0,
    releaseRate: 0,
    retrievalRate: 0,
  };
  isEventStarted: boolean = false;
  isConfigFetched: boolean = false;
  // New variable to store dynamic message
  alertMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  addLog(message: string): void {
    const timestamp = new Date().toLocaleString(); // Get the current date and time
    this.logEntries.push(`[${timestamp}] ${message}`);
  }
  

  ngOnInit(): void {
    this.eventId = Number(this.route.snapshot.paramMap.get('eventId'));
    if (this.eventId) {
      this.fetchEventConfig();
    }

    
  }

  fetchEventConfig(): void {
    const url = `http://localhost:8080/events/configureticketpool/${this.eventId}`;
    this.http
      .get<EventConfig>(url, {
        headers: {
          Authorization: 'Bearer ' + this.authService.getToken(),
        },
      })
      .subscribe(
        (response) => {
          this.selectedEventConfig = response;
          this.isConfigFetched = true;
        },
        (error) => {
          console.error('Error fetching event configuration:', error);
        }
      );
  }
  // Alert states
  showAlert: boolean = false;
  alertType: 'success' | 'error' | null = null;

  configureEvent(): void {
    if (this.eventId !== null) {
      const eventConfig: EventConfig = {
        maxCapacity: this.selectedEventConfig.maxCapacity,
        totalTickets: this.selectedEventConfig.totalTickets,
        releaseRate: this.selectedEventConfig.releaseRate,
        retrievalRate: this.selectedEventConfig.retrievalRate,
      };

      const url = `http://localhost:8080/events/configureticketpool/${this.eventId}`;

      this.http
        .post(url, eventConfig, {
          headers: {
            Authorization: 'Bearer ' + this.authService.getToken(),
            'Content-Type': 'application/json',
          },
        })
        .subscribe();
      // Successfully updated the configuration

      this.showAlertWithMessage(
        'Config details updated successfully!',
        'success'
      );
      this.addLog(`Event configured with max capacity = ${this.selectedEventConfig.maxCapacity}, total tickets = ${this.selectedEventConfig.totalTickets}, release rate = ${this.selectedEventConfig.releaseRate}, retrieval rate = ${this.selectedEventConfig.retrievalRate}`);
      // Reload the page after 3 seconds
      setTimeout(() => {
        window.location.reload(); // Force page refresh
      }, 3001); // 3000 milliseconds = 3 seconds
    }

    // Mock save/update logic
    const isSaveSuccessful = true; // Change this to false to simulate an error

    if (isSaveSuccessful) {
      this.alertType = 'success';
    } else {
      this.alertType = 'error';
    }

    // Display the alert
    this.showAlert = true;

    // Hide the alert after 3 seconds
    setTimeout(() => {
      this.showAlert = false;
    }, 3000);
  }

  resetForm(): void {
    this.selectedEventConfig = {
      maxCapacity: 0,
      totalTickets: 0,
      releaseRate: 0,
      retrievalRate: 0,
    };
  }

  toggleEventState(): void {
    if (!this.isConfigFetched) {
      // Successfully updated the configuration
      this.showAlertWithMessage(
        'Please configure the event before starting!',
        'error'
      );

      return;
    }

    if (this.isEventStarted) {
      this.stopEvent();
    } else {
      this.startEvent();
    }
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

  startEvent(): void {
    // Check if all config values are zero
    if (
      this.selectedEventConfig.maxCapacity === 0 ||
      this.selectedEventConfig.totalTickets === 0 ||
      this.selectedEventConfig.releaseRate === 0 ||
      this.selectedEventConfig.retrievalRate === 0
    ) {
      // Show error alert
      this.showAlertWithMessage(
        'Please enter valid config details to start the event.',
        'error'
      );
      return; // Exit the method if validation fails
    }
    const url = `http://localhost:8080/events/start/${this.eventId}`;
    const token = this.authService.getToken();

    this.http
      .post(
        url,
        {},
        {
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
          },
        }
      )
      .subscribe();
      this.addLog('Event started successfully!');
    // Event started successfully
    this.showAlertWithMessage('Event started successfully!', 'success');
    this.isEventStarted = true;
  }

  stopEvent(): void {
    const url = `http://localhost:8080/events/stop/${this.eventId}`;
    const token = this.authService.getToken();

    this.http
      .post(
        url,
        {},
        {
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
          },
        }
      )
      .subscribe();
      this.addLog('Event stopped successfully!');
    this.showAlertWithMessage(
      'Ticket Selling Stopped Successfully!',
      'success'
    );
    this.isEventStarted = false;
  }
}
