import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MessageService } from 'src/app/message.service';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.css']
})
export class HeroListComponent implements OnInit {

  heroes$?: Observable<Hero[]>;
  selectedId?: number;

  constructor(
    private service: HeroService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.heroes$ = this.route.paramMap.pipe(
      switchMap(params => {
        // (+) before 'params.get()' turns the string into a number
        this.selectedId = +(params.get('id') ?? 0);
        return this.service.getHeroes();
      })
    );
  }

}
