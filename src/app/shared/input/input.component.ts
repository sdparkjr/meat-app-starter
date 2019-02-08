import { Component, OnInit, Input, ContentChild, AfterContentInit } from '@angular/core';
import { NgModel, FormControlName } from "@angular/forms";

@Component({
  selector: 'mt-input-container',
  templateUrl: './input.component.html'
})
export class InputComponent implements OnInit, AfterContentInit {

  @Input() label: string
  @Input() errorMessage: string
  @Input() showTip : boolean = true

  @ContentChild(NgModel) model: NgModel  /*vamos injetar a referencia no ngModule*/

  @ContentChild(FormControlName) control: FormControlName /* para Reactive.FOrms*/

  inputGenerico: any

  constructor() { }

  ngOnInit() {
  }

  /*metodo chamado quando o coteudo for definido*/
  ngAfterContentInit() {

    this.inputGenerico = this.model || this.control /* assim podemos usar uma das 2 diretivas*/
    if (this.inputGenerico === undefined) {
      throw new Error('Esse componente precisa ser usado com uma diretiva ngModel ou FormControlName')
    }


  }

  hasSucess(): boolean {
    return this.inputGenerico.valid && (this.inputGenerico.dirty || this.inputGenerico.touched)
  }

  hasError(): boolean {
    return this.inputGenerico.invalid && (this.inputGenerico.dirty || this.inputGenerico.touched)
  }

}
