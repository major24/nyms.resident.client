import { Component, OnInit } from '@angular/core';

import { InvoiceService } from '../../services/index';
import { Invoice, InvoiceSummary } from '../../models/index';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  rawInvoices: Invoice[] = [];
  invoices: Invoice[] = [];
  invoicesSummary: InvoiceSummary[] = [];

  constructor(private invoiceService: InvoiceService, private http: HttpClient) { }

  ngOnInit(): void {
  }

  displayAllInvoices(event: any): void {
    if (event.billingStart && event.billingEnd){
      this.loadInvoiceByDate(event.billingStart, event.billingEnd);
    }
  }

  loadInvoiceByDate(startDate: string, endDate: string): void {
    if (startDate === '' || endDate === null) {
      throw new console.error('Date not selected');
    }

    this.invoiceService.loadInvoiceByDate(startDate, endDate)
    .subscribe({
      next: (data) => {
        Object.assign(this.invoices, [...data]);
        Object.assign(this.rawInvoices, [...data]);
        // prepare summary
        this.makeSummaryTotals(this.invoices);
      },
      error: (error) => console.log('Error getting invoice:', error)
    });

  }

  localAuthorityChanged(event: any): void {
    console.log(event.target.value);
    this.invoices.splice(0, this.invoices.length);
    if (event.target.value === 'all'){
      Object.assign(this.invoices, [...this.rawInvoices]);
    } else {
      let filtered = this.rawInvoices.filter(i => i.localAuthorityId === +event.target.value);
      Object.assign(this.invoices, [...filtered]);
    }
    this.makeSummaryTotals(this.invoices);
  }

  getLaTotal(invoices: Invoice[], la: string): number {
    const x = invoices.map(i => i.schedules.filter(s => s.paymentFromName === la && s.paymentFrom == 'LA'));
    let sum = 0;
    x.map(m => {
          if (m.length > 0) {
            m.map(mm => sum += mm.amountDue)
          }
        });
    return sum;
  }

  getCcTotal(invoices: Invoice[]): number {
    const x = invoices.map(i => i.schedules.filter(s => s.paymentFrom == 'CC'));
    let sum = 0;
    x.map(m => {
          if (m.length > 0) {
            m.map(mm => sum += mm.amountDue)
          }
        });
    return sum;
  }

  getPvTotal(invoices: Invoice[]): number {
    const x = invoices.map(i => i.schedules.filter(s => s.paymentFrom == 'PV'));
    let sum = 0;
    x.map(m => {
          if (m.length > 0) {
            m.map(mm => sum += mm.amountDue)
          }
        });
    return sum;
  }

  makeSummaryTotals(invoices: Invoice[]): void {
    this.invoicesSummary.splice(0, this.invoicesSummary.length);
    let temp = [];
    let invSummary = [] as InvoiceSummary[];
    invoices.map(i => {
      i.schedules.map(s => temp.push(s.paymentFromName))
    });
    const uq = [...new Set(temp)]

    /**0: "Tameside Metropolitan Borough Council"
    1: "Manchester City Council"
    2: "Derbyshire County Council"
    3: "Client Contribution"
    4: "Private" */
    uq.map(u => {
      let obj = {} as InvoiceSummary;
      obj.localAuthority = u;
      if (u === 'Private') {
        obj.totalLaFee = this.getPvTotal(invoices);
      } else if (u === 'Client Contribution'){
        obj.totalLaFee = this.getCcTotal(invoices);
      } else {
        obj.totalLaFee = this.getLaTotal(invoices, u);
      }
      invSummary.push(obj);
    })

    Object.assign(this.invoicesSummary, [...invSummary]);
    // console.log('***', this.invoicesSummary);
  }

  convertToJsDate(event: any): Date {
    return new Date(event.year, event.month-1, event.day);
  }

}
