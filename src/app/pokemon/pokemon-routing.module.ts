import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PokemonComponent } from './component/pokemon.component';
import {PokemonDetailComponent} from "./pokemon-detail/pokemon-detail.component";

const pokeRoutes: Routes = [
  {
    path: '',
    component: PokemonComponent,
  },
  {
    path: 'pokemon/:name',
    component: PokemonDetailComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(pokeRoutes)],
})
export class PokemonRoutingModule {}
