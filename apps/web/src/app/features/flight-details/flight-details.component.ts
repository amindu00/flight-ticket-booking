import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FlightService } from '../../shared/services/flight.service';
import { Flight } from '../../shared/models/flight.model';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BookingService } from '../../shared/services/booking.service';
import { AuthService } from '../../auth/auth.service';

@Component({
    selector: 'app-flight-details',
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatDividerModule,
        MatSnackBarModule
    ],
    templateUrl: './flight-details.component.html',
    styleUrls: ['./flight-details.component.scss']
})
export class FlightDetailsComponent implements OnInit {
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private flightService = inject(FlightService);
    private snackBar = inject(MatSnackBar);
    private bookingService = inject(BookingService);
    private authService = inject(AuthService);

    flight = signal<Flight | undefined>(undefined);
    isLoading = signal<boolean>(true);

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.flightService.getFlightById(id).subscribe({
                next: (flight) => {
                    this.flight.set(flight);
                    this.isLoading.set(false);
                },
                error: () => {
                    this.isLoading.set(false);
                    // Handle error
                }
            });
        }
    }

    bookFlight() {
        const flight = this.flight();
        const user = this.authService.currentUser();

        if (flight && user) {
            this.bookingService.addBooking(flight);

            this.snackBar.open('Flight booked successfully!', 'View Bookings', {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'top'
            }).onAction().subscribe(() => {
                this.router.navigate(['/bookings']);
            });

            if (!this.snackBar._openedSnackBarRef) {
                setTimeout(() => {
                    this.router.navigate(['/bookings']);
                }, 1500);
            }
        } else {
            this.router.navigate(['/auth/login']);
        }
    }

    goBack() {
        this.router.navigate(['/flight-search']);
    }
}
