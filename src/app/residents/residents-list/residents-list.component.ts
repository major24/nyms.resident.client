import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ResidentsService } from '../services/residents.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { Resident } from '../models';
import { UserService } from '../../services/index';
import { CareHomeUser } from '../../models/index';

@Component({
  selector: 'app-residents-list',
  templateUrl: './residents-list.component.html',
  styleUrls: ['./residents-list.component.css']
})
export class ResidentsListComponent implements OnInit {
  userFound: boolean;
  user: CareHomeUser;
  residents: Resident[] = [];
  closeResult = '';
  selectedRefId = '';
  selectedName = '';
  dischargeDate: string;
  showDischargeButton: boolean = false;
  loading: boolean = false;

  constructor(
    private _Activatedroute: ActivatedRoute,
    private _router: Router,
    private residentService: ResidentsService,
    private modalService: NgbModal,
    private userService: UserService) { }

  ngOnInit(): void {
    //=== reload user on refresh =====================================
    // if user token found and userValue is null, must be reloading or refreshing the page
    // in-memory user is removed. so re-load user
    if (this.userService.hasUserToken() && this.userService.getStoreUser() == null) {
      console.log('>>sesion found. user hit F5, so get user again.');
      this.userService.reloadUser().subscribe(u => {
        this.userFound = true;
        this.user = this.userService.getStoreUser();
      });
    } else {
      this.user = this.userService.getStoreUser();
    }
    this.userFound = this.userService.getStoreUser() != null;
    // ================================================================

    // Do other work
    // is active or all residents?
    let activeOrAll: string = '';
    this._Activatedroute.paramMap.subscribe((params) =>{
      if (params && params.get('activeorall')) {
        activeOrAll = params.get('activeorall');
      }
    });

    if (activeOrAll === 'active') {
      this.loadActiveResidents(1); // HARD code for now
    } else {
      this.loadAllResidents(1); // HARD code for now
    }

    this.showDischargeButton = this.userService.isInRoleFromToken('Admin');
  }

  loadActiveResidents(careHomeId: number): void {
    this.loading = true;
    this.residentService.getActiveResidents(careHomeId)
      .subscribe({
        next: (data) => {
          Object.assign(this.residents, [...data]);
          console.log('>>>2', data);
          this.loading = false;
        },
        error: (error) => {
          console.log('Error loading residents ', error);
          this.loading = false;
        }
      });
  }

  loadAllResidents(careHomeId: number): void {
    this.loading = true;
    this.residentService.getAllResidents(careHomeId)
      .subscribe({
        next: (data) => {
          Object.assign(this.residents, [...data]);
          console.log('>>>2', data);
          this.loading = false;
        },
        error: (error) => {
          console.log('Error loading residents ', error);
          this.loading = false;
        }
      });
  }

  onDischargeDateChange(event: any): void {
    if (event) {
      this.dischargeDate = event;
    }
  }

  openModal(content: any, refId: string) {
    this.selectedRefId = refId;
    // get name by refid
    this.selectedName = this.residents.filter(r => r.referenceId === refId).map(k => { return k.foreName + ' ' + k.surName })[0];

    this.open(content);
  }

  dischargeResident(): void {
    if (!this.dischargeDate) return;

    this.residentService.dischargeResident(this.selectedRefId, this.dischargeDate)
      .subscribe({
        next: (data) => {
          console.log('>>saved', data);
          this.modalService.dismissAll();
          location.reload();
        },
        error: (error) => { console.log('Error saving exit date for resident ', error); }
      });
  }

  activateResident(): void {
    this.residentService.activateResident(this.selectedRefId)
    .subscribe({
      next: (data) => {
        console.log('>>activated resident', data);
        this.modalService.dismissAll();
        location.reload();
      },
      error: (error) => { console.log('Error saving exit date for resident ', error); }
    });
  }


  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
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

}
