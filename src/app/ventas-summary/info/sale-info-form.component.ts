import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'jhi-sale-info-form',
  templateUrl: './sale-info-form.component.html',
  styleUrls: ['./sale-info-form.component.scss']
})
export class SaleInfoFormComponent  implements OnInit {
  @Output() expandInfoEvent = new EventEmitter();
  registers = [];
  
  

  constructor( ) {
   
  }

  ngOnInit(): void {}

  public setElement(element: any) {
    if (element === undefined ) {
      return;
    }
    this.registers = element;
  }

}
