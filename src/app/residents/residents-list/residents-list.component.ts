import { Component, OnInit } from '@angular/core';
import { ResidentsService } from '../services/residents.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Resident } from '../models';

@Component({
  selector: 'app-residents-list',
  templateUrl: './residents-list.component.html',
  styleUrls: ['./residents-list.component.css']
})
export class ResidentsListComponent implements OnInit {

  residents: Resident[] = [];
  closeResult = '';
  selectedRefId = '';
  selectedName = '';
  exitDate: string;

  constructor(private residentService: ResidentsService, private modalService: NgbModal) { }

  ngOnInit(): void {
    setTimeout(x => {
      this.loadResidnets(1);
    }, 200)

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
    console.log('>>>>', refId);
    this.selectedRefId = refId;
    // get name by refid
    this.selectedName = this.residents.filter(r => r.referenceId === refId).map(k => { return k.foreName + ' ' + k.surName })[0];

    this.open(content);
  }

  saveExitDate(): void {
    console.log('>>>saving exit date to db');
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
      console.log('>>>', reason)
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      console.log('>>>>>hre')
      return `with: ${reason}`;
    }
  }

}
