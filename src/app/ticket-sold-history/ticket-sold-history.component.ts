import { Component, OnInit } from '@angular/core';
import { EventService } from '../Service/Auth/Event/event.service';
import { AuthService } from '../Service/Auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { VendordashbordnavbarComponent } from "../vendordashbordnavbar/vendordashbordnavbar.component";

@Component({
  selector: 'app-ticket-sold-history',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink,  VendordashbordnavbarComponent],
  templateUrl: './ticket-sold-history.component.html',
  styleUrl: './ticket-sold-history.component.css'
})
export class TicketSoldHistoryComponent implements OnInit {
  ticketSoldHistory: any[] = [];
  eventId = 1;

  constructor(
    private eventService: EventService,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute // Inject ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Use ActivatedRoute to get the eventId from route parameters
    this.eventId = Number(this.route.snapshot.paramMap.get('eventId'));
    if (this.eventId) {
      this.fetchEventConfig();
    }
  }

  fetchEventConfig(): void {
    const url = `http://localhost:8080/events/viewbookeddetails/${this.eventId}`;
    this.http
      .get<any>(url, {
        headers: {
          Authorization: 'Bearer ' + this.authService.getToken(),
        },
      })
      .subscribe(
        (response) => {
          this.ticketSoldHistory = response;
        },
        (error) => {
          console.error('Error fetching event configuration:', error);
        }
      );
  }
}


