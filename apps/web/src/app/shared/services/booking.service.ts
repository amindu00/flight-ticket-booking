import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Booking } from '../models/booking.model';
import { Passenger } from '../models/passenger.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private apiUrl = environment.apiEndpoint + 'bookings';
  private passengersUrl = environment.apiEndpoint + 'passengers';
  private http = inject(HttpClient);
  getBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.apiUrl);
  }

  addBooking(bookingData: { flightId: number; passengerId: number; seatId: number; fareId: number }): Observable<Booking> {
    return this.http.post<Booking>(this.apiUrl, bookingData);
  }

  cancelBooking(bookingId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${bookingId}`);
  }

  checkPassenger(passportId: string): Observable<Passenger> {
    return this.http.get<Passenger>(`${this.passengersUrl}/${passportId}`);
  }

  createPassenger(passenger: Partial<Passenger>): Observable<Passenger> {
    return this.http.post<Passenger>(this.passengersUrl, passenger);
  }
}
