import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Pokemon, PokemonService} from '../../services/pokemon.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ComponentModalComponent} from '../component-modal/component-modal.component'

@Component({
  selector: 'app-component-list',
  templateUrl: './component-list.component.html',
  styleUrls: ['./component-list.component.css']
})
export class ComponentListComponent implements OnInit {

  pokemons: any[] = [];
  pokemonsAux: any[] = [];
  types = ['water', 'fire', 'normal', 'bug', 'poison'];
  actionModal = '';
  errorMessage = 'Error al procesar los datos';
  successMessage: String;
  pageActual = 1;
  formPokemon: FormGroup;

  constructor(private modalService: NgbModal,
              private pokemonService: PokemonService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.pokemonService.pokemonCambio.subscribe(data => {
      this.pokemons = data;
      this.pokemonsAux = this.pokemons;
    })
    this.pokemons = this.getPokeons();
  }


  // consultar pokemons
  getPokeons(): any {
    this.pokemonService.getPokemons().
    subscribe((data: any) => {
      this.pokemons = data;
      this.pokemonsAux = this.pokemons;
    });
  }

  // borrar pokemons
  deletePokemon(id: number, error: any): void {
    this.pokemonService.deletePokemon(id)
      .subscribe(
        (data: any) => {
          if (data.id !== undefined || data.id !== null) {
            this.pokemons = this.getPokeons();
            this.successMessage = 'Proceso ejecutado con éxito';
          } else {
            this.modalService.open(error, {
              windowClass: 'custom-width-error-modal',
            });
          }
        }
      );
    this.pokemons = this.getPokeons();
  }

  // buscador
  search(busqueda: string) {
    this.pokemons = this.pokemonsAux.filter( function(res) {
      console.log(res);
      return res.name.toLowerCase().includes(busqueda.toLowerCase());
    });
  }

  // abrrir motal
  openModal(actionModal:any, pokemon:any) {
    const modalRef = this.modalService.open(ComponentModalComponent, {
      windowClass: 'custom-width-variant-modal',
      size: 'lg'
    });
    modalRef.componentInstance.pokemonModal = pokemon;
    modalRef.componentInstance.actionModal = actionModal;

  }
}

