import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, switchMap, filter, take } from 'rxjs/operators';

import { UserService } from '../services/index';

@Injectable()
export class ErrorInterceptorNoRefresh implements HttpInterceptor {
    constructor(private userService: UserService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if ([401, 403].includes(err.status)) {
                console.log('>>>status includes [401, 403]:', err.status);
                console.log('>>>statusText:', err.statusText);
                this.userService.logout();
            }

            const error = (err && err.error && err.error.message) || err.statusText;
            console.error('>>>ERROR:', err);
            return throwError(error);
        }))
    }
}