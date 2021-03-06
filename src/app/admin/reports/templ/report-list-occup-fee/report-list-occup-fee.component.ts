import { Component, OnInit, Input } from '@angular/core';
import { InvoiceResident, AvgOccupancyReport } from '../../../models/index';

@Component({
  selector: 'report-list-occup-fee',
  templateUrl: './report-list-occup-fee.component.html',
  styleUrls: ['./report-list-occup-fee.component.css']
})
export class ReportListOccupFeeComponent implements OnInit {
  @Input() invoices: InvoiceResident[] = [];
  _avgOccupancyReport: AvgOccupancyReport[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: any): void {
    if (changes.invoices && changes.invoices.currentValue.length > 0) {
      const _data = changes.invoices.currentValue;
      console.log('ngOnChg-ReportList ', _data);
      this._avgOccupancyReport = [];
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
    }
  } // ngOnchanges..



  isNumberArray(value: unknown): value is number[] {
    return (
      Array.isArray(value) &&
      value.every(element => typeof element === "number")
    );
  }

}
