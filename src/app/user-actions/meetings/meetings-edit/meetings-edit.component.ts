import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { MeetingCategory, MeetingActionRequest, Meeting, MeetingActionItem } from '../../../../../src/app/models/index';
import { MeetingService } from '../../../../app/services/meeting.service';
import { Util } from '../../../helpers/';
import { Observable } from 'rxjs';

// import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'meetings-edit',
  templateUrl: './meetings-edit.component.html',
  styleUrls: ['./meetings-edit.component.css']
})
export class MeetingsEditComponent implements OnInit {
  loading: boolean = false;
  errors: string[] = [];
  saving: boolean = false;
  closeResult = '';
  routePath: string = '';
  isAddingNewMeeting: boolean = false;
  pageHeaderForMeetingType = 'Create';
  // priorities = ['High', 'Medium', 'Low'];
  actionOwners: any[] = [
    { id: 1, name: 'Yogi Yogen' },
    { id: 2, name: 'Kumarn Dran' }
  ]
  todayDate: any = new Date();
  referenceId: string = '';
  selectedCategoryId: number = 0;
  meetingCategories: MeetingCategory[] = [];
  // For add new meetings: As soon as the categories and act items fetched
  // convert them to Actions array. Use this arr show on UI, add new items etc and send it back to server...
  meetingActionRequests: MeetingActionRequest[] = [];
  // selectedMeetingActionRequests: MeetingActionRequest[] = [];
  initMeetingActionRequest: MeetingActionRequest = { id: 0, meetingCategoryId: 0, meetingActionItemId: 0, ownerId: 0, startDate: '', completionDate: '', priority: '', isAdhoc: false, checked: false, name: '', description: '', frequency: '', repetition: 0 }
  newMeeting: Meeting = { id: 0, referenceId: '', title: '', meetingDate: '', ownerId: 0, status: '', meetingActions: [] }
  selectedActionItem: MeetingActionItem = { id: 0, meetingCategoryId: 0, name: '', description: '', isAdhoc: false };

  // meeting: Meeting = this.newMeeting;

  constructor(
    private _Activatedroute: ActivatedRoute,
    private _router: Router,
    private meetingService: MeetingService,
    private readonly util: Util,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    // this.routePath = this._Activatedroute.snapshot.routeConfig.path;
    // console.log(this.routePath); //
    // console.log(this._router.url); // /user/meetings-edit/add OR /user/meetings-edit/c0f4f811-caa4-4800-80d7-c93456e5c9ea

    this._Activatedroute.paramMap.subscribe((params) => {
      if (params && params.get('referenceId')) {
        this.referenceId = params.get('referenceId');
        if (this.referenceId === 'add') {
          this.isAddingNewMeeting = true;
          this.newMeeting = Object.assign(this.newMeeting, { meetingDate: { year: this.todayDate.getFullYear(), month: this.todayDate.getMonth() + 1, day: this.todayDate.getDate() } })
        } else {
          this.pageHeaderForMeetingType = 'Edit';
        }
        this.loadMeetingCategoriesAndActionItems();
      }
    });
  }


  // loadMeetingCategories(): void {
  //   this.loading = true;
  //   this.meetingActionRequests = [];
  //   this.meetingService.loadMeetingCategories()
  //     .subscribe({
  //       next: (data) => {
  //         Object.assign(this.meetingCategories, [...data]);
  //         console.log('loaded cats:', this.meetingCategories);
  //         // Create new Actions From items
  //         this.loading = false;
  //       },
  //       error: (error) => {
  //         console.log('Error fetching categories ', error);
  //         this.loading = false;
  //       }
  //     });
  // }



  loadMeetingCategoriesAndActionItems(): void {
    this.loading = true;
    this.meetingService.loadMeetingCategoriesAndActionItems()
      .subscribe({
        next: (data) => {
          Object.assign(this.meetingCategories, [...data]);
          console.log('loaded cats:', this.meetingCategories);
          // Create new Actions From items
          this.initializeMeetingActionRequestsList(this.meetingCategories);
          if (!this.isAddingNewMeeting) {
            this.loadMeeting(this.referenceId);
          }
          this.loading = false;
        },
        error: (error) => {
          console.log('Error fetching categories ', error);
          this.loading = false;
        }
      });
  }

  initializeMeetingActionRequestsList(categories: MeetingCategory[]): void {
    this.meetingActionRequests = [];
    categories.map(c => {
      c.meetingActionItems.map(a => {
        const x = Object.assign({}, this.initMeetingActionRequest, {
          id: -1,
          meetingCategoryId: a.meetingCategoryId,
          meetingActionItemId: a.id, // MN meetingActionItemId
          name: a.name,
          description: a.description,
          startDate: { year: this.todayDate.getFullYear(), month: this.todayDate.getMonth() + 1, day: this.todayDate.getDate() },
          checked: true,  // Defalut to true. all actions are checked to goto db, unless uncheck by user
        });
        // console.log(x);
        this.meetingActionRequests.push(x);
      });
    });
  }

