import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'; // Import tap

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/auth'; // Spring Boot base URL
  private tokenKey = 'auth-token';
  private userKey = 'auth-user'; // Storing user details in localStorage


  constructor(private http: HttpClient) {}

  registerCustomer(customerData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/customerregister`, customerData);
  }

  registerVendor(vendorData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/vendorregister`, vendorData);
  }

  // Modify the login method to store the token
  login(loginData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, loginData).pipe(
      tap((response: any) => {
        if (response && response.token) {
          this.setToken(response.token); // Store token after login
          this.setUser(response.fullName); // Store user data (like name)
        }
      })
    );
  }

  // Store token in local storage
  private setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  // Get the stored token
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Store user data (customer details)
  private setUser(user: any) {
    localStorage.setItem(this.userKey, (user));
  }

  // Get the stored user details
  getUser(): any {
    console.log(localStorage.getItem(this.userKey));
    return localStorage.getItem(this.userKey);
    
  }

  // Check if the user is authenticated
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // Logout method
  signOut(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
  }
}
