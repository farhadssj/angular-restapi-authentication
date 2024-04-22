import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { AppRoute } from '../constants/app-route';
import { ApiResponse } from '../models/api-response';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  registrationForm!: FormGroup;
  submitted = false;
  loading = false;
  regError: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    // redirect to perspective dashboard if already logged in
    if (this.authService.isUserLogin()) {
      this.router.navigate([AppRoute.HOME_ROUTE]);
    }
  }

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required],
    });
  }

  get registrationFormControl() {
    return this.registrationForm.controls;
  }

  public onSubmit() {
    this.submitted = true;
    this.regError = null;
    console.log("Registration form submitted");

    // stop here if form is invalid
    if (this.registrationForm.invalid) {
      console.log("Registration form Invalided");
      return;
    }
    if (this.loading) {
      console.log("Registration form already loading");
      return;
    }
    this.loading = true;
    console.log("Registration api calling...: ");

    this.authService.userRegistration(
      this.registrationForm.value.name,
      this.registrationForm.value.username,
      this.registrationForm.value.password,
      this.registrationForm.value.role)
      .subscribe({
        next: (data) => {
          this.loading = false;
          this.regError = null;
          console.log("Registration in Success Response from server: " + JSON.stringify(data));
          if (data) {
            this.authService.saveUserSession(data);
            this.router.navigate([AppRoute.HOME_ROUTE]);
          }
        },
        error: (error) => {
          console.log("Registration in Failure Response from server: "+ JSON.stringify(error));
          this.loading = false;
          if(error.error["message"] != undefined) {
            this.regError = error.error["message"];
          } else {
            this.regError = "Registration failed!. Try again";
          }
        },
        complete: () => {
          console.log("Registration in API Call complete");
        }
      });
  }

  navigateToSignInView() {
    this.router.navigate([AppRoute.LOGIN_ROUTE]);
  }

}
