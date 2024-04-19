import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEndPoint } from '../constants/api-endpoint';
import { ApiResponse } from '../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public static AUTH_STORAGE_KEY = "auth_response_key";

  constructor(private httpClient: HttpClient) { }

  public login(username: string, password: string): Observable<ApiResponse<String>> {
    const userCredential = {
      "username": username,
      "password": password,
      };
    return this.httpClient.post<ApiResponse<String>>(ApiEndPoint.API_LOGIN_ENDPOINT, userCredential);
  }

  // public logout(): Observable<any> {
  //   return this.httpClient.get<any>(ApiEndPoint.API_LOGOUT_ENDPOINT);
  // }

  // public userRegistration(userName: string, password: string, userEmail: string, mobileNumber: string): Observable<UserRegistrationResponse> {

  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //   });

  //   const userData = {
  //     "name": userName,
  //     "password": password,
  //     "email": userEmail,
  //     "mobileNumber": mobileNumber
  //   }
  //   console.log(userData);

  //   return this.httpClient.post<UserRegistrationResponse>(ApiEndPoint.API_USER_REGISTRATION_ENDPOINT, userData, { headers });
  // }

  public saveUserSession(authResult: ApiResponse<String>) {
    localStorage.setItem(AuthService.AUTH_STORAGE_KEY, JSON.stringify(authResult.details));
  }

  public removeUserSession() {
    localStorage.removeItem(AuthService.AUTH_STORAGE_KEY);
  }

  public getUserSession(): any {
    return localStorage.getItem(AuthService.AUTH_STORAGE_KEY);
  }

  public isUserLogin(): boolean {
    const authResponse = this.getUserSession();
    if (authResponse) {
      return true;
    }
    return false;
  }
}
