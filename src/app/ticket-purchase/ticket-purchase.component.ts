import { Component } from '@angular/core';
import { NavbarHomepageComponent } from '../navbar-homepage/navbar-homepage.component';
import { FooterComponent } from '../footer/footer.component';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../Service/Auth/auth.service';
import { Event } from '../Interfaces/event';

@Component({
  selector: 'app-ticket-purchase',
  templateUrl: './ticket-purchase.component.html',
  styleUrls: ['./ticket-purchase.component.css'],
  imports: [NavbarHomepageComponent, FooterComponent],
  standalone: true,
})
export class TicketPurchaseComponent {
  eventId: number | null = null;
  event: Event | null = null;

  TicketCount: number = 1;

   // Variables for the alert
  showAlert: boolean = false;
  alertType: string = '';
  alertMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.route.paramMap.subscribe((params) => {
      this.eventId = Number(params.get('id')); // Assuming the route parameter is named 'id'
      console.log('Extracted Event ID:', this.eventId);
      if (this.eventId) {
        this.fetchVendorEvents(); // Fetch the event after setting the ID
      }
    });
  }

  fetchVendorEvents(): void {
    const token = 'Bearer ' + this.authService.getToken();
    console.log('Token:', token);
    console.log('Event ID:', this.eventId);

    this.http
      .get<Event>(`http://localhost:8080/events/checkout/${this.eventId}`, {
        headers: { Authorization: token },
      })
      .subscribe(
        (data) => {
          console.log('API Response:', data);
          this.event = data;
        },
        (error) => console.error('Error fetching event:', error)
      );
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.eventId = Number(params.get('id')); // 'id' must match the route parameter name
      console.log('Extracted Event ID:', this.eventId);
    });
    
  }



  increment(): void {
    this.TicketCount++;
  }

  decrement(): void {
    this.TicketCount--;
  }

  buyTickets(): void {
    if (!this.eventId) {
      alert('Event ID is missing or invalid.');
      return;
    }
  
    const token = 'Bearer ' + this.authService.getToken();
    console.log('Token:', token);
    console.log('Event ID:', this.eventId);
  
    const url = `http://localhost:8080/events/buy/${this.eventId}`;
  
    this.http
      .post(url, { ticketCount: this.TicketCount }, { // Pass ticket count in the request body
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      })
      .subscribe(
        (response) => {
          
          alert(`Tickets successfully purchased: ${this.TicketCount}`);
        },
        (error) => {
          
          alert(`Tickets successfully purchased: ${this.TicketCount}`);
          
        }
      );
  }
  
  
}
