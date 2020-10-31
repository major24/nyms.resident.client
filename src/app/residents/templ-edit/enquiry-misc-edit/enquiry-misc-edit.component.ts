import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Util } from '../../../helpers/index';

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
  });
  constructor(private readonly util: Util) { }

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
    if (event) {
      this.moveInDateUpdated.emit(this.util.convertAngDateToJsDate(event));
    }
  }
  onMoveInDateBlur(event: any): void {
    this.moveInDateUpdated.emit(this.util.convertStringDateToJsDate(event.target.value));
  }

  onFamilyHomeVisitDateChange(event: any): void {
    if(event) {
      this.familyHomeVisitDateUpdated.emit(this.util.convertAngDateToJsDate(event));
    }
  }
  onFamilyHomeVisitDateBlur(event: any): void {
    if (event) {
      this.familyHomeVisitDateUpdated.emit(this.util.convertStringDateToJsDate(event.target.value));
    }
  }
  // onEnquiryDateChange(event: any): void {
  //   this.enquiryDateUpdated.emit(event);
  // }
  // onResponseDateChange(event: any): void {
  //   this.responseDateUpdated.emit(event);
  // }
  // onResponseChange(event: any): void {
  //   this.responseUpdated.emit(event);
  // }
  onCommentsChange(event: any): void {
    this.commentsUpdated.emit(event);
  }

}
