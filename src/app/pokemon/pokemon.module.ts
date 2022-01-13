import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PokemonComponent} from './component/pokemon.component';
import {PokemonService} from './service/pokemon.service';
import {PokemonRoutingModule} from './pokemon-routing.module';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {TableModule} from 'primeng/table';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';
import {CardModule} from "primeng/card";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {ProgressSpinnerModule} from "primeng/progressspinner";

@NgModule({
  declarations: [PokemonComponent, PokemonDetailComponent],
  imports: [CommonModule, PokemonRoutingModule, RouterModule, HttpClientModule, TableModule, CardModule, InputTextModule, ButtonModule, ProgressSpinnerModule],
  providers: [PokemonService],
})
export class PokemonModule {
}
