import { map, tap } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { toSignal } from "@angular/core/rxjs-interop";
import { Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { SimplePokemon } from '../../pokemons/interfaces';
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { PokemonListComponent } from "../../pokemons/components/pokemon-list/pokemon-list.component";
import { PokemonListSkeletonComponent } from "../../pokemons/ui/pokemon-list-skeleton/pokemon-list-skeleton.component";


@Component({
  selector    : 'app-pokemons-page',
  imports: [
    RouterLink,
    PokemonListComponent,
    PokemonListSkeletonComponent
],
  templateUrl : './pokemons-page.component.html',
  styleUrl    : './pokemons-page.component.css',
})
export default class PokemonsPageComponent {

  pokemonList = signal<SimplePokemon[]>([]);
  private pokemonServices = inject(PokemonsService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private title = inject(Title);

  currentPage = toSignal<number>(
    this.route.params.pipe(
      map( (params) => params['page'] ?? '1' ),
      map( (page) => ( isNaN(+page) ? 1 : +page ) ),
      map( (page) => Math.max(1, page) ),
    )
  );

  loadOnPAgeChanged = effect(() => {
    this.loadPokemons( this.currentPage()! );
  });

  loadPokemons( nextPage:number ) {

    this.pokemonServices.loadPages(nextPage).pipe(
      // cuando se usa el query params
      // tap( () => this.router.navigate([], { queryParams: { page: loadPage } } ) ),
      tap( () => this.title .setTitle(`Pokemon SSR Page - ${nextPage}`) ),
    ).subscribe( pokemons => {
        this.pokemonList.set(pokemons);
      }
    );

  }

}
