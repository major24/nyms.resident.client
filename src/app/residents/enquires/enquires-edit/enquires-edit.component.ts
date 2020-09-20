import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EnquiryResident, createInstanceofEnquiryResident, CareHome } from '../../models/index';
import { EnquiresService } from '../../services';
import { FormGroup, FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { KeyPair } from '../../../models/index';
import { RoomLocation } from '../../models/index';

import { CarehomeService } from '../../services/index';
// import setupData from '../../../helpers/setup-data.json';

@Component({
  selector: 'app-enquires-edit',
  templateUrl: './enquires-edit.component.html',
  styleUrls: ['./enquires-edit.component.css'],
})
export class EnquiresEditComponent implements OnInit {
  private _enquiryResident: BehaviorSubject<EnquiryResident> = new BehaviorSubject<EnquiryResident>(createInstanceofEnquiryResident());
  public enquiryResident$ = this._enquiryResident.asObservable();
  enquiryResident: EnquiryResident;

  private _careHomeDetails: BehaviorSubject<CareHome[]> = new BehaviorSubject<CareHome[]>([]);
  public careHomeDetails$ = this._careHomeDetails.asObservable();
  careHomeDetails: CareHome[] = [];

  roomLocations: RoomLocation[] = [];
  // to contorl roomlocation change in child componet
  isCareHomeSelectionChanged: number = 0; //boolean = false;

  careCategories: any[] = [];
  localAuthorities: any[] = [];

  statuses: KeyPair[] = [
    { key: 'active', value: 'Active' },
    { key: 'admit', value: 'Admit' },
    { key: 'closed', value: 'Closed' }
  ];

  errors: string[] = [];
  saving: boolean = false;

  enquiryEditForm = new FormGroup({
    status: new FormControl(''),
    careHome: new FormControl(''),
    localAuthority: new FormControl(''),
    isPrivate: new FormControl('')
  });

  activeIds: string[] = ['panel-profile', 'panel-carehome'] // default to open profile //, 'panel-address']
  constructor(
    private _Activatedroute: ActivatedRoute,
    private _router: Router,
    private enquiresService: EnquiresService,
    private careHomeService: CarehomeService
  ) { }

  ngOnInit(): void {
    // init subscription for observables
    this._enquiryResident.subscribe((enq) => (this.enquiryResident = enq));
    this._careHomeDetails.subscribe((chd) => (this.careHomeDetails = chd));

    this.loadAllCareHomeDetails();

    this._Activatedroute.paramMap.subscribe((params) => {
      // console.log(params);
      if (params && params.get('referenceId')) {
        let referenceId: string = params.get('referenceId');
        this.loadByReferenceId(referenceId);
      } else {
        // NEW Enquiry. get all care home details into drop down box
        // onchange of care home, load room locations and room numbers

      }
    });

  }

  loadByReferenceId(referenceId: string): void {
    if (referenceId === '' || referenceId === null) {
      throw new console.error('Reference not found');
    }
    this.enquiresService.loadEnquiryByReferenceId(referenceId)
      .subscribe({
        next: (data) => {
          // console.log('>>>>++', data);
          this._enquiryResident.next(data);
          // once data is available setup THIS form related with data
          this.setupEnquiryEditForm(data);
        },
        error: (error) => {
          console.log('ERROR:', error);
        },
      });
  }

  loadAllCareHomeDetails(): void {
    this.careHomeService.loadAllCareHomeDetails()
      .subscribe(data => {
        // console.log('carehome details:', data);
        this._careHomeDetails.next(data);
      },
        error => { console.log('>>>Error getting carehome details', error); }
      );
  }

  setupEnquiryEditForm(data: EnquiryResident): void {
    if (data.status) { this.enquiryEditForm.controls['status'].setValue(data.status); }
  }



  //=====================================================
  // === carehome dropdown change ===
  oncareHomeChange(event: any): void {
    const selCareHomeId = +event.target.value;
    // RoomLocations
    this.roomLocations.splice(0, this.roomLocations.length);
    let x = this.careHomeDetails.filter(ch => ch.id === selCareHomeId).map(a => a.roomLocations);
    Object.assign(this.roomLocations, ...x);
    this.isCareHomeSelectionChanged = selCareHomeId;

    // CareCategories
    this.careCategories.splice(0, this.careCategories.length);
    let y = this.careHomeDetails.filter(ch => ch.id === selCareHomeId).map(a => a.careCategories);
    Object.assign(this.careCategories, ...y);

    // LA
    let z = this.careHomeDetails.filter(ch => ch.id === selCareHomeId).map(a => a.localAuthorities);
    Object.assign(this.localAuthorities, ...z);

    // update store object
    this.updateCareHomeId(selCareHomeId);
  }

  onLocalAuthorityChange(event: any): void {
    let newState = {
      ...this._enquiryResident.getValue(),
      localAuthorityId: +event.target.value,
    };
    this.updateState(newState);
  }

  onIsPrivateChange(event: any): void {
    // private id = 101
    let privateId = 0; // default
    if (event.target.checked) {
      privateId = 101;
      this.enquiryEditForm.controls['localAuthority'].setValue('');
    }
    let newState = {
      ...this._enquiryResident.getValue(),
      localAuthorityId: privateId
    };
    this.updateState(newState);
  }


  //======================================================
  // === Update care home id
  updateCareHomeId(id: number): void {
    let newState = {
      ...this._enquiryResident.getValue(),
      careHomeId: id,
    };
    // this._enquiryResident.next(newState);
    this.updateState(newState);
  }
  //======================================================


  //======================================================
  // === Name, Surname etc profile
  onForeNameUpdated(event: any): void {
    let newState = {
      ...this._enquiryResident.getValue(),
      foreName: event.target.value,
    };
    // this._enquiryResident.next(newState);
    this.updateState(newState);
  }
  onSurNameUpdated(event: any): void {
    let newState = {
      ...this._enquiryResident.getValue(),
      surName: event.target.value,
    };
    this.updateState(newState);
  }
  onMiddleNameUpdated(event: any): void {
    let newState = {
      ...this._enquiryResident.getValue(),
      middleName: event.target.value,
    };
    this.updateState(newState);
  }
  onDobUpdated(event: any): void {
    console.log('InEnqEditForm=', event); // {year: 1962, month: 12, day: 16}
    if (event) {
      // const d = new Date(event.year, event.month-1, event.day);
      let newState = {
        ...this._enquiryResident.getValue(),
        dob: this.convertToJsDate(event),
      };
      this.updateState(newState);
    }
  }
  onGenderUpdated(event: any): void {
    let newState = {
      ...this._enquiryResident.getValue(),
      gender: event.target.value,
    };
    this.updateState(newState);
  }
  onMartialStatusUpdated(event: any): void {
    let newState = {
      ...this._enquiryResident.getValue(),
      martialStatus: event.target.value,
    };
    this.updateState(newState);
  }
  // =================================================

  // === address info
  onStreet1Updated(event: any): void {
    console.log('InEnqEditForm=', event);
    let address = {
      ...this._enquiryResident.getValue().address,
      street1: event.target.value,
    };
    let newState = { ...this._enquiryResident.getValue(), address: address };
    this.updateState(newState);
  }
  onStreet2Updated(event: any): void {
    let address = {
      ...this._enquiryResident.getValue().address,
      street2: event.target.value,
    };
    let newState = { ...this._enquiryResident.getValue(), address: address };
    this.updateState(newState);
  }
  onCityUpdated(event: any): void {
    let address = {
      ...this._enquiryResident.getValue().address,
      city: event.target.value,
    };
    let newState = { ...this._enquiryResident.getValue(), address: address };
    this.updateState(newState);
  }
  onCountyUpdated(event: any): void {
    let address = {
      ...this._enquiryResident.getValue().address,
      county: event.target.value,
    };
    let newState = { ...this._enquiryResident.getValue(), address: address };
    this.updateState(newState);
  }
  onPostCodeUpdated(event: any): void {
    let address = {
      ...this._enquiryResident.getValue().address,
      postCode: event.target.value,
    };
    let newState = { ...this._enquiryResident.getValue(), address: address };
    this.updateState(newState);
  }
  // =================================================

  // === social worker info
  onSwForeNameUpdated(event: any): void {
    let sw = {
      ...this._enquiryResident.getValue().socialWorker,
      foreName: event.target.value,
    };
    let newState = { ...this._enquiryResident.getValue(), socialWorker: sw };
    this.updateState(newState);
  }
  onSwSurNameUpdated(event: any): void {
    let sw = {
      ...this._enquiryResident.getValue().socialWorker,
      surName: event.target.value,
    };
    let newState = { ...this._enquiryResident.getValue(), socialWorker: sw };
    this.updateState(newState);
  }
  onSwPhoneNumberUpdated(event: any): void {
    let sw = {
      ...this._enquiryResident.getValue().socialWorker,
      phoneNumber: event.target.value,
    };
    let newState = { ...this._enquiryResident.getValue(), socialWorker: sw };
    this.updateState(newState);
  }
  onSwEmailUpdated(event: any): void {
    let sw = {
      ...this._enquiryResident.getValue().socialWorker,
      email: event.target.value,
    };
    let newState = { ...this._enquiryResident.getValue(), socialWorker: sw };
    this.updateState(newState);
  }
  // ==================================================


  // === care type ====================================
  onCareCategoryUpdated(event: any): void {
    let newState = {
      ...this._enquiryResident.getValue(),
      careCategoryId: event.target.value,
    };
    this.updateState(newState);
  }
  oncareNeedUpdated(event: any): void {
    let newState = {
      ...this._enquiryResident.getValue(),
      careNeed: event.target.value,
    };
    this.updateState(newState);
  }
  onStayTypeUpdated(event: any): void {
    let newState = {
      ...this._enquiryResident.getValue(),
      stayType: event.target.value,
    };
    this.updateState(newState);
  }

  // =================================================


  // === room loc and number updated ================
  onRoomLocationUpdated(event: any): void {
    let newState = {
      ...this._enquiryResident.getValue(),
      reservedRoomLocation: event.target.value,
      reservedRoomNumber: null,
    };
    this.updateState(newState);
  }
  onRoomNumberUpdated(event: any): void {
    let newState = {
      ...this._enquiryResident.getValue(),
      reservedRoomNumber: event.target.value,
    };
    this.updateState(newState);
  }
  // ===============================================



  // === misc input ================================
  onMoveInDateUpdated(event: any): void {
    if (event) {
      // const d = new Date(event.year, event.month-1, event.day);
      let newState = {
        ...this._enquiryResident.getValue(),
        moveInDate: this.convertToJsDate(event),
      };
      this.updateState(newState);
    }
  }
  onFamilyHomeVisitDateUpdated(event: any): void {
    if (event) {
      let newState = {
        ...this._enquiryResident.getValue(),
        familyHomeVisitDate: this.convertToJsDate(event),
      };
      this.updateState(newState);
    }
  }
  onEnquiryDateUpdated(event: any): void {
    if (event) {
      let newState = {
        ...this._enquiryResident.getValue(),
        enquiryDate: this.convertToJsDate(event),
      };
      this.updateState(newState);
    }
  }
  onResponseDateUpdated(event: any): void {
    if (event) {
      let newState = {
        ...this._enquiryResident.getValue(),
        responseDate: this.convertToJsDate(event),
      };
      this.updateState(newState);
    }
  }
  onResponseUpdated(event: any): void {
    let newState = {
      ...this._enquiryResident.getValue(),
      response: event.target.value,
    };
    this.updateState(newState);
  }
  onCommentsUpdated(event: any): void {
    let newState = {
      ...this._enquiryResident.getValue(),
      comments: event.target.value,
    };
    this.updateState(newState);
  }
  // ==============================================


  // === status and submit ========================
  onStatusChange(event: any): void {
    let newState = {
      ...this._enquiryResident.getValue(),
      status: event.target.value,
    };
    this.updateState(newState);
  }
  onSubmit(): void {
    // validation...
    this.errors = [];
    console.log(this.enquiryResident.careHomeId)
    if (this.enquiryResident.careHomeId === 0) {
      this.errors.push('Care home id is required');
    }
    if (this.enquiryResident.foreName === '' && this.enquiryResident.surName === '') {
      this.errors.push('Fore name and sur name are required');
    }

    if (this.errors.length <= 0) {
      console.log('>>>Ready to submit', this.enquiryResident);
      this.saving = true;
      this.enquiresService.createEnquiryResident(this.enquiryResident.careHomeId, this.enquiryResident)
        .subscribe({
          next: (response) => {
            this.saving = false;
            console.log('Data saved');
          },
          error: (error) => {
            console.log('Error saving data');
            this.saving = false;
          }
        });
    }
  }

  onCancel(): void {
    this._router.navigate(['/enquires', {}]);
  }


  // =============================================




  // === helper methods ==========================
  updateState(state: EnquiryResident): void {
    this._enquiryResident.next(state);
  }
  convertToJsDate(event: any): Date {
    return new Date(event.year, event.month - 1, event.day);
  }
  // =============================================



}

