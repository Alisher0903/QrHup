import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import DefaultLayout from './layout/DefaultLayout';
import User from './pages/User';
import Partners from './pages/Partners/Partners';
import PartnerDetials from './pages/Partners/partnerDetials';
import Merchant from './pages/Merchant/Merchant';
import MerchantDetials from './pages/Merchant/MerchantDetails';
import Qrs from './pages/Qrs/Qrs';
import QrDetial from './pages/Qrs/QrDetial';
import Mcc from './pages/MCC/mcc';
import Action from './pages/Action/Action';
import Currency from './pages/Currency/Currency';
import ActionModerator from './pages/MaderatorPage/ActionModerator';
import Clarify from './pages/MaderatorPage/clarify';
import AdminTransactions from './pages/Admin-Transactions/admin-transactions';
import Generated from './pages/Generated';
import { useTranslation } from 'react-i18next';
import ViewQr from './pages/viewQr';

interface RouteConfig {
  path: string;
  element: JSX.Element;
  title: string;
}

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation()

  const routes: RouteConfig[] = [
    { path: '/', element: <ECommerce />, title: t('Dashboard') },
    { path: '/User', element: <User />, title: t('AllUser') },
    { path: '/Qrs', element: <Qrs />, title: t('AllQRs') },
    { path: '/admin/transactions', element: <AdminTransactions />, title: t('AllTransactions') },
    { path: '/mcc', element: <Mcc />, title: t('mcc') },
    { path: '/action', element: <Action />, title: t('Action') },
    { path: '/currency', element: <Currency />, title: t('Currency')},
    { path: '/merchant', element: <Merchant />, title: t('AllMerchants') },
    { path: '/chart', element: <Chart />, title: 'Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template' },
    { path: '/partners', element: <Partners />, title: t('AllPartners') },
    { path: '/partnersDetials/:id', element: <PartnerDetials />, title: 'Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template' },
    { path: '/merchantDetials/:id', element: <MerchantDetials />, title: 'Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template' },
    { path: '/qrDetial/:id', element: <QrDetial />, title: 'Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template' },
    { path: '/auth/signin', element: <SignIn />, title: 'Signin ' },
    { path: '/generated/:ApiKey', element: <Generated />, title: 'Generated' },
    { path: '/view/qrcode/:id', element: <ViewQr />, title: 'View | qr' },

    // Moderator
    {
      path: '/moderator/Action',
      element: <ActionModerator />,
      title: t('Action'),
    },
    {
      path: '/moderator/clarify',
      element: <Clarify />,
      title: t('Clarify'),
    },
  ];

  // Check authentication and navigate accordingly
  useEffect(() => {
    const checkAuth = () => {
      const token = sessionStorage.getItem('token');
      const role = sessionStorage.getItem('role');
      const isApiKeyRoute = /^\/generated\/[^/]+$/.test(pathname);
      const isQrCheckApi = /^\/view\/qrcode\/[^/]+$/.test(pathname);

      if (!role && !isApiKeyRoute && !token && !isQrCheckApi) {
        navigate('/auth/signin');
        setLoading(false);
      } else {
        setLoading(false);
      }
    };

    checkAuth();
    console.clear
  }, [navigate, pathname]);
  // useEffect(() => {
  //   const clearConsoleOnMouseMove = () => {
  //     console.clear();
  //   };

  //   window.addEventListener("mousemove", clearConsoleOnMouseMove);

  //   return () => {
  //     window.removeEventListener("mousemove", clearConsoleOnMouseMove);
  //   };
  // }, []);
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      // = () => { };
      console.warn = () => { };
      console.error = () => { };
    }

    console.clear();
  }, []);
  useEffect(() => {
    const clearConsole = () => {
      setTimeout(() => {
        console.clear();
      }, 1000);
    };

    clearConsole();
  }, []);
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
    console.clear
  }, [pathname]);

  return loading ? (
    <Loader />
  ) : (
    <DefaultLayout>
      <Routes>
        {routes.map(({ path, element, title }) => (
          <Route
            key={path}
            path={path}
            element={
              <>
                <PageTitle title={title} />
                {element}
              </>
            }
          />
        ))}
      </Routes>
    </DefaultLayout>
  );
}

export default App;
