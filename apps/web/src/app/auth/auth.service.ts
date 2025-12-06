import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../shared/models/user.model';
import { Router } from '@angular/router';
import { tap, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth';
  private http = inject(HttpClient);

  // Signal to hold the current user
  private currentUserSignal = signal<User | null>(null);

  // Computed signal to check if user is logged in
  readonly isLoggedIn = computed(() => !!this.currentUserSignal());

  // Computed signal to get current user
  readonly currentUser = computed(() => this.currentUserSignal());

  constructor(private router: Router) {
    // Check local storage for persisted user on init
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.currentUserSignal.set(JSON.parse(storedUser));
    }
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password }).pipe(
      tap((response) => {
        localStorage.setItem('token', response.access_token);
        this.getProfile().subscribe();
        this.router.navigate(['/']);
      })
    );
  }

  register(
    username: string,
    password: string,
    firstName: string,
    lastName: string
  ): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/register`, {
        username,
        password,
        firstName,
        lastName,
      })
      .pipe(
        tap((response) => {
          localStorage.setItem('token', response.access_token);
          this.getProfile().subscribe();
          this.router.navigate(['/']);
        })
      );
  }

  getProfile(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/profile`).pipe(
      tap((user) => {
        this.currentUserSignal.set(user);
        localStorage.setItem('user', JSON.stringify(user));
      })
    );
  }

  logout(): void {
    this.currentUserSignal.set(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
  }
}
