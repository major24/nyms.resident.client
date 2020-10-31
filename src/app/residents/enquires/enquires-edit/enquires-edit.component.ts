import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EnquiryResident, createInstanceofEnquiryResident, CareHome } from '../../models/index';
import { EnquiresService } from '../../services';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { RoomLocation } from '../../models/index';
import { CarehomeService } from '../../services/index';
import ReferralAgency from '../../../helpers/data-referral-agency';
import CareNeeds from '../../../helpers/data-care-needs';
import StayTypes from '../../../helpers/data-stay-types';
import EnquiryStatuses from '../../../helpers/data-enquiry-status';
import { Util } from '../../../helpers/index';

@Component({
  selector: 'app-enquires-edit',
  templateUrl: './enquires-edit.component.html',
  styleUrls: ['./enquires-edit.component.css'],
})
export class EnquiresEditComponent implements OnInit {
  enquiryResident: EnquiryResident = createInstanceofEnquiryResident();
  careHomeDetails: CareHome[] = [];

  roomLocations: RoomLocation[] = [];
  // to contorl roomlocation change in child componet
  isCareHomeSelectionChanged: number = 0; //boolean = false;
  careCategories: any[] = [];
  localAuthorities: any[] = [];
  referralAgency: any[] = ReferralAgency;
  careNeeds: any[] = CareNeeds;
  stayTypes: any[] = StayTypes;
  statuses: any[] = EnquiryStatuses;

  errors: string[] = [];
  saving: boolean = false;
  isUpdatingResident: boolean = false;

  enquiryEditForm = new FormGroup({
    status: new FormControl(''),
    careHome: new FormControl(''),
    referralAgency: new FormControl(''),
    isPrivate: new FormControl(''),
    admissionDate: new FormControl(''),
    localAuthority: new FormControl('')
  });

  activeIds: string[] = ['panel-profile', 'panel-carehome'] // default to open profile //, 'panel-address']
  constructor(
    private _Activatedroute: ActivatedRoute,
    private _router: Router,
    private enquiresService: EnquiresService,
    private careHomeService: CarehomeService,
    private readonly util: Util
  ) { }

  ngOnInit(): void {
    this._Activatedroute.paramMap.subscribe((params) => {
      // console.log(params);
      if (params && params.get('referenceId')) {
        let referenceId: string = params.get('referenceId');
        this.isUpdatingResident = true;
        this.loadCareHomeDetailsAndEnquiryByReferenceId(referenceId);
      } else {
        // NEW Enquiry. get all care home details into drop down box
        // onchange of care home, load room locations and room numbers
          this.loadAllCareHomeDetails().subscribe({
            next: (dataChDetails) => {
              this.careHomeDetails = dataChDetails;
            },
            error: (error) => { console.log('Error loading carehome details', error); }
          });
      }
    });

  }

