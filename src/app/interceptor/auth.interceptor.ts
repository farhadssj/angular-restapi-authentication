import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { Constant } from '../constants/constant';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('AuthInterceptor>>intercept>>URL: ' + request.url);
    if (!this.authService.isUserLogin()) {
      console.log('AuthInterceptor>>intercept>>Has no valid auth user');
      return this.handleRequest(request, next);
    }
    var authorizationToken = "Bearer " + this.authService.getUserAccessToken()
    console.log('AuthInterceptor>>intercept>>Has valid auth user:' + authorizationToken);
    const modifiedRequest = request.clone({
      headers: request.headers.set(Constant.AUTH_TOKEN_HEADER_KEY, authorizationToken)
    });
    return this.handleRequest(modifiedRequest, next);
  }

  handleRequest(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('AuthInterceptor>>intercept>>HttpErrorResponse: ' + JSON.stringify(error));
          return throwError(() => error);
      })
    );
  }
}