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
  @Input() martialStatus: string;

  @Output() foreNameUpdated = new EventEmitter<string>();
  @Output() surNameUpdated = new EventEmitter<string>();
  @Output() middleNameUpdated = new EventEmitter<string>();
  @Output() dobUpdated = new EventEmitter<any>();
  @Output() genderUpdated = new EventEmitter<string>();
  @Output() martialStatusUpdated = new EventEmitter<string>();

  profileForm = new FormGroup({
    foreName: new FormControl(''),
    surName: new FormControl(''),
    middleName: new FormControl(''),
    dob: new FormControl(undefined),
    gender: new FormControl(''),
    martialStatus: new FormControl(''),
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
      if (changes.dob.currentValue){
        const d = new Date(changes.dob.currentValue);
        this.profileForm.controls['dob'].setValue({year:d.getFullYear(),month:d.getMonth()+1,day:d.getDate()});
      }
    }
    if (changes.gender) { this.profileForm.controls['gender'].setValue(changes.gender.currentValue); }
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






  // onResidentProfileChange(): void {
  //   // this.residentProfileUpdated.emit(this._residentProfile);
  // }
  // setResidentProfileFields(changes: any): void  {     //data: ResidentProfile): void {
  //   this.profileForm.controls['foreName'].setValue(changes.foreName.currentValue);
  //   this.profileForm.controls['surName'].setValue(changes.surName.currentValue);
  //   // this.profileForm.controls['middleName'].setValue(data.middleName);
  //   // this.profileForm.controls['dob'].setValue(data.dob);
  //   // this.profileForm.controls['gender'].setValue(data.gender);
  //   // this.profileForm.controls['martialStatus'].setValue(data.martialStatus);
  // }

  // // @Input() residentProfile: ResidentProfile;
  // // @Output() residentProfileUpdated = new EventEmitter<ResidentProfile>();
  // // _residentProfile: ResidentProfile;

  // profileForm = new FormGroup({
  //   foreName: new FormControl(''),
  //   surName: new FormControl(''),
  //   middleName: new FormControl(''),
  //   dob: new FormControl(''),
  //   gender: new FormControl(''),
  //   martialStatus: new FormControl(''),
  // });

  // constructor() { }

  // ngOnInit(): void {
  //   // if (this.residentProfile) {
  //   //   this._residentProfile = this.residentProfile;
  //   //   this.setResidentProfileFields(this._residentProfile);
  //   // }
  // }


  // onForeNameChange(event: any): void {
  //   this._residentProfile.foreName = event.target.value;
  //   this.onResidentProfileChange();
  // }
  // onSurNameChange(event: any): void {
  //   this._residentProfile.surName = event.target.value;
  //   this.onResidentProfileChange();
  // }
  // onMiddleNameChange(event: any): void {
  //   this._residentProfile.middleName = event.target.value;
  //   this.onResidentProfileChange();
  // }
  // onDobChange(event: any): void {
  //   console.log('>>>dobch');
  //   this._residentProfile.dob = event.target.value;
  //   this.onResidentProfileChange();
  // }
  // onGenderChange(event: any): void {
  //   this._residentProfile.gender = event.target.value;
  //   this.onResidentProfileChange();
  // }
  // onMartialStatusChange(event: any): void {
  //   this._residentProfile.martialStatus = event.target.value;
  //   this.onResidentProfileChange();
  // }

  // onResidentProfileChange(): void {
  //   this.residentProfileUpdated.emit(this._residentProfile);
  // }

  // setResidentProfileFields(data: ResidentProfile): void {
  //   this.profileForm.controls['foreName'].setValue(data.foreName);
  //   this.profileForm.controls['surName'].setValue(data.surName);
  //   this.profileForm.controls['middleName'].setValue(data.middleName);
  //   this.profileForm.controls['dob'].setValue(data.dob);
  //   this.profileForm.controls['gender'].setValue(data.gender);
  //   this.profileForm.controls['martialStatus'].setValue(data.martialStatus);
  // }

//}
