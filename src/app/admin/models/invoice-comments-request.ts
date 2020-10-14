export interface InvoiceCommentsRequest {
    id: number;
    localAuthorityId: number;
    billingCycleId: number;
    residentId: number;
    paymentTypeId: number;
    transactionAmount: number;
    comments: string;
    updatedById: number;
    updatedDate: string;
}