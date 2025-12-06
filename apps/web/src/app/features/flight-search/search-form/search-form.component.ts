import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-search-form',
    standalone: true,
    imports: [
        CommonModule,
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
    @Output() search = new EventEmitter<{ origin: string, destination: string, date: Date }>();

    private fb = inject(FormBuilder);

    searchForm = this.fb.group({
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
