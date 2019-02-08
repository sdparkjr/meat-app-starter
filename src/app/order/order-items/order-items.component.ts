import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { CartItem } from "../../restaurant-detail/shopping-cart/cart-item.model";

@Component({
  selector: 'mt-order-items',
  templateUrl: './order-items.component.html'
})
export class OrderItemsComponent implements OnInit {

  @Input() items: CartItem[]


  /*@Output : rotular a propriedade como um evento que um componente pode dispara para o PAI*/
  /**EventEmitter: para criar eventos personalizado */

  @Output() incrementeQtd = new EventEmitter<CartItem>()
  @Output() decrementeQtd = new EventEmitter<CartItem>()
  @Output() remove = new EventEmitter<CartItem>()

  constructor() { }

  ngOnInit() {
  }

  emitIncrementeQtd(item: CartItem) {
    this.incrementeQtd.emit(item)
  }

  emitDecrementeQtd(item: CartItem) {
    this.decrementeQtd.emit(item)
  }

  emitRemove(item: CartItem) {
    this.remove.emit(item)
  }

}
