import { Component, OnInit } from '@angular/core';

import { Restaurant } from './restaurant/restaurant.model'
import { RestaurantServices } from './restaurant.service'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do'; //so para logar no console uma mensagem depois pode apagar
import 'rxjs/add/operator/debounceTime'; //so manda mensagem se a difirenca de eventos for maio que o tempo que eu QUISER, caso o digitação for rapida ele nao fica pesquisando direto
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/catch'; //o Observable quebra caso alguma erro vamos fazer esse tratamento com catch
import 'rxjs/add/observable/from'; //quando queremos criar uma string atraves de um array
import { Observable } from "rxjs/Observable";


import { trigger, state, style, transition, animate } from "@angular/animations";

//PARA O FORMS
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: 'mt-restaurants',
  templateUrl: './restaurants.component.html',
  animations: [
    trigger('toogleSearch', [
      state('hidden', style({ opacity: 0, "max-height": "0px" })),
      state('visible', style({ opacity: 1, "max-height": "70px", "margin-top": "20px" })),
      transition('* => *', animate('250ms 0s ease-in-out'))
    ])
  ]
})
export class RestaurantsComponent implements OnInit {

  seacrchBarState = 'hidden'
  //dados temp
  /* restaurantsArray: Restaurant [] = [
     {
       id: "bread-bakery",
       name: "Bread & Bakery",
       category: "Bakery",
       deliveryEstimate: "25m",
       rating: 4.9,
       imagePath: "assets/img/restaurants/breadbakery.png"

     },
     {
       id: "burger-house",
       name: "Burger House",
       category: "Hamburgers",
       deliveryEstimate: "100m",
       rating: 3.5,
       imagePath: "assets/img/restaurants/burgerhouse.png"

     }
   ] */

  restaurantsArray: Restaurant[] = [];
  searchForm: FormGroup;
  searchControl: FormControl;

  constructor(private restaurantsService: RestaurantServices, private _fb: FormBuilder) {

  }

  ngOnInit() {

    //this.restaurantsArray = this.restaurantsService.restaurants()
    this.restaurantsService.restaurants()
      .subscribe(restaurants => this.restaurantsArray = restaurants)

    //subscribe mapeando o array de restaurantes

    this.searchControl = this._fb.control(''); //precisamos instaciar no control mesmo sem nada
    //agora precisamos observar oq esta sendo digitado
    //this.searchControl.valueChanges.subscribe(valor => console.log(valor));
    //foi criado o switchMap importando do rxjs map  para mapear o serviço passando o valor digitado no pesquisar
    this.searchControl.valueChanges
      .debounceTime(500) //ele vai espera eu digitar por tempo
      .distinctUntilChanged() //agora ele so dispara pesquisae se for diferente uma da outra
      .do(valor => console.log(`q=${valor}`)) //so para imprimir no console
      .switchMap(valor =>
        this.restaurantsService.restaurants(valor) //resolve problemas entre os requests, pq assim que chegar uma novo resqueste ele sobrescreve o antigo
          .catch(error => Observable.from([]))) //agora caso de erro ele retorna o array vazio
      .subscribe(restaurants => this.restaurantsArray = restaurants); //agora ele atualiza a lista


    this.searchForm = this._fb.group({
      searchControl: this.searchControl
    });

  }

  toogleSearch() {
    this.seacrchBarState = this.seacrchBarState === 'hidden' ? 'visible' : 'hidden';
  }


  //REACT FORMS PARA VALIDAR O PESQUISAR DA BARRA

}
