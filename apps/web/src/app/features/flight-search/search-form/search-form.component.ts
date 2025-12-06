import { Component, inject, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

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
        MatIconModule
    ],
    templateUrl: './search-form.component.html',
    styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent {
    search = output<{ origin: string, destination: string, date: Date }>();

    searchForm = inject(FormBuilder).group({
        origin: ['', Validators.required],
        destination: ['', Validators.required],
        date: [new Date(), Validators.required]
    });

    onSubmit() {
        if (this.searchForm.valid) {
            this.search.emit(this.searchForm.value as { origin: string, destination: string, date: Date });
        }
    }
}
