import { Component, OnInit } from '@angular/core';
import { ResidentsService } from '../services/residents.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Resident } from '../models';
import { UserService } from  '../../services/index';
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
  exitDate: string;
  showExitButton: boolean = false;

  constructor(private residentService: ResidentsService, private modalService: NgbModal, private userService: UserService) { }

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
    this.loadResidnets(1); // Hardcoding to Pennine care id=1
    this.showExitButton = this.userService.isInRoleFromToken('Admin');
  }

  loadResidnets(careHomeId: number): void {
    this.residentService.getAllResidents(careHomeId)
    .subscribe({
      next: (data) => {
        Object.assign(this.residents, [...data]);
      },
      error: (error) => { console.log('Error loading residents ', error); }
    });
  }

  onExitDateChange(event: any): void {
    if (event) {
      this.exitDate = `${event.year}-${event.month}-${event.day}`;
    }
  }

  openModal(content: any, refId: string) {
    this.selectedRefId = refId;
    // get name by refid
    this.selectedName = this.residents.filter(r => r.referenceId === refId).map(k => { return k.foreName + ' ' + k.surName })[0];

    this.open(content);
  }

  saveExitDate(): void {
    this.residentService.updateExitDate(this.selectedRefId, this.exitDate)
    .subscribe({
      next: (data) => {
        console.log('>>saved', data);
        this.modalService.dismissAll()
    },
      error: (error) => { console.log('Error saving exit date for resident ', error); }
    });
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
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
