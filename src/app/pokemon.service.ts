import { Injectable } from '@angular/core';
import pokemons from './data/pokemons.json';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private pokemons: string[];

  constructor() {
    this.pokemons = pokemons;
  }

  getPokemons = (): Observable<string[]> => of(this.pokemons);
}
