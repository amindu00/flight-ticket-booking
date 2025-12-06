import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../../shared/services/booking.service';
import { AuthService } from '../../../auth/auth.service';
import { Booking } from '../../../shared/models/booking.model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { Router } from '@angular/router';

@Component({
    selector: 'app-bookings',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatChipsModule
    ],
    templateUrl: './bookings.component.html',
    styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent implements OnInit {
    private bookingService = inject(BookingService);
    private authService = inject(AuthService);
    private router = inject(Router);

    bookings = signal<Booking[]>([]);

    ngOnInit() {
        const user = this.authService.currentUser();
        if (user) {
            this.bookingService.loadBookings();
            this.bookings.set(this.bookingService.getUserBookings());
        } else {
            this.router.navigate(['/auth/login']);
        }
    }

    cancelBooking(id: string) {
        this.bookingService.cancelBooking(id);
        const user = this.authService.currentUser();
        if (user) {
            this.bookings.set(this.bookingService.getUserBookings());
        }
    }
}
