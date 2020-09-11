import { Component, OnInit, Input } from '@angular/core';
import { Invoice } from '../../../models/index';

@Component({
  selector: 'invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit {

  @Input() invoices: Invoice[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
