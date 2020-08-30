import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  EnquiryResident,
  createInstanceofEnquiryResident,
} from '../../models/index';
import { EnquiresService } from '../../services';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';
// import { EnquiryService } from '@app/residents/services/enquiry.service';
// import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { RoomLocation, KeyPair } from '../../../models/index';


@Component({
  selector: 'app-enquires-edit',
  templateUrl: './enquires-edit.component.html',
  styleUrls: ['./enquires-edit.component.css'],
})
export class EnquiresEditComponent implements OnInit {
  private _enquiryResident: BehaviorSubject<
    EnquiryResident
  > = new BehaviorSubject<EnquiryResident>(createInstanceofEnquiryResident());
  public enquiryResident$ = this._enquiryResident.asObservable();
  enquiryResident: EnquiryResident;

  roomLocations: RoomLocation[] = [
    { id: 1, name: "Main Floor",rooms: [
      { id: 10, locationId: 1, name: "R-1" },
      { id: 11, locationId: 1, name: "R-2" },
    ]},
    { id: 2, name: "First Floor", rooms: [
      { id: 20, locationId: 2, name: "R-20" },
      { id: 21, locationId: 2, name: "R-21" },
      { id: 22, locationId: 2, name: "R-22" },
    ]},
  ];

  statuses: KeyPair[] = [
    { key:'active', value:'Active'},
    { key: 'admit', value: 'Admit'},
    { key: 'closed', value:'Closed'}
  ];

  enquiryEditForm = new FormGroup({
    status: new FormControl(''),
  });

  activeIds: string[] = ['panel-profile'] // default to open profile //, 'panel-address']
  constructor(
    private _Activatedroute: ActivatedRoute,
    private _router: Router,
    private enquiresService: EnquiresService
  ) {}

  ngOnInit(): void {
    // init subscription for observables
    this._enquiryResident.subscribe((enq) => (this.enquiryResident = enq));

    this._Activatedroute.paramMap.subscribe((params) => {
      console.log(params);
      if (params && params.get('referenceId')) {
        let referenceId: string = params.get('referenceId');

        setTimeout(() => {
          this.loadByReferenceId(referenceId);
        }, 2000);
      } else {
        // add new enquiry. get home details into drop down box
        // onchange of home, load room locations and room numbers

      }
    });
  }

  loadByReferenceId(referenceId: string): void {
    if (referenceId === '' || referenceId === null) {
      throw new console.error('Reference not found');
    }
    this.enquiresService.loadEnquiryByReferenceId(referenceId).subscribe({
      next: (data) => {
        console.log('>>>>', data);
        this._enquiryResident.next(data);
        // once data is available setup THIS form related with data
        this.setupEnquiryEditForm(data);
      },
      error: (error) => {
        console.log('ERROR:', error);
      },
    });
  }

  loadCareHomeDetails(): void {
    
  }

