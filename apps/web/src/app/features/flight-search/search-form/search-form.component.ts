import { Component, inject, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AsyncPipe } from '@angular/common';
import { FlightService } from '../../../shared/services/flight.service';

@Component({
    selector: 'app-search-form',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatButtonModule,
        MatIconModule,
        MatAutocompleteModule,
        AsyncPipe
    ],
    templateUrl: './search-form.component.html',
    styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent {
    search = output<{ origin: string, destination: string, date: Date, originId?: number, destinationId?: number }>();
    flightService = inject(FlightService);

    airports$ = this.flightService.getAirports();

    searchForm = inject(FormBuilder).group({
        origin: ['', Validators.required],
        destination: ['', Validators.required],
        date: [new Date(), Validators.required]
    });

    onSubmit() {
        if (this.searchForm.valid) {
            const formValue = this.searchForm.value;
            const originAirport = formValue.origin as any;
            const destinationAirport = formValue.destination as any;

            this.search.emit({
                origin: typeof originAirport === 'string' ? originAirport : originAirport.code,
                destination: typeof destinationAirport === 'string' ? destinationAirport : destinationAirport.code,
                date: formValue.date!,
                originId: typeof originAirport === 'object' ? originAirport.id : undefined,
                destinationId: typeof destinationAirport === 'object' ? destinationAirport.id : undefined
            });
        }
    }

    displayFn(airport: any): string {
        return airport && airport.code ? `${airport.city} (${airport.code})` : '';
    }
}
