export const baseUrl: string = 'http://159.89.21.188:8080/'
export const LogIn: string = `${baseUrl}api/user/login`

// User 
export const UserGet: string = `${baseUrl}api/user/moderator/page?`;
export const AddUser: string = `${baseUrl}api/user/create`;
export const DeleteUser: string = `${baseUrl}api/user/deleted?`;
export const EditUser: string = `${baseUrl}api/user/update?`;

// Leave 
export const LeaveGet: string = `${baseUrl}`;


// Partners Page

export const PartnerGet: string = `${baseUrl}api/partner/page`;
export const PartnerCreate: string = `${baseUrl}api/partner/create`;
export const PartnerDetialsUlr: string = `${baseUrl}api/qrcode/partner?`;
export const PartnerEdit: string = `${baseUrl}api/partner/update?`;
export const PartnerStatistic: string = `${baseUrl}api/partner/statistic?`;
export const QrsPartner: string = `${baseUrl}api/qrcode/partner?`;
export const MerchantPartner: string = `${baseUrl}api/merchant/partner/merchant?`;
export const TerminalsPartner: string = `${baseUrl}api/terminal/partner?`;
export const TransactionPartner: string = `${baseUrl}api/qrcode/partner/transaction?`;