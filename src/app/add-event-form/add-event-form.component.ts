import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { EventService } from '../Service/Auth/Event/event.service';
import { ReactiveFormsModule } from '@angular/forms';
import { VendordashbordnavbarComponent } from "../vendordashbordnavbar/vendordashbordnavbar.component";

@Component({
  selector: 'app-add-event-form',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
   
    FormsModule,
    ReactiveFormsModule,
    VendordashbordnavbarComponent
],
  templateUrl: './add-event-form.component.html',
  styleUrl: './add-event-form.component.css',
})
export class AddEventFormComponent implements OnInit {
  imageUrl: string | null = null;
  eventForm: FormGroup;
  isModalOpen: boolean = true;
  alertType: 'success' | 'error' = 'success'; // To determine the type of alert
  showAlert: boolean = false; // To control alert visibility

  constructor(
    private router: Router,
    private eventService: EventService,
    private fb: FormBuilder
  ) {
    this.eventForm = this.fb.group({
      eventName: ['', Validators.required],
      eventDescription: ['', Validators.required],
      eventDate: ['', Validators.required],
      eventTime: ['', Validators.required],
      eventLocation: ['', Validators.required],
      ticketPrice: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]*$'), // Validate as a number (only digits)
          Validators.min(1), // Optional: Ensure price is greater than 0
        ],
      ],
      eventBanner: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Trigger a page reload only once
    if (!localStorage.getItem('componentLoaded')) {
      localStorage.setItem('componentLoaded', 'true');
      window.location.reload(); // Force page refresh
    } else {
      localStorage.removeItem('componentLoaded'); // Clean up for future loads
    }
  }

  updateImagePreview(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.imageUrl = input.value;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  onSubmit(): void {
    this.eventForm.markAllAsTouched();
    if (this.eventForm.valid) {
      console.log(this.eventForm.value);
      this.closeModal();
      this.eventService.createEvent(this.eventForm.value).subscribe(
        (response) => {
          console.log('Event created successfully:', response);
          this.alertType = 'success'; // Set alert type to success
          this.showAlert = true; // Show the success alert
          setTimeout(() => {
            this.showAlert = false; // Hide alert after 2 seconds
          }, 2001);
          setTimeout(() => {
            window.location.reload(); // Reload the page after 3 seconds
          }, 2000);
          
        },
        (error) => {
          console.error('Error creating event:', error);
          this.alertType = 'error'; // Set alert type to error
          this.showAlert = true; // Show the error alert
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }

  saveImageUrl(): void {
    console.log('Closing modal...');
    let modalInputUrl = (
      document.getElementById('modal-banner-url') as HTMLInputElement
    ).value;
    this.eventForm.get('eventBanner')?.setValue(modalInputUrl);
    this.imageUrl = modalInputUrl;
  }
}
