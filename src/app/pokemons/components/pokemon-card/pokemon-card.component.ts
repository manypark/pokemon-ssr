import { RouterLink } from '@angular/router';
import { Component, computed, input } from '@angular/core';

import { SimplePokemon } from '../../interfaces';

@Component({
  selector    : 'pokemon-card',
  imports     : [ RouterLink ],
  templateUrl : './pokemon-card.component.html',
  styleUrl    : './pokemon-card.component.css',
})
export class PokemonCardComponent {

  pokemon = input.required<SimplePokemon>();

  pokemonImage = computed( () => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${this.pokemon().id}.png`);
  
}
