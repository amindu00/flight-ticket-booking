import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Flight } from '../models/flight.model';

@Injectable({
  providedIn: 'root',
})
export class FlightService {
  private apiUrl = environment.apiEndpoint + 'flights';
  private http = inject(HttpClient);

  searchFlights(origin: string, destination: string, date: Date): Observable<Flight[]> {
    let params = new HttpParams()
      .set('origin', origin)
      .set('destination', destination)
      .set('date', date.toISOString());

    return this.http.get<Flight[]>(`${this.apiUrl}/search`, { params });
  }

  getFlightById(id: string): Observable<Flight> {
    return this.http.get<Flight>(`${this.apiUrl}/${id}`);
  }
}
