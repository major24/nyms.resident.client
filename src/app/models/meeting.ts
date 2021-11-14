import { MeetingActionRequest } from './meeting-action-request';

export interface Meeting {
  id: number,
  referenceId: string,
  title: string,
  meetingDate: string,
  ownerId: number,
  status: string,
  meetingActions: MeetingActionRequest[],
}