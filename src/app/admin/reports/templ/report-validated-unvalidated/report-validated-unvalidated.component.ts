import { Component, OnInit, Input } from '@angular/core';
import { InvoiceValidationsReportResponse } from '../../../models/index';
import { InvoiceService } from '../../../services/index';

@Component({
  selector: 'report-validated-unvalidated',
  templateUrl: './report-validated-unvalidated.component.html',
  styleUrls: ['./report-validated-unvalidated.component.css']
})
export class ReportValidatedUnvalidatedComponent implements OnInit {
  @Input() startDate: any;
  @Input() endDate: any;
  invoiceValidationsReportResponse: InvoiceValidationsReportResponse[] = [];
  loading: boolean = false;

  constructor(private invoiceService: InvoiceService) { }

  ngOnInit(): void {
  }

  getReport(): void {
    if (this.startDate === '' || this.endDate === null) {
      throw new console.error('Date not selected');
    }
    this.loadValidationsDataByDate(this.startDate, this.endDate);
  }

  loadValidationsDataByDate(startDate: string, endDate: string): void {
    this.invoiceValidationsReportResponse = [];

    this.loading = true;
    this.invoiceService.loadValidationsDataByDate(startDate, endDate)
    .subscribe({
      next: (data) => {
        Object.assign(this.invoiceValidationsReportResponse, [...data]);
        this.loading = false;
      },
      error: (error) => {
        console.log('Error getting invoice:', error);
        this.loading = false;
      }
    });
  }

}
