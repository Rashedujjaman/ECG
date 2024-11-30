import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SnackBarService } from '../../services/snackbar.service';
import { HttpErrorResponse } from '@angular/common/http'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private SnackBarService: SnackBarService) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onLogin() {
    const { username, password } = this.loginForm.value;
    this.authService.login(username, password).subscribe({
      next:  (response) => {
        if (response.isAdmin) {
          this.router.navigate(['/setting']);
        } else {
          this.SnackBarService.error('You are not authorized to access admin privilages', null, 3000);
        }
      },

      error: (error: HttpErrorResponse) => {
        // Handle different types of errors
        let errorMessage = 'An error occurred. Please try again.';
        if (error.status === 0) {
          errorMessage = 'Unable to connect to the server. Please check your network.';
        } else if (error.status === 401) {
          errorMessage = 'Invalid username or password. Please try again.';
        } else if (error.status === 403) {
          errorMessage = 'Access denied. You do not have the required permissions.';
        } else if (error.error) {
          errorMessage = error.error;
        }

        this.SnackBarService.error(errorMessage, null, 3000);
      }
    });
  }
}
