import { Component, OnInit, Input } from '@angular/core';
import { ReportService } from '../../../services/index';
import { OccupancyByDate, AvgOccupancyReport } from '../../../models/index';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';

export interface PrintData {
  "name": string,
  "thisDate": any,
  "occupancyCount": number
}

@Component({
  selector: 'report-occupancy-by-day',
  templateUrl: './report-occupancy-by-day.component.html',
  styleUrls: ['./report-occupancy-by-day.component.css']
})
export class ReportOccupancyByDayComponent implements OnInit {
  months = ["Jan", "Feb", "Mar","Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  @Input() startDate: any;
  @Input() endDate: any;
  occupancyByDate: OccupancyByDate[] = [];
  loading: boolean = false;
  avgOccupancyReport: AvgOccupancyReport[] = [];
  printData: PrintData[] = [];
  showData: boolean = false;

  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true, fontColor: 'blue',
        }
      }]
    }
  }
  public barChartType: ChartType = 'line';
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartColors: Color[] = [
    { backgroundColor: '#79bef2' },
    { backgroundColor: 'green' },
  ]
  borderColorsDivision = {
    'Pennine': '#79ccf2',
    'Moorland': '#c7aa65',
    'Kirkland': '#c5dd65'
  }
  borderColorsFundProvider = {
    0: '#71ddf2',
    1: '#c6aa65',
    2: '#c1ee60',
    3: '#b2aa62',
    4: '#c5d155',
    5: '#c3bb20'
  }

  // Holder for occupancy chart
  public barChartLabelsDivisions: Label[] = [];
  public barChartDataDivisions: ChartDataSets[] = [];
  // Holder for fund provider chart
  public barChartLabelsFundProviders: Label[] = [];
  public barChartDataFundProviders: ChartDataSets[] = [];

  constructor(private reportService: ReportService) { }

  ngOnInit(): void {
  }

  getReport(): void {
    this.loadOccupancyByDate(this.startDate, this.endDate);
  }

  loadOccupancyByDate(startDate: string, endDate: string): void {
    this.occupancyByDate.splice(0, this.occupancyByDate.length);
    this.loading = true;
    this.reportService.loadOccupancyByDate(startDate, endDate)
    .subscribe({
      next: (data) => {
        console.log('>>>Occupancy: ', data);
        this.occupancyByDate = Object.assign(this.occupancyByDate, [...data]);
        this.loading = false;
        // even dates is incorret, some data arrives. but [occupancyCountByDates] is empty array
        // ensure it had data before calling chart processors..
        if (this.occupancyByDate && this.occupancyByDate.length > 0) {
          if (this.occupancyByDate[0].occupancyCountByDates.length > 0) {
            this.createChartForDivisions(data);
            this.createChartForFundProviders(data);
            this.createPrintDataForDivisions(data);
          }
        }
      },
      error: (error) => {
        console.log('Error getting occupancy by date:', error);
        this.loading = false;
      }
    });
  }

  // parse data for charts
  createChartForDivisions(data: any): void {
    this.barChartLabelsDivisions.splice(0, this.barChartLabelsDivisions.length);
    this.barChartDataDivisions.splice(0, this.barChartDataDivisions.length);
    this.avgOccupancyReport.splice(0, this.avgOccupancyReport.length);

    // 1) get num of days and X axis labels (jan1, jan2 etc)
    const uniqueLabels = [...new Set(data[0].occupancyCountByDates.map(item => item.thisDate))] as string[];
    let unqLabelsFmtd = uniqueLabels.map(d => {
      const dt = new Date(d);
      return `${this.months[dt.getMonth()]} ${dt.getDate()}`;
    });
    console.log('>>unqLblsFmtd: ', unqLabelsFmtd);
    Object.assign(this.barChartLabelsDivisions, unqLabelsFmtd);

    data.filter(d => d.groupBy === "Division").map(divi => {
        let occ = divi.occupancyCountByDates.map(dts => dts.totalNumberOfResidents);
        let chartData = { data: occ, label: divi.name, borderColor: this.borderColorsDivision[divi.name], fill: false };
        this.barChartDataDivisions.push(chartData);
    });
    console.log(this.barChartDataDivisions);

    // calculate average occupancy for the period
    // barChartDataDivision contains all divisions and data. get it from there
    this.barChartDataDivisions.map(bc => {
      const data = bc.data as Array<number>;
      const sum = data.reduce((sum, x) => sum + x);
      const avgOcc: AvgOccupancyReport = {
        name: bc.label,
        averageOccupancy: sum / data.length,
      };
      this.avgOccupancyReport.push(avgOcc);
    });
  }


  createPrintDataForDivisions(data: any): void {
    console.log('>>Groupby by division');
    this.printData.splice(0, this.printData.length);
    const diviData = data.filter(d => d.groupBy === "Division");
    // above creates multiple arrays. hard to resolve counts.
    // get occupancy data for each divisions into a single array
    diviData.map(d =>{
      const name = d.name;
      d.occupancyCountByDates.map(dts => {
        let prtData: PrintData = {
          name: name,
          thisDate: dts.thisDate,
          occupancyCount: dts.totalNumberOfResidents
        };
        this.printData.push(prtData);
      });
    });
    // console.log(temp);

    // To get all divisions by date, need to group by
    let temp: any[] = [];
    diviData.map(d =>{
      d.occupancyCountByDates.map(dts => {
        let prtData: any = {
          thisDate: dts.thisDate,
          occupancyCount: dts.totalNumberOfResidents
        };
        temp.push(prtData);
      });
    });
    // this will group by date
    const allDivisionsByDate = this.groupArrayOfObjects(temp, "thisDate");
    // console.log(allDivisionsByDate);

    // once grouped, add then to printData with 'Pennine Care Centre'
    // key = date , value is dates and counts grouped by date
    for (const [key, value] of Object.entries(allDivisionsByDate)) {
      const data = value as Array<any>; // convert to array. angular forces me to do so
      let sum = 0;
      data.map(v => sum += v.occupancyCount);
      let prtData: PrintData = {
        name: "Pennine Care Centre",
        thisDate: key,
        occupancyCount: sum
      };
      this.printData.push(prtData);
    }

    console.log(this.printData);
  }


  createChartForFundProviders(data: any): void {
    this.barChartLabelsFundProviders.splice(0, this.barChartLabelsFundProviders.length);
    this.barChartDataFundProviders.splice(0, this.barChartDataFundProviders.length);
    // 1) get num of days and X axis labels (jan1, jan2 etc)
    const uniqueLabels = [...new Set(data[0].occupancyCountByDates.map(item => item.thisDate))] as string[];
    let unqLabelsFmtd = uniqueLabels.map(d => {
      const dt = new Date(d);
      return `${this.months[dt.getMonth()]} ${dt.getDate()}`;
    });
    // console.log('>>unqLblsFmtd: ', unqLabelsFmtd);
    Object.assign(this.barChartLabelsFundProviders, unqLabelsFmtd);

    // Add FundProviders to the same graph
    let n = 0; // Color value
    data.filter(d => d.groupBy === "FundProvider").map(fp => {
      let occ = fp.occupancyCountByDates.map(dts => dts.totalNumberOfResidents);
      let chartData = { data: occ, label: fp.name, borderColor: this.borderColorsFundProvider[n], fill: false };
      this.barChartDataFundProviders.push(chartData);
      n++;
    });
    // console.log(this.barChartDataFundProviders);
  }

  toggleData(): void {
    this.showData = !this.showData;
  }

  groupArrayOfObjects(list, key) {
    return list.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

}
