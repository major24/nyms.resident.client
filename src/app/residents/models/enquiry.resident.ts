import { Address } from '../../models/address';
import { EnquiresEditComponent } from '../enquires/enquires-edit/enquires-edit.component';

// export interface ResidentProfile {
//   foreName: string;
//   surName: string;
//   middleName: string;
//   dob: Date;
//   gender: string;
//   martialStatus: string;
// }
// export interface SocialWorker {
//   foreName: string;
//   surName: string;
//   socialWorkerPhoneNumber: string;
//   socialWorkerEmail: string;
// }
// export interface CareType {
//   careCategory: string;
//   careNeeds: string;
//   stayType: string;
// }
// export interface RoomDetail {
//   roomLocation: string;
//   roomNumber: string;
// }
// export interface EnquiryMiscData {
//   moveInDate: Date;
//   familyHomeVisitDate: Date;
//   enquiryDate: Date;
//   responseDate: Date
//   response: string;
//   status: string;
//   comments: string;
// }

/**  street1: string;
  street2: string;
  city: string;
  county: string;
  postCode: string;
    socialWorkerForeName: string;
  socialWorkerSurName: string;
  phoneNumber: string;
  email: string; */

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

// export function createInstanceofEnquiryResident() {
//   // let model: EnquiryResident = {
//   //   "referenceId": "",
//   //   "residentProfile": {} as ResidentProfile,
//   //   "address": {} as Address,
//   //   "socialWorker": {} as SocialWorker,
//   //   "careType": {} as CareType,
//   //   "roomDetail": {} as RoomDetail,
//   //   "enquiryMiscData": {} as EnquiryMiscData
//   // };
//   // return model;
//   return null;
// }

// export interface EnquiryResidentxx {
//   referenceId: string;
//   residentProfile: ResidentProfile;
//   address: Address;
//   socialWorker: SocialWorker;
//   careType: CareType;
//   roomDetail: RoomDetail;
//   enquiryMiscData: EnquiryMiscData;
// }
