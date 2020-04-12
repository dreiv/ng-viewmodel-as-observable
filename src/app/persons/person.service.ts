import { Injectable } from '@angular/core';
import { Person, PersonDetail } from './persons';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private persons: Person[];
  private personDetails: PersonDetail[];

  constructor() {
    this.persons = [
      { id: 'j7f', nick: 'drei' },
      { id: 'c7kq', nick: 'jeff' },
      { id: '2o8o', nick: 'leo' }
    ];

    this.personDetails = [
      {
        id: 'j7f',
        name: 'Andrei Voicu',
        age: 33,
        description: 'coder by day, by night also a coder'
      },
      {
        id: 'c7kq',
        name: 'Jeffrey Makepretend',
        age: 88,
        description: 'Has survived multiple world wars, waits for the next one.'
      },
      {
        id: '2o8o',
        name: 'Leroy Jerkins',
        age: 22,
        description:
          'Likes to spice things up, by enticing enemies onto friends :D'
      }
    ];
  }

  getPersons = (): Observable<Person[]> => of(this.persons);

  getPersonDetail = (id: string): Observable<PersonDetail> =>
    of(this.personDetails.find((detail) => detail.id == id));

  getFirstPersonDetail = (): PersonDetail => this.personDetails[0];
}
