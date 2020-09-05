import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../services/index';


@Injectable({ providedIn: 'root' })
export class AuthAdminGuard implements CanActivate {
    constructor(
        private router: Router,
        private userService: UserService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (!this.userService.hasUserToken()) {
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        }
        console.log('>>store user:', this.userService.getStoreUser().foreName);
        return this.userService.isInRole('Admin');
    }
}