import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResidentSchedule, Schedule } from '../../models/index';
import { ScheduleService } from '../../services/index';
import { ResidentsService } from '../../../residents/services/residents.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
import { Util } from '../../../helpers/index';
import { Resident } from '../../../residents/models/index';

@Component({
  selector: 'schedule-edit',
  templateUrl: './schedule-edit.component.html',
  styleUrls: ['./schedule-edit.component.css']
})
export class ScheduleEditComponent implements OnInit {
  residentSchedules: ResidentSchedule = { referenceId: '', localAuthorityId: 0, paymentFromName: '', foreName: '', surName: '', schedules: [] };
  initSchedule: Schedule = { id: 0, residentId: 0, localAuthorityId: 0, paymentTypeId: 0, paymentProviderId: 0, paymentFromName: '', description: '', scheduleBeginDate: '', scheduleEndDate: '', weeklyFee: undefined, amountDue: 0, active: 'Y' };
  newSchedule: Schedule = { id: 0, residentId: 0, localAuthorityId: 0, paymentTypeId: 0, paymentProviderId: 0, paymentFromName: '', description: '', scheduleBeginDate: '', scheduleEndDate: '', weeklyFee: undefined, amountDue: 0, active: 'Y' };
  resident: Resident = undefined;

  @Input() scheduleBeginDate: any = undefined;
  @Input() labelDateCtl: string = 'Date';
  @Input() scheduleEndDate: any = undefined;

  closeResult = '';
  selectedScheduleId: number = 0;
  referenceId: string = '';
  error: string = '';
  loading: boolean = false;
  saving: boolean = false;
  paymentProviders: any = [];
  paymentTypes: any = [];
  _localAuthorities: any = [];

  createScheduleForm = new FormGroup({
    localAuthority: new FormControl(''),
    paymentFrom: new FormControl(''),
    paymentType: new FormControl(''),
    description: new FormControl(''),
    weeklyFee: new FormControl('')
  });

  constructor(
    private _Activatedroute: ActivatedRoute,
    private scheduleService: ScheduleService,
    private residentServcie: ResidentsService,
    private modalService: NgbModal,
    private readonly util: Util) { }

  ngOnInit(): void {
    this.loadPaymentProviders();
    this.loadPaymentTypes();
    this._Activatedroute.paramMap.subscribe((params) => {
      if (params && params.get('referenceId')) {
        this.referenceId = params.get('referenceId');
        this.loadResidentByReferenceId();
        this.loadCareHomeDetails(this.referenceId);
        this.loadSchedules(this.referenceId);
      }
    });
  }

  loadSchedules(referenceId: string): void {
    if (!referenceId) return;
    this.loading = true;
    this.scheduleService.loadSchedulesByReferenceId(referenceId)
      .subscribe({
        next: (data) => {
          Object.assign(this.residentSchedules, data);
          this.loading = false;
        },
        error: (error) => {
          console.log('Error fetching schedules ', error);
          this.error = error;
          this.loading = false;
        }
      });
  }

  loadPaymentProviders(): void {
    this.scheduleService.loadPaymentProviders()
    .subscribe({
      next: (data) => {
        this.paymentProviders = data;
      },
      error: (error) => { console.log('Error loading payment providers'); }
    });
  }

  loadResidentByReferenceId(): void {
    this.residentServcie.loadResidentByReferenceId(this.referenceId)
    .subscribe({
      next: (data) => {
        this.resident = data;
        this.initScheduleDialog();
        console.log('>>Resident', this.resident)
      },
      error: (error) => { console.log('Error loading resident'); }
    });
  }

  loadPaymentTypes(): void {
    this.scheduleService.loadPaymentTypes()
    .subscribe({
      next: (data) => {
        this.paymentTypes = data;
      },
      error: (error) => { console.log('Error loading payment providers'); }
    });
  }

  loadCareHomeDetails(referenceId: string): void {
    this._localAuthorities.splice(0, this._localAuthorities.length);
    this.residentServcie.loadCareHomeDetailByResidentReferenceId(referenceId)
    .subscribe({
      next: (data) => {
        console.log('>>ChDetails', data);
        this._localAuthorities = Object.assign(this._localAuthorities, data.localAuthorities);
      },
      error: (error) => {
        console.log('Error loading carehome details ', error);
        this.loading = false;
      }
    });
  }

  initScheduleDialog(): void {
    if (this.resident != undefined) {
      const laId = this.resident.localAuthorityId;
      const paymentProviderIdPrivate = 3;
      if (laId > 0) {
        this.createScheduleForm.controls['localAuthority'].setValue(laId);
        this.createScheduleForm.controls['localAuthority'].disable();
      }
      if (laId === 100) {
        // If LA id == private (100) set payment providers to Private only
        this.paymentProviders = this.paymentProviders.filter(p => p.id === paymentProviderIdPrivate);
        this.paymentTypes = this.paymentTypes.filter(p => p.id === paymentProviderIdPrivate);
      } else {
        this.paymentProviders = this.paymentProviders.filter(p => p.id !== paymentProviderIdPrivate);
        this.paymentTypes = this.paymentTypes.filter(p => p.id !== paymentProviderIdPrivate);
      }
    }
  }


