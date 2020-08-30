import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'care-type-edit',
  templateUrl: './care-type-edit.component.html',
  styleUrls: ['./care-type-edit.component.css']
})
export class CareTypeEditComponent implements OnInit {
  @Input() careCategory: string;
  @Input() careNeeds: string;
  @Input() stayType: string;

  @Output() careCategoryUpdated = new EventEmitter<string>();
  @Output() careNeedsUpdated = new EventEmitter<string>();
  @Output() stayTypeUpdated = new EventEmitter<string>();

  careTypeForm = new FormGroup({
    careCategory: new FormControl(''),
    careNeeds: new FormControl(''),
    stayType: new FormControl(''),
  });
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: any): void {
    console.log('ChangesCareType:', changes);
    if (changes.careCategory) { this.careTypeForm.controls['careCategory'].setValue(changes.careCategory.currentValue); }
    if (changes.careNeeds) { this.careTypeForm.controls['careNeeds'].setValue(changes.careNeeds.currentValue); }
    if (changes.stayType) { this.careTypeForm.controls['stayType'].setValue(changes.stayType.currentValue); }
  }

  onCareCategoryChange(event: any): void {
    this.careCategoryUpdated.emit(event);
  }
  onCareNeedsChange(event: any): void {
    this.careNeedsUpdated.emit(event);
  }
  onStayTypeChange(event: any): void {
    this.stayTypeUpdated.emit(event);
  }
}







// ngOnInit(): void {
//   // if (this.careType) {
//   //   this._careType = this.careType;
//   //   this.setCareTypeFields(this._careType);
//   // }
// }


// onCareCategoryChange(event: any): void {
//   this._careType.careCategory = event.target.value;
//   this.onCareTypeInfoChange();
// }
// onCareNeedsChange(event: any): void {
//   this._careType.careNeeds = event.target.value;
//   this.onCareTypeInfoChange();
// }
// onStayTypeChange(event: any): void {
//   this._careType.stayType = event.target.value;
//   this.onCareTypeInfoChange();
// }
// onCareTypeInfoChange(): void {
//   this.careTypeUpdated.emit(this._careType);
// }

// setCareTypeFields(data: CareType): void {
//   this.careTypeForm.controls['careCategory'].setValue(data.careCategory);
//   this.careTypeForm.controls['careNeeds'].setValue(data.careNeeds);
//   this.careTypeForm.controls['stayType'].setValue(data.stayType);
// }