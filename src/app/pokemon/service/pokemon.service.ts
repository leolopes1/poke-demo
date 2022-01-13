import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(private readonly http: HttpClient) {
  }

  private readonly urlAPI = 'https://pokeapi.co/api/v2';

  getPokemonList(limit = 251, offset = 0,): Observable<any> {
    return this.http
      .get(`${this.urlAPI}/pokemon/?offset=${offset}&limit=${limit}`);
  }
  getPokemon(name: string): Observable<any> {
    return this.http.get(`${this.urlAPI}/pokemon/${name}`);
  }
  getPokemonForm(name: string): Observable<any> {
    return this.http.get(`${this.urlAPI}/pokemon-form/${name}`);
  }
  getEvolutions(name: string): Observable<any> {
    return this.http.get(`${this.urlAPI}/evolution-chain/${name}`);
  }

  getPokemonSpecies(name: string): Observable<any> {
    return this.http.get(`${this.urlAPI}/pokemon-species/${name}`);
  }

}
