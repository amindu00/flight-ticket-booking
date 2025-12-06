import { Routes } from '@angular/router';
import { authGuard } from './auth/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'auth/login',
    loadComponent: () => import('./auth/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'auth/register',
    loadComponent: () =>
      import('./auth/register/register.component').then((m) => m.RegisterComponent),
  },
  {
    path: '',
    loadComponent: () =>
      import('./shared/components/welcome/welcome.component').then((m) => m.WelcomeComponent),
    pathMatch: 'full',
  },
  {
    path: 'flight-search',
    loadComponent: () =>
      import('./features/flight-search/flight-list/flight-list.component').then(
        (m) => m.FlightListComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'flight-details/:id',
    loadComponent: () =>
      import('./features/flight-details/flight-details.component').then(
        (m) => m.FlightDetailsComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'bookings',
    loadComponent: () =>
      import('./features/user/bookings/bookings.component').then((m) => m.BookingsComponent),
    canActivate: [authGuard],
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./features/user/profile/profile.component').then((m) => m.ProfileComponent),
    canActivate: [authGuard],
  },
];
