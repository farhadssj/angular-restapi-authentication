import { Component, OnInit } from '@angular/core';
import { AppRoute } from '../constants/app-route';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  returnUrl!: String;
  loginForm!: FormGroup;
  submitted = false;
  loading = false;
  authError = false;

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
    // get return url from route parameters or default to Admin page
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || undefined;
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get loginFormControl() {
    return this.loginForm.controls;
  }

  public onSubmit() {
    this.submitted = true;
    this.authError = false;
    console.log("Login form submitted");

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      console.log("Login form Invalided");
      return;
    }
    if (this.loading) {
      console.log("Login form already loading");
      return;
    }
    this.loading = true;
    console.log("Log in api calling...: ");

    this.authService.login(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe({
        next: (data) => {
          this.loading = false;
          this.authError = false;
          console.log("Log in Success Response from server: " + JSON.stringify(data));
          if (data) {
            this.authService.saveUserSession(data);
            if (this.returnUrl == undefined) {
              console.log("Return url is undefined & redirect to role based dashboard");
              this.router.navigate([AppRoute.HOME_ROUTE]);
            } else {
              console.log("Return url is valid & redirect to route: " + this.returnUrl);
              this.router.navigate([this.returnUrl]);
            }
          }
        },
        error: (error) => {
          console.log("Log in Failure Response from server: "+ JSON.stringify(error));
          this.loading = false;
          this.authError = true;
        },
        complete: () => {
          console.log("Log in API Call complete");
        }
      });
  }

  navigateToRegisterView() {
    this.router.navigate([AppRoute.REGISTER_ROUTE]);
  }


}
