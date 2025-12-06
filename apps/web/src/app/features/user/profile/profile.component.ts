import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../auth/auth.service';
import { BookingService } from '../../../shared/services/booking.service';
import { User } from '../../../shared/models/user.model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { Router, RouterLink } from '@angular/router';

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatDividerModule,
        RouterLink
    ],
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    private authService = inject(AuthService);
    private bookingService = inject(BookingService);
    private router = inject(Router);

    user = signal<User | null>(null);
    bookingCount = signal<number>(0);

    ngOnInit() {
        const currentUser = this.authService.currentUser();
        if (currentUser) {
            this.user.set(currentUser);
            this.bookingService.loadBookings();
            const bookings = this.bookingService.getUserBookings();
            this.bookingCount.set(bookings.length);
        } else {
            this.router.navigate(['/auth/login']);
        }
    }

    logout() {
        this.authService.logout();
    }
}
