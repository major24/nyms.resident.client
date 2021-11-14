import { MeetingActionItem } from './meeting-action-item';

export interface MeetingCategory {
  id: number,
  name: string,
  meetingActionItems: MeetingActionItem[]
}