import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, switchMap, filter, take } from 'rxjs/operators';

import { UserService } from '../services/index';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptorNoRefresh implements HttpInterceptor {
    constructor(private userService: UserService, private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if ([401].includes(err.status)) {
                console.log('>>>status includes [401, 403]:', err.status);
                console.log('>>>ERROR0:', err);
                this.userService.logout();
            }

            if (err.status >= 500) {
                console.log('>>>ERROR1:', err);
                this.router.navigate(['/server-error'])
            }

            if (err.status === 403) {
                console.log('>>>ERROR2:', err);
                this.router.navigate(['/access-denied'])
            }

            const error = (err && err.error && err.error.message) || err.statusText;
            console.error('>>>ERROR3:', err);
            return throwError(error);
        }))
    }
}