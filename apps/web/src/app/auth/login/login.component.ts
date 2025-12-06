import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {  RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatButton, MatError, MatLabel, MatFormField, MatInput, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  private authService = inject(AuthService);

  loginForm = inject(FormBuilder).nonNullable.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  isLoading = false;
  error = '';

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.error = '';
      const { username, password } = this.loginForm.value;

      this.authService.login(username!, password!).subscribe({
        next: () => {
          this.isLoading = false;
          // Navigation handled in service
        },
        error: (err) => {
          this.isLoading = false;
          this.error = 'Invalid email or password';
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
