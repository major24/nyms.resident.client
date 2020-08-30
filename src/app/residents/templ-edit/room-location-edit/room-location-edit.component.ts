import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RoomLocation, Room } from '../../../models/index';


@Component({
  selector: 'room-location-edit',
  templateUrl: './room-location-edit.component.html',
  styleUrls: ['./room-location-edit.component.css']
})
export class RoomLocationEditComponent implements OnInit {
  @Input() roomLocations: RoomLocation[];
  @Input() reservedRoomLocation: number = 0;
  @Input() reservedRoomNumber: number = 0;
  roomNumbers: Room[] = [];


  @Output() roomLocationUpdated = new EventEmitter<string>();
  @Output() roomNumberUpdated = new EventEmitter<string>();

  roomDetailForm =new FormGroup({
    roomLocations: new FormControl(''),
    rooms: new FormControl(''),
  });
  constructor() {}

  ngOnInit(): void {
  }

  ngOnChanges(changes: any): void {
    console.log('ngonchg==', changes);
    if (changes.reservedRoomLocation) { this.roomDetailForm.controls['roomLocations'].setValue(changes.reservedRoomLocation.currentValue); }
    if (changes.reservedRoomNumber) {
      if (this.reservedRoomLocation > 0) {
        this.loadRoomsByLocationId(this.reservedRoomLocation);
        this.roomDetailForm.controls['rooms'].setValue(changes.reservedRoomNumber.currentValue);
      }
    }
  }


  onRoomLocationChange(event: any): void {
    this.loadRoomsByLocationId(event.target.value);
    this.roomLocationUpdated.emit(event);
  }
  onRoomChange(event: any): void {
    this.roomNumberUpdated.emit(event);
  }

  loadRoomsByLocationId(locId: number): void {
    const selLoc = this.roomLocations.filter(loc => loc.id == locId);
    this.roomNumbers = selLoc.map(x => x.rooms)[0];
  }

}




  // onRoomLocationChange(event: any): void {
  //   this._roomDetail.roomLocation = event.target.value;
  //   this.onRoomDetailInfoChange();
  // }

  // onRoomNumberChange(event: any): void {
  //   this._roomDetail.roomNumber = event.target.value;
  //   this.onRoomDetailInfoChange();
  // }
  // onRoomDetailInfoChange(): void {
  //   this.roomDetailUpdated.emit(this._roomDetail);
  // }

  // setRoomDetailFields(data: RoomDetail): void {
  //   this.roomDetailForm.controls['roomLocation'].setValue(data.roomLocation);
  //   this.roomDetailForm.controls['roomNumber'].setValue(data.roomNumber);
  // }
