import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Service/Auth/auth.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarCommonComponent } from '../navbar-common/navbar-common.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterOutlet,
    RouterLink,
    NavbarCommonComponent,
  ],
})
export class LoginComponent implements OnInit {
  loginData = { email: '', password: '', role: 'customer' };
  showAlert = false; // Control the visibility of alerts
  alertType: 'success' | 'error' | null = null; // Determine alert type
  alertMessage = ''; // Custom message for the alert
  showPassword = false;  // Initially, the password is hidden

  constructor(private authService: AuthService, private route: Router) {}

  ngOnInit(): void {
    this.loginData = { email: '', password: '', role: 'customer' };
  }

  login(): void {
    this.authService.login(this.loginData).subscribe(
      (response) => {
        this.showAlert = true;
        this.alertType = 'success';
        this.alertMessage = 'Login successful!';
        console.log('User:', response);

        setTimeout(() => {
          this.showAlert = false;
          if (this.loginData.role === 'customer') {
            this.route.navigate(['/home']);
          } else if (this.loginData.role === 'vendor') {
            this.route.navigate(['/vendorDashboard']);
          }
        }, 2000); // Hide alert after 2 seconds
      },
      (error) => {
        this.showAlert = true;
        this.alertType = 'error';
        this.alertMessage = 'Invalid username, password, or role.';
        console.error('Login error:', error);

        setTimeout(() => {
          this.showAlert = false; // Hide alert after 2 seconds
        }, 2001);
      }
    );
  }
  // Function to toggle password visibility
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
