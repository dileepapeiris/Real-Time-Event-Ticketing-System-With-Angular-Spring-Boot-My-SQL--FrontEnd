import { Component } from '@angular/core';
import { HomePageComponent } from "../home-page/home-page.component";
import { NavbarHomepageComponent } from "../navbar-homepage/navbar-homepage.component";

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [NavbarHomepageComponent],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {
  standardTickets: number = 1;
  vipTickets: number = 0;

  constructor() { }

  

  increment(type: 'standard'): void {
    if (type === 'standard') {
      this.standardTickets++;
    }
  }

  decrement(type: 'standard'): void {
    if (type === 'standard' && this.standardTickets > 0) {
      this.standardTickets--;
    }
  }

  buyTickets(): void {
    alert(
      `You are purchasing:\nStandard Tickets: ${this.standardTickets}\nVIP Tickets: ${this.vipTickets}`
    );
  }

}
