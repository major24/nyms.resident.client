import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'next-of-kin',
  templateUrl: './next-of-kin.component.html',
  styleUrls: ['./next-of-kin.component.css']
})
export class NextOfKinComponent implements OnInit {

  @Input() nokForeName: string;
  @Input() nokSurName: string;
  @Input() relationship: string;
  @Output() nokForeNameUpdated = new EventEmitter<any>();
  @Output() nokSurNameUpdated = new EventEmitter<any>();
  @Output() relationshipUpdated = new EventEmitter<any>();

  nokForm = new FormGroup({
    nokForeName: new FormControl(''),
    nokSurName: new FormControl(''),
    relationship: new FormControl('')
  });

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: any): void {
    if (changes.nokForeName) { this.nokForm.controls['nokForeName'].setValue(changes.nokForeName.currentValue); }
    if (changes.nokSurName) { this.nokForm.controls['nokSurName'].setValue(changes.nokSurName.currentValue); }
    if (changes.relationship) { this.nokForm.controls['relationship'].setValue(changes.relationship.currentValue); }
  }

  onNokForeNameChange(event: any): void {
    this.nokForeNameUpdated.emit(event);
  }

  onNokSurNameChange(event: any): void {
    this.nokSurNameUpdated.emit(event);
  }

  onRelationshipChange(event: any): void {
    this.relationshipUpdated.emit(event);
  }

}
