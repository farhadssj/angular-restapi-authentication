import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { AppRoute } from '../constants/app-route';
import { EmployeeService } from '../service/employee.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../interceptor/auth.interceptor';
import { Employee } from '../models/employee';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  providers: [ 
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  templateUrl: './edit-employee.component.html',
  styleUrl: './edit-employee.component.css'
})
export class EditEmployeeComponent implements OnInit{
  employeeForm!: FormGroup;
  submitted = false;
  loading = false;
  apiError: string | null = null;
  employee!: Employee;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    this.route.url.subscribe(segments => {
      const employeeID = parseInt(segments[segments.length - 1].path);
      if(isNaN(employeeID)){
        this.navigateToHomeView();
      } else {
        this.fetchEmployeeInfo(employeeID);
      }
    });
  }

  fetchEmployeeInfo(employeeID: number) {
    this.employeeService.getEmployee(employeeID).subscribe({
      next: (result) => {
        this.employee = result.details;
        this.employeeForm = this.formBuilder.group({
          name: [this.employee.name, Validators.required],
          age: [this.employee.age, Validators.required],
          department: [this.employee.department, Validators.required],
          salary: [this.employee.salary, Validators.required],
        });
       },
      error: (error) => {
        this.navigateToHomeView();
      },
      complete: () => { }
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

    this.employeeService.updateEmployee(
      this.employee.id,
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
            this.navigateToHomeView();
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