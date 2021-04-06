import { Component, OnInit } from '@angular/core';
import {
  EnquiryResident,
  CareHome,
  Resident,
  createInstanceOfResident,
  NextOfKin,
  createInstanceOfNok,
} from '../models/index';
import { ActivatedRoute, Router } from '@angular/router';
import ReferralAgency from '../../helpers/data-referral-agency';
import { Observable } from 'rxjs';
import {
  EnquiresService,
  CarehomeService,
  ResidentsService,
} from '../services';
import { Util } from '../../helpers/index';
import { RoomLocation } from '../models/index';
import CareNeeds from '../../helpers/data-care-needs';
import StayTypes from '../../helpers/data-stay-types';
import EnquiryStatuses from '../../helpers/data-enquiry-status';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-resident-edit',
  templateUrl: './resident-edit.component.html',
  styleUrls: ['./resident-edit.component.css'],
})
export class ResidentEditComponent implements OnInit {
  active = 1;
  routePath: string = '';
  isAdmiting: boolean = false;
  disabled: boolean = false;

  rawResident: Resident = createInstanceOfResident();
  resident: Resident = this.rawResident;

  noks: NextOfKin[] = [];
  nok: NextOfKin = createInstanceOfNok();

  careHomeDetail: CareHome;

  roomLocations: RoomLocation[] = [];
  // to contorl roomlocation change in child componet
  isCareHomeSelectionChanged: number = 0; //boolean = false;
  careCategories: any[] = [];
  localAuthorities: any[] = [];
  referralAgency: any[] = ReferralAgency;
  careNeeds: any[] = CareNeeds;
  stayTypes: any[] = StayTypes;
  statuses: any[] = EnquiryStatuses;
  careHomeDivisions: any[] = [];

  errors: string[] = [];
  saving: boolean = false;
  isUpdatingResident: boolean = false;
  residentEditForm = new FormGroup({
    careHomeDivision: new FormControl('')
  });

  constructor(
    private _Activatedroute: ActivatedRoute,
    private _router: Router,
    private enquiresService: EnquiresService,
    private residentServcie: ResidentsService,
    private careHomeService: CarehomeService,
    private readonly util: Util
  ) {}

  ngOnInit(): void {
    this.routePath = this._Activatedroute.snapshot.routeConfig.path;
    console.log(this.routePath);
    if (this.routePath.includes('residents-admit')) {
      this.isAdmiting = true;
    }

    this._Activatedroute.paramMap.subscribe((params) => {
      if (params && params.get('referenceId')) {
        let referenceId: string = params.get('referenceId');
        // this.isUpdatingResident = true;
        if (this.isAdmiting) {
          console.log('load from enquiry table for admission');
          this.loadCareHomeDetailAndEnquiryByReferenceId(referenceId);
        } else {
          console.log('load from resident table for editing');
          this.loadCareHomeDetailAndResidentByReferenceId(referenceId);
        }
      }
    });
  } //ngOninit

  loadCareHomeDetailAndEnquiryByReferenceId(referenceId: string): void {
    this.enquiresService
      .loadCareHomeDetailByEnquiryReferenceId(referenceId)
      .subscribe(
        (dataChDetail) => {
          console.log('>>1-CareHomeDetails: ', dataChDetail);
          this.careHomeDetail = dataChDetail;
          //---------------------------------------------
          this.loadEnquiryByReferenceId(referenceId).subscribe(
            (dataEnquiry) => {
              // console.log('>>2-Enqiry : ', this.resident);
              console.log('>>2-Enquiry: ', dataEnquiry);
              for (const key of Object.keys(dataEnquiry)) {
                if (key in this.resident) { // or obj1.hasOwnProperty(key)
                  this.resident[key] = dataEnquiry[key];
                }
              }
              this.resident.admissionDate = dataEnquiry.moveInDate;
              console.log('>>3-ResidentObj: ', this.resident);
              // set respective select control
              this.careHomeChanged(this.resident.careHomeId);
              // this.setupResidentEditForm(dataEnquiry);
            },
            (error2) => {
              console.log('Error getting enquiry', error2);
            }
          );
          //---------------------------------------------
        },
        (error) => {
          console.log('Error getting care home details', error);
        }
      );
  }

