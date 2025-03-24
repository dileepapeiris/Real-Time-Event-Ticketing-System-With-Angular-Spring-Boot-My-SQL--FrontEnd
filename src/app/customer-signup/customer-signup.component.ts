import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Service/Auth/auth.service';
import { CommonModule } from '@angular/common';
import { NavbarCommonComponent } from '../navbar-common/navbar-common.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer-signup',
  standalone: true,
  imports: [FormsModule, CommonModule, NavbarCommonComponent],
  templateUrl: './customer-signup.component.html',
  styleUrls: ['./customer-signup.component.css'],
})
export class CustomerSignupComponent implements OnInit {
  passwordError: boolean = false;
  emailError: boolean = false;
  telephoneError: boolean = false;
  nicError: boolean = false;
  currentStep: number = 1; // Default to Step 1


  showAlert: boolean = false;
  alertMessage: string = '';
  alertType: string = ''; // success or error

  customerData = {
    fullName: '',
    address: '',
    telephoneNumber: '',
    nic: '',
    gender: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  constructor(private authService: AuthService, private route: Router) {}

  ngOnInit(): void {
    this.customerData = {
      fullName: '',
      address: '',
      telephoneNumber: '',
      nic: '',
      gender: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
  }

  // Register method to submit data to the server
  register(): void {
    this.authService.registerCustomer(this.customerData).subscribe({
      next: () => {
        this.alertMessage = 'Customer registered successfully!, You will be redirected to the login page.';
        this.alertType = 'success';
        this.showAlert = true;
        setTimeout(() => {
          this.showAlert = false;
        }, 2000); 

        setTimeout(() => {
          this.route.navigate(['/login']);
        }, 2001); 
      },
      error: () => {
        this.alertMessage = 'Error: Customer already exists.';
        this.alertType = 'error';
        this.showAlert = true;
        setTimeout(() => {
          this.showAlert = false;
        }, 3000); // Hide alert after 3 seconds
      },
    });
  }

  onSubmit(event: Event) {
    event.preventDefault();
    this.passwordError =
      this.customerData.password !== this.customerData.confirmPassword ||
      !this.isValidPassword(this.customerData.password);
    this.emailError = !this.isValidEmail(this.customerData.email);
    this.telephoneError = !this.isValidPhoneNumber(
      this.customerData.telephoneNumber
    );
    this.nicError = !this.isValidNic(this.customerData.nic);

    if (this.customerData.password !== this.customerData.confirmPassword) {
      this.customerData.confirmPassword = ''; // Reset confirm password field
    } else if (
      !this.emailError &&
      !this.passwordError &&
      !this.telephoneError &&
      !this.nicError
    ) {
      // Proceed with form submission logic
      this.register();
    }
  }

  // Instant validation for each field
  onFullNameChange(): void {
    // Add any validation for full name if required
  }

  onAddressChange(): void {
    // Add any validation for address if required
  }

  onTelephoneChange(): void {
    this.telephoneError = !this.isValidPhoneNumber(
      this.customerData.telephoneNumber
    );
  }

  onNicChange(): void {
    this.nicError = !this.isValidNic(this.customerData.nic);
  }

  onEmailChange(): void {
    this.emailError = !this.isValidEmail(this.customerData.email);
  }

  onPasswordChange(): void {
    this.passwordError =
      this.customerData.password !== this.customerData.confirmPassword ||
      !this.isValidPassword(this.customerData.password);
  }

  onConfirmPasswordChange(): void {
    this.passwordError =
      this.customerData.password !== this.customerData.confirmPassword ||
      !this.isValidPassword(this.customerData.password);
  }

  // Validate email address using regex
  isValidEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }

  // Validate telephone number using regex
  isValidPhoneNumber(phone: string): boolean {
    const phonePattern = /^[0-9]{10}$/;
    return phonePattern.test(phone);
  }

  // Validate NIC number using regex (10 digits)
  isValidNic(nic: string): boolean {
    const nicPattern = /^\d{10}$/;
    return nicPattern.test(nic);
  }

  // Validate password with at least two uppercase, two lowercase, two digits, and two symbols
  isValidPassword(password: string): boolean {
    const passwordPattern =
      /^(?=(.*[a-z]){2})(?=(.*[A-Z]){2})(?=(.*\d){2})(?=(.*[\W_]){2}).{8,}$/;
    return passwordPattern.test(password);
  }

  // Validate Step 1 fields
  isStep1Valid(): boolean {
    this.telephoneError = !/^\d{10}$/.test(this.customerData.telephoneNumber); // Check for valid phone number (10 digits)
    this.nicError = this.customerData.nic.length !== 10; // NIC must be 10 digits
    return this.customerData.fullName !== '' && this.customerData.address !== '' && this.customerData.telephoneNumber !== '' && this.customerData.nic !== '' && this.customerData.gender !== '' && !this.telephoneError && !this.nicError;
  }

  // Validate Step 2 fields
  isStep2Valid(): boolean {
    this.emailError = !/\S+@\S+\.\S+/.test(this.customerData.email); // Check for valid email format
    this.passwordError = !(this.customerData.password && this.customerData.password === this.customerData.confirmPassword); // Check passwords match
    return this.customerData.email !== '' && this.customerData.password !== '' && this.customerData.confirmPassword !== '' && !this.emailError && !this.passwordError;
  }

  // Function to move to the next step
  goToStep(step: number) {
    if (step === 2 && this.isStep1Valid()) {
      this.currentStep = step;
    } else if (step === 1 && this.isStep2Valid()) {
      this.currentStep = step;
    }
  }

}
