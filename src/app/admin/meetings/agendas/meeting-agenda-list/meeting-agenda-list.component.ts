// import { Component, OnInit } from '@angular/core';
// import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
// import { FormGroup, FormControl } from '@angular/forms';
// import { MeetingCategory, MeetingAgenda } from '../../../../models/index'; //  ' /../models/index';
// import { MeetingService } from '../../../../services/meeting.service';

// @Component({
//   selector: 'meeting-agenda-list',
//   templateUrl: './meeting-agenda-list.component.html',
//   styleUrls: ['./meeting-agenda-list.component.css']
// })
// export class MeetingAgendaListComponent implements OnInit {
//   loading: boolean = false;
//   selectedCategoryId: number;
//   selectedAgendaId: number;
//   error: string = '';
//   saving: boolean = false;
//   closeResult = '';
//   categoryDialogTitle = 'Add';
//   meetingCategories: MeetingCategory[] = [];
//   newMeetingAgenda: MeetingAgenda = { id: 0, meetingCategoryId: 0, name: '', description: ''}
//   initMeetingAgenda: MeetingAgenda = { id: 0, meetingCategoryId: 0, name: '', description: ''}

//   createMeetingAgendaForm = new FormGroup({
//     meetingCategory: new FormControl(''),
//     name: new FormControl(''),
//     description: new FormControl('')
//   })

//   constructor(private meetingService: MeetingService,
//     private modalService: NgbModal) { }

//   ngOnInit(): void {
//     this.loadMeetingCategoriesAndAgendas();
//   }

//   loadMeetingCategoriesAndAgendas(): void {
//     this.loading = true;
//     this.meetingService.loadMeetingCategoriesAndAgendas()
//     .subscribe({
//       next: (data) => {
//         Object.assign(this.meetingCategories, [...data]);
//         console.log('loaded cats:', this.meetingCategories)
//         this.loading = false;
//       },
//       error: (error) => {
//         console.log('Error fetching categories ', error);
//         this.loading = false;
//       }
//     });
//   }


//   onMeetingCategoryChange(event: any): void {
//     if (event.target.value) {
//       this.newMeetingAgenda = Object.assign(this.newMeetingAgenda, { meetingCategoryId: +event.target.value });
//     }
//   }

//   onNameChange(event: any): void {
//     if (event.target.value) {
//       this.newMeetingAgenda = Object.assign(this.newMeetingAgenda, { name: event.target.value });
//     }
//   }

//   onDescriptionChange(event: any): void {
//     if (event.target.value) {
//       this.newMeetingAgenda = Object.assign(this.newMeetingAgenda, { description: event.target.value });
//     }
//   }

//   saveAgenda(): void {
//     this.error = '';
//     if (this.newMeetingAgenda.meetingCategoryId <= 0) {
//       this.error = 'Please select meeting category';
//       return;
//     }
//     if (this.newMeetingAgenda.name == '') {
//       this.error = 'Please fill in all required fields.';
//       return;
//     }

//     if (this.newMeetingAgenda.id === 0) {
//       this.saving = true;
//       this.meetingService.createMeetingAgenda(this.newMeetingAgenda)
//         .subscribe({
//           next: (data) => {
//             this.modalService.dismissAll();
//             this.saving = false;
//             // reload data
//             this.loadMeetingCategoriesAndAgendas();
//           },
//           error: (error) => {
//             console.log('Error creating category ', error);
//             this.saving = false;
//           }
//         });
//     } else {
//       this.saving = true;
//       this.meetingService.updateMeetingAgenda(this.newMeetingAgenda)
//         .subscribe({
//           next: (data) => {
//             this.modalService.dismissAll();
//             this.saving = false;
//             // reload data
//             this.loadMeetingCategoriesAndAgendas();
//           },
//           error: (error) => {
//             console.log('Error creating category ', error);
//             this.saving = false;
//           }
//         });
//     }
//   }




//   // open from template
//   openModal(contentAdd: any, cateId: number, agnId: number) {
//     this.selectedCategoryId = +cateId;
//     this.selectedAgendaId = +agnId;
//     this.error = '';

//     if (this.selectedAgendaId > 0) {
//       const selectedCategory = this.meetingCategories.find(c => c.id === this.selectedCategoryId);

//       this.newMeetingAgenda = Object.assign(this.newMeetingAgenda,
//         selectedCategory.meetingAgendas.find(a => a.id === this.selectedAgendaId));
//       // Set control values..
//       this.createMeetingAgendaForm.controls['meetingCategory'].setValue(this.newMeetingAgenda.meetingCategoryId);
//       this.createMeetingAgendaForm.controls['name'].setValue(this.newMeetingAgenda.name);
//       this.createMeetingAgendaForm.controls['description'].setValue(this.newMeetingAgenda.description);
//     } else {
//       this.newMeetingAgenda = Object.assign(this.newMeetingAgenda, this.initMeetingAgenda);
//     }

//     this.open(contentAdd);
//   }
//   // private
//   open(content) {
//     this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', backdrop: 'static' }).result.then((result) => {
//       this.closeResult = `Closed with: ${result}`;
//     }, (reason) => {
//       this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
//     });
//   }
//   private getDismissReason(reason: any): string {
//     if (reason === ModalDismissReasons.ESC) {
//       return 'by pressing ESC';
//     } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
//       return 'by clicking on a backdrop';
//     } else {
//       return `with: ${reason}`;
//     }
//   }



// }
