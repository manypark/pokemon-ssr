import { catchError, map, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { PokeApiResponse, Pokemon, SimplePokemon } from '../interfaces';

@Injectable({ providedIn: 'root'})
export class PokemonsService {

  private http = inject(HttpClient);

  loadPages( page:number ):Observable<SimplePokemon[]> {

    if( page !== 0 ) --page;

    page = Math.max(0, page);

    return this.http.get<PokeApiResponse>(`https://pokeapi.co/api/v2/pokemon/?offset=${page * 20}&limit=20`).pipe(
      map( res => {
        const simplePokemon:SimplePokemon[] = res.results.map( pokemon => ({
          id  : pokemon.url.split('/').at(-2) ?? '',
          name: pokemon.name
        }));

        return simplePokemon;
      }),
    );

  }

  loadPokemon( idPokemon:string ):Observable<Pokemon>  {
    return this.http.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`).pipe(
      catchError( this.handleError )
    );

  }
  private handleError( error:HttpErrorResponse ) {

    if( error.status === 0 ) {
      // console.log('An error ocurred: ', error.error );
    } else {
      // console.log(`Backend returned code: ${error.status}, boyd: `, error.error );
    }

    const errMessage = error.error ?? 'An error ocurred';

    return throwError( () => new Error( errMessage ) );
  }

}