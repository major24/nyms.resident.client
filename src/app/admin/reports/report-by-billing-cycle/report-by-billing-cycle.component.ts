import { Component, OnInit } from '@angular/core';
import { InvoiceData, BillingCycle, InvoiceDataInit } from '../../models/index';
import { InvoiceService } from '../../services/index';
// import { KeyPair } from '../../../models/index';
import CareHomeDetails from '../../../helpers/data-carehome-details';

@Component({
  selector: 'app-report-by-billing-cycle',
  templateUrl: './report-by-billing-cycle.component.html',
  styleUrls: ['./report-by-billing-cycle.component.css']
})
export class ReportByBillingCycleComponent implements OnInit {
  billingCyclesSource: BillingCycle[] = [];
  billingCycles: BillingCycle[] = [];

  _localAuthorityId: number = 0;
  _billingCycleId: number = 0;
  _invoiceData: InvoiceData;
  _invoices: any = []; // TODO: chg to conc obj
  error: string = '';
  loading: boolean = false;
  _localAuthorities: any = [];

  constructor(private invoiceService: InvoiceService) { }

  ngOnInit(): void {
    let careHomeId = 1; // TODO - Hardcode for now
    this._localAuthorities = CareHomeDetails.filter((ch) => ch.careHomeId === careHomeId).map(home => home.funders)[0];
    console.log('>>LA>>', this._localAuthorities);
    // load billing cycle in advance
    this.invoiceService.loadBillingCycles()
    .subscribe({
      next: (data) => {
        this.billingCyclesSource = Object.assign(this.billingCyclesSource, [...data]);
      },
      error: (error) => { console.log('Error loading billing cycles', error); }
    });
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
    this.loading = true;
    this._invoiceData = new InvoiceDataInit();
    this.invoiceService.loadInvoiceByBillingCycle(this._localAuthorityId, this._billingCycleId)
    .subscribe({
      next: (data) => {
        this._invoiceData = data;
        if (this._invoiceData.invoiceResidents.length == 0) this.error = 'NOT FOUND';
        this._invoices = Object.assign(this._invoices, [...data.invoiceResidents]);
        this.loading = false;
      },
      error: (error) => {
        console.log('Error getting invoice data by billing cycle ', error);
        this.error = error;
        this.loading = false;
      }
    })
  }

  onInvoiceValidatedSave(): void {
    this.onGetReportEvent();
  }




}
