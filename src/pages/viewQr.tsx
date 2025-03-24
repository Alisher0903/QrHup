import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import logo2 from '../../public/Logo.png';
import { check_qr, test_check_qr } from '../hooks/url';

export default function ViewQr() {
  const { id } = useParams();
  const {pathname} = useLocation();
  

  useEffect(() => {
    getUrlFunction();
  }, [id]);

  const [error, setError] = useState(false);

  const getUrlFunction = async () => {
    try {
      const { data } = await axios.post(`${pathname === 'qrcode/' ? check_qr : test_check_qr}${id}`, {});
      if (data?.data) {
        window.location.href = data.data;
      } else {
        return null;
      }
    } catch (error) {
      setError(true);
    }
  };
  console.log(id);
  
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col gap-10">
        <div>
          <img src={logo2} alt="Logo" className="h-[30px] " />
        </div>
        {error ? (
          <div className="bg-white rounded-lg p-5 w-full h-[400px] flex flex-col justify-center items-center gap-5">
            <h1 className="text-xl text-black font-bold">Извините! Нет активных заказов</h1>
          </div>
        ) : (
          <div className="bg-white rounded-lg p-5 w-full h-[400px] flex flex-col justify-center items-center gap-5">
            <h1 className="text-xl text-black font-bold">Извините! Нет активных заказов</h1>
          </div>
        )}
      </div>
    </div>
  );
}
