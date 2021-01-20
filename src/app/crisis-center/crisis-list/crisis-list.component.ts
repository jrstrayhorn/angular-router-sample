import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Crisis } from '../crisis';
import { CrisisService } from '../crisis.service';

import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-crisis-list',
  templateUrl: './crisis-list.component.html',
  styleUrls: ['./crisis-list.component.css']
})
export class CrisisListComponent implements OnInit {

  crises$?: Observable<Crisis[]>;
  selectedId?: number;

  constructor(
    private service: CrisisService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.crises$ = this.route.paramMap.pipe(
      switchMap(params => {
        // (+) before 'params.get()' turns the string into a number
        this.selectedId = +(params.get('id') ?? 0);
        return this.service.getCrises();
      })
    );
  }

}
