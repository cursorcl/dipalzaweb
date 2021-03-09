import { EventEmitter, Input, Output } from '@angular/core';
import { Component } from '@angular/core';
import { ISellerModel } from 'app/services/others/seller.model';
import { ISearchedModel } from './serached-model';

@Component({
  selector: 'search-component',
  templateUrl: './search-form.html',
  styleUrls: [ './search-form.scss']
})
export class SearchFormComponent {
  @Input() listOf: ISearchedModel[];
  @Output() selectedEvent = new EventEmitter<ISellerModel>();
  @Input() placeholder: string;

  isOpen = false;
  textSearch = '';
  selectedItem: any;
  showGoButton = false;
  
  constructor() {}

  submitIcon() {
    this.isOpen = !this.isOpen;
  }

  buttonUp() {
    const len = this.textSearch === undefined ? 0 : this.textSearch.trim().length;
    this.showGoButton = len !== 0;
  }

  onSubmit() {
    for (const item of this.listOf) {
      if (item.nombre === this.textSearch) {
        this.selectedItem = item;
        this.selectedEvent.emit(this.selectedItem);
        this.isOpen = !this.isOpen;
        this.showGoButton = false;
        break;
      }
    }
  }
}
