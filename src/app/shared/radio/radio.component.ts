import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";



import { RadioOption } from './radio-option.model';

@Component({
  selector: 'mt-radio',
  templateUrl: './radio.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioComponent),
      multi: true
    }
  ]
})

/*NG_VALUE_ACCESSOR, forwardRef */

export class RadioComponent implements OnInit, ControlValueAccessor {

  @Input() options: RadioOption[]

  valueSelecionado: any

  onChange: any

  constructor() { }

  ngOnInit() {
  }

  setValue(value: any) {
    this.valueSelecionado = value
    this.onChange(this.valueSelecionado) /*DESSA FORMA AVISAMOs PARA AS DIRETIVAS QUE O VALOR DO COMPONENTE MUDOU*/
  }



  /**
    * Write a new value to the element.
    */
  writeValue(obj: any): void {
    this.valueSelecionado = obj;    
  }
  /**
   * Set the function to be called when the control receives a change event.
   */
  registerOnChange(fn: any): void { /*SEMPRE QUE O VALOR INTERNO DO COMPONENTE MUDAR*/
    this.onChange = fn;
  }
  /**
   * Set the function to be called when the control receives a touch event.
   */
  registerOnTouched(fn: any): void { /*REGISTRAR QUE O USUARIO ENTROU NO COMPONETE*/
  }

  setDisabledState?(isDisabled: boolean): void {

  }
}
