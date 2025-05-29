import { Location } from "@angular/common";
import { TestBed } from "@angular/core/testing";
import { provideRouter, Router } from "@angular/router";

import { routes } from "./app.routes";

describe('App routes', () => {

    let router:Router;
    let location:Location;

    beforeEach( () => {
        TestBed.configureTestingModule({
            providers: [ provideRouter(routes) ]
        });

        router   = TestBed.inject( Router );
        location = TestBed.inject( Location );
    });

    it('should navigate to "/about"', async () => {
        await router.navigate(['about']);
        expect( location.path() ).toBe('/about');
    });

    it('should navigate to "/pricing"', async () => {
        await router.navigate(['pricing']);
        expect( location.path() ).toBe('/pricing');
    });

    it('should navigate to "/contact"', async () => {
        await router.navigate(['contact']);
        expect( location.path() ).toBe('/contact');
    });

    it('should navigate to "/pokemons/:id"', async () => {
        await router.navigate(['pokemons/1']);
        expect( location.path() ).toBe('/pokemons/1');
    });
    
    it('should navigate to redirects to unknow page', async () => {
        await router.navigate(['unknow-route']);
        expect( location.path() ).toBe('/pokemons/page/1');
    });

    
    it('should navigate to "about" redirects to "/pokemons/page/1', async () => {
        await router.navigate(['pokemons/page/1']);
        expect( location.path() ).toBe('/pokemons/page/1');
    });
    
    it('should load the proper component', async () => {
        const aboutRoute = routes.find( (route) => route.path === 'about' )!;
        expect(aboutRoute).toBeDefined();
        const aboutComponent = ( await aboutRoute.loadComponent!() ) as any;
        expect( aboutComponent.default.name ).toBe('AboutPageComponent');
    });

});
