import { Address } from '../../models/address';
import { SocialWorker } from './social-worker';
import { EnquiryAction } from './enquiry-action';

export interface EnquiryResident {
  referenceId: string;
  careHomeId: number;
  localAuthorityId: number;
  foreName: string;
  surName: string;
  middleName: string;
  dob: Date;
  gender: string;
  maritalStatus: string;
  address: Address;
  socialWorker: SocialWorker;
  careCategoryId: string;
  careNeed: string;
  stayType: string;
  reservedRoomLocation: string;
  reservedRoomNumber: string;
  moveInDate: Date;
  familyHomeVisitDate: Date;
  enquiryDate: Date;
  responseDate: Date;
  response: string;
  status: string;
  comments: string;
  careCategoryName: string;
  localAuthorityName: string;
  updatedDate: Date;
}

export function createInstanceofEnquiryResident() {
  let model: EnquiryResident = {
    referenceId: '',
    careHomeId: 0,
    localAuthorityId: 0,
    foreName: '',
    surName: '',
    middleName: '',
    dob: undefined,
    gender: '',
    maritalStatus: '',
    address: { street1: '', street2: '', city: '', county: '', postCode: '' },
    socialWorker: {
      foreName: '',
      surName: '',
      phoneNumber: '',
      email: '',
    },
    careCategoryId: '',
    careNeed: '',
    stayType: '',
    reservedRoomLocation: '',
    reservedRoomNumber: '',
    moveInDate: undefined,
    familyHomeVisitDate: undefined,
    enquiryDate: undefined,
    responseDate: undefined,
    response: '',
    status: '',
    comments: '',
    careCategoryName: '',
    localAuthorityName: '',
    updatedDate: undefined,
  };
  return model;
}


