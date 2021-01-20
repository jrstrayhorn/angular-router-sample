import { Component, OnInit, Input } from '@angular/core';
import { Crisis } from '../crisis';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { CrisisService } from '../crisis.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-crisis-detail',
  templateUrl: './crisis-detail.component.html',
  styleUrls: ['./crisis-detail.component.css']
})
export class CrisisDetailComponent implements OnInit {

  crisis$?: Observable<Crisis | undefined>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: CrisisService
  ) { }

  ngOnInit(): void {
    // the observable version useful if doing back/next functionality
    // and want to reuse the component
    this.crisis$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        const id = params.get('id');
        if (id) {
          return this.service.getCrisis(+id);
        }
        return of(undefined);
      })
    );

    // the non-observable version using snapshot
    // better if you know that you need to visit list
    // before going to detail (no back/next)
    // const id = this.route.snapshot.paramMap.get('id');
    // if (id) {
    //   this.hero$ = this.service.getHero(+id);
    // }

  }

  gotoCrises(crisis: Crisis): void {
    const crisisId = crisis ? crisis.id : null;
    // pass along the hero id if available
    // so that the HeroList component can select that hero
    // incdlue a junk 'foo'prop for fun

    // can use a relative path to navigate within a feature module
    // that way if parent routes change, routes in feature won't break
    // need to pass ActivatedRoute as relativeTo to tell Angular
    // to route relative to this feature module
    // can use directory like syntax to tell how to navigate within feature module
    // ./ or no leading slash is relative to the current level
    // ../ to go up one level in the route path
    // always have to specify the complete absolute path with calling router's
    // navigateByUrl() method
    this.router.navigate(['../', { id: crisisId, foo: 'foo' }], { relativeTo: this.route });
  }

}
