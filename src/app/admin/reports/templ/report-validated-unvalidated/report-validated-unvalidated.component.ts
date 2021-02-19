import { Component, OnInit, Input } from '@angular/core';
import { InvoiceValidationsReportResponse } from '../../../models/index';

@Component({
  selector: 'report-validated-unvalidated',
  templateUrl: './report-validated-unvalidated.component.html',
  styleUrls: ['./report-validated-unvalidated.component.css']
})
export class ReportValidatedUnvalidatedComponent implements OnInit {
  @Input() invoiceValidationsReportResponse: InvoiceValidationsReportResponse[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
