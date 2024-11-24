import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAdmin: boolean = false;

  constructor(private http: HttpClient, private router: Router) { }

  // Login Method
  login(username: string, password: string): Observable<any> {
    return this.http.post('/api/auth/login', { username, password }).pipe(
      tap((response: any) => {
        localStorage.setItem('authToken', response.token);
        this.setAdminStatus(response.isAdmin);
      })
    );
  }


  // Store admin status
  setAdminStatus(status: boolean): void {
    this.isAdmin = status;
  }

  getAdminStatus(): boolean {
    // Check token existence to prevent admin status from being false after page refresh
    if (localStorage.getItem('authToken') && !this.isAdmin) {
      this.decodeTokenAndSetAdminStatus();
    }
    return this.isAdmin;
  }

  // Logout Method
  logout(): void {
    localStorage.removeItem('authToken');
    this.isAdmin = false;
    this.router.navigate(['/login']);
  }

  // Decode the token and update admin status
  private decodeTokenAndSetAdminStatus(): void {
    const token = localStorage.getItem('authToken');
    if (!token) return;

    // Decode JWT without verifying (to extract payload)
    const tokenPayload = JSON.parse(atob(token.split('.')[1]));
    this.isAdmin = tokenPayload.isAdmin === 'true' || tokenPayload.isAdmin === true;
  }

  // Check if a user is logged in
  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }
}
