import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../../services/index';
import { InvoiceResident, InvoiceSummary, InvoiceData } from '../../models/index';
import { FileService } from '../../../services/index';
import { saveAs } from 'file-saver';

@Component({
  selector: 'report-by-date-range',
  templateUrl: './report-by-date-range.component.html',
  styleUrls: ['./report-by-date-range.component.css']
})
export class ReportByDateRangeComponent implements OnInit {
  _invoiceData: InvoiceData;
  rawInvoices: InvoiceResident[] = [];
  invoices: InvoiceResident[] = [];
  invoicesSummary: InvoiceSummary[] = [];
  loading: boolean = false;

  startDate: string;
  endDate: string;
  downloading: boolean = false;

  constructor(private invoiceService: InvoiceService, private fileService: FileService) { }

  ngOnInit(): void {
  }

  onStartDateSelectEvent(event: any): void {
    this.startDate = `${event.year}-${event.month}-${event.day}`;
  }
  onEndDateSelectEvent(event: any): void {
    this.endDate = `${event.year}-${event.month}-${event.day}`;
  }
  onStartDateBlurEvent(event: any): void {
    this.startDate = event.target.value;
  }
  onEndDateBlurEvent(event: any): void {
    this.endDate = event.target.value;
  }

  getReport(): void {
    if (this.startDate && this.endDate){
      this.loadInvoiceByDate(this.startDate, this.endDate);
    }
  }

  downloadReport(): void {
    // const url = `/api/invoices/all/2020-09-01/2020-09-10/download`;
    if (this.startDate === '' || this.endDate === null) {
      throw new console.error('Date not selected');
    }
    this.downloading = true;
    this.fileService.downloadFile(this.startDate, this.endDate).subscribe(response => {
      saveAs(response, `invoice-${this.startDate}-${this.endDate}.csv`);
      this.downloading = false;
		}), error => console.log('Error downloading the file'),
    () => console.info('File downloaded successfully');
  }


  loadInvoiceByDate(startDate: string, endDate: string): void {
    if (startDate === '' || endDate === null) {
      throw new console.error('Date not selected');
    }

    this.loading = true;
    this.invoiceService.loadInvoiceByDate(startDate, endDate)
    .subscribe({
      next: (data) => {
        this._invoiceData = data;
        Object.assign(this.invoices, [...data.invoiceResidents]);
        Object.assign(this.rawInvoices, [...data.invoiceResidents]);
        console.log('>>>', this.rawInvoices);
        this.makeSummaryTotals(this.invoices);
        this.loading = false;
      },
      error: (error) => {
        console.log('Error getting invoice:', error);
        this.loading = false;
      }
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

  getLaTotal(invoices: InvoiceResident[], la: number): number {
    // const x = invoices.map(i => i.schedulePayments.filter(s => s.paymentFromName === la && s.paymentProviderId === 1)); // LA
    const x = invoices.map(i => i.schedulePayments.filter(s => s.localAuthorityId === la && s.paymentProviderId === 1)); // LA
    let sum = 0;
    x.map(m => {
          if (m.length > 0) {
            m.map(mm => sum += mm.amountDue)
          }
        });
    return sum;
  }

  getCcTotal(invoices: InvoiceResident[]): number {
    const x = invoices.map(i => i.schedulePayments.filter(s => s.paymentProviderId === 2));
    let sum = 0;
    x.map(m => {
          if (m.length > 0) {
            m.map(mm => sum += mm.amountDue)
          }
        });
    return sum;
  }

  getPvTotal(invoices: InvoiceResident[]): number {
    const x = invoices.map(i => i.schedulePayments.filter(s => s.paymentProviderId === 3));
    let sum = 0;
    x.map(m => {
          if (m.length > 0) {
            m.map(mm => sum += mm.amountDue)
          }
        });
    return sum;
  }

  makeSummaryTotals(invoices: InvoiceResident[]): void {
    this.invoicesSummary.splice(0, this.invoicesSummary.length);
    let temp = [];
    let invSummary = [] as InvoiceSummary[];
    invoices.map(i => {
      i.schedulePayments.map(s => temp.push(s.paymentProviderId)) //.paymentFromName))
    });
    const uq = [...new Set(temp)]

    /**0: "Tameside Metropolitan Borough Council"
    1: "Manchester City Council"
    2: "Derbyshire County Council"
    3: "Client Contribution"
    4: "Private" */
    console.log('>>??', uq)
    uq.map(u => {
      let obj = {} as InvoiceSummary;
      obj.localAuthority = u;
      if (u === 3) { //'Private') {
        obj.totalLaFee = this.getPvTotal(invoices);
      } else if (u === 2) { //'Client Contribution'){
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
