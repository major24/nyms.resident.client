import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
//import { Address } from '../../models/index';

@Component({
  selector: 'address-edit',
  templateUrl: './address-edit.component.html',
  styleUrls: ['./address-edit.component.css']
})
export class AddressEditComponent implements OnInit {
  @Input() street1: string;
  @Input() street2: string;
  @Input() city: string;
  @Input() county: string;
  @Input() postCode: string;
  @Output() street1Updated = new EventEmitter<string>();
  @Output() street2Updated = new EventEmitter<string>();
  @Output() cityUpdated = new EventEmitter<string>();
  @Output() countyUpdated = new EventEmitter<string>();
  @Output() postCodeUpdated = new EventEmitter<string>();

  addressForm = new FormGroup({
    street1: new FormControl(''),
    street2: new FormControl(''),
    city: new FormControl(''),
    county: new FormControl(''),
    postCode: new FormControl(''),
  });

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: any): void {
    if (changes.street1) { this.addressForm.controls['street1'].setValue(changes.street1.currentValue); }
    if (changes.street2) { this.addressForm.controls['street2'].setValue(changes.street2.currentValue); }
    if (changes.city) { this.addressForm.controls['city'].setValue(changes.city.currentValue); }
    if (changes.county) { this.addressForm.controls['county'].setValue(changes.county.currentValue); }
    if (changes.postCode) { this.addressForm.controls['postCode'].setValue(changes.postCode.currentValue); }
  }

  onStreet1Change(event: any): void {
    this.street1Updated.emit(event);
  }
  onStreet2Change(event: any): void {
    this.street2Updated.emit(event);
  }
  onCityChange(event: any): void {
    this.cityUpdated.emit(event);
  }
  onCountyChange(event: any): void {
    this.countyUpdated.emit(event);
  }
  onPostCodeChange(event: any): void {
    this.postCodeUpdated.emit(event);
  }

}










  // onStreet1Change(event: any): void {
  //   this._address.street1 = event.target.value;
  //   this.onAddressChange();
  // }
  // onStreet2Change(event: any): void {
  //   this._address.street2 = event.target.value;
  //   this.onAddressChange();
  // }
  // onCityChange(event: any): void {
  //   this._address.city = event.target.value;
  //   this.onAddressChange();
  // }
  // onCountyChange(event: any): void {
  //   this._address.county = event.target.value;
  //   this.onAddressChange();
  // }
  // onPostCodeChange(event: any): void {
  //   this._address.postCode = event.target.value;
  //   this.onAddressChange();
  // }

  // onAddressChange(): void {
  //   this.addressUpdated.emit(this._address);
  // }

  // setAddressFields(data: Address): void {
  //   this.addressForm.controls['street1'].setValue(data.street1);
  //   this.addressForm.controls['street2'].setValue(data.street2);
  //   this.addressForm.controls['city'].setValue(data.city);
  //   this.addressForm.controls['county'].setValue(data.county);
  //   this.addressForm.controls['postCode'].setValue(data.postCode);
  // }