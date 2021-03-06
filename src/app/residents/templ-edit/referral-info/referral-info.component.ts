import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'referral-info',
  templateUrl: './referral-info.component.html',
  styleUrls: ['./referral-info.component.css']
})
export class ReferralInfoComponent implements OnInit {
  @Input() localAuthorities: [];
  @Input() localAuthorityId: number;
  @Input() laId: string;
  @Input() nhsNumber: string;
  @Input() poNumber: string;
  @Input() nymsId: string;
  @Output() localAuthorityUpdated = new EventEmitter<any>();
  @Output() laIdUpdated = new EventEmitter<any>();
  @Output() nhsNumberUpdated = new EventEmitter<any>();
  @Output() poNumberUpdated = new EventEmitter<any>();
  @Output() nymsIdUpdated = new EventEmitter<any>();

  referralForm = new FormGroup({
    localAuthority: new FormControl(''),
    laId: new FormControl(''),
    nhsNumber: new FormControl(''),
    poNumber: new FormControl(''),
    nymsId: new FormControl(''),
  });

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: any): void {
    if (changes.localAuthorityId) { this.referralForm.controls['localAuthority'].setValue(changes.localAuthorityId.currentValue); }
    if (changes.laId) { this.referralForm.controls['laId'].setValue(changes.laId.currentValue); }
    if (changes.nhsNumber) { this.referralForm.controls['nhsNumber'].setValue(changes.nhsNumber.currentValue); }
    if (changes.poNumber) { this.referralForm.controls['poNumber'].setValue(changes.poNumber.currentValue); }
    if (changes.nymsId) { this.referralForm.controls['nymsId'].setValue(changes.nymsId.currentValue); }
  }

  onLocalAuthorityChange(event: any): void {
    this.localAuthorityUpdated.emit(event);
  }

  onLaIdChange(event: any): void {
    this.laIdUpdated.emit(event);
  }

  onNhsNumberChange(event: any): void {
    this.nhsNumberUpdated.emit(event);
  }

  onPoNumberChange(event: any): void {
    this.poNumberUpdated.emit(event);
  }

  onNymsIdChange(event: any): void {
    this.nymsIdUpdated.emit(event);
  }

}
