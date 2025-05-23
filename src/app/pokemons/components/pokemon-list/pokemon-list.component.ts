import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PokemonCardComponent } from "../pokemon-card/pokemon-card.component";

@Component({
  selector: 'pokemon-list',
  imports: [
    CommonModule,
    PokemonCardComponent
],
  templateUrl: 'pokemon-list.component.html',
  styleUrl: './pokemon-list.component.css'
})
export class PokemonListComponent { }
