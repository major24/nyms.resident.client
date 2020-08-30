import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment'; // '@environments/environment';
import { AuthenticationService } from '../services/index'; // '@app/services';
import { catchError } from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthenticationService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('>>>>', request.url);
    // add auth header with jwt if user is logged in and request is to the api url
    const isapiDomainUrl = request.url.startsWith(environment.apiDomainUrl);
    
    const token = this.authService.getToken();
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    return next.handle(request);
  }
}
