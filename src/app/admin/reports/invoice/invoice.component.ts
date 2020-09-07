import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { InvoiceService } from '../../services/index';
import { Invoice } from '../../models/index';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  invoiceForm = new FormGroup({
    billingStartDate: new FormControl(''),
    billingEndDate: new FormControl(''),
  });

  billingStart: string;
  billingEnd: string;


  private _invoices: BehaviorSubject<Invoice[]> = new BehaviorSubject<Invoice[]>([]);
  public invoices$ = this._invoices.asObservable();
  invoices: Invoice[] = [];





  constructor(private invoiceService: InvoiceService) { }

  ngOnInit(): void {
  }

  onBillingStartDateChange(event: any): void {
    console.log(event);
    if (event) {
      console.log('>>>>', event.year, event.month, event.day)
      // const d = new Date(event.year, event.month-1, event.day);
      this.billingStart = `${event.year}-${event.month}-${event.day}`; // this.convertToJsDate(event);
      console.log('>>>>', this.billingStart);
    }
  }

  onBillingEndDateChange(event: any): void {
    console.log(event);
    if (event) {
      this.billingEnd = `${event.year}-${event.month}-${event.day}`;
      //this.billingEnd = new Date(event.year, event.month, event.day); //this.convertToJsDate(event);
    }
  }

  getReportsByDate(): void {
    if (this.billingStart && this.billingEnd) {
      // let x = new Date(this.billingStart);
      // let y = new Date(this.billingEnd);
      // let start: string = `${this.billingStart.getFullYear()}-${this.billingStart.getMonth()}-${this.billingStart.getDay()}`;
      // let end: string = `${y.getFullYear()}-${y.getMonth()}-${y.getDay()}`;
      console.log(this.billingStart, this.billingEnd);
      this.loadInvoiceByDate(this.billingStart, this.billingEnd);
    }
  }

  loadInvoiceByDate(startDate: string, endDate: string): void {
    if (startDate === '' || endDate === null) {
      throw new console.error('Date not selected');
    }

    this.invoiceService.loadInvoiceByDate(startDate, endDate)
    .subscribe({
      next: (data) => {
        console.log('>>>>>>', data);
        this.invoices = data;
      },
      error: (error) => console.log('Error getting invoice:', error)
    });

  }


    // this.enquiresService.loadEnquiryByReferenceId(referenceId)
    // .subscribe({
    //   next: (data) => {
    //     // console.log('>>>>++', data);
    //     this._enquiryResident.next(data);
    //     // once data is available setup THIS form related with data
    //     this.setupEnquiryEditForm(data);
    //   },
    //   error: (error) => {
    //     console.log('ERROR:', error);
    //   },
    // });
  //}



  convertToJsDate(event: any): Date {
    return new Date(event.year, event.month-1, event.day);
  }

}
