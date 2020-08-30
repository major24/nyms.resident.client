import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
//import { EnquiryMiscData } from '../models';

@Component({
  selector: 'enquiry-misc-edit',
  templateUrl: './enquiry-misc-edit.component.html',
  styleUrls: ['./enquiry-misc-edit.component.css']
})
export class EnquiryMiscEditComponent implements OnInit {
  @Input() moveInDate: undefined;
  @Input() familyHomeVisitDate: undefined;
  @Input() enquiryDate: undefined;
  @Input() responseDate: undefined;
  @Input() response: string;
  @Input() comments: string;
  @Output() moveInDateUpdated = new EventEmitter<any>();
  @Output() familyHomeVisitDateUpdated = new EventEmitter<any>();
  @Output() enquiryDateUpdated = new EventEmitter<any>();
  @Output() responseDateUpdated = new EventEmitter<any>();
  @Output() responseUpdated = new EventEmitter<string>();
  @Output() commentsUpdated = new EventEmitter<string>();

  enquiryMiscForm = new FormGroup({
    moveInDate: new FormControl(undefined),
    familyHomeVisitDate: new FormControl(undefined),
    enquiryDate: new FormControl(undefined),
    responseDate: new FormControl(undefined),
    response: new FormControl(''),
    comments: new FormControl(''),
    //status: new FormControl(''),
  });
  constructor() { }

  ngOnInit(): void {

  }

  ngOnChanges(changes: any): void {
    if (changes.moveInDate && changes.moveInDate.currentValue) {
      const d = new Date(changes.moveInDate.currentValue);
      this.enquiryMiscForm.controls['moveInDate'].setValue({year:d.getFullYear(),month:d.getMonth()+1,day:d.getDate()});
    }
    if (changes.familyHomeVisitDate && changes.familyHomeVisitDate.currentValue) {
      const d = new Date(changes.familyHomeVisitDate.currentValue);
      this.enquiryMiscForm.controls['familyHomeVisitDate'].setValue({year:d.getFullYear(),month:d.getMonth()+1,day:d.getDate()});
    }
    if (changes.enquiryDate && changes.enquiryDate.currentValue) {
      const d = new Date(changes.enquiryDate.currentValue);
      this.enquiryMiscForm.controls['enquiryDate'].setValue({year:d.getFullYear(),month:d.getMonth()+1,day:d.getDate()});
    }
    if (changes.responseDate && changes.responseDate.currentValue) {
      const d = new Date(changes.responseDate.currentValue);
      this.enquiryMiscForm.controls['responseDate'].setValue({year:d.getFullYear(),month:d.getMonth()+1,day:d.getDate()});
    }

    if (changes.response) { this.enquiryMiscForm.controls['response'].setValue(changes.response.currentValue); }
    if (changes.comments) { this.enquiryMiscForm.controls['comments'].setValue(changes.comments.currentValue); }
  }

  onMoveInDateChange(event: any): void {
    this.moveInDateUpdated.emit(event);
  }
  onFamilyHomeVisitDateChange(event: any): void {
    this.familyHomeVisitDateUpdated.emit(event);
  }
  onEnquiryDateChange(event: any): void {
    this.enquiryDateUpdated.emit(event);
  }
  onResponseDateChange(event: any): void {
    this.responseDateUpdated.emit(event);
  }
  onResponseChange(event: any): void {
    this.responseUpdated.emit(event);
  }
  onCommentsChange(event: any): void {
    this.commentsUpdated.emit(event);
  }

}






  // onMoveInDateChange(event: any): void {
  //   this._miscData.moveInDate = event.target.value;
  //   this.onEnquiryMiscDataChange();
  // }
  // onFamilyHomeVisitDateChange(event: any): void {
  //   this._miscData.familyHomeVisitDate = event.target.value;
  //   this.onEnquiryMiscDataChange();
  // }
  // onEnquiryDateChange(event: any): void {
  //   this._miscData.enquiryDate = event.target.value;
  //   this.onEnquiryMiscDataChange();
  // }
  // onResponseDateChange(event: any): void {
  //   this._miscData.responseDate = event.target.value;
  //   this.onEnquiryMiscDataChange();
  // }
  // onResponseChange(event: any): void {
  //   this._miscData.response = event.target.value;
  //   this.onEnquiryMiscDataChange();
  // }
  // onCommentsChange(event: any): void {
  //   this._miscData.comments = event.target.value;
  //   this.onEnquiryMiscDataChange();
  // }
  // onStatusChange(event: any): void {
  //   this._miscData.status = event.target.value;
  //   this.onEnquiryMiscDataChange();
  // }

  // onEnquiryMiscDataChange(): void {
  //   this.miscDataUpdated.emit(this._miscData);
  // }

  // setMiscDataFields(data: EnquiryMiscData): void {
  //   this.enquiryMiscForm.controls['moveInDate'].setValue(data.moveInDate);
  //   this.enquiryMiscForm.controls['familyHomeVisitDate'].setValue(data.familyHomeVisitDate);
  //   this.enquiryMiscForm.controls['enquiryDate'].setValue(data.enquiryDate);
  //   this.enquiryMiscForm.controls['responseDate'].setValue(data.responseDate);
  //   this.enquiryMiscForm.controls['response'].setValue(data.response);
  //   this.enquiryMiscForm.controls['comments'].setValue(data.comments);
  //   this.enquiryMiscForm.controls['status'].setValue(data.status);
  // }