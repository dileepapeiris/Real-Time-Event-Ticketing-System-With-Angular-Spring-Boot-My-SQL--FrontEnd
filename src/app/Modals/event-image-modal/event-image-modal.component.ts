import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { AddEventFormComponent } from '../../add-event-form/add-event-form.component';

@Component({
  selector: 'app-event-image-modal',
  standalone: true,
  imports: [FormsModule, CommonModule, AddEventFormComponent, RouterModule,RouterOutlet,
    RouterLink,
    RouterLinkActive],
  templateUrl: './event-image-modal.component.html',
  styleUrl: './event-image-modal.component.css',
})
export class EventImageModalComponent {
  eventBannerUrl: string | null = null;
  isModalOpen: boolean = false;
  modalElement: HTMLElement | null = null;

  constructor(private router: Router) {}

  openModal() {
    this.isModalOpen = true;
    setTimeout(() => {
      this.modalElement?.focus();  // Set focus to modal
    }, 0);
  }

  closeModal() {
    this.isModalOpen = false;
    // Optionally return focus to the previous element
  }

  saveBannerUrl() {
    if (this.eventBannerUrl) {
      console.log('Closing modal...');
      this.closeModal();
      console.log('Navigating to AddEventFormComponent with:', this.eventBannerUrl);
      this.router.navigate(['/addEventForm'], {
        state: { bannerUrl: this.eventBannerUrl },
      });
    }
  }
}
