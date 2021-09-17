export interface MeetingActionRequest {
  id: number,
  // meetingId: number,
  meetingCategoryId: number,
  meetingActionItemId: number,
  ownerId: number,
  startDate: string,
  completionDate: string,
  priority: string,
  isAdhoc: string,
  checked: boolean,
  name: string,
  description: string
}