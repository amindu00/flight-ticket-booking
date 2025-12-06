import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatButton } from '@angular/material/button';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatButton, MatError,MatLabel, MatFormField, MatInput, ReactiveFormsModule, RouterLink],

  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  private authService = inject(AuthService);

  registerForm = inject(FormBuilder).nonNullable.group(
    {
      username: ['', [Validators.required, Validators.minLength(2)]],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    },
    { validators: this.passwordMatchValidator }
  );

  isLoading = false;
  error = '';

  passwordMatchValidator(g: any) {
    return g.get('password').value === g.get('confirmPassword').value ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.error = '';
      const { username, firstName, lastName, password } = this.registerForm.value;

      this.authService.register(username!, firstName!, lastName!, password!).subscribe({
        next: () => {
          this.isLoading = false;
          // Navigation handled in service
        },
        error: (err) => {
          this.isLoading = false;
          this.error = 'Registration failed. Please try again.';
        },
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
