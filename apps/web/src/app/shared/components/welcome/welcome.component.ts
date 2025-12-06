import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [MatButton],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {
  private router = inject(Router);

  featuredFlights = [
    { id: '1', airline: 'Skyways', from: 'NYC', to: 'LAX', price: 199, depart: '08:00' },
    { id: '2', airline: 'CloudAir', from: 'SFO', to: 'ORD', price: 149, depart: '12:30' },
    { id: '3', airline: 'AeroFly', from: 'MIA', to: 'ATL', price: 99, depart: '16:45' }
  ];

  viewDetails(id: string) {
    this.router.navigate(['/flight-details', id]);
  }
}
