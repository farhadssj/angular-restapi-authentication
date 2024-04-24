import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEndPoint } from '../constants/api-endpoint';
import { ApiResponse } from '../models/api-response';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private httpClient: HttpClient) { }

  public getAllEmployee(): Observable<ApiResponse<Employee[]>> {
    return this.httpClient.get<ApiResponse<Employee[]>>(ApiEndPoint.API_ALL_EMPLOYEE_ENDPOINT);
  }

  public getEmployee(employeeID: number): Observable<ApiResponse<Employee>> {
    return this.httpClient.get<ApiResponse<Employee>>(ApiEndPoint.API_SPECIFIC_EMPLOYEE_ENDPOINT+"/"+ employeeID);
  }

  public addEmployee(name: string, age : number, department: string, salary: number): Observable<ApiResponse<null>> {
    return this.httpClient.post<ApiResponse<null>>(ApiEndPoint.API_ADD_EMPLOYEE_ENDPOINT, new Employee(name, age, department, salary));
  }

  public updateEmployee(employeeID: number, name: string, age : number, department: string, salary: number): Observable<ApiResponse<null>> {
    return this.httpClient.put<ApiResponse<null>>(ApiEndPoint.API_UPDATE_EMPLOYEE_ENDPOINT + "/" + employeeID, new Employee(name, age, department, salary));
  }

  public patchEmployee(employeeID: number, fieldName: string, value : string): Observable<ApiResponse<null>> {
    const userData = {
      [fieldName]: value
    };
    return this.httpClient.patch<ApiResponse<null>>(ApiEndPoint.API_PATCH_EMPLOYEE_ENDPOINT + "/" + employeeID, userData);
  }

  public deleteEmployee(employeeID: number): Observable<ApiResponse<null>> {
    return this.httpClient.delete<ApiResponse<null>>(ApiEndPoint.API_DELETE_EMPLOYEE_ENDPOINT + "/"+ employeeID);
  }

  
  
}
