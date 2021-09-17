import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
import { MeetingCategory, MeetingActionItem, MeetingActionRequest } from '../../../../models/index'; //  ' /../models/index';
import { MeetingService } from '../../../../services/meeting.service';

@Component({
  selector: 'meeting-action-item-list',
  templateUrl: './meeting-action-item-list.component.html',
  styleUrls: ['./meeting-action-item-list.component.css']
})
export class MeetingActionItemListComponent implements OnInit {
  loading: boolean = false;
  selectedCategoryId: number;
  selectedActionItemId: number;
  error: string = '';
  saving: boolean = false;
  closeResult = '';
  categoryDialogTitle = 'Add';
  meetingCategories: MeetingCategory[] = [];
  newMeetingActionItem: MeetingActionItem = { id: 0, meetingCategoryId: 0, name: '', description: '', isAdhoc: '' }
  initMeetingActionItem: MeetingActionItem = { id: 0, meetingCategoryId: 0, name: '', description: '', isAdhoc: '' }


  createMeetingActionItemForm = new FormGroup({
    meetingCategory: new FormControl(''),
    name: new FormControl(''),
    description: new FormControl(''),
    isAdhoc: new FormControl('')
  })

  constructor(private meetingService: MeetingService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.loadMeetingCategoriesAndActionItems();
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

  onMeetingCategoryChange(event: any): void {
    if (event.target.value) {
      this.newMeetingActionItem = Object.assign(this.newMeetingActionItem, { meetingCategoryId: +event.target.value });
    }
  }

  onNameChange(event: any): void {
    if (event.target.value) {
      this.newMeetingActionItem = Object.assign(this.newMeetingActionItem, { name: event.target.value });
    }
  }

  onDescriptionChange(event: any): void {
    if (event.target.value) {
      this.newMeetingActionItem = Object.assign(this.newMeetingActionItem, { description: event.target.value });
    }
  }

  onIsAdhoc(event: any): void {
    const val = event.target.checked ? 'Y' : 'N';
    if (event.target) {
      this.newMeetingActionItem = Object.assign(this.newMeetingActionItem, { isAdhoc: val });
    }
  }

  clearDialogBox(): void {
    this.createMeetingActionItemForm.controls['meetingCategory'].setValue('');
    this.createMeetingActionItemForm.controls['name'].setValue('');
    this.createMeetingActionItemForm.controls['description'].setValue('');
    this.createMeetingActionItemForm.controls['isAdhoc'].setValue('');
  }

  saveActionItem(): void {
    this.error = '';
    if (this.newMeetingActionItem.meetingCategoryId <= 0) {
      this.error = 'Please select meeting category';
      return;
    }
    if (this.newMeetingActionItem.name == '') {
      this.error = 'Please fill in all required fields.';
      return;
    }
    console.log('>>>>', this.newMeetingActionItem);

    if (this.newMeetingActionItem.id === 0) {
      this.saving = true;
      this.meetingService.createMeetingActionItem(this.newMeetingActionItem)
        .subscribe({
          next: (data) => {
            this.modalService.dismissAll();
            this.saving = false;
            // reload data
            this.loadMeetingCategoriesAndActionItems();
            this.clearDialogBox();
          },
          error: (error) => {
            console.log('Error creating category ', error);
            this.saving = false;
          }
        });
    } else {
      this.saving = true;
      this.meetingService.updateMeetingActionItems(this.newMeetingActionItem)
        .subscribe({
          next: (data) => {
            this.modalService.dismissAll();
            this.saving = false;
            // reload data
            this.loadMeetingCategoriesAndActionItems();
            this.clearDialogBox();
          },
          error: (error) => {
            console.log('Error creating category ', error);
            this.saving = false;
          }
        });
    }
  }







  // open from template
  openModal(contentAdd: any, cateId: number, actItemId: number) {
    this.selectedCategoryId = +cateId;
    this.selectedActionItemId = +actItemId;
    this.error = '';

    if (this.selectedActionItemId > 0) {
      const selectedCategory = this.meetingCategories.find(c => c.id === this.selectedCategoryId);

      this.newMeetingActionItem = Object.assign(this.newMeetingActionItem,
        selectedCategory.meetingActionItems.find(a => a.id === this.selectedActionItemId));
      // Set control values..
      this.createMeetingActionItemForm.controls['meetingCategory'].setValue(this.newMeetingActionItem.meetingCategoryId);
      this.createMeetingActionItemForm.controls['name'].setValue(this.newMeetingActionItem.name);
      this.createMeetingActionItemForm.controls['description'].setValue(this.newMeetingActionItem.description);
      const isAdhocCkd = (this.newMeetingActionItem.isAdhoc === 'Y') ? true : false;
      this.createMeetingActionItemForm.controls['isAdhoc'].setValue(isAdhocCkd);
    } else {
      this.newMeetingActionItem = Object.assign(this.newMeetingActionItem, this.initMeetingActionItem);
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
