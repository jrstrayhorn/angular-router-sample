import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { MessageService } from '../message.service';

import { Crisis } from './crisis';
import { CRISES } from './mock-crises';

@Injectable({
  providedIn: 'root',
})
export class CrisisService {

  constructor(private messageService: MessageService) { }

  getCrises(): Observable<Crisis[]> {
    // TODO: send the message _after_ fetching the crises
    this.messageService.add('CrisisService: fetched crises');
    return of(CRISES);
  }

  getCrisis(id: number): Observable<Crisis | undefined> {
    return of(CRISES.find(crisis => crisis.id === id));
  }
}
