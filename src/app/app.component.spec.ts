import { Component } from "@angular/core";
import { provideRouter } from "@angular/router";
import { ComponentFixture, TestBed } from "@angular/core/testing";

import { AppComponent } from "./app.component";
import { NavbarComponent } from "./shared/components/navbar/navbar.component";

describe( 'AppComponent', () => {

    let fixture: ComponentFixture<AppComponent>;
    let app:AppComponent;
    let compiled:HTMLDivElement;

    @Component({
        selector : 'app-navbar',
    })
    class NavBarComponentMock { }

    beforeEach( async () => {
        await TestBed.configureTestingModule({
            imports     : [ AppComponent ],
            providers   : [ provideRouter([]) ]
        }).overrideComponent(AppComponent, {
            add: {
                imports: [ NavBarComponentMock ]
            },
            remove: {
                imports: [ NavbarComponent ]
            }
        }).compileComponents();

        fixture   = TestBed.createComponent(AppComponent);
        compiled  = fixture.nativeElement;
        app       = fixture.componentInstance;
    });

    it('should create the app', () => {
        expect( app ).toBeTruthy();
    });

    it('should rneder the navbar and router-outlet', () => {
        expect( compiled.querySelector('app-navbar') ).toBeTruthy();
    });

});