  loadCareHomeDetailsAndEnquiryByReferenceId(referenceId: string): void {
    this.loadAllCareHomeDetails().subscribe(
      dataChDetails => {
        console.log('>>1', dataChDetails);
        this.careHomeDetails = dataChDetails;
        //---------------------------------------------
        this.loadByReferenceId(referenceId).subscribe(
          dataEnquiry => {
            console.log('>>2', dataEnquiry);
            this.enquiryResident = Object.assign(this.enquiryResident, dataEnquiry);
            // set respective select control
            this.careHomeChanged(this.enquiryResident.careHomeId);
            this.setupEnquiryEditForm(dataEnquiry);
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

  setupEnquiryEditForm(data: EnquiryResident): void {
    if (data.careHomeId) {
      this.enquiryEditForm.controls['careHome'].setValue(data.careHomeId);
    }
    // to load la, you need which care it belongs to?
    if (data.careHomeId && data.careHomeId > 0 && data.referralAgencyId && data.referralAgencyId > 0) {
      if (data.referralAgencyId) { this.enquiryEditForm.controls['referralAgency'].setValue(data.referralAgencyId); }
    }
    if (data.status) { this.enquiryEditForm.controls['status'].setValue(data.status); }
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

    // Load hardcoded referral agency info
    let z = this.careHomeDetails.filter(ch => ch.id === selCareHomeId).map(a => a.localAuthorities);
    Object.assign(this.localAuthorities, ...z);
  }


  onReferralAgencyChange(event: any): void {
    this.enquiryResident = Object.assign(this.enquiryResident, { referralAgencyId: +event.target.value });
  }

  // onIsPrivateChange(event: any): void {
  //   // private id = 101
  //   let privateId = 0; // default
  //   if (event.target.checked) {
  //     privateId = 101;
  //     this.enquiryEditForm.controls['referralAgency'].setValue('');
  //   }
  //   this.enquiryResident = Object.assign(this.enquiryResident, { localAuthorityId: privateId });
  // }




  //======================================================
  // === Update care home id
  updateCareHomeId(id: number): void {
    this.enquiryResident = Object.assign(this.enquiryResident, { careHomeId: id });
  }
  //======================================================


  //======================================================
  // === Name, Surname etc profile
  onForeNameUpdated(event: any): void {
    this.enquiryResident = Object.assign(this.enquiryResident, { foreName: event.target.value });
  }
  onSurNameUpdated(event: any): void {
    this.enquiryResident = Object.assign(this.enquiryResident, { surName: event.target.value });
  }
  onMiddleNameUpdated(event: any): void {
    this.enquiryResident = Object.assign(this.enquiryResident, { middleName: event.target.value });
  }
  onDobUpdated(date: any): void {
    this.enquiryResident = Object.assign(this.enquiryResident, { dob: date });
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
  onMoveInDateUpdated(date: any): void {
    if (event) {
      this.enquiryResident = Object.assign(this.enquiryResident, { moveInDate: date });
    }
  }
  onFamilyHomeVisitDateUpdated(date: any): void {
     if (event) {
      this.enquiryResident = Object.assign(this.enquiryResident, { familyHomeVisitDate: date });
    }
  }
  onCommentsUpdated(event: any): void {
    this.enquiryResident = Object.assign(this.enquiryResident, { comments: event.target.value });
  }

  // onEnquiryDateUpdated(event: any): void {
  //   if (event) {
  //     this.enquiryResident = Object.assign(this.enquiryResident, { enquiryDate: this.convertToJsDate(event) });
  //   }
  // }
  // onResponseDateUpdated(event: any): void {
  //   if (event) {
  //     this.enquiryResident = Object.assign(this.enquiryResident, { responseDate: this.convertToJsDate(event) });
  //   }
  // }
  // onResponseUpdated(event: any): void {
  //   this.enquiryResident = Object.assign(this.enquiryResident, { response: event.target.value });
  // }

  // ==============================================





  // === status and submit ========================
  onStatusChange(event: any): void {
    this.enquiryResident = Object.assign(this.enquiryResident, { status: event.target.value });
  }
  onAdmissionDateChange(event: any): void {
    if (event) {
      this.enquiryResident = Object.assign(this.enquiryResident, { admissionDate: this.util.convertAngDateToJsDate(event) });
    }
  }
  onAdmissionDateBlur(event: any): void {
    if (event) {
      this.enquiryResident = Object.assign(this.enquiryResident, { admissionDate: this.util.convertStringDateToJsDate(event.target.value) });
    }
  }
  onLocalAuthorityChange(event: any): void {
    this.enquiryResident = Object.assign(this.enquiryResident, { localAuthorityId: event.target.value });
  }

  onSubmit(): void {
    // validation...
    this.errors = [];
    console.log(this.enquiryResident.careHomeId)
    if (this.enquiryResident.careHomeId === 0) {
      this.errors.push('Care home id is required');
    }
    if (this.enquiryResident.foreName === '' && this.enquiryResident.surName === '') {
      this.errors.push('Forename and surname are required');
    }
    if (this.errors.length > 0) return;

    if (!this.enquiryResident.address) {
      const adr = { street1: '', street2: '', city: '', county: '', postCode: '' };
      this.enquiryResident = Object.assign(this.enquiryResident, { address: adr });
    }

    // validate for enq to resident (admit)
    if (this.enquiryResident.status === 'admit') {
      if (this.enquiryResident.admissionDate === null || this.enquiryResident.localAuthorityId === 0) {
        this.errors.push('When admiting, admission date and local authority are required');
      }
    }

    console.log('>>>Ready to submit enquiry', this.enquiryResident);

    // if refid, then update
    if (this.enquiryResident.referenceId && this.enquiryResident.referenceId != '') {
      this.updateEnquiry();
    } else {
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
          this._router.navigate(['/enquires', {}]);
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
          this._router.navigate(['/enquires', {}]);
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
  convertToJsDate(event: any): Date {
    return new Date(event.year, event.month - 1, event.day);
  }
  // =============================================



}

