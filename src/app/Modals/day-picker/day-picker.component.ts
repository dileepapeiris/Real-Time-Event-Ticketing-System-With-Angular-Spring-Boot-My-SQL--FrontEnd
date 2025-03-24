import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-day-picker',
  templateUrl: './day-picker.component.html',
  styleUrls: ['./day-picker.component.css'],
  standalone: true,
})
export class DayPickerComponent {
  @Output() dateSelected = new EventEmitter<string>();

  onDateChange(date: string) {
    this.dateSelected.emit(date); // Emit selected date
  }
}
