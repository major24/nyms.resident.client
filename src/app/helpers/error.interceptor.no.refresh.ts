import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, switchMap, filter, take } from 'rxjs/operators';

import { AuthenticationService } from '../services/index';

@Injectable()
export class ErrorInterceptorNoRefresh implements HttpInterceptor {
    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if ([401, 403].includes(err.status)) {
                console.log('>>>status includes [401, 403]:', err.status);
                console.log('>>>statusText:', err.statusText);
              if (err && err.error){
                  console.log('>>>', err.error.message);
                  if (err.error.message && err.error.message.includes('INVALID TOKEN:')){
                      this.authenticationService.logout();
                  }
              }
            }

            const error = (err && err.error && err.error.message) || err.statusText;
            console.error('>>>>=-', err);
            return throwError(error);
        }))
    }
}