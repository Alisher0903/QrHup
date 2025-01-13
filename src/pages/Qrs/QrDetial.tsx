import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import { IoChevronBackOutline, IoChevronForwardCircle, IoChevronForwardOutline } from 'react-icons/io5';
import { Pagination, QRCode } from 'antd';
import { useEffect, useState } from 'react';
import { useGlobalRequest } from '../../hooks/GlobalHook';
import { getTransactionsByQrId, qrGetone } from '../../hooks/url';

export default function QrDetial() {
    const { id } = useParams<string>();
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const navigator = useNavigate();
    const qrGetOne = useGlobalRequest(`${qrGetone}/${id}`, 'GET');
    const qrGetTransactions = useGlobalRequest(`${getTransactionsByQrId}/${id}?page=${page}&size=${size}`, 'GET');
    const [isOpen, setIsopen] = useState(false);

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
                                    <p className="text-sm font-semibold">External ID:</p>
                                    <p className="text-sm font-semibold">
                                        {id || '-'}
                                    </p>
                                </div>
                                <div className="flex justify-between pb-2 border-b-[1px] border-gray-500">
                                    <p className="text-sm font-semibold">Partner</p>
                                    <p className="text-sm font-semibold">
                                        {qrGetOne.response?.partner || '-'}
                                    </p>
                                </div>
                                <div className="flex justify-between pb-2 border-b-[1px] border-gray-500">
                                    <p className="text-sm font-semibold">Type</p>
                                    <p className="text-sm font-semibold">
                                        {qrGetOne.response?.type || '-'}
                                    </p>
                                </div>
                                <div className="flex justify-between pb-2 border-b-[1px] border-gray-500">
                                    <p className="text-sm font-semibold">Minimum amount</p>
                                    <p className="text-sm font-semibold">
                                        {qrGetOne.response?.minAmount || '0'}
                                    </p>
                                </div>
                                <div className="flex justify-between pb-2 border-b-[1px] border-gray-500">
                                    <p className="text-sm font-semibold">Maximum amount</p>
                                    <p className="text-sm font-semibold">
                                        {qrGetOne.response?.maxAmount || '0'}
                                    </p>
                                </div>
                                <div className="flex justify-between pb-2 border-b-[1px] border-gray-500">
                                    <p className="text-sm font-semibold">Currency</p>
                                    <p className="text-sm font-semibold">
                                        {qrGetOne.response?.currency || '-'}
                                    </p>
                                </div>
                                <div className="flex justify-between pb-2 border-b-[1px] border-gray-500">
                                    <p className="text-sm font-semibold">Expire Time</p>
                                    <p className="text-sm font-semibold">
                                        {qrGetOne.response?.expire || '-'}
                                    </p>
                                </div>
                                <div className="flex justify-between pb-2 border-b-[1px] border-gray-500">
                                    <p className="text-sm font-semibold">Created time</p>
                                    <p className="text-sm font-semibold">
                                        {qrGetOne.response?.createDate || '-'}
                                    </p>
                                </div>

                                <div className="flex justify-between pb-2 border-b-[1px] border-gray-500">
                                    <p className="text-sm font-semibold">Status</p>
                                    <p className="text-sm font-semibold">
                                        {qrGetOne.response?.status || '-'}
                                    </p>
                                </div>
                                <div className="flex justify-between pb-2 border-b-[1px] border-gray-500">
                                    <p className="text-sm font-semibold">Redirect url</p>
                                    <p className="text-sm font-semibold">
                                        {qrGetOne.response?.url || '-'}
                                    </p>
                                </div>
                                <div className="flex justify-between pb-2 border-b-[1px] border-gray-500">
                                    <p className="text-sm font-semibold">Purpose</p>
                                    <p className="text-sm font-semibold">
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
                <p className='text-xl py-3'>Transactions</p>
                {qrGetTransactions.response && qrGetTransactions.response?.object && qrGetTransactions.response.object.length !== 0 ?
                    qrGetTransactions.response.object.map((item: any, index: number) => (
                        <div key={index} className='p-5 rounded-xl flex justify-between gap-3 items-center border-[1px] border-black cursor-pointer'>
                            <div className='grid grid-cols-1 lg:grid-cols-2 text-sm gap-3'>
                                <div className=''>
                                    <div className='flex justify-between  border-gray-400 gap-1'>
                                        <p className='text-md font-bold'>Amount:</p>
                                        <p>{item.amount || "--"}</p>
                                    </div>
                                    <div className='flex justify-between  border-gray-400 gap-1'>
                                        <p className='text-md font-bold'>Currency:</p>
                                        <p>{item.currency || "--"}</p>
                                    </div>
                                </div>
                                <div>
                                    <div className='flex justify-between  border-gray-400 gap-1'>
                                        <p className='text-md font-bold'>Payment date:</p>
                                        <p>{item.createdAt || "--"}</p>
                                    </div>
                                    <div className='flex justify-between  border-gray-400 gap-1'>
                                        <p className='text-md font-bold'>Payer bank:</p>
                                        <p>{item.bank || "--"}</p>
                                    </div>
                                </div>
                                <div>
                                    <div className='flex justify-between  border-gray-400 gap-1'>
                                        <p className='text-md font-bold'>External id:</p>
                                        <p>{item.createdAt || "--"}</p>
                                    </div>
                                    <div className='flex justify-between  border-gray-400 gap-1'>
                                        <p className='text-md font-bold'>Fee:</p>
                                        <p>{item.createdAt || "--"}</p>
                                    </div>
                                </div>
                            </div>
                            <div className=' flex justify-end'><IoChevronForwardOutline color="black" size={30} /></div>
                        </div>
                    ))

                    : (
                        <div></div>
                    )}
                <div className='mt-5'>
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
                </div>
            </div>
        </>
    );
}