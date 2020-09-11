import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { KeyPair } from '../../../../models/index';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'billing-date-selection',
  templateUrl: './billing-date-selection.component.html',
  styleUrls: ['./billing-date-selection.component.css']
})
export class BillingDateSelectionComponent implements OnInit {

  invoiceForm = new FormGroup({
    billingStartDate: new FormControl('', [Validators.required]),
    billingEndDate: new FormControl('', [Validators.required]),
    localAuthority: new FormControl('')
  });

  billingStart: string;
  billingEnd: string;

  @Output() localAuthorityChangedEvent = new EventEmitter<any>();
  @Output() getReportEvent = new EventEmitter<any>();

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

  onBillingStartDateChange(event: any): void {
    if (event) {
      this.billingStart = `${event.year}-${event.month}-${event.day}`;
    }
  }

  onBillingEndDateChange(event: any): void {
    if (event) {
      this.billingEnd = `${event.year}-${event.month}-${event.day}`;
    }
  }

  onLocalAuthorityChange(event: any): void {
    this.localAuthorityChangedEvent.emit(event);
    // this.invoices.splice(0, this.invoices.length);
    // if (event.target.value === 'all'){
    //   Object.assign(this.invoices, [...this.rawInvoices]);
    // } else {
    //   let filtered = this.rawInvoices.filter(i => i.localAuthorityId === +event.target.value);
    //   Object.assign(this.invoices, [...filtered]);
    // }
    // this.getSummaryTotals(this.invoices);

  }


  getReportsByDate(): void {
    if (this.billingStart && this.billingEnd) {
      this.getReportEvent.emit({ billingStart: this.billingStart, billingEnd:this.billingEnd })
    }
  }

  downloadReportsByDate() { //Observable<Blob> {
    console.log('>>hre')
    // window.open('http://localhost:4200/api/invoices/all/2020-04-29/2020-05-24/download', '_blank');
  }

}
