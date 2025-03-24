import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthService } from '../Service/Auth/auth.service';
import { Router } from '@angular/router';
import { NavbarHomepageComponent } from '../navbar-homepage/navbar-homepage.component';
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-booking-history',
  templateUrl: './booking-history.component.html',
  standalone: true,
  imports: [CommonModule, NavbarHomepageComponent, FooterComponent],
  styleUrls: ['./booking-history.component.css'],
})
export class BookingHistoryComponent implements OnInit {
  bookingHistory: any[] = [];

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {
    this.fetchBookingHistory();
  }

  ngOnInit(): void {
    this.fetchBookingHistory();
  }

  fetchBookingHistory(): void {
    const token = 'Bearer ' + this.authService.getToken();
    this.http
      .get<[]>('http://localhost:8080/events/bookinghistory', {
        headers: { Authorization: token },
      })
      .subscribe({
        next: (data) => {
          this.bookingHistory = data;
        },
        error: (err) => {
          console.error('Failed to fetch booking history:', err);
        },
      });
  }
}
