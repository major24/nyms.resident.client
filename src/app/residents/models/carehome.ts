import { RoomLocation } from './room-location';

export class CareHome {
  id: number;
  referenceId: string;
  name: string;
  roomLocations: RoomLocation[];
  careCategories: any[];
  localAuthorities: any[];
  careHomeDivisions: any[];
}

export class CareHome0 {
  id: number;
  name: string;
  chCode: string;
  careHomeDivisions: any[];
}