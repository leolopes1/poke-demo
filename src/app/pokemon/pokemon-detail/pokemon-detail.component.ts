import {Component, OnInit} from '@angular/core';
import {PokemonService} from "../service/pokemon.service";
import {ActivatedRoute} from "@angular/router";
import {forkJoin, map, switchMap} from "rxjs";
import {PokemonInterface} from "../model/Pokemon.interface";

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css']
})
export class PokemonDetailComponent implements OnInit {
  pokemon: PokemonInterface =
    {
      image: '',
      name: '',
      type: '',
      version: '',
      evolution: '',
      number: 0,
    }
  isLoading = false;

  constructor(private readonly route: ActivatedRoute,
              private readonly pokemonService: PokemonService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      const name = paramMap.get('name');
      if (name) this.getPokemon(name)
    })

  }

  getPokemon(name: string) {
    this.isLoading = true;
    this.pokemonService.getPokemonSpecies(name).pipe(
      map((species: { evolution_chain: { url: string; }; })=>
        species.evolution_chain.url.replace('https://pokeapi.co/api/v2/evolution-chain/', '')),
      switchMap(speciesId => {
      return forkJoin({
        pokemon: this.pokemonService.getPokemon(name),
        evolutions: this.pokemonService.getEvolutions(speciesId),
        form: this.pokemonService.getPokemonForm(name),
      })
    })).subscribe(({pokemon, evolutions, form}) => {
      this.pokemon = {
        ...this.pokemon,
        number: pokemon.id,
        version: form.version_group.name,
        name: pokemon.name,
        type: pokemon.types.map((type: { type: { name: any; }; }) => type.type.name).join(', '),
        image: pokemon.sprites.other['official-artwork'].front_default,
        evolution: this.getEvolutionName(evolutions.chain)
      }
      this.isLoading = false;
    })

  }

  private getEvolutionName(item: any): string {
    const name = item.species.name
    if (item.evolves_to.length > 0) {
      return name + ' -> ' + this.getEvolutionName(item.evolves_to[0])
    }
    return name
  }


}
