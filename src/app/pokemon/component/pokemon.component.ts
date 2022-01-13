import {Component, OnInit, ViewChild} from '@angular/core';
import {first, map} from 'rxjs';
import {PokemonService} from '../service/pokemon.service';
import {Table} from "primeng/table";

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css'],
})
export class PokemonComponent implements OnInit {
  constructor(private readonly pokeService: PokemonService) {
  }

  public pokemonList: any;

  ngOnInit(): void {
    this.getPokemonList()
  }

  private getPokemonList() {
    this.pokeService.getPokemonList()
      .pipe(map(data => {
        return data.results.map((item: any) => {
          const number = item.url.replace('https://pokeapi.co/api/v2/pokemon/', '').replace('/', '')
          return {
            number: number,
            name: item.name,
            img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${number}.png`
          }
        })
      }))
      .subscribe((data) => {
        this.pokemonList = data;
      });
  }
  @ViewChild('dt') dt: Table | undefined;

  applyFilterGlobal($event: Event, stringVal: any) {
    this.dt?.filterGlobal(($event.target as HTMLInputElement).value, 'contains');
  }
}
