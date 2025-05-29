import { provideRouter } from "@angular/router";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { PokemonListComponent } from "./pokemon-list.component";
import { SimplePokemon } from "../../interfaces";

const mockPokemonList:SimplePokemon[] = [
    { id: '1', name: 'bulbasaur' },
    { id: '2', name: 'ivysaur' },
];

describe( 'PokemonListComponent', () => {

    let fixture: ComponentFixture<PokemonListComponent>;
    let app:PokemonListComponent;
    let compiled:HTMLDivElement;

    beforeEach( async () => {
        await TestBed.configureTestingModule({
            imports     : [ PokemonListComponent ],
            providers   : [ provideRouter([]) ]
        }).compileComponents();

        fixture   = TestBed.createComponent(PokemonListComponent);

        compiled  = fixture.nativeElement;
        app       = fixture.componentInstance;

    });

    it('should create the app', () => {
        fixture.componentRef.setInput('pokemons', []);
        fixture.detectChanges();
        expect( app ).toBeTruthy();
    });

    it('should show the pokemom list at least 2 pokemons', () => {
        fixture.componentRef.setInput('pokemons', mockPokemonList);
        fixture.detectChanges();

        expect( compiled.querySelectorAll('pokemon-card').length ).toBe( mockPokemonList.length );
    });

    it('should show pokemons empty', () => {
        fixture.componentRef.setInput('pokemons', []);
        fixture.detectChanges();

        expect( compiled.querySelector('div')?.textContent ).toContain('No hay pokemons');
    });

});
