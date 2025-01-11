import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGlobalRequest } from '../../hooks/GlobalHook';
import {
    // MerchantPartner,
    MerchantQrs,
    // MerchantStatistic,
    // MerchantTerminal,
    // MerchantTransactions,
    // PartnerDetialsUlr,
    // PartnerStatistic,
    QrGetOne,
    // QrsPartner,
    // QrTransactions,
    // TerminalsPartner,
    // TransactionPartner,
} from '../../hooks/url';
import {
    // Box,
    Button,
    // Tab,
    // Table,
    // TableBody,
    // TableCell,
    // TableHead,
    // TableRow,
    // Tabs,
    // Typography,
} from '@mui/material';
import { IoChevronBackOutline } from 'react-icons/io5';
import { QRCode } from 'antd';
import { QrStore } from '../../hooks/Store/Qr/qrStore';

export default function QrDetial() {
    // States
    // const [pageQr, setPageQr] = useState(0);
    // const [pageMerchant, setPageMerchant] = useState(0);
    const {qrData} = QrStore()

    const { id } = useParams<string>();
    const navigator = useNavigate();
    // console.log('Statistic Merchant', statisticsGet);
    return (
        <div className="bg-gray-100  flex flex-col items-center">
            <div className="flex justify-between mb-3 w-full">
                <Button
                    className="outline-none border-none hover:bg-transparent"
                    onClick={() => {
                        navigator(-1);
                    }}
                >
                    <IoChevronBackOutline color="black" size={30} />
                </Button>
            </div>
            <div className="w-full ">
                <div className="flex justify-between gap-9">
                    <div className="w-full bg-white shadow-xl rounded-xl p-6">
                        <div className="flex flex-col gap-4">
                            <div className="flex justify-between pb-2 border-b-2 border-gray-500">
                                <p className="text-sm font-semibold">External ID:</p>
                                <p className="text-sm font-semibold">
                                    {id || '-'}
                                </p>
                            </div>
                            <div className="flex justify-between pb-2 border-b-2 border-gray-500">
                                <p className="text-sm font-semibold">Partner</p>
                                <p className="text-sm font-semibold">
                                    {qrData?.partner || '-'}
                                </p>
                            </div>
                            <div className="flex justify-between pb-2 border-b-2 border-gray-500">
                                <p className="text-sm font-semibold">Type</p>
                                <p className="text-sm font-semibold">
                                    {qrData?.type || '-'}
                                </p>
                            </div>
                            <div className="flex justify-between pb-2 border-b-2 border-gray-500">
                                <p className="text-sm font-semibold">Minimum amount</p>
                                <p className="text-sm font-semibold">
                                    {qrData?.minAmount || '0'}
                                </p>
                            </div>
                            <div className="flex justify-between pb-2 border-b-2 border-gray-500">
                                <p className="text-sm font-semibold">Maximum amount</p>
                                <p className="text-sm font-semibold">
                                    {qrData?.maxAmount || '-'}
                                </p>
                            </div>
                            <div className="flex justify-between pb-2 border-b-2 border-gray-500">
                                <p className="text-sm font-semibold">Currency</p>
                                <p className="text-sm font-semibold">
                                    {qrData?.currency || '-'}
                                </p>
                            </div>
                            <div className="flex justify-between pb-2 border-b-2 border-gray-500">
                                <p className="text-sm font-semibold">Expire Time</p>
                                <p className="text-sm font-semibold">
                                    {qrData?.expireDate || '-'}
                                </p>
                            </div>
                            <div className="flex justify-between pb-2 border-b-2 border-gray-500">
                                <p className="text-sm font-semibold">Created time</p>
                                <p className="text-sm font-semibold">
                                    {qrData?.createDate || '-'}
                                </p>
                            </div>

                            <div className="flex justify-between pb-2 border-b-2 border-gray-500">
                                <p className="text-sm font-semibold">Status</p>
                                <p className="text-sm font-semibold">
                                    {qrData?.status || '-'}
                                </p>
                            </div>
                            <div className="flex justify-between pb-2 border-b-2 border-gray-500">
                                <p className="text-sm font-semibold">Redirect url</p>
                                <p className="text-sm font-semibold">
                                    {qrData?.redirectUrl || '-'}
                                </p>
                            </div>
                            <div className="flex justify-between pb-2 border-b-2 border-gray-500">
                                <p className="text-sm font-semibold">Purpose</p>
                                <p className="text-sm font-semibold">
                                    {qrData?.Purpose || '-'}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="w-[40%] bg-white shadow-md rounded-xl border-l-2 flex flex-col p-6 gap-5">
                        <QRCode
                            value={qrData?.redirectUrl}
                            size={256}
                            bgColor="#ffffff"
                            fgColor="#000000"
                            level="H"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
