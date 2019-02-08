import { Injectable } from "@angular/core";

import { CartItem } from "./cart-item.model";
import { MenuItem } from "./../menu-item/menu-item.model";

import { NotificationService } from "../../shared/messages/notifications.service";

@Injectable()
export class ShoppingCartService {
    items: CartItem[] = []


    constructor(private notificationService: NotificationService) { }

    clear() {
        this.items = []
    }

    total(): number {
        return this.items
            .map(a => a.value())
            .reduce((prev, value) => prev + value, 0)
    }

    addItem(item: MenuItem) {

        let foundItem = this.items.find((a) => a.menuItem.id === item.id)
        if (foundItem) {

            foundItem.quantity = foundItem.quantity + 1

        } else {
            this.items.push(new CartItem(item))
        }


        this.notificationService.notify(`Você adicionou o item ${item.name}`)

    }

    removeItem(item: CartItem) {

        this.items.splice(this.items.indexOf(item), 1)
        
        this.notificationService.notify(`Você removeu o  item ${item.menuItem.name}`)

    }


    incrementeQtd(item: CartItem) {
        debugger
        item.quantity = item.quantity + 1
    }

    decrementeQtd(item: CartItem) {
        debugger
        item.quantity = item.quantity - 1
        if (item.quantity === 0) {
            this.removeItem(item)
        }
    }



}