  // loadMeetings(): void {
  //   this.loading = true;
  //   this.meetingService.loadMeetings()
  //     .subscribe({
  //       next: (data) => {
  //         console.log('>>>>', data);
  //         Object.assign(this.meetingCategories, [...data]);
  //         console.log('loaded meetings and actions:', this.meetingCategories);
  //         // get total number of action items fetched..
  //         // this.meetingCategories.map(c => {
  //         //   c.meetingActionItems.map(ai => {
  //         //     this.totalNumberOfActionItemsFromDb++
  //         //   });
  //         // });
  //         this.loading = false;
  //       },
  //       error: (error) => {
  //         console.log('Error fetching categories ', error);
  //         this.loading = false;
  //       }
  //     });
  // }

  loadMeeting(referenceId: string): void {
    this.loading = true;
    // this.meetingActionRequests = [];
    this.meetingService.loadMeeting(referenceId)
      .subscribe({
        next: (data) => {
          Object.assign(this.newMeeting, data);
          console.log('loaded meeting and actions:', this.newMeeting);
          // Update meetingDate to fit angular format
          this.newMeeting.meetingDate =  this.util.convertIsoDateStringToAngDate(this.util.getIsoDateString(this.newMeeting.meetingDate));
          // Update pre-populated ActionsRequestArray with matching 'MeetingActionItemId'
          this.newMeeting.meetingActions.map((actFromDb, idx) => {
            // find in existing array and update..
            let x = this.meetingActionRequests.find(existingAct => existingAct.id === actFromDb.meetingActionItemId); // MN meetingActionItemId
            if (x) {
              console.log('>>> x', actFromDb);
              if (actFromDb.startDate != null || actFromDb.startDate != '') {
                const dateStr = this.util.getIsoDateString(actFromDb.startDate);
                actFromDb.startDate = this.util.convertIsoDateStringToAngDate(dateStr);
              }
              // console.log( this.util.getIsoDateString(actFromDb.startDate));
              this.meetingActionRequests[idx] = actFromDb;
              return;
            }
          });
          // this.meetingActionRequests = Object.assign(this.meetingActionRequests, this.newMeeting.meetingActions);
          // // recreate
          // c.meetingActionItems.map(a => {
          //   const x = Object.assign({}, this.initMeetingActionRequest, {
          //     meetingCategoryId: a.meetingCategoryId,
          //     meetingActionItemId: a.id,
          //     name: a.name,
          //     description: a.description,
          //     startDate: { year: this.todayDate.getFullYear(), month: this.todayDate.getMonth() + 1, day: this.todayDate.getDate() }
          //   });
          //   // console.log(x);
          //   this.meetingActionRequests.push(x);
          // });
          // get total number of action items fetched..
          // this.meetingCategories.map(c => {
          //   c.meetingActionItems.map(ai => {
          //     this.totalNumberOfActionItemsFromDb++
          //   });
          // });
          this.loading = false;
        },
        error: (error) => {
          console.log('Error fetching meeting by refid ', error);
          this.loading = false;
        }
      });
  }

  // addNewMeetingAction(): void {
  //   if (this.selectedCategoryId === 0) return;
  //   const x = Object.assign({}, this.initMeetingActionRequest, {
  //     id: -1, // MN meetingActionItemId
  //     meetingCategoryId: +this.selectedCategoryId,
  //     name: '',
  //     description: ''
  //   });
  //   this.meetingActionRequests.push(x);
  // }

  onCancel(): void {
    this._router.navigate(['/user/meetings-list', {}]);
  }

