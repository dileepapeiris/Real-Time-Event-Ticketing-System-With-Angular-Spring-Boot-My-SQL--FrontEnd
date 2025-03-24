import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventStatusService {
  private eventStatusMap = new BehaviorSubject<Record<number, boolean>>({});

  // Observable for event statuses
  eventStatuses$ = this.eventStatusMap.asObservable();

  setEventStarted(eventId: number, isStarted: boolean): void {
    const currentStatus = this.eventStatusMap.value;
    this.eventStatusMap.next({ ...currentStatus, [eventId]: isStarted });
  }

  isEventStarted(eventId: number): boolean {
    return this.eventStatusMap.value[eventId] || false;
  }
}
