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
  @Input() labelDateCtl: string = 'Date';
  @Input() familyHomeVisitDate: undefined;
  @Input() comments: string;
  @Output() moveInDateUpdated = new EventEmitter<any>();
  @Output() familyHomeVisitDateUpdated = new EventEmitter<any>();
  @Output() commentsUpdated = new EventEmitter<string>();

  enquiryMiscForm = new FormGroup({
    moveInDate: new FormControl(undefined),
    familyHomeVisitDate: new FormControl(undefined),
    comments: new FormControl(''),
  });

  constructor(private readonly util: Util) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: any): void {
    if (changes.comments) { this.enquiryMiscForm.controls['comments'].setValue(changes.comments.currentValue); }
  }

  onMoveInDateChange(event: any): void {
      this.moveInDateUpdated.emit(event);
  }

  onFamilyHomeVisitDateChange(event: any): void {
      this.familyHomeVisitDateUpdated.emit(event);
  }

  onCommentsChange(event: any): void {
    this.commentsUpdated.emit(event);
  }

}
