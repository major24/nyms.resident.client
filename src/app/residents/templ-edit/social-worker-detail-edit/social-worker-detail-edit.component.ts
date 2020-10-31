import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'social-worker-detail-edit',
  templateUrl: './social-worker-detail-edit.component.html',
  styleUrls: ['./social-worker-detail-edit.component.css'],
})
export class SocialWorkerDetailEditComponent implements OnInit {
  @Input() foreName: string;
  @Input() surName: string;
  @Input() phoneNumber: string;
  @Input() email: string;

  @Output() swForeNameUpdated = new EventEmitter<string>();
  @Output() swSurNameUpdated = new EventEmitter<string>();
  @Output() swPhoneNumberUpdated = new EventEmitter<string>();
  @Output() swEmailUpdated = new EventEmitter<string>();

  socialWorkerForm = new FormGroup({
    swForeName: new FormControl(''),
    swSurName: new FormControl(''),
    phoneNumber: new FormControl(''),
    email: new FormControl(''),
  });
  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: any): void {
    if (changes.foreName) {
      this.socialWorkerForm.controls['swForeName'].setValue(
        changes.foreName.currentValue
      );
    }
    if (changes.surName) {
      this.socialWorkerForm.controls['swSurName'].setValue(
        changes.surName.currentValue
      );
    }
    if (changes.phoneNumber) {
      this.socialWorkerForm.controls['phoneNumber'].setValue(
        changes.phoneNumber.currentValue
      );
    }
    if (changes.email) {
      this.socialWorkerForm.controls['email'].setValue(
        changes.email.currentValue
      );
    }
  }

  onSwForeNameChange(event: any): void {
    this.swForeNameUpdated.emit(event);
  }
  onSwSurNameChange(event: any): void {
    this.swSurNameUpdated.emit(event);
  }
  onSwPhoneNumberChange(event: any): void {
    this.swPhoneNumberUpdated.emit(event);
  }
  onSwEmailChange(event: any): void {
    this.swEmailUpdated.emit(event);
  }
}
