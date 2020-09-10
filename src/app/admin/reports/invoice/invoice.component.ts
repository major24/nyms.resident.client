import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { InvoiceService } from '../../services/index';
import { Invoice } from '../../models/index';
import { BehaviorSubject, Observable } from 'rxjs';
import { KeyPair } from '../../../models/index';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  invoiceForm = new FormGroup({
    // billingStartDate: new FormControl(''),
    billingStartDate: new FormControl('', [Validators.required]),
    billingEndDate: new FormControl('', [Validators.required]),
    localAuthority: new FormControl('')
  });

  billingStart: string;
  billingEnd: string;


  summaryTotalLaDarby: number = 0;
  summaryTotalLaManchester: number = 0;
  summaryTotalLaTameside: number = 0;
  summaryTotalCC: number = 0;
  summaryTotalPrivate: number = 0;

  private _invoices: BehaviorSubject<Invoice[]> = new BehaviorSubject<Invoice[]>([]);
  public invoices$ = this._invoices.asObservable();
  rawInvoices: Invoice[] = [];
  invoices: Invoice[] = [];
  /*  {
        "id": 0,
        "name": "Andrew Wardhaugh",
        "totalLaFee": 2083.12,
        "residentWeeklyFee": 560.84,
        "grandTotal": 2083.12,
        "localAuthorityId": 3,
        "schedules": [
            {
                "residentId": 97,
                "localAuthorityId": 3,
                "paymentTypeId": 1,
                "paymentFrom": "LA",
                "paymentFromName": "Tameside Metropolitan Borough Council",
                "description": "LA Weekly Fee",
                "scheduleBeginDate": "2020-04-29T00:00:00",
                "scheduleEndDate": "9999-12-31T00:00:00",
                "weeklyFee": 560.84,
                "amountDue": 2083.12
            }
        ]
    },
    {
        "id": 0,
        "name": "Anthony Mardell",
        "totalLaFee": 2142.21,
        "residentWeeklyFee": 576.75,
        "grandTotal": 2142.21,
        "localAuthorityId": 3,
        "schedules": [
            {
                "residentId": 95,
                "localAuthorityId": 3,
                "paymentTypeId": 1,
                "paymentFrom": "LA",
                "paymentFromName": "Tameside Metropolitan Borough Council",
                "description": "LA Weekly Fee",
                "scheduleBeginDate": "2020-04-29T00:00:00",
                "scheduleEndDate": "9999-12-31T00:00:00",
                "weeklyFee": 576.75,
                "amountDue": 2142.21
            }
        ]
    },
    {
        "id": 0,
        "name": "Bernard Watson",
        "totalLaFee": 2387.32,
        "residentWeeklyFee": 586.39,
        "grandTotal": 2387.32,
        "localAuthorityId": 2,
        "schedules": [
            {
                "residentId": 85,
                "localAuthorityId": 2,
                "paymentTypeId": 1,
                "paymentFrom": "LA",
                "paymentFromName": "Manchester City Council",
                "description": "LA Weekly Fee",
                "scheduleBeginDate": "2020-04-29T00:00:00",
                "scheduleEndDate": "9999-12-31T00:00:00",
                "weeklyFee": 586.39,
                "amountDue": 2178.02
            },
            {
                "residentId": 85,
                "localAuthorityId": 2,
                "paymentTypeId": 4,
                "paymentFrom": "LA",
                "paymentFromName": "Manchester City Council",
                "description": "Covid Supplement",
                "scheduleBeginDate": "2020-04-29T00:00:00",
                "scheduleEndDate": "9999-12-31T00:00:00",
                "weeklyFee": 56.35,
                "amountDue": 209.30
            }
        ]
    },
    {
        "id": 0,
        "name": "Brian Hampson",
        "totalLaFee": 2387.32,
        "residentWeeklyFee": 586.39,
        "grandTotal": 2387.32,
        "localAuthorityId": 2,
        "schedules": [
            {
                "residentId": 65,
                "localAuthorityId": 2,
                "paymentTypeId": 1,
                "paymentFrom": "LA",
                "paymentFromName": "Manchester City Council",
                "description": "LA Weekly Fee",
                "scheduleBeginDate": "2020-04-29T00:00:00",
                "scheduleEndDate": "2020-06-18T00:00:00",
                "weeklyFee": 586.39,
                "amountDue": 2178.02
            },
            {
                "residentId": 65,
                "localAuthorityId": 2,
                "paymentTypeId": 4,
                "paymentFrom": "LA",
                "paymentFromName": "Manchester City Council",
                "description": "Covid Supplement",
                "scheduleBeginDate": "2020-04-29T00:00:00",
                "scheduleEndDate": "2020-06-18T00:00:00",
                "weeklyFee": 56.35,
                "amountDue": 209.30
            }
        ]
    },
    {
        "id": 0,
        "name": "Colin Barrowcliffe",
        "totalLaFee": 2083.12,
        "residentWeeklyFee": 560.84,
        "grandTotal": 2083.12,
        "localAuthorityId": 3,
        "schedules": [
            {
                "residentId": 89,
                "localAuthorityId": 3,
                "paymentTypeId": 1,
                "paymentFrom": "LA",
                "paymentFromName": "Tameside Metropolitan Borough Council",
                "description": "LA Weekly Fee",
                "scheduleBeginDate": "2020-04-29T00:00:00",
                "scheduleEndDate": "9999-12-31T00:00:00",
                "weeklyFee": 560.84,
                "amountDue": 2083.12
            }
        ]
    },
    {
        "id": 0,
        "name": "Colin Gill",
        "totalLaFee": 2387.32,
        "residentWeeklyFee": 586.39,
        "grandTotal": 2387.32,
        "localAuthorityId": 1,
        "schedules": [
            {
                "residentId": 59,
                "localAuthorityId": 1,
                "paymentTypeId": 1,
                "paymentFrom": "LA",
                "paymentFromName": "Derbyshire County Council",
                "description": "LA Weekly Fee",
                "scheduleBeginDate": "2020-04-29T00:00:00",
                "scheduleEndDate": "9999-12-31T00:00:00",
                "weeklyFee": 586.39,
                "amountDue": 2178.02
            },
            {
                "residentId": 59,
                "localAuthorityId": 1,
                "paymentTypeId": 4,
                "paymentFrom": "LA",
                "paymentFromName": "Derbyshire County Council",
                "description": "Covid Supplement",
                "scheduleBeginDate": "2020-04-29T00:00:00",
                "scheduleEndDate": "9999-12-31T00:00:00",
                "weeklyFee": 56.35,
                "amountDue": 209.30
            }
        ]
    },
    {
        "id": 0,
        "name": "Danny Greenough",
        "totalLaFee": 1703.48,
        "residentWeeklyFee": 586.39,
        "grandTotal": 2387.32,
        "localAuthorityId": 1,
        "schedules": [
            {
                "residentId": 63,
                "localAuthorityId": 1,
                "paymentTypeId": 1,
                "paymentFrom": "LA",
                "paymentFromName": "Derbyshire County Council",
                "description": "LA Weekly Fee",
                "scheduleBeginDate": "2020-04-29T00:00:00",
                "scheduleEndDate": "9999-12-31T00:00:00",
                "weeklyFee": 402.28,
                "amountDue": 1494.18
            },
            {
                "residentId": 63,
                "localAuthorityId": 1,
                "paymentTypeId": 2,
                "paymentFrom": "CC",
                "paymentFromName": "Derbyshire County Council",
                "description": "CC Weekly Fee",
                "scheduleBeginDate": "2020-04-29T00:00:00",
                "scheduleEndDate": "9999-12-31T00:00:00",
                "weeklyFee": 184.11,
                "amountDue": 683.84
            },
            {
                "residentId": 63,
                "localAuthorityId": 1,
                "paymentTypeId": 4,
                "paymentFrom": "LA",
                "paymentFromName": "Derbyshire County Council",
                "description": "Covid Supplement",
                "scheduleBeginDate": "2020-04-29T00:00:00",
                "scheduleEndDate": "9999-12-31T00:00:00",
                "weeklyFee": 56.35,
                "amountDue": 209.30
            }
        ]
    },
    {
        "id": 0,
        "name": "Denise Wilman",
        "totalLaFee": 2066.93,
        "residentWeeklyFee": 586.39,
        "grandTotal": 2387.32,
        "localAuthorityId": 1,
        "schedules": [
            {
                "residentId": 87,
                "localAuthorityId": 1,
                "paymentTypeId": 1,
                "paymentFrom": "LA",
                "paymentFromName": "Derbyshire County Council",
                "description": "LA Weekly Fee",
                "scheduleBeginDate": "2020-04-29T00:00:00",
                "scheduleEndDate": "9999-12-31T00:00:00",
                "weeklyFee": 500.13,
                "amountDue": 1857.63
            },
            {
                "residentId": 87,
                "localAuthorityId": 1,
                "paymentTypeId": 2,
                "paymentFrom": "CC",
                "paymentFromName": "Derbyshire County Council",
                "description": "CC Weekly Fee",
                "scheduleBeginDate": "2020-04-29T00:00:00",
                "scheduleEndDate": "9999-12-31T00:00:00",
                "weeklyFee": 86.26,
                "amountDue": 320.39
            },
            {
                "residentId": 87,
                "localAuthorityId": 1,
                "paymentTypeId": 4,
                "paymentFrom": "LA",
                "paymentFromName": "Derbyshire County Council",
                "description": "Covid Supplement",
                "scheduleBeginDate": "2020-04-29T00:00:00",
                "scheduleEndDate": "9999-12-31T00:00:00",
                "weeklyFee": 56.35,
                "amountDue": 209.30
            }
        ]
    },
    {
        "id": 0,
        "name": "Diane Farmer",
        "totalLaFee": 1518.03,
        "residentWeeklyFee": 586.40,
        "grandTotal": 2387.36,
        "localAuthorityId": 1,
        "schedules": [
            {
                "residentId": 55,
                "localAuthorityId": 1,
                "paymentTypeId": 1,
                "paymentFrom": "LA",
                "paymentFromName": "Derbyshire County Council",
                "description": "LA Weekly Fee",
                "scheduleBeginDate": "2020-04-29T00:00:00",
                "scheduleEndDate": "9999-12-31T00:00:00",
                "weeklyFee": 352.35,
                "amountDue": 1308.73
            },
            {
                "residentId": 55,
                "localAuthorityId": 1,
                "paymentTypeId": 2,
                "paymentFrom": "CC",
                "paymentFromName": "Derbyshire County Council",
                "description": "CC Weekly Fee",
                "scheduleBeginDate": "2020-04-29T00:00:00",
                "scheduleEndDate": "9999-12-31T00:00:00",
                "weeklyFee": 234.05,
                "amountDue": 869.33
            },
            {
                "residentId": 55,
                "localAuthorityId": 1,
                "paymentTypeId": 4,
                "paymentFrom": "LA",
                "paymentFromName": "Derbyshire County Council",
                "description": "Covid Supplement",
                "scheduleBeginDate": "2020-04-29T00:00:00",
                "scheduleEndDate": "9999-12-31T00:00:00",
                "weeklyFee": 56.35,
                "amountDue": 209.30
            }
        ]
    },
  ];
*/


















  // LA for dropdown
  localAuthrities: KeyPair[] = [
    { key:'all', value:'All'},
    { key: '1', value: 'Derbyshire County Council'},
    { key: '2', value:'Manchester City Council'},
    { key: '3', value:'Tameside Metropolitan Borough Council'},
    { key: '101', value:'Private'}
  ];

  constructor(private invoiceService: InvoiceService, private http: HttpClient) { }

  ngOnInit(): void {
  }

  onBillingStartDateChange(event: any): void {
    if (event) {
      // console.log('>>>>', event.year, event.month, event.day)
      // const d = new Date(event.year, event.month-1, event.day);
      this.billingStart = `${event.year}-${event.month}-${event.day}`;
    }
  }

  onBillingEndDateChange(event: any): void {
    if (event) {
      this.billingEnd = `${event.year}-${event.month}-${event.day}`;
    }
    // TEMP
    // this.getSummaryTotals(this.invoices);
  }

  getReportsByDate(): void {
    if (this.billingStart && this.billingEnd) {
      console.log(this.billingStart, this.billingEnd);
      this.loadInvoiceByDate(this.billingStart, this.billingEnd);
    }
  }

  loadInvoiceByDate(startDate: string, endDate: string): void {
    if (startDate === '' || endDate === null) {
      throw new console.error('Date not selected');
    }

    this.invoiceService.loadInvoiceByDate(startDate, endDate)
    .subscribe({
      next: (data) => {
        console.log('>>>>>>', data);
        // this.invoices = data;
        // this.rawInvoices = data;
        Object.assign(this.invoices, [...data]);
        Object.assign(this.rawInvoices, [...data]);
        // prepare summary
        this.getSummaryTotals(this.invoices);
      },
      error: (error) => console.log('Error getting invoice:', error)
    });

  }

  onLocalAuthorityChange(event: any): void {
    this.invoices.splice(0, this.invoices.length);
    if (event.target.value === 'all'){
      Object.assign(this.invoices, [...this.rawInvoices]);
    } else {
      let filtered = this.rawInvoices.filter(i => i.localAuthorityId === +event.target.value);
      Object.assign(this.invoices, [...filtered]);
    }
    this.getSummaryTotals(this.invoices);
  }


  getSummaryTotals(invoices: Invoice[]): void {
    // LA id 1=Darby, 2=Manchester, 3=Tameside
    this.summaryTotalLaDarby = 0;
    this.summaryTotalLaManchester = 0;
    this.summaryTotalLaTameside = 0;
    this.summaryTotalCC = 0;
    this.summaryTotalPrivate = 0;

    invoices.map(i => {
      if (i.localAuthorityId === 1) this.summaryTotalLaDarby += i.totalLaFee;
      if (i.localAuthorityId === 2) this.summaryTotalLaManchester += i.totalLaFee;
      if (i.localAuthorityId === 3) this.summaryTotalLaTameside += i.totalLaFee;
      // cc: PaymentTypeId - CC=2, Private=3
      i.schedules.map(s => {
        if (s.paymentFrom === "CC") this.summaryTotalCC += s.amountDue;
        if (s.paymentFrom === "PV") this.summaryTotalPrivate += s.amountDue;
      })

      // if (i.localAuthorityId === 1) this.summaryTotalLaDarby += i.totalLaFee;
      // if (i.localAuthorityId === 2) this.summaryTotalLaManchester += i.totalLaFee;
      // if (i.localAuthorityId === 3) this.summaryTotalLaTameside += i.totalLaFee;
      // // cc: PaymentTypeId - CC=2, Private=3
      // i.schedules.map(s => {
      //   if (s.paymentTypeId === 2) this.summaryTotalCC += s.amountDue;
      //   if (s.paymentTypeId === 3) this.summaryTotalPrivate += s.amountDue;
      // })
    })
  }



  downloadReportsByDate() { //Observable<Blob> {
    console.log('>>hre')
    // return this.http.get<Blob>('http://localhost:4200/api/invoices/all/2020-04-29/2020-05-24/download', { responseType: 'blob' as 'json' });
    // return this.http.get<Blob>('/api/invoices/all/2020-04-29/2020-05-24/download', { responseType: 'blob' as 'json' });
    window.open('http://localhost:4200/api/invoices/all/2020-04-29/2020-05-24/download', '_blank');
  }


  convertToJsDate(event: any): Date {
    return new Date(event.year, event.month-1, event.day);
  }

}
