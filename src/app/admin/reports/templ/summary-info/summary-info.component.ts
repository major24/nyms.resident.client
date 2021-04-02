import { Component, OnInit, Input } from '@angular/core';
import { InvoiceResident, InvoiceSummary, SchedulePayment } from '../../../models/index';
import { InvoiceService } from '../../../services/index';

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
    const fundProviders = this.extractUniqueFundProviders();
    // console.log('fundProviders', fundProviders);
    // let allSchedulePayments = this.invoices.map(i => i.schedulePayments);
    // make a flat list all sps into one SINGLE array, else it will be multi array
    let allSchedulePayments: SchedulePayment[] = [];
    this.invoices.map(i => {
      i.schedulePayments.map(sp => {
        allSchedulePayments.push(sp);
      });
    });
    // console.log('>>', allSchedulePayments);

    let total = 0;
    fundProviders.map(fp => {
      // get each provider by filtering
      const spsByProv = allSchedulePayments.filter(sp => sp.paymentFromName === fp);
      total = 0;
      if (fp === 'Private') { // payment type is diff for private
        total = this.extractTotalFromSchedulePayments(spsByProv, 3); // Private type id
      } else {
        total = this.extractTotalFromSchedulePayments(spsByProv, 1); // LA
      }

      let invSummary = {
        localAuthority: fp,
        totalLaFee: total
      };
      this.invSummaries.push(invSummary);
    });

    // Now get client contributions..
    total = 0;
    const spsCC = allSchedulePayments.filter(sp => sp.paymentTypeId === 2);
    total = this.extractTotalFromSchedulePayments(spsCC, 2); // CC
    let invSummary = {
      localAuthority: 'Client Contribution',
      totalLaFee: total
    };
    this.invSummaries.push(invSummary);
    console.log(this.invSummaries);
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
