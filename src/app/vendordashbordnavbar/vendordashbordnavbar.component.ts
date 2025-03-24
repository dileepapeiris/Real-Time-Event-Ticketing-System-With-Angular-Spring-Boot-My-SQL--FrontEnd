import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../Service/Auth/auth.service';
import { ViewEventsOfAllVendorsComponent } from "../view-events-of-all-vendors/view-events-of-all-vendors.component";
@Component({
  selector: 'app-vendordashbordnavbar',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, ViewEventsOfAllVendorsComponent],
  templateUrl: './vendordashbordnavbar.component.html',
  styleUrl: './vendordashbordnavbar.component.css'
})
export class VendordashbordnavbarComponent {
  
  constructor(public authService : AuthService) {

  }

  

}
