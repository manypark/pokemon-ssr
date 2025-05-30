import { TestBed,  } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { PokeApiResponse, SimplePokemon } from '../interfaces';
import { PokemonsService } from './pokemons.service';
import { catchError } from 'rxjs';

const mockPokeApiResponse:PokeApiResponse = {
    "count": 1302,
    "next": "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20",
    "previous": null,
    "results": [
        {
            "name": "bulbasaur",
            "url": "https://pokeapi.co/api/v2/pokemon/1/"
        },
        {
            "name": "ivysaur",
            "url": "https://pokeapi.co/api/v2/pokemon/2/"
        }
    ]   
};

const expectedPokemons:SimplePokemon[] = [
    { id: '1', name: 'bulbasaur' },
    { id: '2', name: 'ivysaur' },
  ];
  
  const mockPokemon:SimplePokemon = {
    id  : '1',
    name: 'bulbasaur'
  };

  const mockPokemon2:SimplePokemon = {
    id  : '2',
    name: 'ivysaur'
  };

describe('PokemonsService', () => {

  let service   : PokemonsService;
  let httpMock  : HttpTestingController;

  beforeEach(() => {

    TestBed.configureTestingModule({
        providers: [ provideHttpClient(), provideHttpClientTesting() ]
    });

    service  = TestBed.inject(PokemonsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach( () => { httpMock.verify(); });

  it('should be created services', () => {
    expect(service).toBeTruthy();
  });

  it('should load a page of SimplePokemon list', () => {
    
    service.loadPages(1).subscribe( pokemons => {
        expect( pokemons ).toEqual( expectedPokemons );
    });

    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20');

    expect( req.request.method ).toBe('GET');

    req.flush( mockPokeApiResponse );

  });

  it('should load a page 5 of SimplePokemon list', () => {
    
    service.loadPages(5).subscribe( pokemons => {
        expect( pokemons ).toEqual( expectedPokemons );
    });

    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/?offset=80&limit=20');

    expect( req.request.method ).toBe('GET');

    req.flush( mockPokeApiResponse );

  });

  it('should load a Pokemon by ID', () => {

    service.loadPokemon('1').subscribe( (pokemon:any) => {
        expect( pokemon.id ).toEqual( mockPokemon.id );
        expect( pokemon.name ).toEqual( mockPokemon.name );
    });

    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/1');

    expect( req.request.method ).toBe('GET');

    req.flush( mockPokemon );

  });

  it('should load a Pokemon by Name', () => {

    service.loadPokemon('ivysaur').subscribe( (pokemon:any) => {
        expect( pokemon.id ).toEqual( mockPokemon2.id );
        expect( pokemon.name ).toEqual( mockPokemon2.name );
    });

    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/ivysaur');

    expect( req.request.method ).toBe('GET');

    req.flush( mockPokemon2 );

  });

  it('should catch error if pokemon not found', () => {

    const pokemonName = 'yo-no-existo';

    service.loadPokemon(pokemonName).pipe(
        catchError( err => {

            expect( err.message ).toContain('Pokemon Not Found');

            return [];
        })
    ).subscribe( (pokemon:any) => {
        expect( pokemon ).toEqual( mockPokemon );
    });

    const req = httpMock.expectOne(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

    expect( req.request.method ).toBe('GET');

    req.flush( 'Pokemon Not Found', {
        status: 404,
        statusText: 'Not Found'
    });

  });

});
