export class Room {
  id: number;
  roomLocationId: number;
  name: string;
  status: string;
}

export class RoomLocation {
  id: number;
  name: string;
  careHomeId: number;
  rooms: Room[];
}

export class CareHome {
  id: number;
  referenceId: string;
  name: string;
  roomLocations: RoomLocation[];
}