import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    if (this.authService.getAdminStatus()) {
      return true;
    }

    // Redirect to login if not an admin
    this.router.navigate(['/login']);
    return false;
  }
}
