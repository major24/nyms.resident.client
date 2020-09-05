import { Address } from '../../models/address';

export interface SocialWorker {
  foreName: string;
  surName: string;
  phoneNumber: string;
  email: string;
}

export interface EnquiryResident {
  referenceId: string;
  foreName: string;
  surName: string;
  middleName: string;
  dob: Date;
  gender: string;
  martialStatus: string;
  address: Address;
  socialWorker: SocialWorker;
  careCategory: string;
  careNeeds: string;
  stayType: string;
  roomLocation: string;
  roomNumber: string;
  moveInDate: Date;
  familyHomeVisitDate: Date;
  enquiryDate: Date;
  responseDate: Date;
  response: string;
  status: string;
  comments: string;
}

export function createInstanceofEnquiryResident() {
  let model: EnquiryResident = {
    referenceId: '',
    foreName: '',
    surName: '',
    middleName: '',
    dob: undefined,
    gender: '',
    martialStatus: '',
    address: { street1: '', street2: '', city: '', county: '', postCode: '' },
    // street1: '',
    // street2: '',
    // city: '',
    // county: '',
    // postCode: '',
    socialWorker: {
      foreName: '',
      surName: '',
      phoneNumber: '',
      email: '',
    },
    // socialWorkerForeName: '',
    // socialWorkerSurName: '',
    // phoneNumber: '',
    // email: '',
    careCategory: '',
    careNeeds: '',
    stayType: '',
    roomLocation: '',
    roomNumber: '',
    moveInDate: undefined,
    familyHomeVisitDate: undefined,
    enquiryDate: undefined,
    responseDate: undefined,
    response: '',
    status: '',
    comments: '',
  };
  return model;
}


