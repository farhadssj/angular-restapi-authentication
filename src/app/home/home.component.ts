import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee';
import { EmployeeService } from '../service/employee.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AppRoute } from '../constants/app-route';
import { Constant } from '../constants/constant';
import { debounceTime, tap } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  employeeList: Employee[] = [];
  isLoading: boolean = false;

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

  navigateToEditEmployeeView(employeeID: number) {
    this.router.navigate([AppRoute.EDIT_EMPLOYEE_ROUTE+"/" + employeeID]);
  }

  deleteEmployee(employeeID: number) {
    this.employeeService.deleteEmployee(employeeID).subscribe({
      next: (data) => { 
        this.employeeList = this.employeeList.filter(item => item.id != employeeID);
       },
      error: (error) => { },
      complete: () => { }
    });
  }

  updateValue(employeeID: number, field: string, event: any, dataType: string) {
    const patchValueString = event.target.textContent;
    this.employeeService.patchEmployee(employeeID, field, (dataType == 'number')?parseInt(patchValueString):patchValueString)
    .pipe(
      debounceTime(Constant.DEFAULT_API_CALL_DEBOUNCE_TIME),
      tap(() => {
        this.isLoading = true;
        console.log("updateValue>>tap");
      })
    )
    .subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log("updateValue>>subscribe>>response: " + JSON.stringify(response));
      },
      error: (error) => {
        console.log("updateValue>>subscribe>>error: " + JSON.stringify(error));
       },
      complete: () => { }
    });
  }
}
