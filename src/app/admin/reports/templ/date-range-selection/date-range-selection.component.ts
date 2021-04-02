import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
    reportSelector: new FormControl(''),
    localAuthority: new FormControl('')
  });

  @Input() startDate: any = undefined;
  @Input() endDate: any = undefined;
  @Output() startDateSelectEvent = new EventEmitter<any>();
  @Output() endDateSelectEvent = new EventEmitter<any>();
  @Output() reportSelectorChangedEvent = new EventEmitter<any>();
  @Output() getReportEvent = new EventEmitter<any>();
  @Output() downloadReportEvent = new EventEmitter<any>();
  _startDate = '';
  _endDate = '';
  error = ''

  constructor() { }

  ngOnInit(): void {
  }

  onStartDateChange(event: any): void {
    if (event) {
      this.error = '';
      this._startDate = event;
      this.startDateSelectEvent.emit(event);
    }
  }
  onEndDateChange(event: any): void {
    if (event) {
      this.error = '';
      this._endDate = event;
      this.endDateSelectEvent.emit(event);
    }
  }

  onReportSelectorChange(event: any): void {
    this.reportSelectorChangedEvent.emit(event);
  }

  getReportByDate(): void {
    this.error = '';
    if (this._startDate === '' || this._endDate === '') {
      this.error = 'Start and end dates are required.'
      return;
    }
    if (new Date(this._startDate) > new Date(this._endDate)) {
      this.error = 'Incorrect date. End date must be greater than start date.';
      return;
    }
    this.getReportEvent.emit();
  }

  downloadReportByDate() {
    this.downloadReportEvent.emit();
  }

}
