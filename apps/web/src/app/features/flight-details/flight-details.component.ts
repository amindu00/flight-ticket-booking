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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BookingService } from '../../shared/services/booking.service';
import { AuthService } from '../../auth/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FlightSeat } from '../../shared/models/flight-seat.model';
import { Fare } from '../../shared/models/fare.model';
import { Passenger } from '../../shared/models/passenger.model';
import { switchMap, tap } from 'rxjs/operators';


@Component({
    selector: 'app-flight-details',
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatDividerModule,
        MatSnackBarModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule
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
    isBooking = signal<boolean>(false);
    showPassengerForm = signal<boolean>(false);
    passengerFound = signal<Passenger | null>(null);

    passportControl = new FormControl('', [Validators.required]);
    passengerForm = new FormGroup({
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        dateOfBirth: new FormControl('', [Validators.required]),
    });

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

    checkPassenger() {
        if (this.passportControl.invalid || !this.passportControl.value) return;

        this.isBooking.set(true);
        const passportId = this.passportControl.value;

        this.bookingService.checkPassenger(passportId).subscribe({
            next: (passenger) => {
                this.passengerFound.set(passenger);
                this.showPassengerForm.set(false);
                this.isBooking.set(false);
                this.proceedToBook(passenger);
            },
            error: () => {
                this.passengerFound.set(null);
                this.showPassengerForm.set(true);
                this.isBooking.set(false);
            }
        });
    }

    submitPassenger() {
        if (this.passengerForm.invalid) return;

        this.isBooking.set(true);
        const passengerData = {
            ...this.passengerForm.value,
            passportId: this.passportControl.value
        } as Partial<Passenger>;

        this.bookingService.createPassenger(passengerData).subscribe({
            next: (passenger) => {
                this.passengerFound.set(passenger);
                this.proceedToBook(passenger);
            },
            error: () => {
                this.isBooking.set(false);
                this.snackBar.open('Error creating passenger', 'Close', { duration: 3000 });
            }
        });
    }

    proceedToBook(passenger: Passenger) {
        const flight = this.flight();
        const user = this.authService.currentUser();

        if (!flight || !user) {
            this.router.navigate(['/auth/login']);
            return;
        }

        // Fetch seats and fares
        // For simplicity, we pick the first available seat and first fare
        // In a real app, user would select these
        this.flightService.getSeats(flight.id.toString()).pipe(
            switchMap(seats => {
                const availableSeat = seats.find(s => s.isAvailable);
                if (!availableSeat) throw new Error('No seats available');
                return this.flightService.getFares(flight.id.toString()).pipe(
                    switchMap(fares => {
                        const fare = fares[0]; // Pick first fare
                        if (!fare) throw new Error('No fares available');
                        return this.bookingService.addBooking({
                            flightId: flight.id,
                            passengerId: passenger.id,
                            seatId: availableSeat.id,
                            fareId: fare.id
                        });
                    })
                );
            })
        ).subscribe({
            next: () => {
                this.isBooking.set(false);
                this.showSuccess();
            },
            error: (err) => {
                this.isBooking.set(false);
                this.snackBar.open(err.message || 'Booking failed', 'Close', { duration: 3000 });
            }
        });
    }

    showSuccess() {
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
    }

    goBack() {
        this.router.navigate(['/flight-search']);
    }
}
