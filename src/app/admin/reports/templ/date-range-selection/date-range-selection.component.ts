import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { KeyPair } from '../../../../models/index';
import { Output, EventEmitter } from '@angular/core';
import CareHomeDetails from '../../../../helpers/data-carehome-details';

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

  // downloading: boolean = false;
  @Input() startDate: any = undefined;
  @Input() endDate: any = undefined;
  @Output() startDateSelectEvent = new EventEmitter<any>();
  @Output() endDateSelectEvent = new EventEmitter<any>();
  // @Output() localAuthorityChangedEvent = new EventEmitter<any>();
  @Output() reportSelectorChangedEvent = new EventEmitter<any>();
  @Output() getReportEvent = new EventEmitter<any>();
  @Output() downloadReportEvent = new EventEmitter<any>();

    // LA for dropdown
    // localAuthrities: KeyPair[] = [];

  constructor() { }

  ngOnInit(): void {
    // this.loadLocalAuthorites(1); // HARD FOR NOW. PCare
  }

  // loadLocalAuthorites(careHomeId: number): void {
  //   if (CareHomeDetails) {
  //     let chd = CareHomeDetails.filter(ch => ch.careHomeId === careHomeId)[0];
  //     this.localAuthrities = Object.assign(this.localAuthrities, chd.funders);
  //   }
  // }

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

  // onLocalAuthorityChange(event: any): void {
  //   this.localAuthorityChangedEvent.emit(event);
  // }

  onReportSelectorChange(event: any): void {
    this.reportSelectorChangedEvent.emit(event);
  }

  getReportByDate(): void {
    this.getReportEvent.emit();
  }

  downloadReportByDate() {
    this.downloadReportEvent.emit();
  }

}
