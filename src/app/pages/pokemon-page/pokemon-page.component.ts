import { tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { Component, inject, OnInit, signal } from '@angular/core';

import { Pokemon } from '../../pokemons/interfaces';
import { PokemonsService } from '../../pokemons/services/pokemons.service';

@Component({
  selector    : 'pokemon-page',
  templateUrl : './pokemon-page.component.html',
  styleUrl    : './pokemon-page.component.css',
})
export default class PokemonPageComponent implements OnInit {

  private pokemonServices = inject(PokemonsService);
  private route           = inject(ActivatedRoute);
  private title           = inject(Title);
  private meta            = inject(Meta);

  pokemon = signal<Pokemon | null >(null); 

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');
    if(!id) return;

    this.pokemonServices.loadPokemon(id).pipe(
      tap( ({ id, name }) => {

        const pageTitle = `#${id} - ${name}`;
        const pageDescription = `Página del Pokemon ${name}`;
        const imagePokemon = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

        this.title.setTitle( pageTitle );

        this.meta.updateTag({ name: 'description', content: pageDescription });
        this.meta.updateTag({ name: 'og:title', content: pageTitle });
        this.meta.updateTag({ name: 'og:description', content: pageDescription });
        this.meta.updateTag({ name: 'og:image', content: imagePokemon });

      }),
    ).subscribe( this.pokemon.set );

  }

}