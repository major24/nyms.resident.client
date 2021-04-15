import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Output, EventEmitter } from '@angular/core';
import { BillingCycle } from '../../../models/index';
import { KeyPair } from '../../../../models/index';

@Component({
  selector: 'billing-date-selection',
  templateUrl: './billing-date-selection.component.html',
  styleUrls: ['./billing-date-selection.component.css']
})
export class BillingDateSelectionComponent implements OnInit {
  @Input() careHomes: KeyPair[] = [];
  @Input() localAuthorities: any[] = [];
  @Input() billingCycles: BillingCycle[] = [];
  @Output() careHomeChangedEvent = new EventEmitter<any>();
  @Output() localAuthorityChangedEvent = new EventEmitter<any>();
  @Output() billingCycleChangedEvent = new EventEmitter<any>();
  @Output() getReportEvent = new EventEmitter<any>();

  invoiceForm = new FormGroup({
    careHome: new FormControl(''),
    localAuthority: new FormControl(''),
    billingCycle: new FormControl('', [Validators.required]),
  });

  constructor() { }

  ngOnInit(): void {
  }

  onCareHomeChange(event: any): void {
    this.careHomeChangedEvent.emit(event);
  }

  onLocalAuthorityChange(event: any): void {
    this.localAuthorityChangedEvent.emit(event);
  }

  onBillingCycleChange(event: any): void {
    this.billingCycleChangedEvent.emit(event);
  }

  onGoClicked(): void {
    this.getReportEvent.emit();
  }

}
