import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { MeetingCategory, MeetingActionItem } from '../../../../models/index';
import { MeetingService } from '../../../../services/meeting.service';

@Component({
  selector: 'meeting-category-edit',
  templateUrl: './meeting-category-edit.component.html',
  styleUrls: ['./meeting-category-edit.component.css']
})
export class MeetingCategoryEditComponent implements OnInit {
  saving: boolean = false;
  errors: string[] = [];
  closeResult = '';
  selectedActionId: number;

  meetingCategory: MeetingCategory = { id: 0, name: '', meetingActionItems: [] };
  meetingActionItems: MeetingActionItem[] = [];
  initActionItem: MeetingActionItem = { id: 0, meetingCategoryId: 0, name: '', description: '', isAdhoc: false };
  selectedActionItem: MeetingActionItem = { id: 0, meetingCategoryId: 0, name: '', description: '', isAdhoc: false};


  createMeetingCategoryForm = new FormGroup({
    categoryName: new FormControl('')
  });

  constructor(private meetingService: MeetingService, private router: Router, private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  updatedNewActionItem(eventData: any): void {
    this.meetingActionItems.push(eventData);
    this.meetingCategory.meetingActionItems = this.meetingActionItems;
    this.modalService.dismissAll();
  }



  onSubmit(): void {
    this.errors = [];
    if (!this.meetingCategory || !this.meetingCategory.name) {
      this.errors.push('Category name is required.');
      return;
    }
    if (this.meetingActionItems.length === 0) {
      this.errors.push('Atleast one action is required.');
      return;
    }
    const emptyActions = this.meetingActionItems.filter(a => !a.name);

    if (emptyActions.length > 0) {
      this.errors.push('Actions(s) name is required.');
      return;
    }

    this.meetingCategory.meetingActionItems = this.meetingActionItems;
    console.log('rdy to submit', this.meetingCategory);

    this.saving = true;
    this.meetingService.createMeetingCategory(this.meetingCategory)
      .subscribe({
        next: (data) => {
          this.saving = false;
          this.navToMeetingCategoryList();
        },
        error: (error) => {
          console.log('Error updating meeting action item', error);
          this.saving = false;
        }
      });
  }

  navToMeetingCategoryList(): void {
    this.router.navigate(['/admin/meeting-category-list', {}]);
  }




   // open from template
  openModal(contentAdd: any, id: number, meetingCategoryId: number) {
    if (!this.meetingCategory.name) return;
    this.selectedActionId = +id;
    this.errors = [];
    this.selectedActionItem = Object.assign({}, this.initActionItem, {
        id: id,
        meetingCategoryId: meetingCategoryId
      });

    this.open(contentAdd);
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

}
