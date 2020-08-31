import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../services/index';

import {Observable} from 'rxjs';
import { of,  } from 'rxjs';
import { delay, map } from 'rxjs/operators';
// import 'rxjs/add/observable/of';
// import 'rxjs/add/operator/delay';


@Injectable({ providedIn: 'root' })
export class AuthResidentsGuard implements CanActivate {
    constructor(
        private router: Router,
        private userService: UserService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (!this.userService.hasUserToken()) {
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        }
        console.log('>>>==', this.userService.getStoreUser());
        if (this.userService.isInRole('Manager') || this.userService.isInRole('Admin')) {
            return true;
        }

        return false;
    }
}