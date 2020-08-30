import { Role } from './role';

export interface User {
  id: number;
  userName: string;
  password: string;
  foreName: string;
  surName: string;
  jwtToken?: string;
  roles: Role[];
}