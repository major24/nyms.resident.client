export interface MeetingActionCompletedResponse {
  id: number,
  name: string,
  description: string,
  ownerId: number,
  completionDate: string,
  priority: string,
  forename: string,
  categoryName: string,
  completed: string,
  completedById: number,
  completedByName: string,
  completedDate: string,
  comment: string
}
