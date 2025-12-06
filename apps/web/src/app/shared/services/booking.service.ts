import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Booking } from '../models/booking.model';
import { Flight } from '../models/flight.model';
import { tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BookingService {
    private apiUrl = 'http://localhost:3000/bookings';
    private http = inject(HttpClient);
    private bookingsSignal = signal<Booking[]>([]);

    readonly bookings = this.bookingsSignal.asReadonly();

    constructor() {
        // Ideally load bookings on init if user is logged in, or call loadBookings from component
    }

    loadBookings() {
        this.http.get<Booking[]>(this.apiUrl).subscribe(bookings => {
            this.bookingsSignal.set(bookings);
        });
    }

    addBooking(flight: Flight) {
        const booking = { flightId: flight.id };
        this.http.post<Booking>(this.apiUrl, booking).subscribe(newBooking => {
            this.bookingsSignal.update(bookings => [newBooking, ...bookings]);
        });
    }

    getUserBookings(): Booking[] {
        return this.bookingsSignal();
    }

    cancelBooking(bookingId: string) {
        this.http.delete(`${this.apiUrl}/${bookingId}`).subscribe(() => {
            this.bookingsSignal.update(bookings =>
                bookings.filter(b => b.id !== bookingId)
            );
        });
    }
}
