import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from "@angular/animations";


import { ShoppingCartService } from "./shopping-cart.service";

@Component({
  selector: 'mt-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  animations: [
    trigger('row', [
      state('ready', style({ opacity: 1 })),
      transition('void => ready', animate('300ms 0s ease-in', keyframes([
        style({ opacity: 0, transform: 'translateX(-30px)', offser: 0 }),
        style({ opacity: 0.8, transform: 'translateX(10px)', offser: 0.8 }),
        style({ opacity: 1, transform: 'translateX(0px)', offser: 1 })
      ]))),
      transition('ready => void', animate('300ms 0s ease-out', keyframes([
        style({ opacity: 1, transform: 'translateX(0px)', offser: 0 }),
        style({ opacity: 0.8, transform: 'translateX(-10px)', offser: 0.2 }),
        style({ opacity: 0, transform: 'translateX(30px)', offser: 1 })
      ])))

    ])
  ]
})
export class ShoppingCartComponent implements OnInit {

   rowState = 'ready'


  constructor(private shoppingcartService: ShoppingCartService) { }

  ngOnInit() {
  }

  items(): any[] {
    return this.shoppingcartService.items
  }

  total(): number {
    return this.shoppingcartService.total()
  }

  clear() {
    this.shoppingcartService.clear()
  }

  removeItem(item: any) {
    this.shoppingcartService.removeItem(item)
  }

  addItem(item: any) {
    this.shoppingcartService.addItem(item)
  }

}
