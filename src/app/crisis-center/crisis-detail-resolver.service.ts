import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';
import { Crisis } from './crisis';
import { CrisisService } from './crisis.service';

@Injectable({
  providedIn: 'root'
})
export class CrisisDetailResolverService implements Resolve<Crisis> {

  constructor(private cs: CrisisService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<Crisis> | Observable<never> {
      const id = +(route.paramMap.get('id') ?? 0);

      return this.cs.getCrisis(id).pipe(
        take(1),
        mergeMap(crisis => {
          if (crisis) {
            return of(crisis);
          } else {
            this.router.navigate(['/crisis-center']);
            return EMPTY;
          }
        })
      );
    }
}
