import { Component, OnInit, Input } from '@angular/core';
import { Crisis } from '../crisis';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, of } from 'rxjs';
import { DialogService } from 'src/app/dialog.service';
import { CrisisDetailResolverService } from '../crisis-detail-resolver.service';

@Component({
  selector: 'app-crisis-detail',
  templateUrl: './crisis-detail.component.html',
  styleUrls: ['./crisis-detail.component.css']
})
export class CrisisDetailComponent implements OnInit {

  // no longer needed because of route resolver
  // crisis$?: Observable<Crisis | undefined>;
  crisis!: Crisis;
  editName!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.route.data
      .subscribe((data: any) => {
        this.editName = data.crisis.name;
        this.crisis = data.crisis;
      });
    // no longer needed because of route resolver
    // the observable version useful if doing back/next functionality
    // // and want to reuse the component
    // this.crisis$ = this.route.paramMap.pipe(
    //   switchMap((params: ParamMap) => {
    //     const id = params.get('id');
    //     if (id) {
    //       return this.service.getCrisis(+id);
    //     }
    //     return of(undefined);
    //   })
    // );

    // the non-observable version using snapshot
    // better if you know that you need to visit list
    // before going to detail (no back/next)
    // const id = this.route.snapshot.paramMap.get('id');
    // if (id) {
    //   this.hero$ = this.service.getHero(+id);
    // }

    // a version of this component (w/o resolver) would
    // try to load the data here and if it doesn't work would navigate away
    // or in this case just show a blank component :-/
    // a better experience might be to handle that first, before the route is activated
    // a resoulver service could retrieve the data or navigate away, if data does not
    // exist, before activating the route and creating the component
  }

  cancel(): void {
    this.gotoCrises();
  }

  save(): void {
    this.crisis.name = this.editName;
    this.gotoCrises();
  }

  canDeactivate(): Observable<boolean> | boolean {
    // allow syncrhonous navigation ('true') if no crisis or the crisis is unchanged
    if (!this.crisis || this.crisis.name === this.editName) {
      return true;
    }

    // otherwise ask the user with the dialog service and return its
    // observable which resolves to true or false when the user decides
    return this.dialogService.confirm('Discard changes?');
  }

  gotoCrises(): void {
    const crisisId = this.crisis?.id;
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