  loadCareHomeDetailAndResidentByReferenceId(referenceId): void {
    this.residentServcie
      .loadCareHomeDetailByResidentReferenceId(referenceId)
      .subscribe(
        (dataChDetail) => {
          console.log('>>1-CareHomeDetails: ', dataChDetail);
          this.careHomeDetail = dataChDetail;
          //---------------------------------------------
          this.loadResidentByReferenceId(referenceId).subscribe(
            (dataEnquiry) => {
              console.log('>>2-Resident: ', dataEnquiry);
              this.resident = Object.assign(this.resident, dataEnquiry);
              this.careHomeChanged(this.resident.careHomeId);
              this.setupResidentEditForm(this.resident);
            },
            (error2) => {
              console.log('Error getting enquiry', error2);
            }
          );
          //---------------------------------------------
        },
        (error) => {
          console.log('Error getting care home details', error);
        }
      );
  }

  loadEnquiryByReferenceId(referenceId: string): Observable<EnquiryResident> {
    if (referenceId === '' || referenceId === null) {
      throw new console.error('ReferenceId not found');
    }
    return this.enquiresService.loadEnquiryByReferenceId(referenceId);
  }

  loadResidentByReferenceId(referenceId: string): Observable<Resident> {
    if (referenceId === '' || referenceId === null) {
      throw new console.error('ReferenceId not found');
    }
    return this.residentServcie.loadResidentByReferenceId(referenceId);
  }

  setupResidentEditForm(redident: Resident): void {
    this.residentEditForm.controls['careHomeDivision'].setValue(this.resident.careHomeDivisionId);
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
    // RoomLocations
    this.roomLocations.splice(0, this.roomLocations.length);
    let x = this.careHomeDetail.roomLocations;
    Object.assign(this.roomLocations, x);
    this.isCareHomeSelectionChanged = selCareHomeId;

    // CareCategories
    this.careCategories.splice(0, this.careCategories.length);
    let y = this.careHomeDetail.careCategories;
    Object.assign(this.careCategories, y);

    // Load local authorites
    let z = this.careHomeDetail.localAuthorities;
    Object.assign(this.localAuthorities, z);

    this.careHomeDivisions.splice(0, this.careHomeDivisions.length);
    Object.assign(this.careHomeDivisions, this.careHomeDetail.careHomeDivisions);
  }

  updateCareHomeId(id: number): void {
    this.resident = Object.assign(this.resident, { careHomeId: id });
  }

  onCareHomeDivisionChange(event: any): void {
    if (event.target.value) {
      this.resident = Object.assign(this.resident, { careHomeDivisionId: event.target.value });
    }
  }

  //======================================================
  // === Profile - Name, Surname etc profile
  onForeNameUpdated(event: any): void {
    this.resident = Object.assign(this.resident, {
      foreName: event.target.value,
    });
  }
  onSurNameUpdated(event: any): void {
    this.resident = Object.assign(this.resident, {
      surName: event.target.value,
    });
  }
  onMiddleNameUpdated(event: any): void {
    this.resident = Object.assign(this.resident, {
      middleName: event.target.value,
    });
  }
  onDobUpdated(date: any): void {
    this.resident = Object.assign(this.resident, { dob: date });
  }
  onGenderUpdated(event: any): void {
    this.resident = Object.assign(this.resident, {
      gender: event.target.value,
    });
  }
  onMartialStatusUpdated(event: any): void {
    this.resident = Object.assign(this.resident, {
      maritalStatus: event.target.value,
    });
  }
  // === endof profile ==============================================

