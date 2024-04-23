import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { AppRoute } from '../constants/app-route';
import { EmployeeService } from '../service/employee.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../interceptor/auth.interceptor';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  providers: [ 
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent implements OnInit{
  employeeForm!: FormGroup;
  submitted = false;
  loading = false;
  apiError: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) {
  }

  ngOnInit() {
    this.employeeForm = this.formBuilder.group({
      name: ['', Validators.required],
      age: [null, Validators.required],
      department: ['', Validators.required],
      salary: [null, Validators.required],
    });
  }

  get employeeFormControl() {
    return this.employeeForm.controls;
  }

  public onSubmit() {
    this.submitted = true;
    this.apiError = null;
    console.log("Employee form submitted");

    // stop here if form is invalid
    if (this.employeeForm.invalid) {
      console.log("Employee form Invalided");
      return;
    }
    if (this.loading) {
      console.log("Employee form already loading");
      return;
    }
    this.loading = true;
    console.log("Employee api calling...: ");

    this.employeeService.addEmployee(
      this.employeeForm.value.name,
      this.employeeForm.value.age,
      this.employeeForm.value.department,
      this.employeeForm.value.salary)
      .subscribe({
        next: (data) => {
          this.loading = false;
          this.apiError = null;
          console.log("Registration in Success Response from server: " + JSON.stringify(data));
          if (data) {
            this.router.navigate([AppRoute.HOME_ROUTE]);
          }
        },
        error: (error) => {
          console.log("Registration in Failure Response from server: "+ JSON.stringify(error));
          this.loading = false;
          if(error.error["message"] != undefined) {
            this.apiError = error.error["message"];
          } else {
            this.apiError = "Registration failed!. Try again";
          }
        },
        complete: () => {
          console.log("Registration in API Call complete");
        }
      });
  }

  navigateToHomeView() {
    this.router.navigate([AppRoute.HOME_ROUTE]);
  }

}