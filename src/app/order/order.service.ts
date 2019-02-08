import { Injectable } from "@angular/core";

//import { Http, Headers, RequestOptions } from "@angular/http";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';

import { ShoppingCartService } from "../restaurant-detail/shopping-cart/shopping-cart.service";
import { CartItem } from "../restaurant-detail/shopping-cart/cart-item.model";

import { Order, OrderItem } from "../order/order.model";

import { MEAT_API } from "../app.api"; /*cconstante com a url*/
import { LoginService } from "app/security/login/login.service";


@Injectable()
export class OrderServices {

    constructor(private cartService: ShoppingCartService, private http: HttpClient, private _loginService: LoginService) {
    }

    itemsValue(): number {
        return this.cartService.total()
    }

    cartItems(): CartItem[] {
        return this.cartService.items
    }

    incrementeQtd(item: CartItem) {
        this.cartService.incrementeQtd(item)
    }

    decrementeQtd(item: CartItem) {
        this.cartService.decrementeQtd(item)
    }

    remove(item: CartItem) {
        this.cartService.removeItem(item)
    }

    checkOrder(compra: Order): Observable<string> {

        /*JSON.stringify: vamos mandar para o servidor uma represenyacao textual do objeto ORDER*/
        //  const headers = new Headers()
        //   headers.append('Content-Type', 'application/json')
        /* RETORNADO COM STRING
        return this.http.post(`${MEAT_API}/orders`, JSON.stringify(resultado), new RequestOptions({ headers: headers })).map(response => response.json()).map(order => order.id)
        */
        /*RETORNANDO OBJ: ORDER*/
        //    return this.http.post(`${MEAT_API}/orders`, JSON.stringify(resultado), new RequestOptions({ headers: headers })).map(response => response.json())

        //APOS A TROCA PELO HTTPCLIENT
        // let head = new HttpHeaders()
        // if (this._loginService.isLoggedId()) { /*se estiver logado*/
        //     head = head.set('Authorization', `Bearer ${this._loginService.user.accessToken}`)
        // } //FOI PARA INTERCEPTOR
        debugger;
        return this.http.post<Order>(`${MEAT_API}/orders`, compra)
            .map(order => order.id);
    }

    clear() {
        this.cartService.clear()
    }

}