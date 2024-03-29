import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router,
  CanActivateChild, NavigationExtras, CanLoad, Route } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      const url: string = state.url;

      return this.checkLogin(url);
  }

  // this can protect child routes, this runs before any child route is activated
  // we protected the admin feature module from unauthorized access. should also protect
  // child routes within the feature module
  // this is extending the authGard to protect when navigating between the admin routes
  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  canLoad(route: Route): boolean {
    const url = `/${route.path}`;

    return this.checkLogin(url);
  }

  // use queryParams or fragment to add those during routing
  // can use these persistent bits of information for things that need
  // to be provided across pages like authentication tokens or session ids
  checkLogin(url: string): boolean {
    if (this.authService.isLoggedIn) { return true; }

    // store the attempted URL for redirecting
    this.authService.redirectUrl = url;

    // create a dummy session id
    const sessionId = 123456789;

    // set our navigation extras object
    // that contains our global query params and fragment
    const navigationExtras: NavigationExtras = {
      queryParams: { session_id: sessionId },
      fragment: 'anchor'
    };

    // redirect to the login page with extras
    this.router.navigate(['/login'], navigationExtras);
    return false;
  }
}
