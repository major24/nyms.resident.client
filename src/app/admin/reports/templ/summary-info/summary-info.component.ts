import { Component, OnInit, Input } from '@angular/core';
import { InvoiceSummary } from '../../../models/index';

@Component({
  selector: 'summary-info',
  templateUrl: './summary-info.component.html',
  styleUrls: ['./summary-info.component.css']
})
export class SummaryInfoComponent implements OnInit {

  summaryTotalLaDarby: number = 0;
  summaryTotalLaManchester: number = 0;
  summaryTotalLaTameside: number = 0;
  summaryTotalCC: number = 0;
  summaryTotalPrivate: number = 0;

  @Input() invoicesSummary: InvoiceSummary[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: any): void {

  }


}
