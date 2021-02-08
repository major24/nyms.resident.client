import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'resident-misc-edit',
  templateUrl: './resident-misc-edit.component.html',
  styleUrls: ['./resident-misc-edit.component.css']
})
export class ResidentMiscEditComponent implements OnInit {
  @Input() admissionDate: undefined;
  @Output() admissionDateUpdated = new EventEmitter<any>();
  @Input() labelDateCtl: string = 'Date';
  @Input() familyHomeVisitDate: undefined;
  @Output() familyHomeVisitDateUpdated = new EventEmitter<any>();
  @Input() comments: string;
  @Output() commentsUpdated = new EventEmitter<string>();

  residentMiscForm = new FormGroup({
    admissionDate: new FormControl(''),
    familyHomeVisitDate: new FormControl(''),
    comments: new FormControl(''),
  });

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: any): void {
    if (changes.comments) { this.residentMiscForm.controls['comments'].setValue(changes.comments.currentValue); }
  }

  onAdmissionDateChange(event: any): void {
    this.admissionDateUpdated.emit(event);
  }

  onFamilyHomeVisitDateChange(event: any): void {
    this.familyHomeVisitDateUpdated.emit(event);
  }

  onCommentsChange(event: any): void {
    this.commentsUpdated.emit(event);
  }

}
