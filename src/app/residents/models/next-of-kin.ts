import { Address } from '../../models/address';
import { ContactInfo } from './contact-info';

export interface NextOfKin {
  foreName: string;
  surName: string;
  relationship: string;
  address: Address;
  contactInfos: ContactInfo[];
}

const address = { id: 0, refType: "resident", addrType: 'home', street1: '', street2: '', city: '', county: '', postCode: '' };
const contactInfo = { id: 0, residentId: 0, nokId: 0, refType: 'resident', contactType: "", data: "" }

export function createInstanceOfNok() {
  let model: NextOfKin = {
        foreName: '', surName: '', relationship: '', address: address, contactInfos: [contactInfo]
  };
  return model;
}
