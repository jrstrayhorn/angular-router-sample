import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { HeroService } from '../hero.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  hero$?: Observable<Hero | undefined>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: HeroService
  ) { }

  ngOnInit(): void {
    // the observable version useful if doing back/next functionality
    // and want to reuse the component
    this.hero$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        const id = params.get('id');
        if (id) {
          return this.service.getHero(+id);
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

  gotoHeroes(hero: Hero): void {
    const heroId = hero ? hero.id : null;
    // pass along the hero id if available
    // so that the HeroList component can select that hero
    // incdlue a junk 'foo'prop for fun
    this.router.navigate(['/heroes', { id: heroId, foo: 'foo' }]);
  }

}