  onSubmit(): void {
    this.errors = [];
    // 1) clone the meetingActions array to new obj. Else it will corrupts the UI due to date changes..
    const meetingToBeSend = Object.assign({}, this.newMeeting);
    meetingToBeSend.meetingDate = this.util.convertAngDateToString(meetingToBeSend.meetingDate);

    let meetingActionReqToBeSend: MeetingActionRequest[] = [];

    this.meetingActionRequests.filter(a => a.meetingCategoryId === +this.selectedCategoryId && a.checked === true) // take only checked ones..
      .map(a => {
        const x = Object.assign({}, a);
        x.startDate = this.util.convertAngDateToString(a.startDate);
        x.completionDate = this.util.convertAngDateToString(a.completionDate);
        meetingActionReqToBeSend.push(x);
      });

    if (!meetingToBeSend.title) {
      this.errors.push('Meeting title is required.');
      return;
    }
    // validate atleast one item is checked?
    if (meetingActionReqToBeSend.length <= 0) {
      this.errors.push('Atleast one action item to be checked before submitting.');
      return;
    }
    // if NEW ACTION is added, validate act.name is submitted?
    const newItemsWithMissingNames = meetingActionReqToBeSend.filter(a => a.id === -1 && a.name === ''); // MN meetingActionItemId
    if (newItemsWithMissingNames.length > 0) {
      this.errors.push('Newly added action items should have a name.');
      return;
    }
    // ensure completion date is included
    meetingActionReqToBeSend.map(a => {
      if (!a.completionDate) {
        this.errors.push('Completion date is required');
        return;
      }
    });
    // if completion date added, then ensure the date is later than start date.
    meetingActionReqToBeSend.map(a => {
      let stDate = (a.startDate != '') ? new Date(a.startDate) : '';
      let compDate = (a.completionDate != '') ? new Date(a.completionDate) : '';
      if (stDate && compDate) {
        if (compDate < stDate) {
          this.errors.push(`Incorrect dates selected for "${a.name}"`);
        }
      }
    });

    // find deleted actions
    //meetingToBeSend.deletedIds = this.meetingActionRequests.filter(a => !a.checked && a.id > 0).map(v => v.id);
    if (this.errors.length > 0) return;

    console.log('>>rdy to submit', meetingToBeSend);
    console.log('>>', meetingActionReqToBeSend);
    meetingToBeSend.meetingActions = meetingActionReqToBeSend;

    // when refId found, update existing meeting, else create meeting
    if (meetingToBeSend.referenceId) {
      console.log('>>rdy to UPDATE', meetingToBeSend);
      this.updateMeeting(meetingToBeSend);
    } else {
      console.log('>>rdy to CREATE NEW', meetingToBeSend);
      this.createMeeting(meetingToBeSend);
    }

    // meetingActionReqToBeSend.map(a => {
    //   a.startDate = this.util.convertAngDateToString(a.startDate);
    //   a.completionDate = this.util.convertAngDateToString(a.completionDate);
    // })
    // if (!this.newMeeting.title || !this.newMeeting.meetingDate) {   // || !this.newMeeting.meetingCategoryId) {
    //   this.errors.push('Please fill in required fields.');
    //   return;
    // }
    // if (this.newMeetingActions.length === 0) {
    //   this.errors.push('Please fill in meeting agenda(s).');
    //   return;
    // }
    // // from newMeetingActions, filter only 'Checked' ones...
    // const newMeetingsChecked = this.newMeetingActions.filter(ma => ma.checked);
    // if (newMeetingsChecked.length === 0) {
    //   this.errors.push('Please check which meeting agenda(s) to be saved.');
    //   return;
    // }
    // // add meeting actions to newMeeting obj
    // this.newMeeting = Object.assign(this.newMeeting, { meetingActions: newMeetingsChecked });
    // console.log(this.newMeeting);
    // console.log('rdy to submit');

    // // when refId found, update existing meeting, else create meeting
    // if (this.newMeeting.referenceId) {
    //   this.updateMeeting(this.newMeeting);
    // } else {
    //   this.createMeeting(this.newMeeting);
    // }
  }

  createMeeting(meeting: Meeting): void {
    this.saving = true;
    this.meetingService.createMeeting(meeting)
      .subscribe({
        next: (response) => {
          this.saving = false;
          console.log('Data saved');
          this._router.navigate(['/user/meetings-list', {}]);
        },
        error: (error) => {
          console.log('Error saving data');
          this.saving = false;
        },
      });
  }

  updateMeeting(meeting: Meeting): void {
    this.saving = true;
    this.meetingService.updateMeeting(meeting)
      .subscribe({
        next: (response) => {
          this.saving = false;
          console.log('Data saved');
          this._router.navigate(['/user/meetings-list', {}]);
        },
        error: (error) => {
          console.log('Error saving data');
          this.saving = false;
        },
      });
  }

  updatedNewActionItem(eventData: any): void {
    console.log('>>>evet', eventData);
    const x = Object.assign({}, this.initMeetingActionRequest, {
      id: -1, // MN meetingActionItemId
      meetingCategoryId: +this.selectedCategoryId,
      name: eventData.name,
      description: eventData.description,
      startDate: { year: this.todayDate.getFullYear(), month: this.todayDate.getMonth() + 1, day: this.todayDate.getDate() },
      checked: true,  // Defalut to true. all actions are checked to goto db, unless uncheck by user
    });
    // console.log(x);
    this.meetingActionRequests.push(x);
    this.modalService.dismissAll();
  }

