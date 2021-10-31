import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { MeetingCategory, MeetingActionItem, Meeting } from '../../app/models/index';

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

  updateMeetingActionItem(meetingActionItem: MeetingActionItem): Observable<MeetingActionItem> {
    return this.apiService.updateMeetingActionItem(meetingActionItem);
  }

  insertMeetingActionItem(meetingActionItem: MeetingActionItem): Observable<MeetingActionItem> {
    return this.apiService.insertMeetingActionItem(meetingActionItem);
  }


  // loadMeetingCategoriesAndActionItems(): Observable<MeetingCategory[]> {
  //   return this.apiService.loadMeetingCategoriesAndActionItems();
  // }
  // updateMeetingCategory(meetingCategory: MeetingCategory): Observable<MeetingCategory> {
  //   return this.apiService.updateMeetingCategory(meetingCategory);
  // }
  // createMeetingActionItem(meetingActionItem: MeetingActionItem): Observable<MeetingActionItem> {
  //   return this.apiService.createMeetingActionItem(meetingActionItem);
  // }
  // updateMeetingActionItems(meetingActionItem: MeetingActionItem): Observable<MeetingActionItem> {
  //   return this.apiService.updateMeetingAgenda(meetingActionItem);
  // }


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

}
