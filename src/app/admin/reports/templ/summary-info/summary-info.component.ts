import { Component, OnInit, Input } from '@angular/core';
import { InvoiceResident, InvoiceSummary, SchedulePayment } from '../../../models/index';
import { InvoiceService } from '../../../services/index';
import { KeyPair } from '../../../../models/index';

@Component({
  selector: 'summary-info',
  templateUrl: './summary-info.component.html',
  styleUrls: ['./summary-info.component.css']
})
export class SummaryInfoComponent implements OnInit {
  @Input() startDate: string = '';
  @Input() endDate: string = '';
  invoices: InvoiceResident[] = [];
  loading: boolean = false;
  invSummaries: InvoiceSummary[] = [];
  grandTotalForSummary: number = 0;

  paymentTypeIdDesc: KeyPair[] = [
    { "key": 1, "value": "Local Authority" },
    { "key": 2, "value": "Client Contribution" },
    { "key": 3, "value": "Private" },
    { "key": 4, "value": "Covid Supplement" },
    { "key": 5, "value": "Adjustments" }
  ];

  constructor(private invoiceService: InvoiceService) { }

  ngOnInit(): void {
  }

  getReport(): void {
    if (this.startDate === '' || this.endDate === null) {
      throw new console.error('Date not selected');
    }
    this.loadInvoiceByDate(this.startDate, this.endDate);
  }

  loadInvoiceByDate(startDate: string, endDate: string): void {
    this.invoices.splice(0, this.invoices.length);
    this.invSummaries.splice(0, this.invSummaries.length);
    this.grandTotalForSummary = 0;
    this.loading = true;

    this.invoiceService.loadInvoiceByDate(startDate, endDate)
    .subscribe({
      next: (data) => {
        Object.assign(this.invoices, [...data.invoiceResidents]);
        // console.log(this.invoices);
        if (this.invoices && this.invoices.length > 0) {
          this.prepareFundProviderSummary();
        }
        this.loading = false;
      },
      error: (error) => {
        console.log('Error getting invoice:', error);
        this.loading = false;
      }
    });
  }

  prepareFundProviderSummary(): void {
    const fundProviders = this.extractUniqueFundProviders().sort();
    const uniquePaymentTypeIds = this.extractUniquePaymentTypeIds().sort();
    const paymentProviderIdForLA = 1;
    console.log('uniquePaymentTypeIds', uniquePaymentTypeIds);
    // make a flat list all sps into one SINGLE array, else it will be multi array
    let allSchedulePayments: SchedulePayment[] = [];
    this.invoices.map(i => {
      i.schedulePayments.map(sp => {
        allSchedulePayments.push(sp);
      });
    });

    let total = 0;
    fundProviders.map(fp => {
      // get each provider by filtering, exclude 'Private' for now. Include in next step
      if (fp !== 'Private') {
        const spsByProv = allSchedulePayments.filter(sp => sp.paymentFromName === fp);
        total = 0;
        total = this.extractTotalFromSchedulePayments(spsByProv, paymentProviderIdForLA); // LA = 1
        let invSummary = {
          fundProvider: fp,
          totalFee: total
        };
        this.invSummaries.push(invSummary);
      }
    });

    uniquePaymentTypeIds.map(pid => {
      total = 0;
      // Exclude LA. Already done in previous step
      if (pid > paymentProviderIdForLA) {
        const sps = allSchedulePayments.filter(sp => sp.paymentTypeId === pid);
        total = this.extractTotalFromSchedulePayments(sps, pid);
        let invSummary = {
          fundProvider: this.paymentTypeIdDesc.find(pd => pd.key === pid).value,
          totalFee: total
        };
        this.invSummaries.push(invSummary);
      }
    });

    // Grand Total: Now add each providers+adj to get grand total
    total = 0;
    this.invSummaries.map(iv => {
      this.grandTotalForSummary += iv.totalFee;
    });
  }

  extractUniqueFundProviders(): string[] {
    let uniqueFundProviders: string[] = [];
    this.invoices.map(i => {
      i.schedulePayments.map(sp => {
        if (!uniqueFundProviders.includes(sp.paymentFromName)) {
          uniqueFundProviders.push(sp.paymentFromName);
        }
        return;
      })
    });
    return uniqueFundProviders;
  }

  extractUniqueFundProviderIds(): number[] {
    let unqFundProviderIds: number[] = [];
    this.invoices.map(i => {
      i.schedulePayments.map(sp => {
        if (!unqFundProviderIds.includes(sp.localAuthorityId)) {
          unqFundProviderIds.push(sp.localAuthorityId);
        }
        return;
      })
    });
    return unqFundProviderIds;
  }

  extractUniquePaymentTypeIds(): number[] {
    let unqPaymentTypeIds: number[] = [];
    this.invoices.map(i => {
      i.schedulePayments.map(sp => {
        if (!unqPaymentTypeIds.includes(sp.paymentTypeId)) {
          unqPaymentTypeIds.push(sp.paymentTypeId);
        }
        return;
      });
    });
    return unqPaymentTypeIds;
  }

  extractTotalFromSchedulePayments(sps: SchedulePayment[], paymentTypeId: number): number {
    let amt = 0;
    sps.map(sp => {
      if (sp.paymentTypeId === paymentTypeId) {
        amt += sp.amountDue;
      }
    });
    return amt;
  }

  isNumberArray(value: unknown): value is number[] {
    return (
      Array.isArray(value) &&
      value.every(element => typeof element === "number")
    );
  }

}