  // === address info
  onStreet1Updated(event: any): void {
    let adr = {
      ...this.resident.address,
      street1: event.target.value,
    };
    this.resident = Object.assign(this.resident, { address: adr });
  }
  onStreet2Updated(event: any): void {
    let adr = {
      ...this.resident.address,
      street2: event.target.value,
    };
    this.resident = Object.assign(this.resident, { address: adr });
  }
  onCityUpdated(event: any): void {
    let adr = {
      ...this.resident.address,
      city: event.target.value,
    };
    this.resident = Object.assign(this.resident, { address: adr });
  }
  onCountyUpdated(event: any): void {
    let adr = {
      ...this.resident.address,
      county: event.target.value,
    };
    this.resident = Object.assign(this.resident, { address: adr });
  }
  onPostCodeUpdated(event: any): void {
    let adr = {
      ...this.resident.address,
      postCode: event.target.value,
    };
    this.resident = Object.assign(this.resident, { address: adr });
  }
  // =================================================

  // === social worker info
  onSwForeNameUpdated(event: any): void {
    let sw = {
      ...this.resident.socialWorker,
      foreName: event.target.value,
    };
    this.resident = Object.assign(this.resident, { socialWorker: sw });
  }
  onSwSurNameUpdated(event: any): void {
    let sw = {
      ...this.resident.socialWorker,
      surName: event.target.value,
    };
    this.resident = Object.assign(this.resident, { socialWorker: sw });
  }
  onSwPhoneNumberUpdated(event: any): void {
    let sw = {
      ...this.resident.socialWorker,
      phoneNumber: event.target.value,
    };
    this.resident = Object.assign(this.resident, { socialWorker: sw });
  }
  onSwEmailUpdated(event: any): void {
    let sw = {
      ...this.resident.socialWorker,
      emailAddress: event.target.value,
    };
    this.resident = Object.assign(this.resident, { socialWorker: sw });
  }
  // === endof social worker ===============================================

  // === care type ====================================
  onCareCategoryUpdated(event: any): void {
    this.resident = Object.assign(this.resident, {
      careCategoryId: event.target.value,
    });
  }
  oncareNeedUpdated(event: any): void {
    this.resident = Object.assign(this.resident, {
      careNeed: event.target.value,
    });
  }
  onStayTypeUpdated(event: any): void {
    this.resident = Object.assign(this.resident, {
      stayType: event.target.value,
    });
  }
  // =================================================

  // === room loc and number updated ================
  onRoomLocationUpdated(event: any): void {
    this.resident = Object.assign(this.resident, {
      roomLocation: event.target.value,
    });
    this.resident = Object.assign(this.resident, { roomNumber: '' });
  }
  onRoomNumberUpdated(event: any): void {
    this.resident = Object.assign(this.resident, {
      roomNumber: event.target.value,
    });
  }
  // ===============================================

  // === misc input - Other ================================
  onAdmissionDateUpdated(date: any): void {
    if (event) {
      this.resident = Object.assign(this.resident, { admissionDate: date }); // admissionDate  //date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate() }); // moveInDate
    }
  }
  onFamilyHomeVisitDateUpdated(date: any): void {
    if (event) {
      this.resident = Object.assign(this.resident, {
        familyHomeVisitDate: date,
      });
    }
  }
  onCommentsUpdated(event: any): void {
    this.resident = Object.assign(this.resident, {
      comments: event.target.value,
    });
  }
  // === Other ================================
  onLocalAuthorityUpdated(event: any): void {
    this.resident = Object.assign(this.resident, {
      localAuthorityId: event.target.value,
    });
  }
  onLaIdUpdated(event: any): void {
    this.resident = Object.assign(this.resident, { laId: event.target.value });
  }
  onNhsNumberUpdated(event: any): void {
    this.resident = Object.assign(this.resident, {
      nhsNumber: event.target.value,
    });
  }
  onPoNumberUpdated(event: any): void {
    this.resident = Object.assign(this.resident, {
      poNumber: event.target.value,
    });
  }
  onNymsIdUpdated(event: any): void {
    this.resident = Object.assign(this.resident, {
      nymsId: event.target.value,
    })
  }