  // open from template
  openModal(contentAdd: any, id: number, meetingCategoryId: number) {
    if (this.selectedCategoryId === 0) return;
    // this.selectedActionId = +id;
    // this.error = '';
    // if (this.selectedActionId > 0) {
    //   this.meetingCategories.map(c => {
    //     c.meetingActionItems.map(a => {
    //       if (a.id === this.selectedActionId) {
    //         this.selectedActionItem = Object.assign(this.selectedActionItem, a);
    //         return;
    //       }
    //     });
    //   });
    // } else if (this.selectedActionId === -1 && meetingCategoryId > 0) {
    //   this.selectedActionItem = Object.assign({}, this.initActionItem, {
    //     id: id,
    //     meetingCategoryId: meetingCategoryId
    //   });
    // }
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



  // onTitleChange(event: any): void {
  //   this.newMeeting = Object.assign(this.newMeeting, { title: event.target.value });
  // }

  // onDescriptionChange(event: any): void {
  //   this.newMeeting = Object.assign(this.newMeeting, { description: event.target.value });
  // }

  // onMeetingDateChange(event: any): void {
  //   this.newMeeting = Object.assign(this.newMeeting, { meetingDate: event });
  // }

  //onMeetingCategoryChange(event: any): void {
    // const selectedCategoryId = +event.target.value;
    // this.selectedCategoryId = +event.target.value;
    // console.log(this.selectedCategoryId);
    // this.updateTempMeetingsActionRequestList(this.selectedCategoryId);

    // this.meetingActionItems = [];
    // // this.newMeetingActions = [];
    // if (this.selectedCategoryId <= 0) return;

    // this.newMeeting = Object.assign(this.newMeeting, { meetingCategoryId: this.selectedCategoryId });

    // const selectedCategory = this.meetingCategories.find(c => c.id === this.selectedCategoryId);
    // this.meetingActionItems = Object.assign(this.meetingActionItems, selectedCategory.meetingActionItems);
    // // reset controls

    // this.createMeetingsForm.controls['priority'].setValue('');
    // this.createMeetingsForm.controls['owner'].setValue('');
  //}

   //updateMeetingActionArray(actId: number, node: string, value: string): void {
    // console.log('inupdate meetarray', value);
    // var foundIndex = this.meetingActionRequests.findIndex(a => a.id === actId);
    // console.log('>actid', actId, '::', foundIndex);
    // if (foundIndex < 0) {
    //   const x = Object.assign({}, this.initMeetingActionRequest, { meetingCategoryId: this.selectedCategoryId, meetingActionItemId: actId });
    //   x[node] = value;
    //   this.meetingActionRequests.push(x);
    // } else {
    //   this.meetingActionRequests[foundIndex][node] = value;
    // }
    // previous
    // var foundIndex = this.newMeetingActions.findIndex(a => a.meetingActionItemId === actId);
    // if (foundIndex < 0) {
    //   const x = Object.assign({}, this.initMeetingAction, { meetingCategoryId: this.selectedCategoryId, meetingActionItemId: actId });
    //   x[node] = value;
    //   this.newMeetingActions.push(x);
    // } else {
    //   this.newMeetingActions[foundIndex][node] = value;
    // }
  //}

  // onIsActionSelected(event: any, actId: number): void {
  //   this.updateMeetingActionArray(actId, 'checked', event.target.checked);
  // }

  // onStartDateChange(event: any, actId: number): void {
  //   this.updateMeetingActionArray(actId, 'startDate', event);
  // }

  // onCompletionDateChange(event: any, actId: number): void {
  //   this.updateMeetingActionArray(actId, 'completionDate', event);
  // }

  // onOwnerChange(event: any, actId: number): void {
  //   this.updateMeetingActionArray(actId, 'owner', event);
  // }

  // onPriorityChange(event: any, actId: number): void {
  //   // const value = event.target.value;
  //   // // let text = event.target.options[event.target.options.selectedIndex].text
  //   // this.updateMeetingActionArray(actId, 'priority', value);
  // }

      // tempMeetingActionRequestsForUI: MeetingActionRequest[] = [];
  // initMeetingAction = { id: 0, meetingCategoryId: 0, meetingActionItemId: 0, ownerId: 0, startDate: '', completionDate: '', priority: '', checked: false };
  // newMeetingActions: MeetingAction[] = [];

    // createMeetingsForm = new FormGroup({
  //   title: new FormControl(''),
  //   description: new FormControl(''),
  //   meetingDate: new FormControl(''),
  //   meetingCategory: new FormControl(''),
  //   owner: new FormControl(''),
  //   priority: new FormControl('')
  // });

    //updateTempMeetingsActionRequestList(selectedCategoryId: number): void {
    // this.tempMeetingActionRequestsForUI = []; // reset
    // const sel = this.meetingActionRequests.filter(c => c.meetingCategoryId === this.selectedCategoryId);
    // this.tempMeetingActionRequestsForUI = Object.assign(this.tempMeetingActionRequestsForUI, sel);
    // console.log(this.tempMeetingActionRequestsForUI);
  //}


