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