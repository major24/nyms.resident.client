import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { MeetingCategory, MeetingActionItem, Meeting, MeetingActionRequest, MeetingActionPendingJobsResponse, MeetingActionCompletedResponse } from '../../app/models/index';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  constructor(private apiService: ApiService) { }
  // categories and action items (not Actions)
  loadMeetingCategoriesAndActionItems(): Observable<MeetingCategory[]> {
    return this.apiService.loadMeetingCategoriesAndActionItems();
  }

  createMeetingCategory(meetingCategory: MeetingCategory): Observable<MeetingCategory> {
    return this.apiService.createMeetingCategory(meetingCategory);
  }

  // ActionItems Table
  updateMeetingActionItem(meetingActionItem: MeetingActionItem): Observable<MeetingActionItem> {
    return this.apiService.updateMeetingActionItem(meetingActionItem);
  }

  insertMeetingActionItem(meetingActionItem: MeetingActionItem): Observable<MeetingActionItem> {
    return this.apiService.insertMeetingActionItem(meetingActionItem);
  }

  // Actions for owners
  updateMeetingAction(meetingAction: MeetingActionRequest): Observable<MeetingActionRequest> {
    return this.apiService.updateMeetingAction(meetingAction);
  }

  loadMeetings(): Observable<Meeting[]> {
    return this.apiService.loadMeetings();
  }

  loadMeeting(referenceId: string): Observable<Meeting> {
    return this.apiService.loadMeeting(referenceId);
  }

  createMeeting(meeting: Meeting): Observable<Meeting> {
    return this.apiService.createMeeting(meeting);
  }

  updateMeeting(meeting: Meeting): Observable<Meeting> {
    return this.apiService.updateMeeting(meeting);
  }

  // Actions / Pending, completed, audited etc..
  loadPendingActions(): Observable<MeetingActionPendingJobsResponse[]> {
    return this.apiService.loadPendingActions();
  }

  loadPendingActionsByOwnerId(userRefId: string): Observable<MeetingActionPendingJobsResponse[]> {
    return this.apiService.loadPendingActionsByOwnerId(userRefId);
  }

  updateActionCompleted(selectedAction: any): Observable<any> {
    return this.apiService.updateActionCompleted(selectedAction);
  }

  loadCompletedActions(): Observable<MeetingActionCompletedResponse[]> {
    return this.apiService.loadCompletedActions();
  }

  updateActionAudited(selectedAction: any): Observable<any> {
    return this.apiService.updateActionAudited(selectedAction);
  }

}
