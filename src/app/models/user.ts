import { Role, CareHomeRole } from './role';

export interface User {
  referenceId: string;
  userName: string;
  password: string;
  foreName: string;
  surName: string;
  jwtToken?: string;
  roles: Role[];
}

export interface CareHomeUser {
  userId: number,
  referenceId: string;
  foreName: string;
  surName: string;
  careHomeRoles: CareHomeRole[];
}