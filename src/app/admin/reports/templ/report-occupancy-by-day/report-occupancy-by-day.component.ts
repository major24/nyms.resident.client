import { Component, OnInit, Input } from '@angular/core';
import { ReportService } from '../../../services/index';
import { OccupancyByDate } from '../../../models/index';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';


@Component({
  selector: 'report-occupancy-by-day',
  templateUrl: './report-occupancy-by-day.component.html',
  styleUrls: ['./report-occupancy-by-day.component.css']
})
export class ReportOccupancyByDayComponent implements OnInit {
  @Input() startDate: any;
  @Input() endDate: any;
  occupancyByDate: OccupancyByDate[] = [];
  loading: boolean = false;
  months = ["Jan", "Feb", "Mar","Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

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
  public barChartLabels: Label[] = [];
  public barChartData: ChartDataSets[] = [];
  // Holder for fund provider chart
  public barChartLabelsFundProviders: Label[] = [];
  public barChartDataFundProviders: ChartDataSets[] = [];

  constructor(private reportService: ReportService) { }

  ngOnInit(): void {
  }

  getReport(): void {
    if (this.startDate === '' || this.endDate === null) {
      throw new console.error('Date not selected');
    }
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
        this.createChartForDivisions(data);
        this.createChartForFundProviders(data);
      },
      error: (error) => {
        console.log('Error getting occupancy by date:', error);
        this.loading = false;
      }
    });
  }

  // parse data for charts
  createChartForDivisions(data: any): void {
    this.barChartLabels.splice(0, this.barChartLabels.length);
    this.barChartData.splice(0, this.barChartData.length);
    // 1) get num of days and X axis labels (jan1, jan2 etc)
    const uniqueLabels = [...new Set(data[0].occupancyCountByDates.map(item => item.thisDate))] as string[];
    let unqLabelsFmtd = uniqueLabels.map(d => {
      const dt = new Date(d);
      return `${this.months[dt.getMonth()]} ${dt.getDate()}`;
    });
    console.log('>>unqLblsFmtd: ', unqLabelsFmtd);
    Object.assign(this.barChartLabels, unqLabelsFmtd);

    data.filter(d => d.groupBy === "Division").map(divi => {
        let occ = divi.occupancyCountByDates.map(dts => dts.totalNumberOfResidents);
        let chartData = { data: occ, label: divi.name, borderColor: this.borderColorsDivision[divi.name], fill: false };
        this.barChartData.push(chartData);
    });
    console.log(this.barChartData);
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
    console.log('>>unqLblsFmtd: ', unqLabelsFmtd);
    Object.assign(this.barChartLabelsFundProviders, unqLabelsFmtd);

    // Add FundProviders to the same graph
    let n = 0; // Color value
    data.filter(d => d.groupBy === "FundProvider").map(fp => {
      let occ = fp.occupancyCountByDates.map(dts => dts.totalNumberOfResidents);
      let chartData = { data: occ, label: fp.name, borderColor: this.borderColorsFundProvider[n], fill: false };
      this.barChartDataFundProviders.push(chartData);
      n++;
    });
    console.log(this.barChartDataFundProviders);
  }

}
