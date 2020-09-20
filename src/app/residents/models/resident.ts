export interface Resident {
      referenceId: string;
      careHomeId: string;
      localAuthorityId: string;
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
      swForeName: string;
      swSurName: string;
      swEmailAddress: string;
      swPhoneNumber: string;
      careCategoryId: string;
      careNeed: string;
      stayType: string;
      roomLocation: number
      roomNumber: number
      admissionDate: Date;
      exitDate: Date;
      comments: string;
      status: string;
      paymentCategory: string;
      updatedDate: string;
}