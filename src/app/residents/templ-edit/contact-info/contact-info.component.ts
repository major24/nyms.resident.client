import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.css'],
})
export class ContactInfoComponent implements OnInit {
  @Input() emailAddress: string = '';
  @Input() phoneNumber: string = '';
  @Output() emailUpdated = new EventEmitter<any>();
  @Output() phoneNumberUpdated = new EventEmitter<any>();

  contactForm = new FormGroup({
    emailAddress: new FormControl(''),
    phoneNumber: new FormControl(''),
  });

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: any): void {
    if (changes.emailAddress) {
      this.contactForm.controls['emailAddress'].setValue(
        changes.emailAddress.currentValue
      );
    }
    if (changes.phoneNumber) {
      this.contactForm.controls['phoneNumber'].setValue(
        changes.phoneNumber.currentValue
      );
    }
  }

  onEmailChange(event: any): void {
    this.emailUpdated.emit(event);
  }

  onPhoneNumberChange(event: any): void {
    this.phoneNumberUpdated.emit(event);
  }
}
