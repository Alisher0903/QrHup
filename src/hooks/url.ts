export const baseUrl: string = 'http://159.89.21.188:8080/'
export const LogIn: string = `${baseUrl}api/user/login`

// User 
export const UserGet: string = `${baseUrl}api/user/moderator/page?`;
export const AddUser: string = `${baseUrl}api/user/create`;
export const DeleteUser: string = `${baseUrl}api/user/deleted?`;
export const EditUser: string = `${baseUrl}api/user/update?`;
export const getMe: string = `${baseUrl}api/user/get-me`

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
export const TransactionPartner: string = `${baseUrl}api/transaction/partner?`;

// Merchant Api
export const MerchantGet: string = `${baseUrl}api/merchant/admin/page`;
export const MerchantGetOne: string = `${baseUrl}api/merchant/one?`;
export const MerchantStatistic: string = `${baseUrl}api/merchant/statistic?`;
export const MerchantTerminal: string = `${baseUrl}api/terminal/merchant?`;
export const MerchantTransactions: string = `${baseUrl}api/transaction/merchant?`;
export const MerchantQrs: string = `${baseUrl}api/qrcode/merchant?`;

// Qr Apis
export const QrGet: string = `${baseUrl}api/qrcode/page`;
export const QrGetOne: string = `${baseUrl}api/qrcode/check/`;
export const QrTransactions: string = `${baseUrl}api/qrcode/transaction/`;
export const qrGetone: string = `${baseUrl}api/qrcode/one`
export const getTransactionsByQrId: string = `${baseUrl}api/transaction`

// Mcc 
export const MccGet: string = `${baseUrl}api/mcc/mcc/page`;
export const MccCreate: string = `${baseUrl}api/mcc/create`;
export const MccEdit: string = `${baseUrl}api/mcc/update?`;
export const MccDelete: string = `${baseUrl}api/mcc/deleted?`;

// ActionGet
export const ActionGet: string = `${baseUrl}api/action`;
export const ActionModeratorGet: string = `${baseUrl}api/action/moderator`;
export const ActionModeratorGetOne: string = `${baseUrl}api/transaction/detail/`;


// Currency 
export const CurrencyGet: string = `${baseUrl}api/currency/page?`;
export const CurrencyEditActive: string = `${baseUrl}api/currency/active?`;

// mdelator
export const ClarifyGet: string = `${baseUrl}api/transaction/moderator?`;


// Transactions
export const adminTransactionsGet: string = `${baseUrl}api/transaction`
export const ModeratorChangeStatus: string = `${baseUrl}api/transaction/moderator/status?`

// statistic 
export const statistic_dashboard_transactions: string = `${baseUrl}api/transaction/dashboard/statistic`
export const statistic_dashboard_transactions_diagram: string = `${baseUrl}api/transaction/dashboard/statistic/diagram`





export const Generate: string = `${baseUrl}api/partner/generate/`


