import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { KeyPair } from '../../../models/index';

@Component({
  selector: 'care-type-edit',
  templateUrl: './care-type-edit.component.html',
  styleUrls: ['./care-type-edit.component.css']
})
export class CareTypeEditComponent implements OnInit {
  @Input() careCategories: any[] = [];
  @Input() careCategoryId: string;
  @Input() careNeed: string;
  @Input() stayType: string;

  @Output() careCategoryUpdated = new EventEmitter<string>();
  @Output() careNeedUpdated = new EventEmitter<string>();
  @Output() stayTypeUpdated = new EventEmitter<string>();

  careTypeForm = new FormGroup({
    careCategoryId: new FormControl(''),
    careNeed: new FormControl(''),
    stayType: new FormControl(''),
  });

  careNeeds: KeyPair[] = [
    { key: 'high', value: 'High' },
    { key: 'medium', value: 'Medium' },
    { key: 'low', value: 'Low' }
  ];
  stayTypes: KeyPair[] = [
    { key: 'permanent', value: 'Permanent' },
    { key: 'respite', value: 'Respite' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: any): void {
    console.log('ChangesCareType:', changes);
    if (changes.careCategoryId) { this.careTypeForm.controls['careCategoryId'].setValue(changes.careCategoryId.currentValue); }
    if (changes.careNeed) { this.careTypeForm.controls['careNeed'].setValue(changes.careNeed.currentValue); }
    if (changes.stayType) { this.careTypeForm.controls['stayType'].setValue(changes.stayType.currentValue); }

    if (changes.isCareHomeSelectionChanged) {
      this.careTypeForm.controls['careCategoryId'].setValue('');
      this.careCategories.splice(0, this.careCategories.length);
      this.careTypeForm.controls['careNeed'].setValue('');
      this.careTypeForm.controls['stayType'].setValue('');
    }
  }

  onCareCategoryChange(event: any): void {
    this.careCategoryUpdated.emit(event);
  }
  oncareNeedChange(event: any): void {
    this.careNeedUpdated.emit(event);
  }
  onStayTypeChange(event: any): void {
    this.stayTypeUpdated.emit(event);
  }
}

