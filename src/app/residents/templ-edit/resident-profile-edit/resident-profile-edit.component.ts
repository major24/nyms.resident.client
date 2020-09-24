import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'resident-profile-edit',
  templateUrl: './resident-profile-edit.component.html',
  styleUrls: ['./resident-profile-edit.component.css']
})
export class ResidentProfileEditComponent implements OnInit {
  @Input() foreName: string;
  @Input() surName: string;
  @Input() middleName: string;
  @Input() dob: undefined;
  @Input() gender: string;
  @Input() maritalStatus: string;

  @Output() foreNameUpdated = new EventEmitter<string>();
  @Output() surNameUpdated = new EventEmitter<string>();
  @Output() middleNameUpdated = new EventEmitter<string>();
  @Output() dobUpdated = new EventEmitter<any>();
  @Output() genderUpdated = new EventEmitter<string>();
  @Output() martialStatusUpdated = new EventEmitter<string>();

  placement: string = 'top';

  profileForm = new FormGroup({
    foreName: new FormControl(''),
    surName: new FormControl(''),
    middleName: new FormControl(''),
    dob: new FormControl(undefined),
    gender: new FormControl(''),
    maritalStatus: new FormControl(''),
  });

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: any): void {
    console.log('ngonchg', changes);
    if (changes.foreName) { this.profileForm.controls['foreName'].setValue(changes.foreName.currentValue); }
    if (changes.surName) { this.profileForm.controls['surName'].setValue(changes.surName.currentValue); }
    if (changes.middleName) { this.profileForm.controls['middleName'].setValue(changes.middleName.currentValue); }
    if (changes.dob) {
      if (changes.dob.currentValue) {
        const d = new Date(changes.dob.currentValue);
        this.profileForm.controls['dob'].setValue({ year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate() });
      }
    }
    if (changes.gender) { this.profileForm.controls['gender'].setValue(changes.gender.currentValue); }
    if (changes.maritalStatus) { this.profileForm.controls['maritalStatus'].setValue(changes.maritalStatus.currentValue); }
  }

  onForeNameChange(event: any): void {
    this.foreNameUpdated.emit(event);
  }
  onSurNameChange(event: any): void {
    this.surNameUpdated.emit(event);
  }
  onMiddleNameChange(event: any): void {
    this.middleNameUpdated.emit(event);
  }
  onDobChange(event: any): void {
    this.dobUpdated.emit(event);
  }
  onGenderChange(event: any): void {
    this.genderUpdated.emit(event);
  }
  onMartialStatusChange(event: any): void {
    this.martialStatusUpdated.emit(event);
  }

}

