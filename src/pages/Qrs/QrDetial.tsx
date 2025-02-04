import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, CircularProgress, Dialog, Typography } from '@mui/material';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';
import { Pagination, QRCode } from 'antd';
import { useEffect, useState } from 'react';
import { useGlobalRequest } from '../../hooks/GlobalHook';
import { getTransactionsByQrId, qrGetone } from '../../hooks/url';
import { useTranslation } from "react-i18next";

export default function QrDetial() {
    const { t } = useTranslation()
    const { id } = useParams<string>();
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [extID, setExtId] = useState('');
    const navigator = useNavigate();
    const qrGetOne = useGlobalRequest(`${qrGetone}/${id}`, 'GET');
    // //(qrGetOne);
    
    const qrGetTransactions = useGlobalRequest(`${getTransactionsByQrId}/${id}?page=${page}&size=${size}`, 'GET');
    const [isOpen, setIsopen] = useState(false);
    const [selectedItem, setSelectedItem] = useState({
        paymentTime: "",
        payerBank: "",
        senderName: "",
        rate: 0,
        currency: "",
        amount: 0,
        fee: "",
        ExtId: ''
    });
    useEffect(() => {
        if (id) {
            qrGetOne.globalDataFunc();
        }
    }, [])

    useEffect(() => {
        if (id) {
            qrGetTransactions.globalDataFunc();
        }
    }, [size, page])

    const toggleModal = () => {
        setIsopen(!isOpen)
        setSelectedItem({
            amount: 0,
            currency: "",
            fee: "",
            payerBank: "",
            paymentTime: "",
            rate: 0,
            senderName: "",
            ExtId: ''
        })
    }

    const formatDateTime = (dateTimeString: string): string => {
        const dateTime = new Date(dateTimeString);

        // Sanani kerakli formatga o'zgartirish
        const formattedDate = dateTime.toISOString().slice(0, 10); // "2025-01-10"
        const formattedTime = dateTime.toTimeString().slice(0, 5); // "14:06"

        return `${formattedDate} ${formattedTime}`;
    };

    return (
        <>
            <div className="bg-gray-100 flex flex-col items-center">
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
                                <div className="flex justify-between pb-2 border-b-[1px] border-gray-500">
                                    <p className="text-md font-semibold">{t("ExternalID")}:</p>
                                    <p className="text-md font-semibold">
                                        {id || '-'}
                                    </p>
                                </div>
                                <div className="flex justify-between pb-2 border-b-[1px] border-gray-500">
                                    <p className="text-md font-semibold">{t("Partner")}</p>
                                    <p className="text-md font-semibold">
                                        {qrGetOne.response?.partner || '-'}
                                    </p>
                                </div>
                                <div className="flex justify-between pb-2 border-b-[1px] border-gray-500">
                                    <p className="text-md font-semibold">{t("Merchant")}</p>
                                    <p className="text-md font-semibold">
                                        {qrGetOne.response?.merchant || '-'}
                                    </p>
                                </div>
                                <div className="flex justify-between pb-2 border-b-[1px] border-gray-500">
                                    <p className="text-md font-semibold">{t("Type")}</p>
                                    <p className="text-md font-semibold">
                                        {qrGetOne.response?.type || '-'}
                                    </p>
                                </div>
                                <div className="flex justify-between pb-2 border-b-[1px] border-gray-500">
                                    <p className="text-md font-semibold">{t("MinimumAmount")}</p>
                                    <p className="text-md font-semibold">
                                        {qrGetOne.response?.minAmount || '0'}
                                    </p>
                                </div>
                                <div className="flex justify-between pb-2 border-b-[1px] border-gray-500">
                                    <p className="text-md font-semibold">{t("MaxAmount")}</p>
                                    <p className="text-md font-semibold">
                                        {qrGetOne.response?.maxAmount || '0'}
                                    </p>
                                </div>
                                <div className="flex justify-between pb-2 border-b-[1px] border-gray-500">
                                    <p className="text-md font-semibold">{t("Currency")}</p>
                                    <p className="text-md font-semibold">
                                        {qrGetOne.response?.currency || '-'}
                                    </p>
                                </div>
                                <div className="flex justify-between pb-2 border-b-[1px] border-gray-500">
                                    <p className="text-md font-semibold">{t("ExpireTime")}</p>
                                    <p className="text-md font-semibold">
                                        {qrGetOne.response?.expire || '-'}
                                    </p>
                                </div>
                                <div className="flex justify-between pb-2 border-b-[1px] border-gray-500">
                                    <p className="text-md font-semibold">{t("CreatedTime")}</p>
                                    <p className="text-md font-semibold">
                                    {qrGetOne.response?.createdAt ? formatDateTime(qrGetOne.response.createdAt) : '-'}
                                    </p>
                                </div>

                                <div className="flex justify-between pb-2 border-b-[1px] border-gray-500">
                                    <p className="text-md font-semibold">{t("Status")}</p>
                                    <p className="text-md font-semibold">
                                        {qrGetOne.response?.status || '-'}
                                    </p>
                                </div>
                                <div className="flex justify-between pb-2 border-b-[1px] border-gray-500">
                                    <p className="text-md font-semibold">{t("RedirectUrl")}</p>
                                    <p className="text-md font-semibold">
                                        {qrGetOne.response?.redirectUrl || '-'}
                                    </p>
                                </div>
                                <div className="flex justify-between pb-2 border-b-[1px] border-gray-500">
                                    <p className="text-md font-semibold">{t("Purpose")}</p>
                                    <p className="text-md font-semibold">
                                        {qrGetOne.response?.purpose || '-'}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="w-[40%] bg-white shadow-md rounded-xl border-l-2 flex justify-center items-center flex-col p-6 gap-5">
                            <QRCode
                                value={qrGetOne.response?.url}
                                size={300}
                                bgColor="#ffffff"
                                fgColor="#000000"
                                level="H"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-white shadow-xl rounded-xl p-3 mt-5'>
                <p className='text-xl py-3'>{t("Transactions")}</p>
                {qrGetTransactions.loading ? <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "200px",
                    }}
                >
                    <CircularProgress />
                </Box> : qrGetTransactions.response && qrGetTransactions.response?.object && qrGetTransactions.response.object.length !== 0 ?
                    qrGetTransactions.response.object.map((item: any, index: number) => (
                        <div
                            key={index}
                            onClick={() => {
                                toggleModal()
                                setSelectedItem({
                                    amount: item.amount,
                                    currency: item.currency,
                                    fee: item.serviceFee,
                                    payerBank: item.bank,
                                    paymentTime: item.createdAt,
                                    rate: item.rate,
                                    senderName: item.sender,
                                    ExtId: item.id
                                })
                            }}
                            className='p-5 rounded-xl flex justify-between gap-3 items-center border-[1px] border-black cursor-pointer'
                        >
                            <div className='grid grid-cols-1 lg:grid-cols-3 text-md gap-7'>
                                <div className=''>
                                    <div className='flex justify-between  border-gray-400 gap-1'>
                                        <p className='text-sm font-bold'>{t("Amount")}:</p>
                                        <p>{item.amount || "--"}</p>
                                    </div>
                                    <div className='flex justify-between  border-gray-400 gap-1'>
                                        <p className='text-sm font-bold'>{t("Currency")}:</p>
                                        <p>{item.currency || "--"}</p>
                                    </div>
                                </div>
                                <div>
                                    <div className='flex justify-between  border-gray-400 gap-1'>
                                        <p className='text-sm font-bold'>{t("PaymentDate")}:</p>
                                        <p>{item?.createdAt ? formatDateTime(item.createdAt) : "--"}</p>
                                    </div>
                                    <div className='flex justify-between  border-gray-400 gap-1'>
                                        <p className='text-sm font-bold'>{t("PayerBank")}:</p>
                                        <p>{item.bank || "--"}</p>
                                    </div>
                                </div>
                                <div>
                                    <div className='flex justify-between  border-gray-400 gap-1'>
                                        <p className='text-sm min-w-[100px] font-bold'>{t("ExternalID")}:</p>
                                        <p className='whitespace-nowrap text-sm  overflow-hidden text-ellipsis'>{item.id || "--"}</p>
                                    </div>
                                    <div className='flex justify-between  border-gray-400 gap-1'>
                                        <p className='text-sm font-bold'>{t("Fee")}:</p>
                                        <p>{`${item.serviceFee}%` || "--"}</p>
                                    </div>
                                </div>
                            </div>
                            <div className=' flex justify-end'><IoChevronForwardOutline color="black" size={30} /></div>
                        </div>
                    ))

                    : (
                        <Typography color="error" textAlign="center">
                            {t("LoadData")}
                        </Typography>
                    )}
                {qrGetTransactions.response && qrGetTransactions.response?.object && qrGetTransactions.response.object.length !== 0 && <div className='mt-5'>
                    <Pagination
                        defaultCurrent={1}
                        current={page + 1}
                        total={qrGetTransactions.response?.totalElements || 0}
                        pageSize={size || 10}
                        onChange={(pageNumber: number, pageSize: number) => {
                            setSize(pageSize);
                            setPage(pageNumber - 1);
                        }}
                        showSizeChanger={true}
                    />
                </div>}
            </div>
            <Dialog open={isOpen} onClose={toggleModal}>
                <div style={{ padding: '20px', width: '600px', textAlign: 'left' }}>
                    <div className="flex flex-col gap-5">
                        <div className="flex justify-between">
                            <p className="text-xl font-bold">{t("PaymentTime")}:</p>
                            <p className="text-xl">{selectedItem?.paymentTime ? formatDateTime(selectedItem.paymentTime) : "---"}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-xl font-bold">{t("PayerBank")}:</p>
                            <p className="text-xl">{selectedItem.payerBank || "---"}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-xl font-bold">{t("SenderName")}:</p>
                            <p className="text-xl">{selectedItem.senderName || "---"}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-xl font-bold">{t("Rate")}:</p>
                            <p className="text-xl">{selectedItem.rate || "---"}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-xl font-bold">{t("Currency")}:</p>
                            <p className="text-xl">{selectedItem.currency || "---"}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-xl font-bold">{t("Amount")}:</p>
                            <p className="text-xl">{selectedItem.amount.toLocaleString() || "---"}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-xl font-bold">{t("Fee")}:</p>
                            <p className="text-xl">{selectedItem.fee || "---"}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-xl font-bold">{t("ExternalID")}:</p>
                            <p className="text-sm">{selectedItem.ExtId || "---"}</p>
                        </div>
                    </div>
                    <Button className="bg-gray-500" onClick={toggleModal} style={{ marginTop: '10px', backgroundColor: "#F4F4F4", color: '#000' }}>{t("Close")}</Button>
                </div>
            </Dialog>
        </>
    );
}