import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { RestaurantServices } from "../restaurants/restaurant.service";
import { Restaurant } from "../restaurants/restaurant/restaurant.model";
@Component({
  selector: 'mt-restaurant-detail',
  templateUrl: './restaurant-detail.component.html'
})
export class RestaurantDetailComponent implements OnInit {

  restaurant: Restaurant

  constructor(private restaurantService: RestaurantServices, private route: ActivatedRoute) { }

  ngOnInit() {

    this.restaurantService.restaurantsById(this.route.snapshot.params['id'])
      .subscribe(restaurant => this.restaurant = restaurant )

  }

}
