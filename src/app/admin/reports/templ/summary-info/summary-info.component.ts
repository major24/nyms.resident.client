import { Component, OnInit, Input } from '@angular/core';
import { Invoice, InvoiceSummary } from '../../../models/index';

@Component({
  selector: 'summary-info',
  templateUrl: './summary-info.component.html',
  styleUrls: ['./summary-info.component.css']
})
export class SummaryInfoComponent implements OnInit {

  summaryTotalLaDarby: number = 0;
  summaryTotalLaManchester: number = 0;
  summaryTotalLaTameside: number = 0;
  summaryTotalCC: number = 0;
  summaryTotalPrivate: number = 0;

  @Input() invoicesSummary: InvoiceSummary[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: any): void {
    console.log('>>>???', changes);
    console.log('ngonchg==', changes);
    //if (i.localAuthorityId === 1) this.summaryTotalLaDarby += i.totalLaFee;
    // this.summaryTotalLaDarby = 56;
  }



//   getLaTotal(invoices: Invoice[], la: string): number {
//     const x = invoices.map(i => i.schedules.filter(s => s.paymentFromName === la && s.paymentFrom == 'LA'));
//     let sum = 0;
//     x.map(m => {
//           if (m.length > 0) {
//             m.map(mm => sum += mm.amountDue)
//           }
//         });
//     return sum;
//   }

//   getCcTotal(invoices: Invoice[]): number {
//     const x = invoices.map(i => i.schedules.filter(s => s.paymentFrom == 'CC'));
//     let sum = 0;
//     x.map(m => {
//           if (m.length > 0) {
//             m.map(mm => sum += mm.amountDue)
//           }
//         });
//     return sum;
//   }

//   getPvTotal(invoices: Invoice[]): number {
//     const x = invoices.map(i => i.schedules.filter(s => s.paymentFrom == 'PV'));
//     let sum = 0;
//     x.map(m => {
//           if (m.length > 0) {
//             m.map(mm => sum += mm.amountDue)
//           }
//         });
//     return sum;
//   }

//   makeSummaryTotals(invoices: Invoice[]): void {
//     let temp = [];
//     let invSummary = [] as InvoiceSummary[];
//     invoices.map(i => {
//       i.schedules.map(s => temp.push(s.paymentFromName))
//     });
//     const uq = [...new Set(temp)]
//     console.log(">>", uq);
// /**0: "Tameside Metropolitan Borough Council"
// 1: "Manchester City Council"
// 2: "Derbyshire County Council"
// 3: "Client Contribution"
// 4: "Private" */
//     uq.map(u => {
//       let obj = {} as InvoiceSummary;
//       obj.localAuthority = u;
//       if (u === 'Private') {
//         obj.totalLaFee = this.getPvTotal(invoices);
//       } else if (u === 'Client Contribution'){
//         obj.totalLaFee = this.getCcTotal(invoices);
//       } else {
//         obj.totalLaFee = this.getLaTotal(invoices, u);
//       }
//       invSummary.push(obj);
//     })

//     // console.log(this.getLaTotal(invoices, 'Manchester City Council'));
//     // console.log(this.getCcTotal(invoices));
//     console.log('***', invSummary);
//   }


}
