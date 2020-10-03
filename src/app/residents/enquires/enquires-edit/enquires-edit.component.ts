import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EnquiryResident, createInstanceofEnquiryResident, CareHome } from '../../models/index';
import { EnquiresService } from '../../services';
import { FormGroup, FormControl } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { KeyPair } from '../../../models/index';
import { RoomLocation } from '../../models/index';

import { CarehomeService } from '../../services/index';
import { concatMap, map, switchMap, mergeMap } from 'rxjs/operators';
// import setupData from '../../../helpers/setup-data.json';

@Component({
  selector: 'app-enquires-edit',
  templateUrl: './enquires-edit.component.html',
  styleUrls: ['./enquires-edit.component.css'],
})
export class EnquiresEditComponent implements OnInit {
  //private _enquiryResident: BehaviorSubject<EnquiryResident> = new BehaviorSubject<EnquiryResident>(createInstanceofEnquiryResident());
  //public enquiryResident$ = this._enquiryResident.asObservable();
  // enquiryResident: EnquiryResident;
  enquiryResident: EnquiryResident = createInstanceofEnquiryResident();

  //private _careHomeDetails: BehaviorSubject<CareHome[]> = new BehaviorSubject<CareHome[]>([]);
  //public careHomeDetails$ = this._careHomeDetails.asObservable();
  careHomeDetails: CareHome[] = [];

  roomLocations: RoomLocation[] = [];
  // to contorl roomlocation change in child componet
  isCareHomeSelectionChanged: number = 0; //boolean = false;
  //roomLocationString: string = '';

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
    // this._enquiryResident.subscribe((enq) => (this.enquiryResident = enq));
    // this._careHomeDetails.subscribe((chd) => (this.careHomeDetails = chd));

    // this.loadAllCareHomeDetails();

