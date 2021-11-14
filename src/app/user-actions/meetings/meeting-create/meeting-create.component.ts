import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { MeetingCategory, MeetingActionRequest, Meeting, MeetingActionItem, CareHomeUser } from '../../../../../src/app/models/index';
import { MeetingService } from '../../../../app/services/meeting.service';
import { UserService } from '../../../../app/services/user.service';
import { Util } from '../../../helpers/';

@Component({
  selector: 'meeting-create',
  templateUrl: './meeting-create.component.html',
  styleUrls: ['./meeting-create.component.css']
})
export class MeetingCreateComponent implements OnInit {
  loading: boolean = false;
  saving: boolean = false;
  errors: string[] = [];
  closeResult = '';
  ROLE_ID_MEETING_ACTION_OWNERS: number = 5; // 5 = Action Owners Role
  showCreateMeeting: boolean = false;
  selectedCategoryId: number = 0;
  selectedCategoryName: string = '';
  meetingCategories: MeetingCategory[] = [];
  // For add new meetings: As soon as the categories and act items fetched
  // convert them to Actions array. Use this arr show on UI, add new items etc and send it back to server...
  meetingActionRequests: MeetingActionRequest[] = [];
  initMeetingActionRequest: MeetingActionRequest = { id: 0, meetingCategoryId: 0, meetingActionItemId: 0, ownerId: 0, startDate: '', completionDate: '', priority: '', completed: '', isAdhoc: false, checked: false, name: '', description: '', frequency: '', repetitive: 0 }
  newMeeting: Meeting = { id: 0, referenceId: '', title: '', meetingDate: '', ownerId: 0, status: '', meetingActions: [] }
  selectedActionItem: MeetingActionItem = { id: 0, meetingCategoryId: 0, name: '', description: '', isAdhoc: false };

  todayDate: any = new Date();
  actionOwners: CareHomeUser[] = [];

  constructor(private meetingService: MeetingService,
    private readonly util: Util,
    private _router: Router,
    private userService: UserService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.loadUsersByRoleId(this.ROLE_ID_MEETING_ACTION_OWNERS);
    setTimeout(() => {
      this.loadMeetingCategoriesAndActionItems();
    }, 5); // Give little time to load Owners
    this.newMeeting = Object.assign(this.newMeeting, { meetingDate: { year: this.todayDate.getFullYear(), month: this.todayDate.getMonth() + 1, day: this.todayDate.getDate() } })
  }

  loadUsersByRoleId(roleId: number): void {
    this.loading = true;
    this.userService.loadUsersByRoleId(roleId)
      .subscribe({
        next: (data) => {
          Object.assign(this.actionOwners, data);
          console.log('loaded users (action owners):', this.actionOwners);
          this.loading = false;
        },
        error: (error) => {
          console.log('Error fetching meeting by refid ', error);
          this.loading = false;
        }
    });
  }

  loadMeetingCategoriesAndActionItems(): void {
    this.loading = true;
    this.meetingService.loadMeetingCategoriesAndActionItems()
      .subscribe({
        next: (data) => {
          Object.assign(this.meetingCategories, [...data]);
          console.log('loaded cats:', this.meetingCategories);
          this.loading = false;
        },
        error: (error) => {
          console.log('Error fetching meeting categories ', error);
          this.loading = false;
        }
      });
  }

  goDisplaySelectedCategory(): void {
    if (+this.selectedCategoryId === 0) return;

    this.showCreateMeeting = true;
    this.initializeMeetingActionRequestsList(this.meetingCategories);
    this.selectedCategoryName = this.meetingCategories.filter(c => c.id === +this.selectedCategoryId)[0].name;
  }

  initializeMeetingActionRequestsList(categories: MeetingCategory[]): void {
    this.meetingActionRequests = [];
    categories.filter(c => c.id === +this.selectedCategoryId).map(c => {
      c.meetingActionItems.map(a => {
        const x = Object.assign({}, this.initMeetingActionRequest, {
          id: -1,
          meetingCategoryId: a.meetingCategoryId,
          meetingActionItemId: a.id,
          name: a.name,
          description: a.description,
          startDate: { year: this.todayDate.getFullYear(), month: this.todayDate.getMonth() + 1, day: this.todayDate.getDate() },
          checked: true,  // Defalut to true. all actions are checked to goto db, unless uncheck by user
        });
        this.meetingActionRequests.push(x);
      });
    });
  }

  addNewActionItemToList(eventData: any): void {
    const x = Object.assign({}, this.initMeetingActionRequest, {
      id: -1,
      meetingCategoryId: +this.selectedCategoryId,
      name: eventData.name,
      description: eventData.description,
      startDate: { year: this.todayDate.getFullYear(), month: this.todayDate.getMonth() + 1, day: this.todayDate.getDate() },
      isAdhoc: eventData.isAdhoc,
      checked: true,  // Defalut to true. all actions are checked to goto db, unless uncheck by user
    });
    this.meetingActionRequests.push(x);
    this.modalService.dismissAll();
  }


  onCancel(): void {
    this._router.navigate(['/user/meetings-list', {}]);
  }

  onSubmit(): void {
    let meetingActionReqToBeSend: MeetingActionRequest[] = [];

    const meetingToBeSend = Object.assign({}, this.newMeeting);
    meetingToBeSend.meetingDate = this.util.convertAngDateToString(meetingToBeSend.meetingDate);

    this.meetingActionRequests.filter(a => a.checked === true) // take only checked ones..
      .map(a => {
        const x = Object.assign({}, a);
        x.startDate = this.util.convertAngDateToString(a.startDate);
        x.completionDate = this.util.convertAngDateToString(a.completionDate);
        meetingActionReqToBeSend.push(x);
      });

    meetingToBeSend.meetingActions = meetingActionReqToBeSend;

    if (!this.validateMeetingRequest(meetingToBeSend)) {
      return;
    }

    console.log('>>rdy to submit', meetingToBeSend);

    this.saving = true;
    this.meetingService.createMeeting(meetingToBeSend)
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

  validateMeetingRequest(meetingRequest: Meeting): boolean {
    this.errors = [];
    if (!meetingRequest.title) {
      this.errors.push('Meeting title is required.');
    }
    // validate atleast one item is checked?
    if (meetingRequest.meetingActions.length <= 0) {
      this.errors.push('Atleast one action item to be checked before submitting.');
    }
    // if NEW ACTION is added, validate act.name is submitted?
    const newItemsWithMissingNames = meetingRequest.meetingActions.filter(a => a.id === -1 && a.name === '');
    if (newItemsWithMissingNames.length > 0) {
      this.errors.push('Newly added action items should have a name.');
    }
    // ensure completion date is included
    meetingRequest.meetingActions.map(a => {
      if (!a.completionDate) {
        this.errors.push('Completion date is required');
      }
    });

    // if completion date added, then ensure the date is later than start date.
    meetingRequest.meetingActions.map(a => {
      let stDate = (a.startDate != '') ? new Date(a.startDate) : '';
      let compDate = (a.completionDate != '') ? new Date(a.completionDate) : '';
      if (stDate && compDate) {
        if (compDate < stDate) {
          this.errors.push(`Incorrect dates selected for "${a.name}"`);
        }
      }
    });

    return this.errors.length === 0 ? true : false;
  }



  // open from template
  openModal(contentAdd: any, id: number, meetingCategoryId: number) {
    if (+this.selectedCategoryId === 0) return;

    this.selectedActionItem = Object.assign(this.selectedActionItem, this.selectedActionItem, {
      name: '', description: '', isAdhoc: false
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
