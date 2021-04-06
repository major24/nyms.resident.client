import { Address } from '../../models/address';
import { SocialWorker } from './social-worker';
import { NextOfKin } from './next-of-kin';

export interface Resident {
  referenceId: string;
  careHomeId: number;
  localAuthorityId: number;
  nhsNumber: string;
  poNumber: string;
  laId: string;
  nymsId: string;
  foreName: string;
  surName: string;
  middleName: string;
  dob: Date;
  gender: string;
  maritalStatus: string;
  careCategoryId: string;
  careNeed: string;
  stayType: string;
  roomLocation: number;
  roomNumber: number;
  admissionDate: string;
  familyHomeVisitDate: Date;
  exitDate: Date;
  comments: string;
  status: string;
  updatedDate: Date;
  enquiryReferenceId;
  address: Address;
  emailAddress: string;
  phoneNumber: string;
  socialWorker: SocialWorker;
  nextOfKins: NextOfKin[];
  careHomeDivisionId: number;
}
// addr default to 'home'. in future if we want to differenciate, use this flag
const address = {
  id: 0,
  addrType: 'home',
  street1: '',
  street2: '',
  city: '',
  county: '',
  postCode: '',
};
const contactInfoEmail = {
  id: 0,
  residentId: 0,
  contactType: 'emailAddress',
  data: '',
};

export function createInstanceOfResident() {
  let model: Resident = {
    referenceId: '',
    careHomeId: 0,
    localAuthorityId: 0,
    nhsNumber: '',
    poNumber: '',
    laId: '',
    nymsId: '',
    foreName: '',
    surName: '',
    middleName: '',
    dob: undefined,
    gender: '',
    maritalStatus: '',
    careCategoryId: '',
    careNeed: '',
    stayType: '',
    roomLocation: 0,
    roomNumber: 0,
    admissionDate: '',
    familyHomeVisitDate: undefined,
    exitDate: undefined,
    comments: '',
    status: '',
    updatedDate: undefined,
    enquiryReferenceId: '',
    address: address,
    emailAddress: '',
    phoneNumber: '',
    careHomeDivisionId: 0,
    socialWorker: {
      foreName: '',
      surName: '',
      phoneNumber: '',
      emailAddress: '',
    },
    nextOfKins: [
      {
        foreName: '',
        surName: '',
        relationship: '',
        address: address,
        contactInfos: [contactInfoEmail],
      },
    ],
  };
  return model;
}
