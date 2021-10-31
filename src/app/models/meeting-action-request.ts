export interface MeetingActionRequest {
  id: number,
  // meetingId: number,
  meetingCategoryId: number,
  meetingActionItemId: number,
  ownerId: number,
  startDate: string,
  completionDate: string,
  priority: string,
  isAdhoc: boolean,
  checked: boolean,
  name: string,
  description: string,
  frequency: string,
  repetition: number
}