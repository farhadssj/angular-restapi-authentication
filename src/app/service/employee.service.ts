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
}
