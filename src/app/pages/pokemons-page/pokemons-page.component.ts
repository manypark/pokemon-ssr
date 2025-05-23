import { Component } from '@angular/core';
import { PokemonListComponent } from "../../pokemons/components/pokemon-list/pokemon-list.component";

@Component({
  selector    : 'app-pokemons-page',
  imports     : [PokemonListComponent],
  templateUrl : './pokemons-page.component.html',
  styleUrl    : './pokemons-page.component.css',
})
export default class PokemonsPageComponent { }
