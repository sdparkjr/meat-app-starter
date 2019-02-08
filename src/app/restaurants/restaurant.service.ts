import { Injectable } from '@angular/core';
//import { Http } from "@angular/http";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


import { Restaurant } from './restaurant/restaurant.model'
import { MenuItem } from "../restaurant-detail/menu-item/menu-item.model";

import { MEAT_API } from '../app.api'


@Injectable()
export class RestaurantServices {
  constructor(private http: HttpClient) { }

  /*  restaurantValores: Restaurant [] = [
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


  //Observable: o http retorno precisamos adptar para objeto
  // restaurants(): Observable<Restaurant[]> {
  //   return this.http.get(`${MEAT_API}/restaurants`)
  //     .map(response => response.json())
  //     .catch(ErrorHandler.handleError)
  // }

  restaurants(search?: string): Observable<Restaurant[]> {
    // return this.http.get(`${MEAT_API}/restaurants`, { params: { q: search } }) // o parametro q é generico assim ele busca em todos os dados que temos na lista
    //   .map(response => response.json())
    //   .catch(ErrorHandler.handleError)

    //apos usar HttpClient
    let parametros: HttpParams = undefined;
    if (search) {
      //parametros = new HttpParams().set('q', search);
      parametros = new HttpParams().append('q', search);
    }

    return this.http.get<Restaurant[]>(`${MEAT_API}/restaurants`, { params: parametros });
  }

  restaurantsById(id: string): Observable<Restaurant> {
    // return this.http.get(`${MEAT_API}/restaurants/${id}`)
    //   .map(response => response.json())
    //   .catch(ErrorHandler.handleError)

    //apos usar HttpClient
    return this.http.get<Restaurant>(`${MEAT_API}/restaurants/${id}`);
  }

  reviewsOfRestaurantsById(id: string): Observable<any> {

    // return this.http.get(`${MEAT_API}/restaurants/${id}/reviews`)
    //   .map(response => response.json())
    //   .catch(ErrorHandler.handleError)

    //apos usar HttpClient
    return this.http.get(`${MEAT_API}/restaurants/${id}/reviews`);
  }

  menuOfRestaurantsById(id: string): Observable<MenuItem[]> {

    // return this.http.get(`${MEAT_API}/restaurants/${id}/menu`)
    //   .map(response => response.json())
    //   .catch(ErrorHandler.handleError)
    return this.http.get<MenuItem[]>(`${MEAT_API}/restaurants/${id}/menu`); //apos usar HttpClient

  }


  // restaurants(): Restaurant[] {    
  //   return this.restaurantValores;
  // }


  //NESSE SERVIDE O HTTPMODULO FOI TROCADO PELO HTTP CLIENT
  //COM ISSO AS CHAMADAS FORAM TODAS TROCADAS

}
