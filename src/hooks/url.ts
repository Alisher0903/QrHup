export const baseUrl: string = 'http://159.89.21.188:8080/'
export const LogIn: string = `${baseUrl}api/user/login`

// User 
export const UserGet: string = `${baseUrl}api/user/moderator/page?`;
export const AddUser: string = `${baseUrl}api/user/create`;
export const DeleteUser: string = `${baseUrl}api/user/deleted?`;
export const EditUser: string = `${baseUrl}api/user/update?`;

// Leave 
export const LeaveGet: string = `${baseUrl}`;


// Partners Api

export const PartnerGet: string = `${baseUrl}api/partner/page`;
export const PartnerCreate: string = `${baseUrl}api/partner/create`;
export const PartnerDetialsUlr: string = `${baseUrl}api/qrcode/partner?`;
export const PartnerEdit: string = `${baseUrl}api/partner/update?`;
export const PartnerStatistic: string = `${baseUrl}api/partner/statistic?`;
export const QrsPartner: string = `${baseUrl}api/qrcode/partner?`;
export const MerchantPartner: string = `${baseUrl}api/merchant/partner/merchant?`;
export const TerminalsPartner: string = `${baseUrl}api/terminal/partner?`;
export const TransactionPartner: string = `${baseUrl}api/qrcode/partner/transaction?`;

// Merchant Api
export const MerchantGet: string = `${baseUrl}api/merchant/admin/page`;
export const MerchantStatistic: string = `${baseUrl}api/merchant/statistic?`;
export const MerchantTerminal: string = `${baseUrl}api/terminal/merchant?`;
export const MerchantTransactions: string = `${baseUrl}api/qrcode/merchant/transaction?`;
export const MerchantQrs: string = `${baseUrl}api/qrcode/merchant?`;

// Qr Apis
export const QrGet: string = `${baseUrl}api/qrcode/page`;
export const QrGetOne: string = `${baseUrl}api/qrcode/check/`;
export const QrTransactions: string = `${baseUrl}api/qrcode/transaction/`;


// Mcc 
export const MccGet: string = `${baseUrl}api/mcc/mcc/page`;
export const MccCreate: string = `${baseUrl}api/mcc/create`;
export const MccEdit: string = `${baseUrl}api/mcc/update?`;
export const MccDelete: string = `${baseUrl}api/mcc/deleted?`;

// ActionGet
export const ActionGet: string = `${baseUrl}api/action`;


// Transactions
export const adminTransactionsGet: string = `${baseUrl}api/transaction`