  // === contact info - resident ======================
  onEmailUpdated(event: any): void {
    this.resident = Object.assign(this.resident, {
      emailAddress: event.target.value,
    });
  }
  onPhoneNumberUpdated(event: any): void {
    this.resident = Object.assign(this.resident, {
      phoneNumber: event.target.value,
    });
  }
  // === endof contact info-resident ===============================================

  // === NOK ===========================================
  onNokForeNameUpdated(event: any): void {
    let curNok = this.nok;
    curNok.foreName = event.target.value;
  }
  onNokSurNameUpdated(event: any): void {
    let curNok = this.nok;
    curNok.surName = event.target.value;
  }
  onRelationshipUpdated(event: any): void {
    let curNok = this.nok;
    curNok.relationship = event.target.value;
  }
  onNokEmailUpdated(event: any): void {}
  onNokPhoneNumberUpdated(event: any): void {}
  // nok address
  onNokStreet1Updated(event: any): void {
    let curNok = this.deepCloneNok();
    curNok.address = Object.assign(curNok.address, {
      street1: event.target.value,
    });
    this.nok = Object.assign(this.nok, curNok);
  }
  onNokCityUpdated(event: any): void {
    let curNok = this.deepCloneNok();
    curNok.address = Object.assign(curNok.address, {
      city: event.target.value,
    });
    this.nok = Object.assign(this.nok, curNok);
  }
  onNokCountyUpdated(event: any): void {
    let curNok = this.deepCloneNok();
    curNok.address = Object.assign(curNok.address, {
      county: event.target.value,
    });
    this.nok = Object.assign(this.nok, curNok);
  }
  onNokPostCodeUpdated(event: any): void {
    let curNok = this.deepCloneNok();
    curNok.address = Object.assign(curNok.address, {
      postCode: event.target.value,
    });
    this.nok = Object.assign(this.nok, curNok);
  }
  onAddNok(): void {
    this.noks = Object.assign([...this.noks, this.nok]);
    this.nok = createInstanceOfNok();
  }
  deepCloneNok() {
    return JSON.parse(JSON.stringify(this.nok));
  }
  // === endof nok ==============================================

  // === submit button ======================================
  onSubmit(event: any): void {
    this.errors = [];
    if (this.resident.careHomeId <= 0) {
      this.errors.push('Carehome is required');
    }
    if (this.resident.foreName === '' || this.resident.surName === ''){
      this.errors.push('Name is required');
    }
    if (this.resident.admissionDate === '') {
      this.errors.push('Admission date is required');
    }
    if (this.resident.localAuthorityId <= 0) {
      this.errors.push('Local Authority (Provider) is required');
    }
    if (this.resident.careHomeDivisionId <= 0) {
      this.errors.push('Care Home Division is required');
    }
    if (this.resident.admissionDate === '' || this.resident.admissionDate === null) {
      this.errors.push('Admission Date is required');
    }
    if (this.errors.length > 0) return;

    this.saving = true;

    if (this.isAdmiting) {
      console.log('>>>rdy to save (create new resident from enquiry - admit)', this.resident);
      // remove enq reference id. no longer used after admiting.
      this.resident.enquiryReferenceId = this.resident.referenceId;
      this.enquiresService
        .admitResident(this.resident.enquiryReferenceId, this.resident)
        .subscribe(
          (data) => {
            console.log('>>Enquiry admitted', data);
            this.saving = false;
            this._router.navigate(['/residents', {}]);
          },
          (error) => {
            console.log('Error admitting enquiry', error);
          }
      );
    } else {
      console.log('>>>rdy to save (update existing resident)', this.resident);
      this.residentServcie.updateResident(this.resident.referenceId, this.resident)
      .subscribe(
        (data) => {
          console.log('>>Resident updated', data);
          this.saving = false;
          this._router.navigate(['/residents', {}]);
        },
        (error) => {
          console.log('Error updating resident', error);
        }
    );
    }


  }

  onCancel(event: any): void {
    this._router.navigate(['/enquires', {}]);
  }
  // =======================================================
}
