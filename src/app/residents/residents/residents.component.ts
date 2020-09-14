// import { Component, OnInit } from '@angular/core';
// import { ResidentsService } from '../services';
// import { Resident } from '../models';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-residents',
//   templateUrl: './residents.component.html',
//   styleUrls: ['./residents.component.css']
// })
// export class ResidentsComponent implements OnInit {
//   residents: string[] = []; // Resident[] = [];

//   constructor(private residentService: ResidentsService, private router: Router) { }

//   ngOnInit(): void {
//     // this.loadResidnets(1);
//   }

//   loadResidnets(careHomeId: number): void {
//     this.residentService.getAllResidents(careHomeId)
//     .subscribe({
//       next: (data) => {
//         console.log('>>', data);
//         // this.residents = data;
//         Object.assign(this.residents, [...data]);
//       },
//       error: (error) => { console.log('Error loading residents ', error); }
//     });
//   }

// }
