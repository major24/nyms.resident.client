import { Component, OnInit, Input } from '@angular/core';
import { InvoiceResident, AvgOccupancyReport, AvgDivisionsOccupancySummary, AvgFundProviderSummary } from '../../../models/index';

@Component({
  selector: 'summary-info',
  templateUrl: './summary-info.component.html',
  styleUrls: ['./summary-info.component.css']
})
export class SummaryInfoComponent implements OnInit {
  @Input() invoices: InvoiceResident[] = [];
  @Input() startDate: string = '';
  @Input() endDate: string = '';
  // local fields to hold dates
  _startDateNum: number;
  _endDateNum: number;
  _avgOccupancyReport: AvgOccupancyReport[] = [];
  // ---- ave occupancy fields -------
  _numOfReportDays: number = 0;
  _totalNumberOfResidentStays: number = 0;
  _averageOccupancy: number = 0;
  //-----------------------------------
  _uniqueDivisionNames: string[] = [];
  _uniqueFundProviders: string[] = [];

  _avgDivisionsOccupancySummary: AvgDivisionsOccupancySummary[] = [];
  _avgFundProviderSummary: AvgFundProviderSummary[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: any): void {
    if (changes.startDate) {
      this._startDateNum = Date.parse(changes.startDate.currentValue);
    }
    if (changes.endDate){
      this._endDateNum = Date.parse(changes.endDate.currentValue);
    }
    if (isNaN(this._endDateNum) === false && isNaN(this._startDateNum) === false) {
      this._numOfReportDays = (this._endDateNum - this._startDateNum) / (1000*3600*24) + 1;
    }

    if (changes.invoices && changes.invoices.currentValue.length > 0) {
      const _data = changes.invoices.currentValue;
      console.log('ngOnChg-ReportSummary ', _data);
      // clear arrays
      this._avgOccupancyReport = [];
      this._uniqueDivisionNames = [];
      this._uniqueFundProviders = [];
      this._avgDivisionsOccupancySummary = [];
      this._avgFundProviderSummary = [];

      _data.map((inv) => {
        // prepare main table data
        if (inv.schedulePayments && inv.schedulePayments.length > 0) {
          let sumOfNumOfDays: number = 0;
          // get uniq number of stays and add them together
          const uniqueNumberOfStays = [...new Set(inv.schedulePayments.map(item => item.numberOfDays))];
          if (this.isNumberArray(uniqueNumberOfStays)) {
            sumOfNumOfDays = uniqueNumberOfStays.reduce((a, b) => a + b, 0);
          }

          let _avgOccRpt: AvgOccupancyReport = {
            name: inv.name,
            fundProvider: inv.localAuthorityName,
            numberOfDays: sumOfNumOfDays,
            weeklyFee: inv.residentWeeklyFee,
            divisionName: inv.careHomeDivisionName
          }
          this._avgOccupancyReport.push(_avgOccRpt);
        }
      });

      // extract unique division names and providers, so we can iterate in ui
      this._uniqueDivisionNames = [...new Set(this._avgOccupancyReport.map(item => item.divisionName))];
      this._uniqueFundProviders = [...new Set(this._avgOccupancyReport.map(item => item.fundProvider))];
      console.log('uniqDivs', this._uniqueDivisionNames);
      console.log('uniqFundP', this._uniqueFundProviders);
      // prepare summary
      this.prepareAverageOccupancy();
      this.prepareDivisionSummary();
      this.prepareFundProviderSummary();
    }
  } // ngOnchanges..

  // prepare summaries
  prepareAverageOccupancy(): void {
    // Find Average Occupancy
    this._avgOccupancyReport.map((r) => {
      this._totalNumberOfResidentStays += r.numberOfDays
    });
    this._averageOccupancy = this._totalNumberOfResidentStays / this._numOfReportDays;
  }

  prepareDivisionSummary(): void {
    this._uniqueDivisionNames.map(divName => {
      let tmpTtl = 0;
      let tmpFee = 0;
      let tmpNumRes = 0;
      this._avgOccupancyReport.filter(r => r.divisionName === divName).map(rbyDiv => {
        tmpTtl += rbyDiv.numberOfDays;
        tmpFee += rbyDiv.weeklyFee;
        tmpNumRes++;
      });

      let divisionSummary:  AvgDivisionsOccupancySummary = {
        name: divName,
        totalStays: tmpTtl,
        numOfResidents: tmpNumRes,
        avgOccupancy: tmpTtl / this._numOfReportDays,
        avgFee: tmpFee / tmpNumRes
      };
      this._avgDivisionsOccupancySummary.push(divisionSummary);
    });

    // Once the division summary is done, do a full summary for ALL div (i.e.CareHome)
    let tmpTtl = 0;
    let tmpFee = 0;
    let tmpNumRes = 0;
    this._avgOccupancyReport.map(data => {
      tmpTtl += data.numberOfDays;
      tmpFee += data.weeklyFee;
      tmpNumRes++;
    });
    let summary:  AvgDivisionsOccupancySummary = {
      name: 'Pennine Care Centre',  // HARD code for now
      totalStays: tmpTtl,
      numOfResidents: tmpNumRes,
      avgOccupancy: tmpTtl / this._numOfReportDays,
      avgFee: tmpFee / tmpNumRes
    };
    this._avgDivisionsOccupancySummary.push(summary);
    console.log('>>DivSummary', this._avgDivisionsOccupancySummary);
  }

  prepareFundProviderSummary(): void {
    this._uniqueFundProviders.map(provName => {
      let tmpTtl = 0;
      let tmpFee = 0;
      let tmpNumRes = 0;
      this._avgOccupancyReport.filter(r => r.fundProvider === provName).map(rbyProv => {
        tmpTtl += rbyProv.numberOfDays;
        tmpFee += rbyProv.weeklyFee;
        tmpNumRes++;
      });
      let fundProvSummary: AvgFundProviderSummary = {
        name: provName,
        numOfResidents: tmpNumRes,
        avgFee: tmpFee / tmpNumRes
      };
      this._avgFundProviderSummary.push(fundProvSummary);
    });
    console.log('>>fundProvSummary', this._avgFundProviderSummary);
  }



  isNumberArray(value: unknown): value is number[] {
    return (
      Array.isArray(value) &&
      value.every(element => typeof element === "number")
    );
  }

}