  setupEnquiryEditForm(data: EnquiryResident): void {
    if (data.status) { this.enquiryEditForm.controls['status'].setValue(data.status); }
  }







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
      careCategory: event.target.value,
    };
    this.updateState(newState);
  }
  onCareNeedsUpdated(event: any): void {
    let newState = {
      ...this._enquiryResident.getValue(),
      careNeeds: event.target.value,
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
    console.log('>>>Ready to submit', this.enquiryResident);
  }
  onCancel(): void {
    this._router.navigate(['/enquires', {} ]);
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































  //************************************************************************************************ */
  // this.enquiryService.loadEnquiryByReferenceId(referenceId)
  // .subscribe(
  //   data => {
  //     console.log('>>>>>', data);
  //     this.enquiryResident = data;
  //     // let clone = Object.assign(this.residentProfile, {forName: 'aaa'});
  //     this.residentProfile = Object.assign({}, {forName: 'aaa', surName: 'bbb', middleName: '', dob: undefined, gender: '', martialStatus: '' });
  //     console.log('>>--', this.residentProfile);
  //     //this.residentProfile.foreName = this.enquiryResident.foreName;

  //     this.setEnquiryFieldValues();
  //   },
  //   error => console.log(`Error getting enquiry resident for ${referenceId}`)
  // )
  //}
}

//   // enquiryResident$: Observable<EnquiryResident>;
//   enquiryResident: EnquiryResident;
//   isLoading: boolean;
//   public isCollapsed = false;
//   model: NgbDateStruct;

//   address: Address = { street1: '', street2: '', city: '', postCode: '', county: ''};
//   residentProfile: ResidentProfile = { foreName: 'mn', surName: '', middleName: '', dob: undefined, gender: '', martialStatus: '' };
//   socialWorker: SocialWorker = { foreName: '', surName: '', socialWorkerPhoneNumber: '', socialWorkerEmail: '' };

//   constructor(private _Activatedroute:ActivatedRoute,
//     private _router:Router,
//     private enquiryService: EnquiryService) {
//      this.enquiryResident = {} as EnquiryResident;
//      }

//   ngOnInit(): void {
//     this._Activatedroute.paramMap.subscribe(params => {
//       console.log(params);
//       if (params && params.get('referenceId')){
//         let referenceId: string = params.get('referenceId');
//         this.loadByReferenceId(referenceId);
//       }
//     });

//     // temp
//     // this.address = { street1: '37 ante', street2: '', city: '', postCode: '', county: ''}
//     // this.residentProfile = { foreName: '', surName: '', middleName: '', dob: undefined, gender: '', martialStatus: '' };
//     // this.socialWorker = { foreName: '', surName: '', socialWorkerPhoneNumber: '', socialWorkerEmail: '' };

//     // bind observable
//     // this.enquiryService.getState().subscribe(
//     //   data => {
//     //     this.enquiryResident = data;
//     //     console.log('>>', data);
//     //     //this.setEnquiryFieldValues(data);
//     //   }
//     // );
//   }

//   loadByReferenceId(referenceId: string): void {
//     if (referenceId === '' || referenceId === null) {
//       throw new console.error('Reference not found');
//     }
//     this.enquiryService.loadEnquiryByReferenceId(referenceId)
//     .subscribe(
//       data => {
//         console.log('>>>>>', data);
//         this.enquiryResident = data;
//         // let clone = Object.assign(this.residentProfile, {forName: 'aaa'});
//         this.residentProfile = Object.assign({}, {forName: 'aaa', surName: 'bbb', middleName: '', dob: undefined, gender: '', martialStatus: '' });
//         console.log('>>--', this.residentProfile);
//         //this.residentProfile.foreName = this.enquiryResident.foreName;

//         this.setEnquiryFieldValues();
//       },
//       error => console.log(`Error getting enquiry resident for ${referenceId}`)
//     )
//   }

//   onCreate() {
//     // TODO: Use EventEmitter with form value
//     // const fv = this.enquiryProfileForm.value;
//     // console.log(fv);
//     // // create a new enquiry resident obj and send it
//     // let enq = createInstanceofEnquiryResident();
//     // enq.referenceId = fv.referenceId;
//     // enq.foreName = fv.foreName;
//     // enq.surName = fv.surName;
//     // console.log('>>create-post', enq);
//   }

//   onUpdate() {
//         // TODO: Use EventEmitter with form value
//         // const fv = this.enquiryProfileForm.value;
//         // console.log(fv);
//         // // create a new enquiry resident obj and send it
//         // let enq = createInstanceofEnquiryResident();
//         // let moveIndate: Date = new Date('2020-09-24');
//         // enq.referenceId = fv.referenceId;
//         // enq.foreName = fv.foreName;
//         // enq.surName = fv.surName;
//         // enq.moveInDate = moveIndate;
//         // console.log('>>update-put', enq);
//   }

//   private setEnquiryFieldValues(): void {
//     if (this.enquiryResident && this.enquiryResident !== null){
//       // this.enquiryProfileForm.controls['referenceId'].setValue(this.enquiryResident.referenceId);
//       // this.enquiryProfileForm.controls['foreName'].setValue(this.enquiryResident.foreName);
//       // this.enquiryProfileForm.controls['surName'].setValue(this.enquiryResident.surName);
//     }
//   }

//   onResidentProfileUpdated(event: any): void {
//     console.log('>>InEdtCompResupd', event);
//   }

//   onAddressUpdated(event: any): void {
//     console.log('InEnqEditForm=', event);
//     this.enquiryResident.address = event;
//   }

//   onSocialWorkerUpdated(event: any): void {
//     console.log('InEnqEditForm=', event);
//   }

//   onCareTypeUpdated(event: any): void {
//     console.log('InEnqEditForm=', event);
//   }

//   onRoomDetailUpdated(event: any): void {
//     console.log('InEnqEditForm=', event);
//   }

// }

//     /**    console.log('ngonit-enq');
//     this.enquiryResidents$ = this.enquiresService.getState();
//     console.log('>>>', this.enquiresService.getValue());
//     console.log('>>>', this.enquiryResidents$);
//     if (this.enquiresService.getValue() && this.enquiresService.getValue().length === 0) {
//       this.isLoading = true;
//       this.enquiresService.loadEnquiresAll()
//       .subscribe(data => {
//           // console.log(data);
//           this.isLoading = false;
//         },
//         error => { console.log('>>>Error getting all enquires'); }
//       )
//     } */
//   //   this._Activatedroute.paramMap.subscribe(params => {
//   //     console.log(params);
//   //     let id: number = +params.get('id');
//   //      // let enq = this.enquiresService.enquiryResidents;
//   //      this.enquiryResident = this.enquiresService.getResident(id);
//   //      // this.orderForm.controls['total'].setValue(price/ this.orderForm.value.amount);
//   //      if(this.enquiryResident){
//   //       this.profileForm.controls['id'].setValue(this.enquiryResident.id);
//   //       //this.profileForm.controls['firstName'].setValue(this.enquiryResident.firstName);
//   //       this.profileForm.controls['surName'].setValue(this.enquiryResident.surName);
//   //      }
//   //  });
