import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { PokemonCardComponent } from "../pokemon-card/pokemon-card.component";
import { SimplePokemon } from '../../interfaces';

@Component({
  selector: 'pokemon-list',
  imports: [
    CommonModule,
    PokemonCardComponent
],
  templateUrl: 'pokemon-list.component.html',
  styleUrl: './pokemon-list.component.css'
})
export class PokemonListComponent {

  pokemons = input.required<SimplePokemon[]>();

}
