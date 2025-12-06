import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Booking } from '../models/booking.model';
import { Flight } from '../models/flight.model';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private apiUrl = environment.apiEndpoint + 'bookings';
  private http = inject(HttpClient);
  private bookingsSignal = signal<Booking[]>([]);

  readonly bookings = this.bookingsSignal.asReadonly();

  loadBookings() {
    this.http.get<Booking[]>(this.apiUrl).subscribe((bookings) => {
      this.bookingsSignal.set(bookings);
    });
  }

  addBooking(flight: Flight) {
    const booking = { flightId: flight.id };
    this.http.post<Booking>(this.apiUrl, booking).subscribe((newBooking) => {
      this.bookingsSignal.update((bookings) => [newBooking, ...bookings]);
    });
  }

  getUserBookings(): Booking[] {
    return this.bookingsSignal();
  }

  cancelBooking(bookingId: string) {
    this.http.delete(`${this.apiUrl}/${bookingId}`).subscribe(() => {
      this.bookingsSignal.update((bookings) => bookings.filter((b) => b.id !== bookingId));
    });
  }
}
