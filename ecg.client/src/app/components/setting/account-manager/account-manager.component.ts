import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-account-manager',
  templateUrl: './account-manager.component.html',
})
export class AccountManagerComponent implements OnInit {
  user: any; 
  resetForm: FormGroup; 
  formVisible: boolean = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.resetForm = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    this.loadUser();
  }

  // Load user details from the AuthService
  loadUser() {
    this.user = {
      userName: 'Admin',
    };
    console.log('User has been loaded:', this.user);
  }


  // Reset password logic
  resetPassword() {
    if (this.resetForm.invalid) {
      console.error('Form is invalid');
      return;
    }

    const formData = this.resetForm.value;
    this.authService.resetPassword(formData.oldPassword, formData.newPassword).subscribe({
      next: () => {
        alert('Password reset successfully!');
        this.resetForm.reset();
        this.formVisible = false;
      },
      error: (err) => {
        console.error('Error resetting password:', err);
        alert(err.error.error || 'Failed to reset password.');
      },
    });
  }

  // Show or hide the reset password form
  spanForm() {
    this.formVisible = !this.formVisible;
    this.resetForm.reset();
    console.log('Form visibility toggled:', this.formVisible);
  }
}
