import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { Observable, BehaviorSubject, merge, combineLatest } from 'rxjs';
import { map, scan } from 'rxjs/operators';

interface FilterVm {
  pokemons: string[];
}

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  vm$: Observable<FilterVm>;
  filterSubj: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    const unfilteredVm$ = merge(this.retrievePokemons$).pipe(
      scan(
        (vm: FilterVm, mutationFn: (vm: FilterVm) => FilterVm) =>
          mutationFn(vm),
        { pokemons: [] }
      )
    );

    this.vm$ = combineLatest(unfilteredVm$, this.filterSubj).pipe(
      scan(([prevVm, prevFilterArg], [nextVm, nextFilterArg]) => {
        const shouldFilter = prevFilterArg != nextFilterArg;
        const pokemons = shouldFilter
          ? nextVm.pokemons.filter((p) => p.includes(nextFilterArg))
          : prevVm.pokemons;

        return [{ ...nextVm, pokemons }, nextFilterArg];
      }),
      map(([vm, _]) => vm)
    );
  }

  private retrievePokemons$ = this.pokemonService
    .getPokemons()
    .pipe(map((pokemons) => (vm: FilterVm): FilterVm => ({ ...vm, pokemons })));
}
