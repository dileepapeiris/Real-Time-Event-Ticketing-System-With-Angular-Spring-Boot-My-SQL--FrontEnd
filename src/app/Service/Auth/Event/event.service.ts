import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private apiUrl = 'http://localhost:8080/events';

  constructor(private http: HttpClient, private authService: AuthService) {}

  createEvent(eventData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, eventData, {
      headers: { Authorization: 'Bearer ' + this.authService.getToken() },
    });
  }

  getAllEvents(): Observable<any> {
    return this.http.get(`${this.apiUrl}/all`);
  }

  


    
}
