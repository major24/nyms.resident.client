import { Component, OnInit, Input } from '@angular/core';
import { InvoiceResident } from '../../../models/index';
import { InvoiceService } from '../../../services/index';

@Component({
  selector: 'report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css']
})
export class ReportListComponent implements OnInit {
  @Input() startDate: any;
  @Input() endDate: any;
  invoices: InvoiceResident[] = [];
  loading: boolean = false;

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

    this.loading = true;
    this.invoiceService.loadInvoiceByDate(startDate, endDate)
    .subscribe({
      next: (data) => {
        Object.assign(this.invoices, [...data.invoiceResidents]);
        this.loading = false;
      },
      error: (error) => {
        console.log('Error getting invoice:', error);
        this.loading = false;
      }
    });
  }

}
