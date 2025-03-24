import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../Service/Auth/auth.service';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { VendordashbordnavbarComponent } from "../vendordashbordnavbar/vendordashbordnavbar.component";

@Component({
  selector: 'app-ticket-sales-chart',
  templateUrl: './ticket-sales-chart.component.html',
  styleUrls: ['./ticket-sales-chart.component.css'],
  standalone: true,
  imports: [CommonModule, VendordashbordnavbarComponent],
})
export class TicketSalesChartComponent implements OnInit {
  public events: any[] = [];  // Array to store events and their ticket count

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    this.getVendorEventsWithTicketCount();
  }

  getVendorEventsWithTicketCount(): void {
    const token = 'Bearer ' + this.authService.getToken();
    this.http
      .get<any>('http://localhost:8080/events/mine/graph', {
        headers: { Authorization: token },
      })
      .subscribe((data) => {
        console.log(data);  // Check the data structure
        this.events = data;
      });
  }
}
