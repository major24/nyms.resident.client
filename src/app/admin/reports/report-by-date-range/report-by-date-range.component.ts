import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { InvoiceService, ReportService } from '../../services/index';
import { InvoiceResident, InvoiceSummary, InvoiceData, InvoiceValidationsReportResponse, OccupancyByDate } from '../../models/index';
import { FileService } from '../../../services/index';
import { saveAs } from 'file-saver';

import { ReportOccupancyByDayComponent } from '../templ/report-occupancy-by-day/report-occupancy-by-day.component';

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
  occupancyByDateResponse: OccupancyByDate[] = [];
  loading: boolean = false;

  startDate: string;
  endDate: string;
  downloading: boolean = false;
  reportSelector: string = "1";

  // Validations reponse model
  invoiceValidationsReportResponse: InvoiceValidationsReportResponse[] = [];
  rawInvoiceValidationsReportResponse: InvoiceValidationsReportResponse[] = [];


  // view child
  @ViewChild(ReportOccupancyByDayComponent)
  private reportOccupancyByDayComponent: ReportOccupancyByDayComponent;


  constructor(private invoiceService: InvoiceService, private fileService: FileService, private reportService: ReportService) { }

  ngOnInit(): void {
  }

  onStartDateSelectEvent(event: any): void {
    this.startDate = event;
  }
  onEndDateSelectEvent(event: any): void {
    this.endDate = event;
  }

  getReport(): void {
    if (this.startDate && this.endDate){
      // 1=summary, 2=avg occupancy, 3=validations, 4=Occupancy by Day
      switch(this.reportSelector) {
        case "1":
          this.loadInvoiceByDate(this.startDate, this.endDate);
          break;
        case "2":
          this.loadInvoiceByDate(this.startDate, this.endDate);
          break;
        case "3":
          this.loadValidationsDataByDate(this.startDate, this.endDate);
          break;
        case "4":
          this.reportOccupancyByDayComponent.getReport();
          break;
        default:
          this.loadInvoiceByDate(this.startDate, this.endDate);
          break;
      }
    }
  }

  downloadReport(): void {
    // const url = `/api/reports/invoices/summary/2020-09-01/2020-09-10/download`;
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
        this.invoices = [];
        Object.assign(this.invoices, [...data.invoiceResidents]);
        Object.assign(this.rawInvoices, [...data.invoiceResidents]);
        this.makeSummaryTotals(this.invoices);
        console.log('>>>>>', this.rawInvoices);
        this.loading = false;
      },
      error: (error) => {
        console.log('Error getting invoice:', error);
        this.loading = false;
      }
    });
  }

  loadValidationsDataByDate(startDate: string, endDate: string): void {
    this.invoiceValidationsReportResponse = [];
    if (startDate === '' || endDate === null) {
      throw new console.error('Date not selected');
    }

    this.loading = true;
    this.invoiceService.loadValidationsDataByDate(startDate, endDate)
    .subscribe({
      next: (data) => {
          this.rawInvoiceValidationsReportResponse = data;
          Object.assign(this.invoiceValidationsReportResponse, [...data]);
        this.loading = false;
      },
      error: (error) => {
        console.log('Error getting invoice:', error);
        this.loading = false;
      }
    });
  }


  reportSelectorChanged(event: any): void {
    this.reportSelector = event.target.value;
  }









  // **************************************************************************************
  // *** REQUIRED for Summary ***
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
  }
  // *** End of Summary ***
  // **************************************************************************************


}
