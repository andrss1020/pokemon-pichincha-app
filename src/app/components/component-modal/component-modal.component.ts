import { Pokemon, PokemonService } from './../../services/pokemon.service';
import { Component, OnInit,Input,Output } from '@angular/core';
import {NgbModal,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
@Component({
  selector: 'app-component-modal',
  templateUrl: './component-modal.component.html',
  styleUrls: ['./component-modal.component.css']
})

export class ComponentModalComponent implements OnInit {
  @Input('pokemonModal') public pokemonModal : Pokemon;
  @Input('actionModal') public actionModal : String;

  pokemons: any[] = [];
  pokemonsAux: any[] = [];
  formPokemon: FormGroup;
  successMessage: string;
  errorMessage = 'Error al procesar los datos';

  constructor(private modalService: NgbModal,
    private pokemonService: PokemonService,
    private fb: FormBuilder,
    public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    console.log(this.pokemonModal);
    if (this.pokemonModal !== undefined) {
      this.loadFormPokemon(this.pokemonModal);
    } else {
      console.log(this.pokemonModal);
      this.newFormPokemon();
    }

  }
  // guardar o actualizar pokemons
  savePokemon(error : any): void {
    console.log(this.actionModal);
      const pokemon = new Pokemon;
      pokemon.name = this.formPokemon.value.name;
      pokemon.image = this.formPokemon.value.image;
      pokemon.attack = this.formPokemon.value.attack;
      pokemon.defense = this.formPokemon.value.defense;
      if (this.actionModal === 'Nuevo') {
        console.log(this.actionModal);
        this.pokemonService.postPokemon(pokemon)
          .subscribe(
            (data: any) => {
              if (data.id !== undefined || data.id !== null) {
                this.modalService.dismissAll();
                this.pokemonService.getPokemons().subscribe((pokemones :any) => {
                  this.pokemonService.pokemonCambio.next(pokemones);
                  this.pokemonService.mensajeCambio.next('Proceso ejecutado con éxito');
                });
                //this.successMessage = 'Proceso ejecutado con éxito';
              } else {
                this.modalService.open(error, {
                  windowClass: 'custom-width-error-modal',
                });
              }
            }
          );
      } else {
        const idPokemon = this.formPokemon.value.id;
        this.pokemonService.updatePokemon(idPokemon, pokemon)
          .subscribe(
            (data: any) => {
              if (data.id !== undefined || data.id !== null) {
                this.modalService.dismissAll();
                this.pokemonService.getPokemons().subscribe((pokemones :any) => {
                  this.pokemonService.pokemonCambio.next(pokemones);
                  this.pokemonService.mensajeCambio.next('Proceso ejecutado con éxito');
                });
                //this.successMessage = 'Proceso ejecutado con éxito';
              } else {
                this.modalService.open(error, {
                  windowClass: 'custom-width-error-modal',
                });
              }
            }
          );
      }
    
  }


  newFormPokemon() {
    this.formPokemon = this.fb.group({
      id: [''],
      name: ['', [Validators.required]],
      attack: ['50'],
      image: ['', [Validators.required]],
      defense: ['50']
    });
  }

//
loadFormPokemon(pokemon : any): void {
  const thread = {
    id: pokemon.id,
    name: pokemon.name,
    attack: pokemon.attack,
    image: pokemon.image,
    defense: pokemon.defense
  }

  this.formPokemon = this.fb.group(thread);
}

// validaciones
  get nameNoValid() {
    return (
      this.formPokemon.get('name')?.invalid && 
      this.formPokemon.get('name')?.touched
    );
  }

  get attackNoValid() {
    return (
      this.formPokemon.get('attack')?.invalid &&
      this.formPokemon.get('attack')?.touched
    );
  }

  get imageNoValid() {
    return (
      this.formPokemon.get('image')?.invalid &&
      this.formPokemon.get('image')?.touched
    );
  }

  get defenseNoValid() {
    return (
      this.formPokemon.get('defense')?.invalid &&
      this.formPokemon.get('defense')?.touched
    );
  }


}
