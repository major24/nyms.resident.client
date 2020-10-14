import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { KeyPair } from '../../../../models/index';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'date-range-selection',
  templateUrl: './date-range-selection.component.html',
  styleUrls: ['./date-range-selection.component.css']
})
export class DateRangeSelectionComponent implements OnInit {

  invoiceForm = new FormGroup({
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
    localAuthority: new FormControl('')
  });

  // downloading: boolean = false;

  @Output() startDateSelectEvent = new EventEmitter<any>();
  @Output() endDateSelectEvent = new EventEmitter<any>();
  @Output() startDateBlurEvent = new EventEmitter<any>();
  @Output() endDateBlurEvent = new EventEmitter<any>();
  @Output() localAuthorityChangedEvent = new EventEmitter<any>();
  @Output() getReportEvent = new EventEmitter<any>();
  @Output() downloadReportEvent = new EventEmitter<any>();

    // LA for dropdown
    localAuthrities: KeyPair[] = [
      { key:'all', value:'All'},
      { key: '1', value: 'Derbyshire County Council'},
      { key: '2', value:'Manchester City Council'},
      { key: '3', value:'Tameside Metropolitan Borough Council'},
      { key: '101', value:'Private'}
    ];

  constructor() { }

  ngOnInit(): void {
  }

  onStartDateChange(event: any): void {
    if (event) {
      this.startDateSelectEvent.emit(event);
    }
  }
  onEndDateChange(event: any): void {
    if (event) {
      this.endDateSelectEvent.emit(event);
    }
  }
  onStartDateBlur(event: any): void {
    if (event) {
      this.startDateBlurEvent.emit(event);
    }
  }
  onEndDateBlur(event: any): void {
    if (event) {
      this.endDateBlurEvent.emit(event);
    }
  }

  onLocalAuthorityChange(event: any): void {
    this.localAuthorityChangedEvent.emit(event);
  }

  getReportByDate(): void {
    this.getReportEvent.emit();
  }

  downloadReportByDate() {
    this.downloadReportEvent.emit();
  }

}
