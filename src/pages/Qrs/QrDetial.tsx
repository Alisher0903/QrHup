import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import { IoChevronBackOutline } from 'react-icons/io5';
import { QRCode } from 'antd';
import { useEffect } from 'react';
import { useGlobalRequest } from '../../hooks/GlobalHook';
import { qrGetone } from '../../hooks/url';

export default function QrDetial() {
    const { id } = useParams<string>();
    const navigator = useNavigate();
    const qrGetOne = useGlobalRequest(`${qrGetone}/${id}`, 'GET');

    useEffect(() => {
        qrGetOne.globalDataFunc();
    }, [])

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
                                <p className="text-sm font-semibold min-w-20">Redirect url:</p>
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
    );
}
