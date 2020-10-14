import { Component, OnInit, Input } from '@angular/core';
import { InvoiceResident } from '../../../models/index';

@Component({
  selector: 'report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css']
})
export class ReportListComponent implements OnInit {
  @Input() invoices: InvoiceResident[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
