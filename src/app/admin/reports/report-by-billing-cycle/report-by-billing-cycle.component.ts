import { Component, OnInit } from '@angular/core';
import { InvoiceData, BillingCycle, InvoiceDataInit } from '../../models/index';
import { InvoiceService } from '../../services/index';
import { CareHome } from '../../../residents/models/index';
import { CarehomeService } from '../../../residents/services/index';
import { Observable } from 'rxjs';
import { KeyPair } from '../../../models/index';

@Component({
  selector: 'app-report-by-billing-cycle',
  templateUrl: './report-by-billing-cycle.component.html',
  styleUrls: ['./report-by-billing-cycle.component.css']
})
export class ReportByBillingCycleComponent implements OnInit {
  billingCyclesSource: BillingCycle[] = [];
  billingCycles: BillingCycle[] = [];
  careHomeDetails: CareHome[] = [];
  careHomeId = 1; // Default to PCare Centre
  careHomes: KeyPair[] = [];
  localAuthorities: KeyPair[] = [];

  _localAuthorityId: number = 0;
  _billingCycleId: number = 0;
  _invoiceData: InvoiceData;
  _invoices: any = [];
  error: string = '';
  loading: boolean = false;

  constructor(private invoiceService: InvoiceService, private careHomeService: CarehomeService,) { }

  ngOnInit(): void {
    this.loading = true;
    this.loadAllCareHomeDetails().subscribe({
      next: (dataChDetails) => {
        this.careHomeDetails = dataChDetails;
        console.log('CHD', this.careHomeDetails);
        this.setCareHomes();
        this.setLocalAuthoritiesByCareHomeId(this.careHomeId);
        this.loading = false;
      },
      error: (error) => {
        console.log('Error loading carehome details', error);
        this.loading = false;
      },
    });
    // load billing cycle in advance
    this.loading = true;
    this.invoiceService.loadBillingCycles()
    .subscribe({
      next: (data) => {
        this.billingCyclesSource = Object.assign(this.billingCyclesSource, [...data]);
        this.loading = false;
        // console.log('BCycles', this.billingCyclesSource)
      },
      error: (error) => {
        console.log('Error loading billing cycles', error);
        this.loading = false;
      }
    });
  }

  loadAllCareHomeDetails(): Observable<CareHome[]> {
    return this.careHomeService.loadAllCareHomeDetails();
  }

  onCareHomeChange(event: any): void {
    if (event.target.value) {
      this.setLocalAuthoritiesByCareHomeId(+event.target.value)
    }
  }

  onLocalAuthorityChange(event: any): void {
    this._localAuthorityId = +event.target.value;
    this.setBillingCycleByLocalAuthorityId(this._localAuthorityId);
  }

  onBillingCycleChangedEvent(event: any): void {
    this._billingCycleId = +event.target.value;
  }

  setCareHomes(): void {
    this.careHomeDetails.map(chd => {
      let kvp = { key: chd.id, value: chd.name };
      this.careHomes.push(kvp);
    });
  }

  setLocalAuthoritiesByCareHomeId(id: number): void {
    this.localAuthorities.splice(0, this.localAuthorities.length);
    this.billingCycles.splice(0, this.billingCycles.length);
    this.careHomeDetails.map(chd => {
      if (chd.id === id) {
        chd.localAuthorities.map(la => {
          let kvp = { key: la.id, value: la.name };
          this.localAuthorities.push(kvp);
        });
      }
    });
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
