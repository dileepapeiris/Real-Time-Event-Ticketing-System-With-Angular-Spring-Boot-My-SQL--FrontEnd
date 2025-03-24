
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
  Router,
} from '@angular/router';
import { NavbarCommonComponent } from '../navbar-common/navbar-common.component';
import { AuthService } from '../Service/Auth/auth.service';

@Component({
  selector: 'app-vendor-signup',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    NavbarCommonComponent,
  ],
  templateUrl: './vendor-signup.component.html',
  styleUrl: './vendor-signup.component.css'
})
export class VendorSignupComponent implements OnInit {
  passwordError: boolean = false;
  emailError: boolean = false;
  telephoneError: boolean = false;
  nicError: boolean = false;
  currentStep: number = 1; // Default to Step 1


  showAlert: boolean = false;
  alertMessage: string = '';
  alertType: string = ''; // success or error


  constructor(private authService: AuthService, private route: Router) {}
  

  vendorData= {
    fullName: '',
    address: '',
    telephoneNumber : '', 
    nic: '',
    gender: '',
    email: '',
    password: '',
    confirmPassword: '', 
  };

  ngOnInit(): void {
    this.vendorData = {
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

  register(): void {
    this.authService.registerVendor(this.vendorData).subscribe(
      (response) => {
        this.alertMessage = 'Vendor registered successfully!, You will be redirected to the login page.';
        this.alertType = 'success';
        this.showAlert = true;
        setTimeout(() => {
          this.showAlert = false;
        }, 2000); 

        setTimeout(() => {
          this.route.navigate(['/login']);
        }, 2001); 

        
        
      },
      (error) => {
        this.alertMessage = 'Error: Vendor already exists.';
        this.alertType = 'error';
        this.showAlert = true;
        setTimeout(() => {
          this.showAlert = false;
        }, 3000); // Hide alert after 3 seconds

        
      

      }
    );
  }

  onSubmit(event: Event) {
    event.preventDefault();
    this.passwordError =
      this.vendorData.password !== this.vendorData.confirmPassword ||
      !this.isValidPassword(this.vendorData.password);
    this.emailError = !this.isValidEmail(this.vendorData.email);
    this.telephoneError = !this.isValidPhoneNumber(
      this.vendorData.telephoneNumber
    );
    this.nicError = !this.isValidNic(this.vendorData.nic);

    if (this.vendorData.password !== this.vendorData.confirmPassword) {
      this.vendorData.confirmPassword = ''; // Reset confirm password field
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

  onTelephoneChange(): void {
    this.telephoneError = !this.isValidPhoneNumber(this.vendorData.telephoneNumber);
  }

  onNicChange(): void {
    this.nicError = !this.isValidNic(this.vendorData.nic);
  }

  onEmailChange(): void {
    this.emailError = !this.isValidEmail(this.vendorData.email);
  }

  onPasswordChange(): void {
    this.passwordError =
      this.vendorData.password !== this.vendorData.confirmPassword ||
      !this.isValidPassword(this.vendorData.password);
  }

  onConfirmPasswordChange(): void {
    this.passwordError =
      this.vendorData.password !== this.vendorData.confirmPassword ||
      !this.isValidPassword(this.vendorData.password);
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
    this.telephoneError = !/^\d{10}$/.test(this.vendorData.telephoneNumber); // Check for valid phone number (10 digits)
    this.nicError = this.vendorData.nic.length !== 10; // NIC must be 10 digits
    return this.vendorData.fullName !== '' && this.vendorData.address !== '' && this.vendorData.telephoneNumber !== '' && this.vendorData.nic !== '' && this.vendorData.gender !== '' && !this.telephoneError && !this.nicError;
  }

  // Validate Step 2 fields
  isStep2Valid(): boolean {
    this.emailError = !/\S+@\S+\.\S+/.test(this.vendorData.email); // Check for valid email format
    this.passwordError = !(this.vendorData.password && this.vendorData.password === this.vendorData.confirmPassword); // Check passwords match
    return this.vendorData.email !== '' && this.vendorData.password !== '' && this.vendorData.confirmPassword !== '' && !this.emailError && !this.passwordError;
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
