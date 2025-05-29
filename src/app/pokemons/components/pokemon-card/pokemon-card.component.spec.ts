import { provideRouter } from "@angular/router";
import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SimplePokemon } from "../../interfaces";
import { PokemonCardComponent } from "./pokemon-card.component";

const mockPokmeon :SimplePokemon = {
    id  : '1',
    name: 'Bulbasaur'
};

describe( 'PokemonCardComponent', () => {

    let fixture: ComponentFixture<PokemonCardComponent>;
    let app:PokemonCardComponent;
    let compiled:HTMLDivElement;

    beforeEach( async () => {
        await TestBed.configureTestingModule({
            imports     : [ PokemonCardComponent ],
            providers   : [ provideRouter([]) ]
        }).compileComponents();

        fixture   = TestBed.createComponent(PokemonCardComponent);
        fixture.componentRef.setInput( 'pokemon', mockPokmeon );

        compiled  = fixture.nativeElement;
        app       = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('should create the app', () => {
        expect( app ).toBeTruthy();
    });

    it('should have the simplePokemon signal inputValue', () => {
        expect( app.pokemon() ).toEqual(mockPokmeon);
    });

    it('should render the pokemon name and image correctly', () => {
        const image = compiled.querySelector('img');
        const name  = compiled.querySelector('h2');

        expect(image).toBeTruthy();
        expect(image?.src).toBe('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png');
        expect(name?.innerText).toEqual('Bulbasaur');
    });

    it('should have the proper ng-reflect-router-link', () => {
        const divWithLink = compiled.querySelector('div');

        expect( divWithLink?.attributes.getNamedItem('ng-reflect-router-link')?.value ).toBe(`/pokemons,${mockPokmeon.name}`);
    });

});
