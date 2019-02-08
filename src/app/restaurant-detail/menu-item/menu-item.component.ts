import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { trigger, state, style, transition, animate } from "@angular/animations";

import { MenuItem } from "./menu-item.model";

@Component({
  selector: 'mt-menu-item',
  templateUrl: './menu-item.component.html',
  animations: [

    trigger('menuItemAppeared', [
      state('ready', style({ opacity: 1 })),
      transition('void => ready', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('300ms 0s ease-in')
      ])         /**void: quando ele nao esta na arvore dos componente */
    ])
  ]

})


export class MenuItemComponent implements OnInit {


  menuItemState = 'ready'

  @Input() menuItem: MenuItem

  @Output() add = new EventEmitter()

  constructor() { }

  ngOnInit() {
  }

  emitAddEvento() {
    this.add.emit(this.menuItem) /*adicionando o bjeto clicado*/
  }

}
