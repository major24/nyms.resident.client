import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RoomLocation, Room } from '../../../models/index';


@Component({
  selector: 'room-location-edit',
  templateUrl: './room-location-edit.component.html',
  styleUrls: ['./room-location-edit.component.css']
})
export class RoomLocationEditComponent implements OnInit {
  @Input() roomLocations: RoomLocation[] = [];
  @Input() reservedRoomLocation: number = 0;
  @Input() reservedRoomNumber: number = 0;
  rooms: Room[] = [];
  @Output() roomLocationUpdated = new EventEmitter<string>();
  @Output() roomNumberUpdated = new EventEmitter<string>();

  // to contorl room number change from parent
  @Input() isRoomLocationChanged: boolean = false;

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
    if (changes.isRoomLocationChanged){
      this.roomDetailForm.controls['roomLocations'].setValue('');
      this.rooms.splice(0, this.rooms.length);
    }
  }


  onRoomLocationChange(event: any): void {
    if (event.target.value) {
      const locId: number = +event.target.value;
      this.loadRoomsByLocationId(locId);
    }
    this.roomLocationUpdated.emit(event);
  }
  onRoomChange(event: any): void {
    this.roomNumberUpdated.emit(event);
  }

  loadRoomsByLocationId(locId: number): void {
    const selLoc = this.roomLocations.filter(loc => loc.id === locId);
    this.rooms = selLoc.map(x => x.rooms)[0];
  }

}

