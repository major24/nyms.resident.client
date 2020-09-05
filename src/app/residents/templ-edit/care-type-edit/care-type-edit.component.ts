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

  // <option value="high">High</option>
  // <option value="medium">Medium</option>
  // <option value="low">Low</option>

  // staty type
  // <option value="permanent">Permanent</option>
  // <option value="respite">Respite</option>

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

