import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { ActivatedRoute } from "@angular/router";

import { RestaurantServices } from "../../restaurants/restaurant.service";

@Component({
  selector: 'mt-reviews',
  templateUrl: './reviews.component.html'
})
export class ReviewsComponent implements OnInit {

  reviews: Observable<any>

  constructor(private restaurantsService: RestaurantServices, private route: ActivatedRoute) { }

  ngOnInit() {

    /*lembarndo que o valor é um filho */
    this.reviews = this.restaurantsService.reviewsOfRestaurantsById(this.route.parent.snapshot.params['id']);

  }

}
