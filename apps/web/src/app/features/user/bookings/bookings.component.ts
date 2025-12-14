import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { Booking } from '../../../shared/models/booking.model';
import { BookingStatus } from '../../../shared/models/enums';
import { BookingService } from '../../../shared/services/booking.service';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [
    CurrencyPipe,
    DatePipe,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    RouterLink,
  ],
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss'],
})
export class BookingsComponent implements OnInit {
  private bookingService = inject(BookingService);
  private authService = inject(AuthService);
  private router = inject(Router);

  bookings = signal<Booking[]>([]);

  protected readonly BookingStatus = BookingStatus;

  ngOnInit() {
    const user = this.authService.currentUser();
    if (user) {
      this.bookingService.getBookings().subscribe((bookings) => {
        this.bookings.set(bookings);
      });
    } else {
      this.router.navigate(['/auth/login']);
    }
  }

  cancelBooking(id: number) {
    this.bookingService.cancelBooking(id).subscribe(() => {
      this.bookings.update((bookings) => bookings.filter((b) => b.id !== id));
    });
  }
}