    this._Activatedroute.paramMap.subscribe((params) => {
      // console.log(params);
      if (params && params.get('referenceId')) {
        let referenceId: string = params.get('referenceId');
        // this.loadByReferenceId(referenceId);
        this.loadCareHomeDetailsAndEnquiryByReferenceId(referenceId);
      } else {
        // NEW Enquiry. get all care home details into drop down box
        // onchange of care home, load room locations and room numbers
        setTimeout(() => {

          this.loadAllCareHomeDetails().subscribe({
            next: (data) => {
              // this._careHomeDetails.next(data);
              this.careHomeDetails = data;
            },
            error: (error) => { console.log('Error loading carehome details'); }
          });

        }, 700)

      }
    });

  }

  // loadByReferenceId(referenceId: string): void {
  //   if (referenceId === '' || referenceId === null) {
  //     throw new console.error('Reference not found');
  //   }
  //   this.enquiresService.loadEnquiryByReferenceId(referenceId)
  //     .subscribe({
  //       next: (data) => {
  //         console.log('>>>>++', data);
  //         this._enquiryResident.next(data);
  //         // once data is available setup THIS form related with data
  //         this.setupEnquiryEditForm(data);
  //       },
  //       error: (error) => {
  //         console.log('ERROR:', error);
  //       },
  //     });
  // }

  loadCareHomeDetailsAndEnquiryByReferenceId(referenceId: string): void {
    this.loadAllCareHomeDetails().subscribe(
      data => {
        console.log('>>1', data);
        //this._careHomeDetails.next(data);
        this.careHomeDetails = data;
        console.log('>>>', this.careHomeDetails);
        //---------------------------------------------
        this.loadByReferenceId(referenceId).subscribe(
          data2 => {
            console.log('>>2', data2);
            // this._enquiryResident.next(data2);
            this.enquiryResident = Object.assign(this.enquiryResident, data2);
            console.log('>>>>>???', this.enquiryResident.careHomeId);
            this.careHomeChanged(this.enquiryResident.careHomeId);
            this.setupEnquiryEditForm(data2);
            // this.roomLocationString = data2.reservedRoomLocation.toString();
          },
          error2 => {
            console.log('Error getting enquiry', error2)
          }
        )
        //---------------------------------------------

      },
      error => { console.log('Error getting care home details', error); })
  }

  loadAllCareHomeDetails(): Observable<CareHome[]> {
    return this.careHomeService.loadAllCareHomeDetails();
  }

  loadByReferenceId(referenceId: string): Observable<EnquiryResident> {
    if (referenceId === '' || referenceId === null) {
      throw new console.error('Reference not found');
    }
    return this.enquiresService.loadEnquiryByReferenceId(referenceId);
  }



  // loadAllCareHomeDetails(): void {
  //   this.careHomeService.loadAllCareHomeDetails()
  //     .subscribe(data => {
  //       // console.log('carehome details:', data);
  //       this._careHomeDetails.next(data);
  //     },
  //       error => { console.log('>>>Error getting carehome details', error); }
  //     );
  // }

  setupEnquiryEditForm(data: EnquiryResident): void {
    if (data.careHomeId) {
      this.enquiryEditForm.controls['careHome'].setValue(data.careHomeId);
      // this.careHomeChanged(data.careHomeId);
    }
    // to load la, you need which care it belongs to?
    if (data.careHomeId && data.careHomeId > 0 && data.localAuthorityId && data.localAuthorityId > 0) {
      if (data.localAuthorityId) { this.enquiryEditForm.controls['localAuthority'].setValue(data.localAuthorityId); }
    }
    if (data.status) { this.enquiryEditForm.controls['status'].setValue(data.status); }
    // set room loc and number

  }



  //=====================================================
  // === carehome dropdown change ===
  oncareHomeChange(event: any): void {
    const selCareHomeId = +event.target.value;
    this.careHomeChanged(selCareHomeId);
    // update enq res
    this.updateCareHomeId(selCareHomeId);
  }
  careHomeChanged(selCareHomeId: number): void {
    // const selCareHomeId = +event.target.value;
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
  }


  onLocalAuthorityChange(event: any): void {
    this.enquiryResident = Object.assign(this.enquiryResident, { localAuthorityId: +event.target.value });
    // let newState = {
    //   ...this._enquiryResident.getValue(),
    //   localAuthorityId: +event.target.value,
    // };
    // this.updateState(newState);
  }

  onIsPrivateChange(event: any): void {
    // private id = 101
    let privateId = 0; // default
    if (event.target.checked) {
      privateId = 101;
      this.enquiryEditForm.controls['localAuthority'].setValue('');
    }
    this.enquiryResident = Object.assign(this.enquiryResident, { localAuthorityId: privateId });
    // let newState = {
    //   ...this._enquiryResident.getValue(),
    //   localAuthorityId: privateId
    // };
    // this.updateState(newState);
  }




  //======================================================
  // === Update care home id
  updateCareHomeId(id: number): void {
    this.enquiryResident = Object.assign(this.enquiryResident, { careHomeId: id });
    // let newState = {
    //   ...this._enquiryResident.getValue(),
    //   careHomeId: id,
    // };
    // // this._enquiryResident.next(newState);
    // this.updateState(newState);
  }
  //======================================================



  //======================================================
  // === Name, Surname etc profile
  onForeNameUpdated(event: any): void {
    this.enquiryResident = Object.assign(this.enquiryResident, { foreName: event.target.value });
    // let newState = {
    //   ...this._enquiryResident.getValue(),
    //   foreName: event.target.value,
    // };
    // // this._enquiryResident.next(newState);
    // this.updateState(newState);
  }
  onSurNameUpdated(event: any): void {
    this.enquiryResident = Object.assign(this.enquiryResident, { surName: event.target.value });
  }
  onMiddleNameUpdated(event: any): void {
    this.enquiryResident = Object.assign(this.enquiryResident, { middleName: event.target.value });
  }
  onDobUpdated(event: any): void {
    // console.log(event); //event format = {year: 1962, month: 12, day: 16}
    if (event) {
      // const d = new Date(event.year, event.month-1, event.day);
      this.enquiryResident = Object.assign(this.enquiryResident, { dob: this.convertToJsDate(event) });
    }
  }
  onGenderUpdated(event: any): void {
    this.enquiryResident = Object.assign(this.enquiryResident, { gender: event.target.value });
  }
  onMartialStatusUpdated(event: any): void {
    this.enquiryResident = Object.assign(this.enquiryResident, { maritalStatus: event.target.value });
  }
  // =================================================


  // === address info
  onStreet1Updated(event: any): void {
    let adr = {
      ...this.enquiryResident.address, street1: event.target.value
    };
    this.enquiryResident = Object.assign(this.enquiryResident, { address: adr });
  }
  onStreet2Updated(event: any): void {
    let adr = {
      ...this.enquiryResident.address, street2: event.target.value
    };
    this.enquiryResident = Object.assign(this.enquiryResident, { address: adr });
  }
  onCityUpdated(event: any): void {
    let adr = {
      ...this.enquiryResident.address, city: event.target.value
    };
    this.enquiryResident = Object.assign(this.enquiryResident, { address: adr });
  }
  onCountyUpdated(event: any): void {
    let adr = {
      ...this.enquiryResident.address, county: event.target.value
    };
    this.enquiryResident = Object.assign(this.enquiryResident, { address: adr });
  }
  onPostCodeUpdated(event: any): void {
    let adr = {
      ...this.enquiryResident.address, postCode: event.target.value
    };
    this.enquiryResident = Object.assign(this.enquiryResident, { address: adr });
  }
  // =================================================


  // === social worker info
  onSwForeNameUpdated(event: any): void {
    let sw = {
      ...this.enquiryResident.socialWorker, foreName: event.target.value
    };
    this.enquiryResident = Object.assign(this.enquiryResident, { socialWorker: sw });
  }
  onSwSurNameUpdated(event: any): void {
    let sw = {
      ...this.enquiryResident.socialWorker, surName: event.target.value
    };
    this.enquiryResident = Object.assign(this.enquiryResident, { socialWorker: sw });
  }
  onSwPhoneNumberUpdated(event: any): void {
    let sw = {
      ...this.enquiryResident.socialWorker, phoneNumber: event.target.value
    };
    this.enquiryResident = Object.assign(this.enquiryResident, { socialWorker: sw });
  }
  onSwEmailUpdated(event: any): void {
    let sw = {
      ...this.enquiryResident.socialWorker, email: event.target.value
    };
    this.enquiryResident = Object.assign(this.enquiryResident, { socialWorker: sw });
  }
  // ==================================================



  // === care type ====================================
  onCareCategoryUpdated(event: any): void {
    this.enquiryResident = Object.assign(this.enquiryResident, { careCategoryId: event.target.value });
  }
  oncareNeedUpdated(event: any): void {
    this.enquiryResident = Object.assign(this.enquiryResident, { careNeed: event.target.value });
  }
  onStayTypeUpdated(event: any): void {
    this.enquiryResident = Object.assign(this.enquiryResident, { stayType: event.target.value });
  }
  // =================================================


  // === room loc and number updated ================
  onRoomLocationUpdated(event: any): void {
    this.enquiryResident = Object.assign(this.enquiryResident, { reservedRoomLocation: event.target.value });
    this.enquiryResident = Object.assign(this.enquiryResident, { reservedRoomNumber: '' });
  }
  onRoomNumberUpdated(event: any): void {
    this.enquiryResident = Object.assign(this.enquiryResident, { reservedRoomNumber: event.target.value });
  }
  // ===============================================


  // === misc input ================================
  onMoveInDateUpdated(event: any): void {
    if (event) {
      this.enquiryResident = Object.assign(this.enquiryResident, { moveInDate: this.convertToJsDate(event) });
    //   // const d = new Date(event.year, event.month-1, event.day);
    //   let newState = {
    //     ...this._enquiryResident.getValue(),
    //     moveInDate: this.convertToJsDate(event),
    //   };
    //   this.updateState(newState);
    }
  }
  onFamilyHomeVisitDateUpdated(event: any): void {
     if (event) {
      this.enquiryResident = Object.assign(this.enquiryResident, { familyHomeVisitDate: this.convertToJsDate(event) });
    }
  }
  onEnquiryDateUpdated(event: any): void {
    if (event) {
      this.enquiryResident = Object.assign(this.enquiryResident, { enquiryDate: this.convertToJsDate(event) });
    }
  }
  onResponseDateUpdated(event: any): void {
    if (event) {
      this.enquiryResident = Object.assign(this.enquiryResident, { responseDate: this.convertToJsDate(event) });
    }
  }
  onResponseUpdated(event: any): void {
    this.enquiryResident = Object.assign(this.enquiryResident, { response: event.target.value });
  }
  onCommentsUpdated(event: any): void {
    this.enquiryResident = Object.assign(this.enquiryResident, { comments: event.target.value });
  }
  // ==============================================




  // === status and submit ========================
  onStatusChange(event: any): void {
    // let newState = {
    //   ...this._enquiryResident.getValue(),
    //   status: event.target.value,
    // };
    // this.updateState(newState);
  }
  xxonSubmit(): void {
    console.log('>>>submit', this.enquiryResident);
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
    if (this.errors.length > 0) return;

    if (!this.enquiryResident.address) {
      const adr = { street1: '', street2: '', city: '', county: '', postCode: '' };
      this.enquiryResident = Object.assign(this.enquiryResident, { address: adr });
    }
    console.log('>>>Ready to submit', this.enquiryResident);
    // if refid, then update
    if (this.enquiryResident.referenceId && this.enquiryResident.referenceId != '') {
      // update...
      this.updateEnquiry();
    } else {
      // add new enquiry...
      this.createEnquiry();
    }
  }

  createEnquiry(): void {
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

  updateEnquiry(): void {
    this.saving = true;
    this.enquiresService.updateEnquiryResident(this.enquiryResident)
      .subscribe({
        next: (response) => {
          this.saving = false;
          console.log('Data updated');
        },
        error: (error) => {
          console.log('Error saving data');
          this.saving = false;
        }
      });
  }

  onCancel(): void {
    this._router.navigate(['/enquires', {}]);
  }


  // =============================================




  // === helper methods ==========================
  // updateState(state: EnquiryResident): void {
  //   this._enquiryResident.next(state);
  // }

  convertToJsDate(event: any): Date {
    return new Date(event.year, event.month - 1, event.day);
  }
  // =============================================



}

