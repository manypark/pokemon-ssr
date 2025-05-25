import { map, tap } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { toSignal } from "@angular/core/rxjs-interop";
import { ActivatedRoute, Router } from '@angular/router';
import { Component, inject, OnInit, signal } from '@angular/core';

import { SimplePokemon } from '../../pokemons/interfaces';
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { PokemonListComponent } from "../../pokemons/components/pokemon-list/pokemon-list.component";
import { PokemonListSkeletonComponent } from "../../pokemons/ui/pokemon-list-skeleton/pokemon-list-skeleton.component";


@Component({
  selector    : 'app-pokemons-page',
  imports: [
    PokemonListComponent,
    PokemonListSkeletonComponent
],
  templateUrl : './pokemons-page.component.html',
  styleUrl    : './pokemons-page.component.css',
})
export default class PokemonsPageComponent implements OnInit {

  pokemonList = signal<SimplePokemon[]>([]);
  private pokemonServices = inject(PokemonsService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private title = inject(Title);

  currentPage = toSignal<number>( 
    this.route.queryParamMap.pipe(
      map( (params) => params.get('page') ?? '1' ),
      map( (page) => ( isNaN(+page) ? 1 : +page ) ),
      map( (page) => Math.max(1, page) ),
    )
  );

  ngOnInit():void {
    this.loadPokemons(0);
  }

  loadPokemons( nextPage:number ) {

    const loadPage = this.currentPage()! + nextPage;

    this.pokemonServices.loadPages(loadPage).pipe(
      tap( () => this.router.navigate([], { queryParams: { page: loadPage } } ) ),
      tap( () => this.title .setTitle(`Pokemon SSR Page - ${loadPage}`) ),
    ).subscribe( pokemons => {
        this.pokemonList.set(pokemons);
      }
    );

  }

}
