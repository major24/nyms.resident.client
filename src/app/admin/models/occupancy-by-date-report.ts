export interface OccupancyCountByDates {
  thisDate: string,
  totalNumberOfResidents: number
}

export interface OccupancyByDate {
  groupBy: string,
  name: string,
  lettableRooms: string
  occupancyCountByDates: OccupancyCountByDates[];
}
