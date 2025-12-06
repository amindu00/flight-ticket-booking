import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchFormComponent } from '../search-form/search-form.component';
import { FlightCardComponent } from '../flight-card/flight-card.component';
import { FlightService } from '../../../shared/services/flight.service';
import { Flight } from '../../../shared/models/flight.model';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
    selector: 'app-flight-list',
    standalone: true,
    imports: [
        CommonModule,
        SearchFormComponent,
        FlightCardComponent,
        MatProgressBarModule,
        MatIconModule
    ],
    templateUrl: './flight-list.component.html',
    styleUrls: ['./flight-list.component.scss']
})
export class FlightListComponent {
    private flightService = inject(FlightService);
    private router = inject(Router);

    flights = signal<Flight[]>([]);
    isLoading = signal<boolean>(false);
    hasSearched = signal<boolean>(false);

    onSearch(criteria: { origin: string, destination: string, date: Date }) {
        this.isLoading.set(true);
        this.hasSearched.set(true);

        this.flightService.searchFlights(criteria.origin, criteria.destination, criteria.date)
            .subscribe({
                next: (results) => {
                    this.flights.set(results);
                    this.isLoading.set(false);
                },
                error: (err) => {
                    console.error('Error fetching flights', err);
                    this.isLoading.set(false);
                }
            });
    }

    onSelectFlight(flight: Flight) {
        this.router.navigate(['/flight-details', flight.id]);
    }
}
