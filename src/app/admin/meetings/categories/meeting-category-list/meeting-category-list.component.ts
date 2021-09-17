import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
import { MeetingCategory } from '../../../../models/index';
import { MeetingService } from '../../../../services/meeting.service';

@Component({
  selector: 'meeting-category-list',
  templateUrl: './meeting-category-list.component.html',
  styleUrls: ['./meeting-category-list.component.css']
})
export class MeetingCategoryListComponent implements OnInit {
  loading: boolean = false;
  selectedCategoryId: number;
  error: string = '';
  saving: boolean = false;
  closeResult = '';
  meetingCategories: MeetingCategory[] = [];
  newMeetingCategory: MeetingCategory = { id: 0, name: '', description: '', meetingActionItems: [] };  // meetingAgendas: [] }
  initMeetingCategory: MeetingCategory = { id: 0, name: '', description: '', meetingActionItems: [] }; // meetingAgendas: [] }

  createMeetingCategoryForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl('')
  });

  constructor(private meetingService: MeetingService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.loadMeetingCategories();
  }

  loadMeetingCategories(): void {
    this.loading = true;
    this.meetingService.loadMeetingCategories()
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

  onNameChange(event: any): void {
    if (event.target.value) {
      this.newMeetingCategory = Object.assign(this.newMeetingCategory, { name: event.target.value });
    }
  }

  onDescriptionChange(event: any): void {
    if (event.target.value) {
      this.newMeetingCategory = Object.assign(this.newMeetingCategory, { description: event.target.value });
    }
  }

  saveCategory(): void {
    this.error = '';
    if (this.newMeetingCategory.name == '') {
      this.error = 'Please fill in all required fields.';
      return;
    }

    if (this.newMeetingCategory.id === 0) {
      this.saving = true;
      this.meetingService.createMeetingCategory(this.newMeetingCategory)
        .subscribe({
          next: (data) => {
            this.modalService.dismissAll();
            this.saving = false;
            // reload data
            this.loadMeetingCategories();
            this.clearCategoryDialog();
          },
          error: (error) => {
            console.log('Error creating category ', error);
            this.saving = false;
          }
        });
    } else {
      this.saving = true;
      this.meetingService.updateMeetingCategory(this.newMeetingCategory)
        .subscribe({
          next: (data) => {
            this.modalService.dismissAll();
            this.saving = false;
            // reload data
            this.loadMeetingCategories();
            this.clearCategoryDialog();
          },
          error: (error) => {
            console.log('Error creating category ', error);
            this.saving = false;
          }
        });
    }
  }

  clearCategoryDialog(): void {
    this.createMeetingCategoryForm.controls['name'].setValue('');
    this.createMeetingCategoryForm.controls['description'].setValue('');
  }








  // open from template
  openModal(contentAdd: any, id: number) {
    this.selectedCategoryId = +id;
    this.error = '';
    if (this.selectedCategoryId > 0) {
      const selectedCategory = this.meetingCategories.find(c => c.id === this.selectedCategoryId);
      this.newMeetingCategory = Object.assign(this.newMeetingCategory, selectedCategory);
    } else {
      this.newMeetingCategory = Object.assign(this.newMeetingCategory, this.initMeetingCategory);
    }
    this.createMeetingCategoryForm.controls['name'].setValue(this.newMeetingCategory.name);
    this.createMeetingCategoryForm.controls['description'].setValue(this.newMeetingCategory.description);

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
