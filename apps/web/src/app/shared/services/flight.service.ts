import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Flight } from '../models/flight.model';

@Injectable({
    providedIn: 'root'
})
export class FlightService {
    private apiUrl = 'http://localhost:3000/flights';
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