  // add new schedule related
  onLocalAuthorityChange(event: any): void {
    this.newSchedule = Object.assign(this.newSchedule, { localAuthorityId: +event.target.value });
  }
  onPaymentFromChange(event: any): void {
    this.newSchedule = Object.assign(this.newSchedule, { paymentProviderId: +event.target.value });
  }
  onPaymentTypeChange(event: any): void {
    const selId = +event.target.value;
    this.newSchedule = Object.assign(this.newSchedule, { paymentTypeId: selId });
    this.newSchedule = Object.assign(this.newSchedule, { description: '' });

    const pType = this.paymentTypes.find(pt => pt.id === selId);
    if (pType) {
      this.newSchedule = Object.assign(this.newSchedule, { description: pType.name });
    }
    // ids 1-3 is LA weekly, CC weekly, Private weekly. 5 == adjustment
    selId == 5 ? this.createScheduleForm.controls['description'].enable() : this.createScheduleForm.controls['description'].disable();
  }
  onDescriptionChange(event: any): void {
    this.newSchedule = Object.assign(this.newSchedule, { description: event.target.value });
  }

  onScheduleBeginDateChange(event: any): void {
    this.newSchedule = Object.assign(this.newSchedule, { scheduleBeginDate: event });
  }

  onScheduleEndDateChange(event: any): void {
    this.newSchedule = Object.assign(this.newSchedule, { scheduleEndDate: event });   }

  onWeeklyFeeChange(event: any): void {
    this.newSchedule = Object.assign(this.newSchedule, { weeklyFee: +event.target.value });
  }

  createNewSchdule(): void {
    this.error = '';
    if (!this.referenceId) {
      this.error = 'Error: Reference Id not found';
      return;
    }
    if (this.newSchedule.localAuthorityId === 0 || this.newSchedule.scheduleBeginDate === '' || this.newSchedule.paymentProviderId === 0 || this.newSchedule.paymentTypeId === 0) {
      this.error = 'Missing required fields';
      return;
    }
    if (this.newSchedule.scheduleEndDate === '') {
      this.newSchedule = Object.assign(this.newSchedule, { scheduleEndDate: new Date('9999-12-31') });
    }
    console.log('>>>ready to save', this.newSchedule);

    this.saving = true;
    this.scheduleService.createSchedule(this.referenceId, this.newSchedule)
      .subscribe({
        next: (data) => {
          this.modalService.dismissAll();
          this.saving = false;
          // reload data
          this.loadSchedules(this.referenceId);
        },
        error: (error) => {
          console.log('Error saving new schedule end date in schedules ', error);
          this.saving = false;
        }
      });
  }




  // update exit date related
  onScheduleEndDateChange_1(event: any): void {
    if (event) {
      this.scheduleEndDate = `${event.year}-${event.month}-${event.day}`;
    }
  }
  onScheduleEndDateBlur_1(event: any): void {
    this.scheduleEndDate = event.target.value;
  }
  updateScheduleEndDate(): void {
    this.saving = true;
    this.scheduleService.updateScheduleEndDate(this.selectedScheduleId, this.scheduleEndDate)
      .subscribe({
        next: (data) => {
          this.modalService.dismissAll();
          this.saving = false;
          // reload data
          this.loadSchedules(this.referenceId);
        },
        error: (error) => {
          console.log('Error saving schedule end date in schedules ', error);
          this.saving = false;
        }
      });
  }

  disableSchedule(): void {
    if (this.selectedScheduleId <= 0) return;

    this.saving = true;
    this.scheduleService.inactivateSchedule(this.selectedScheduleId)
    .subscribe({
      next: (next) => {
        console.log('schedule is inactivated', next);
        this.modalService.dismissAll();
        this.saving = false;
        // reload data
        this.loadSchedules(this.referenceId);
      },
      error: (error) => {
        console.log('Error inactivating schedule ', error);
        this.saving = false;
      }
    })
  }




  // open from template
  openModal(content: any, id: number) {
    this.selectedScheduleId = +id;
    this.error = '';
    // this.createScheduleForm.controls['description'].disable();
    // Setup if edit is called with existing schedule value?
    if (this.selectedScheduleId > 0) {
      const selelectedSchedule = this.residentSchedules.schedules.find(s => s.id == this.selectedScheduleId);
      this.newSchedule = Object.assign(this.newSchedule, selelectedSchedule)
    } else {
      this.newSchedule = Object.assign(this.newSchedule, this.initSchedule)
    }
    // add laid from resident
    this.newSchedule = Object.assign(this.newSchedule, { localAuthorityId: this.resident.localAuthorityId });

    this.createScheduleForm.controls['paymentFrom'].setValue(this.newSchedule.paymentProviderId);
    this.createScheduleForm.controls['paymentType'].setValue(this.newSchedule.paymentTypeId);
    this.createScheduleForm.controls['description'].setValue(this.newSchedule.description);
    if (this.newSchedule.scheduleBeginDate != '') {
      this.scheduleBeginDate = new Date(this.newSchedule.scheduleBeginDate)
    }

    if (this.newSchedule.scheduleEndDate != '') {
      this.scheduleEndDate = new Date(this.newSchedule.scheduleEndDate);
    } else {
      this.scheduleEndDate = new Date("9999-12-31");
    }
    this.createScheduleForm.controls['weeklyFee'].setValue(this.newSchedule.weeklyFee);

    this.open(content);
  }
  // private
  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', backdrop: 'static' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  convertToJsDate(event: any): Date {
    return new Date(event.year, event.month - 1, event.day);
  }


}
