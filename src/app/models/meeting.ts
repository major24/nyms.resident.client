import { MeetingActionRequest } from './meeting-action-request';

export interface Meeting {
  id: number,
  referenceId: string,
  // meetingCategoryId: number,
  title: string,
  // description: string,
  meetingDate: string,
  ownerId: number,
  status: string,
  meetingActions: MeetingActionRequest[],
  // deletedIds: number[]
}