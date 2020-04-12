import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Person, PersonDetail } from './persons';
import { Observable, Subject, merge } from 'rxjs';
import { PersonService } from './person.service';
import { map, mergeMap, scan } from 'rxjs/operators';

interface PersonVm {
  persons: Person[];
  personDetail: PersonDetail;
}

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonsComponent implements OnInit {
  vm$: Observable<PersonVm>;
  personDetailSubj = new Subject<Person>();
  // sort function for the keyvalue pipe
  keepOrder = (): number => 1;

  constructor(private personService: PersonService) {}

  ngOnInit(): void {
    this.vm$ = merge(this.personList$, this.personDetail$).pipe(
      scan(
        (vm: PersonVm, mutationFn: (vm: PersonVm) => PersonVm) =>
          mutationFn(vm),
        { persons: [], personDetail: this.personService.getFirstPersonDetail() }
      )
    );
  }

  private personList$ = this.personService
    .getPersons()
    .pipe(map((persons) => (vm: PersonVm): PersonVm => ({ ...vm, persons })));

  private personDetail$ = this.personDetailSubj.pipe(
    mergeMap((person) => this.personService.getPersonDetail(person.id)),
    map((personDetail) => (vm: PersonVm): PersonVm => ({
      ...vm,
      personDetail
    }))
  );
}
