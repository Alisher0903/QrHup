import { Button } from 'antd'
import OTP from 'antd/es/input/OTP'
import { useEffect, useState } from 'react';
import { CiLock } from 'react-icons/ci';
import { useParams } from 'react-router-dom';
import { useGlobalRequest } from '../hooks/GlobalHook';
import { Generate } from '../hooks/url';
import toast from 'react-hot-toast';

export default function Generated() {
    const [otp, setOtp] = useState('');
    const [isTrue, setIsTrue] = useState<boolean>(true);
    const { ApiKey } = useParams<string>();
    const { globalDataFunc, error, response } = useGlobalRequest(`${Generate}${ApiKey}/${otp}`, 'GET')
    function handlesend() {
        globalDataFunc();
    }
    useEffect(() => {
        if (response) {
            toast.success(response)
            setIsTrue(false)
        } else if (error) {
            toast.error(error)
        }
    }, [otp, response, error])
    return (
        <div className="absolute w-full top-0 left-0 min-h-screen bg-[#0b1124] flex items-center justify-center">
            {isTrue ? <div className="w-full max-w-md rounded-lg p-6">
                <div className="text-center flex flex-col justify-center items-center gap-4">
                    <h1 className="text-3xl font-bold text-white">QR-HUB</h1>
                    <p className="text-sm text-gray-400 mt-4 p-3 rounded-full bg-[#A0C1FF]"><CiLock size={30} color='black' /></p>
                    <h2 className="text-xl text-gray-300">
                        Get your partnership API Key
                    </h2>
                </div>
                <div className="mt-8 bg-gray-100 p-6 rounded-md">
                    <h3 className="text-lg font-medium text-gray-700 text-center">
                        OTP Verification
                    </h3>
                    <div className="flex h-19 justify-center gap-3 mt-4">
                        {/* OTP Inputs */}
                        <OTP className='min-h-10' value={otp} onChange={(value) => {
                            setOtp(value)
                            // console.log(value);
                        }} length={6} />
                    </div>

                    <div className="mt-6 text-center">
                        <Button
                            type="primary"
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                            onClick={() => {
                                handlesend()
                            }}
                        >
                            Verify OTP
                        </Button>
                    </div>
                </div>
            </div> :
                <div className='flex flex-col'>
                    <div className="text-center flex flex-col justify-center items-center gap-4">
                        <h1 className="text-3xl font-bold text-white">QR-HUB</h1>
                        {/* <p className="text-sm text-gray-400 mt-4 p-3 rounded-full bg-[#A0C1FF]"><CiLock size={30} color='black' /></p> */}
                        <h2 className="text-xl text-gray-300">
                            Contgratulations you have succesfully confirmed
                        </h2>
                        <h3 className="text-lg font-medium text-gray-100 text-center">
                            Here is your partnership API Key:
                        </h3>
                    </div>
                    <div className="mt-8 bg-gray-100 p-6 rounded-md">
                        {response}
                    </div></div>}

        </div>
    )
}
