import { AppComponent } from './../app.component';
import { TestBed , inject} from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";

import { Pokemon, PokemonService } from './pokemon.service';

describe('PokemonService', () => {
  let accessService: PokemonService;
  let httpTestingController: HttpTestingController;
  let baseUrl = "api/travellers";
  let pokemon : Pokemon;


  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule]});
    accessService = TestBed.inject(PokemonService);
    pokemon = {
      name: 'Picachu',
      image: '',
      type: 'Unknown',
      hp: 0,
      attack: 0,
      defense: 0,
      idAuthor: 1
    };
  });
  beforeEach(inject(
    [PokemonService],
    (service: PokemonService) => {
      accessService = service;
    }
  ));
  /*it('Debe existir el appcomponent', () => {
    const fixture = TestBed.createComponent(PokemonService);
    const app = fixture.componentInstance
    expect(app).toBeTruthy();
  });*/

  //servicio 1
  /*it('should call getAllPokemons', () => {
    service.getPokemons().subscribe((res)=> {
      expect(res).toEqual(pokemon);
    });
    const req = httpController
    const fixture = TestBed.createComponent(PokemonService);
    const app = fixture.componentInstance
    fixture.detectChanges()
    expect(app).toBeTruthy();
  });*/
});
