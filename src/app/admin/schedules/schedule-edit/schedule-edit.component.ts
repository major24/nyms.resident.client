import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResidentSchedule, Schedule } from '../../models/index';
import { ScheduleService } from '../../services/index';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
import { Util } from '../../../helpers/index';

@Component({
  selector: 'schedule-edit',
  templateUrl: './schedule-edit.component.html',
  styleUrls: ['./schedule-edit.component.css']
})
export class ScheduleEditComponent implements OnInit {
  residentSchedules: ResidentSchedule = { referenceId: '', localAuthorityId: 0, paymentFromName: '', foreName: '', surName: '', schedules: [] };
  initSchedule: Schedule = { id: 0, residentId: 0, localAuthorityId: 0, paymentTypeId: 0, paymentProviderId: 0, paymentFromName: '', description: '', scheduleBeginDate: '', scheduleEndDate: '', weeklyFee: 0, amountDue: 0, active: 'Y' };
  newSchedule: Schedule = { id: 0, residentId: 0, localAuthorityId: 0, paymentTypeId: 0, paymentProviderId: 0, paymentFromName: '', description: '', scheduleBeginDate: '', scheduleEndDate: '', weeklyFee: 0, amountDue: 0, active: 'Y' };

  @Input() scheduleBeginDate: any = undefined;
  @Input() labelDateCtl: string = 'Date';
  @Input() scheduleEndDate: any = undefined;
  @Output() scheduleBeginDateUpdated = new EventEmitter<any>();
  @Output() scheduleEndDateUpdated = new EventEmitter<any>();

  closeResult = '';
  selectedScheduleId: number = 0;
  referenceId: string = '';
  error: string = '';
  loading: boolean = false;
  saving: boolean = false;
  paymentProviders: any = [];
  paymentTypes: any = [];
  // disablePaymentDescriptionText: boolean = true;

  createScheduleForm = new FormGroup({
    paymentFrom: new FormControl(''),
    paymentType: new FormControl(''),
    description: new FormControl(''),//({value:'', disabled: true}),
    // scheduleEndDate: new FormControl({ year: 9999, month: 12, day: 31 }),
    weeklyFee: new FormControl('')
  });

  constructor(
    private _Activatedroute: ActivatedRoute,
    private _router: Router,
    private scheduleService: ScheduleService,
    private modalService: NgbModal,
    private readonly util: Util) { }

  ngOnInit(): void {
    this.loadPaymentProviders();
    this.loadPaymentTypes();

    this._Activatedroute.paramMap.subscribe((params) => {
      if (params && params.get('referenceId')) {
        this.referenceId = params.get('referenceId');
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

  loadPaymentTypes(): void {
    this.scheduleService.loadPaymentTypes()
    .subscribe({
      next: (data) => {
        this.paymentTypes = data;
      },
      error: (error) => { console.log('Error loading payment providers'); }
    });
  }

  // add new schedule related
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
    this.newSchedule = Object.assign(this.newSchedule, { scheduleBeginDate: event }); //this.util.convertAngDateToJsDate(event) });
  }

  onScheduleEndDateChange(event: any): void {
    this.newSchedule = Object.assign(this.newSchedule, { scheduleEndDate: event });    // this.util.convertAngDateToJsDate(event) });
  }
    // onScheduleBeginDateBlur(event: any): void {
  //   this.newSchedule = Object.assign(this.newSchedule, { scheduleBeginDate: this.util.convertStringDateToJsDate(event.target.value) });
  // }
  // onScheduleEndDateBlur_2(event: any): void {
  //   this.newSchedule = Object.assign(this.newSchedule, { scheduleEndDate: this.util.convertStringDateToJsDate(event.target.value) });
  // }
  onWeeklyFeeChange(event: any): void {
    this.newSchedule = Object.assign(this.newSchedule, { weeklyFee: +event.target.value });
  }

  createNewSchdule(): void {
    if (!this.referenceId) {
      this.error = 'Error: Reference Id not found';
      return;
    }
    if (this.newSchedule.scheduleBeginDate === '' || this.newSchedule.paymentProviderId === 0 || this.newSchedule.paymentTypeId === 0) {
      this.error = 'Missing required fields';
      return;
    }
    if (this.newSchedule.scheduleEndDate === '') {
      this.newSchedule = Object.assign(this.newSchedule, { scheduleEndDate: new Date('9999-12-31') });
    }
    console.log('>>>>rdy save', this.newSchedule);

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
    console.log('rdy to disable ', this.selectedScheduleId);
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
