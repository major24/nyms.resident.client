import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { MeetingCategory, MeetingActionItem } from '../../../../models/index';
import { MeetingService } from '../../../../services/meeting.service';

@Component({
  selector: 'meeting-category-list',
  templateUrl: './meeting-category-list.component.html',
  styleUrls: ['./meeting-category-list.component.css']
})
export class MeetingCategoryListComponent implements OnInit {
  loading: boolean = false;
  selectedActionId: number;
  error: string = '';
  saving: boolean = false;
  closeResult = '';
  meetingCategories: MeetingCategory[] = [];
  initActionItem: MeetingActionItem = { id: 0, meetingCategoryId: 0, name: '', description: '', isAdhoc: false};
  selectedActionItem: MeetingActionItem = { id: 0, meetingCategoryId: 0, name: '', description: '', isAdhoc: false};

  constructor(private meetingService: MeetingService, private router: Router,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.loadMeetingCategoriesAndActionItems();
  }

  navToMeetingCategoryActionItemsEdit(): void {
    this.router.navigate(['/admin/meeting-category-edit', {}]);
  }

  loadMeetingCategoriesAndActionItems(): void {
    this.loading = true;
    this.meetingService.loadMeetingCategoriesAndActionItems()
    .subscribe({
      next: (data) => {
        Object.assign(this.meetingCategories, [...data]);
        console.log('loaded cats:', this.meetingCategories)
        this.loading = false;
      },
      error: (error) => {
        console.log('Error fetching categories ', error);
        this.loading = false;
      }
    });
  }

  updateActionItem(actionItem :MeetingActionItem): void {
    this.saving = true;
    this.meetingService.updateMeetingActionItem(actionItem)
      .subscribe({
        next: (data) => {
          this.modalService.dismissAll();
          this.saving = false;
          // reload data
          this.loadMeetingCategoriesAndActionItems();
        },
        error: (error) => {
          console.log('Error updating meeting action item', error);
          this.saving = false;
        }
      });
  }

  insertActionItem(actionItem :MeetingActionItem): void {
    this.saving = true;
    this.meetingService.insertMeetingActionItem(actionItem)
      .subscribe({
        next: (data) => {
          this.modalService.dismissAll();
          this.saving = false;
          // reload data
          this.loadMeetingCategoriesAndActionItems();
        },
        error: (error) => {
          console.log('Error updating meeting action item', error);
          this.saving = false;
        }
      });
  }

  updatedSelectedOrNewActionItem(eventData: any): void {
    eventData.id > 0 ? this.updateActionItem(eventData) : this.insertActionItem(eventData);
  }







  // open from template
  openModal(contentAdd: any, id: number, meetingCategoryId: number) {
    this.selectedActionId = +id;
    this.error = '';
    if (this.selectedActionId > 0) {
      this.meetingCategories.map(c => {
        c.meetingActionItems.map(a => {
          if (a.id === this.selectedActionId) {
            this.selectedActionItem = Object.assign(this.selectedActionItem, a);
            return;
          }
        });
      });
    } else if (this.selectedActionId === -1 && meetingCategoryId > 0) {
      this.selectedActionItem = Object.assign({}, this.initActionItem, {
        id: id,
        meetingCategoryId: meetingCategoryId
      });
    }
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
