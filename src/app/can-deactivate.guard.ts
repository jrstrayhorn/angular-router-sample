import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

/**
 * While the guard doesn't have to know which component has a deactivate method,
 * it can detect that the CrisisDetailComponent component has the canDeactivate() method and call it.
 *  The guard not knowing the details of any component's deactivation method makes the guard reusable.
 *
 * Alternatively, you could make a component-specific CanDeactivate guard for the CrisisDetailComponent.
 * The canDeactivate() method provides you with the current instance of the component, the current ActivatedRoute,
 * and RouterStateSnapshot in case you needed to access some external information. This would be useful
 * if you only wanted to use this guard for this component and needed to get the component's properties
 *  or confirm whether the router should allow navigation away from it.
 *  see commented out code for that
 */
@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
  canDeactivate(
    component: CanComponentDeactivate,
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return component.canDeactivate ? component.canDeactivate() : true;
  }
}

// @Injectable({
//   providedIn: 'root',
// })
// export class CanDeactivateGuard implements CanDeactivate<CrisisDetailComponent> {

//   canDeactivate(
//     component: CrisisDetailComponent,
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ): Observable<boolean> | boolean {
//     // Get the Crisis Center ID
//     console.log(route.paramMap.get('id'));

//     // Get the current URL
//     console.log(state.url);

//     // Allow synchronous navigation (`true`) if no crisis or the crisis is unchanged
//     if (!component.crisis || component.crisis.name === component.editName) {
//       return true;
//     }
//     // Otherwise ask the user with the dialog service and return its
//     // observable which resolves to true or false when the user decides
//     return component.dialogService.confirm('Discard changes?');
//   }
// }
