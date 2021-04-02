import { Component, OnInit, ViewChild } from '@angular/core';
import { FileService } from '../../../services/index';
import { saveAs } from 'file-saver';

import { ReportOccupancyByDayComponent } from '../templ/report-occupancy-by-day/report-occupancy-by-day.component';
import { ReportListComponent } from '../templ/report-list/report-list.component';
import { ReportValidatedUnvalidatedComponent } from '../templ/report-validated-unvalidated/report-validated-unvalidated.component';
import { SummaryInfoComponent } from '../templ/summary-info/summary-info.component';

@Component({
  selector: 'report-by-date-range',
  templateUrl: './report-by-date-range.component.html',
  styleUrls: ['./report-by-date-range.component.css']
})
export class ReportByDateRangeComponent implements OnInit {
  startDate: string;
  endDate: string;
  downloading: boolean = false;
  reportSelector: string = "1";

  // view child -  req to trigger getReport event
  @ViewChild(ReportOccupancyByDayComponent)
  private reportOccupancyByDayComponent: ReportOccupancyByDayComponent;
  @ViewChild(ReportListComponent)
  private reportListComponent: ReportListComponent;
  @ViewChild(ReportValidatedUnvalidatedComponent)
  private reportValidatedUnvalidatedComponent: ReportValidatedUnvalidatedComponent;
  @ViewChild(SummaryInfoComponent)
  private summaryInfoComponent: SummaryInfoComponent;

  constructor(private fileService: FileService) { }

  ngOnInit(): void {
  }

  onStartDateSelectEvent(event: any): void {
    this.startDate = event;
  }
  onEndDateSelectEvent(event: any): void {
    this.endDate = event;
  }

  getReport(): void {
    if (this.startDate && this.endDate){
      // 1=summary, 2=avg occupancy, 3=validations, 4=Occupancy by Day
      switch(this.reportSelector) {
        case "1":
          this.summaryInfoComponent.getReport();
          this.reportListComponent.getReport();
          break;
        case "2":
          break;
        case "3":
          this.reportValidatedUnvalidatedComponent.getReport();
          break;
        case "4":
          this.reportOccupancyByDayComponent.getReport();
          break;
        default:
          break;
      }
    }
  }

  downloadReport(): void {
    // const url = `/api/reports/invoices/summary/2020-09-01/2020-09-10/download`;
    if (this.startDate === '' || this.endDate === null) {
      throw new console.error('Date not selected');
    }
    this.downloading = true;
    this.fileService.downloadFile(this.startDate, this.endDate).subscribe(response => {
      saveAs(response, `invoice-${this.startDate}-${this.endDate}.csv`);
      this.downloading = false;
		}), error => console.log('Error downloading the file'),
    () => console.info('File downloaded successfully');
  }

  reportSelectorChanged(event: any): void {
    this.reportSelector = event.target.value;
  }

}
