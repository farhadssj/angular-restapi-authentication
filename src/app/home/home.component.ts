import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee';
import { EmployeeService } from '../service/employee.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AppRoute } from '../constants/app-route';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  employeeList: Employee[] = [];

  constructor(private employeeService: EmployeeService, private router: Router){

  }

  ngOnInit() {
    this.fetchAllEmployee();
  }

  fetchAllEmployee(){
    this.employeeService.getAllEmployee().subscribe({
      next: (data) => { 
        this.employeeList = [];
        data.details.forEach(employee => {
          this.employeeList.push(employee);
        });
       },
      error: (error) => { },
      complete: () => { }
    });
  }

  navigateToAddEmployeeView() {
    this.router.navigate([AppRoute.ADD_EMPLOYEE_ROUTE]);
  }
}
