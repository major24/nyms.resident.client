import { Role } from '../../models/role';

export interface SpendCategory {
  id: number,
  spendMasterCategoryId: number,
  name: string,
  catCode: string,
  roles: Role[]
}