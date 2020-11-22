import { Address } from '../../models/address';
import { SocialWorker } from './social-worker';
import { EnquiryAction } from './enquiry-action';

export interface EnquiryResident {
  referenceId: string;
  careHomeId: number;
  referralAgencyId: number;
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
  roomLocation: number;
  roomNumber: number;
  moveInDate: string;
  familyHomeVisitDate: Date;
  status: string;
  comments: string;
  careCategoryName: string;
  localAuthorityName: string;
  updatedDate: Date;
}

const address = {
  id: 0,
  refType: 'enquiry',
  addrType: 'home',
  street1: '',
  street2: '',
  city: '',
  county: '',
  postCode: '',
};

export function createInstanceofEnquiryResident() {
  let model: EnquiryResident = {
    referenceId: '',
    careHomeId: 0,
    referralAgencyId: 0,
    localAuthorityId: 0,
    foreName: '',
    surName: '',
    middleName: '',
    dob: undefined,
    gender: '',
    maritalStatus: '',
    address: address,
    socialWorker: {
      foreName: '',
      surName: '',
      phoneNumber: '',
      emailAddress: '',
    },
    careCategoryId: '',
    careNeed: '',
    stayType: '',
    roomLocation: 0,
    roomNumber: 0,
    moveInDate: '',
    familyHomeVisitDate: undefined,
    status: '',
    comments: '',
    careCategoryName: '',
    localAuthorityName: '',
    updatedDate: undefined,
  };
  return model;
}
