import { Component, OnInit } from '@angular/core';
import { InvoiceData, BillingCycle, InvoiceDataInit } from '../../models/index';
import { InvoiceService } from '../../services/index';
import { KeyPair } from '../../../models/index';

@Component({
  selector: 'app-report-by-billing-cycle',
  templateUrl: './report-by-billing-cycle.component.html',
  styleUrls: ['./report-by-billing-cycle.component.css']
})
export class ReportByBillingCycleComponent implements OnInit {
  billingCyclesSource: BillingCycle[] = [];
  billingCycles: BillingCycle[] = [];

  // LA for dropdown. Hardcode for now
  localAuthorities: KeyPair[] = [
    { key: '1', value: 'Derbyshire County Council'},
    { key: '2', value:'Manchester City Council'},
    { key: '3', value:'Tameside Metropolitan Borough Council'}
  ];
  _localAuthorityId: number = 0;
  _billingCycleId: number = 0;
  _invoiceData: InvoiceData;
  _invoices: any = []; // TODO: chg to conc obj
  error: string = '';

  constructor(private invoiceService: InvoiceService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.invoiceService.loadBillingCycles()
      .subscribe({
        next: (data) => {
          console.log('..', data);
          this.billingCyclesSource = Object.assign(this.billingCyclesSource, [...data]);
        },
        error: (error) => { console.log('Error loading billing cycles', error); }
      })
    }, 1000)
  }

  onLocalAuthorityChange(event: any): void {
    this._localAuthorityId = +event.target.value;
    this.setBillingCycleByLocalAuthorityId(this._localAuthorityId);
  }

  onBillingCycleChangedEvent(event: any): void {
    this._billingCycleId = +event.target.value;
  }

  setBillingCycleByLocalAuthorityId(id: number): void {
    this.billingCycles = this.billingCyclesSource.filter(bc => bc.localAuthorityId === id);
  }

  onGetReportEvent(): void {
    this.error = '';
    if (this._localAuthorityId <= 0 || this._billingCycleId <= 0) {
      this.error = 'Please select local authority and a billing cycle';
      return;
    }

    this._invoiceData = new InvoiceDataInit();
    this.invoiceService.loadInvoiceByBillingCycle(this._localAuthorityId, this._billingCycleId)
    .subscribe({
      next: (data) => {
        this._invoiceData = data;
        this._invoices = Object.assign(this._invoices, [...data.invoiceResidents]);
      },
      error: (error) => { console.log('Error getting invoice data by billing cycle ', error); }
    })
  }





}
