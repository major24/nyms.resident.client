export class AvgOccupancyReport {
  name: string;
  fundProvider: string;
  numberOfDays: number;
  weeklyFee: number;
  divisionName: string;
}

export class AvgDivisionsOccupancySummary {
  name: string;
  totalStays: number;
  numOfResidents: number;
  avgOccupancy: number;
  avgFee: number;
  totalPayment: number;
}

export class AvgFundProviderSummary {
  name: string;
  numOfResidents: number;
  avgFee: number;
  totalPayment: number;
}