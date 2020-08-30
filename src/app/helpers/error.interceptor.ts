// import { Injectable } from '@angular/core';
// import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
// import { Observable, throwError, BehaviorSubject } from 'rxjs';
// import { catchError, switchMap, filter, take } from 'rxjs/operators';

// import { AuthenticationService } from '../services/index';

// @Injectable()
// export class ErrorInterceptor implements HttpInterceptor {
//     private isRefreshing = false;
//     private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

//     constructor(private authenticationService: AuthenticationService) { }

//     intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//         return next.handle(request).pipe(catchError(err => {
//             console.log('>>>token expired. ready to validate-status: ', err.status);
//             console.log('>>>check if svr invalidated', err);
//             if (err && err.error){
//                 console.log('>>>', err.error.message);
//                 if (err.error.message && err.error.message.includes('Invalid token:')){
//                     this.authenticationService.logout();
//                 }
//             }

//             if (!this.authenticationService.getToken()){
//                 return next.handle(request);
//             }

//             if ([401, 403].includes(err.status) && this.authenticationService.getToken()) {
//                 console.log('>>>status includes [401, 403]: ');
//                 // auto logout if 401 or 403 response returned from api
//                 if (!this.isRefreshing){
//                     this.isRefreshing = true;
//                     this.refreshTokenSubject.next(null);

//                     return this.authenticationService.refreshToken().pipe(
//                         switchMap((token: any) => {
//                           this.isRefreshing = false;
//                           console.log('>>>==', token);
//                           this.refreshTokenSubject.next(token.jwtToken);
//                           request = request.clone({
//                             setHeaders: { Authorization: `Bearer ${token.jwtToken}` }
//                           });
//                           //return next.handle(this.addToken(request, token.jwt));
//                           return next.handle(request);
//                         }));
//                 }
//                 else {
//                     return this.refreshTokenSubject.pipe(
//                     filter(token => token != null),
//                     take(1),
//                     switchMap(jwt => {
//                         console.log('>>>!!!', request);
//                         return next.handle(request); //this.addToken(request, jwt));
//                     }));
//                 }
//                 // this.authenticationService.logout();
//             }

//             const error = (err && err.error && err.error.message) || err.statusText;
//             console.error('>>>>=-', err);
//             return throwError(error);
//         }))
//     }
// }