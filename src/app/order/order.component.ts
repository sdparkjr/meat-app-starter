import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { FormGroup, FormBuilder, Validators, Validator, AbstractControl } from "@angular/forms";

import { RadioOption } from "../shared/radio/radio-option.model";

import { OrderServices } from "../order/order.service";
import { CartItem } from "../restaurant-detail/shopping-cart/cart-item.model";

import { Order, OrderItem } from "./order.model";

import 'rxjs/add/operator/do'

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  emailPatern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  numberPatern = /^[0-9]*$/

  orderForm: FormGroup

  delivery: number = 8

  orderId: string

  pagamentoOpcoes: RadioOption[] = [
    { label: 'Dinnheiro', value: 'MON' },
    { label: 'Cartão de Crédito', value: 'DEB' },
    { label: 'Cartão Refeição', value: 'REF' }
  ]

  constructor(private orderService: OrderServices,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.orderForm = this.formBuilder.group({

      name: this.formBuilder.control('', [Validators.required, Validators.minLength(3)]),
      email: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPatern)]),
      emailConfirm: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPatern)]),
      address: this.formBuilder.control('', [Validators.required, Validators.minLength(3)]),
      number: this.formBuilder.control('', [Validators.required, Validators.pattern(this.numberPatern)]),
      optionalAddress: this.formBuilder.control(''),
      pagamentoOpcao: this.formBuilder.control('', [Validators.required])
    }, { validator: OrderComponent.equalsTo })

  }


  //ele vai checar o valor de 2 campos
  static equalsTo(group: AbstractControl): { [key: string]: boolean } {
    const email = group.get('email')
    const emailConfirm = group.get('emailConfirm')

    if (!email || !emailConfirm) { //caso na exista
      return undefined
    }

    if (email.value !== emailConfirm.value) { //caso exista
      return { emailNaoEValido: true } //emailNaoEValido sera uma chave do grupo
    }
    return undefined
  }

  itemsValue(): number {
    return this.orderService.itemsValue()
  }

  cartItems(): CartItem[] {

    return this.orderService.cartItems()
  }

  incrementeQtd(item: CartItem) {

    this.orderService.incrementeQtd(item);
  }

  decrementeQtd(item: CartItem) {

    this.orderService.decrementeQtd(item);
  }

  remove(item: CartItem) {
    this.orderService.remove(item);
  }

  checkOrder(order: Order) {
    /*Mapeando a lisda de item do carrinho para OrdemItem*/
    order.orderItems = this.cartItems().map((item: CartItem) => new OrderItem(item.quantity, item.menuItem.id))

    console.log(order)
    //console.table(order)
    this.orderService.checkOrder(order)
      .do((order: string) => { this.orderId = order }) //passando o id da compra para variavel
      .subscribe((resultado: string) => {
        this.router.navigate(['/order-summary'])
        //console.log(`COmpra concluida ${resultado}`)
        this.orderService.clear()
      })
  }


  isOrderCompleted(): boolean {
    return this.orderId != undefined
  }

}
