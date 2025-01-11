import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import DefaultLayout from './layout/DefaultLayout';
import User from './pages/User';
import Transactions from './pages/Transactions';
import Partners from './pages/Partners/Partners';
import PartnerDetials from './pages/Partners/partnerDetials';
import Merchant from './pages/Merchant/Merchant';
import MerchantDetials from './pages/Merchant/MerchantDetails';
import Qrs from './pages/Qrs/Qrs';
import QrDetial from './pages/Qrs/QrDetial';
import Mcc from './pages/MCC/mcc';
import Action from './pages/Action/Action';
import Currency from './pages/Currency/Currency';
import AdminTransactions from './pages/Admin-Transactions/admin-transactions';

interface RouteConfig {
  path: string;
  element: JSX.Element;
  title: string;
}

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const routes: RouteConfig[] = [
    { path: '/', element: <ECommerce />, title: 'Admin | Statistics' },
    { path: '/User', element: <User />, title: 'Admin | User' },
    { path: '/Qrs', element: <Qrs />, title: 'Admin | Qrs' },
    { path: '/admin/transactions', element: <AdminTransactions />, title: 'Admin | Transactions' },
    { path: '/mcc', element: <Mcc />, title: 'Admin | Mcc' },
    { path: '/action', element: <Action />, title: 'Admin | Action' },
    { path: '/currency', element: <Currency />, title: 'Admin | Currency' },
    { path: '/transactions', element: <Transactions />, title: 'Tables | Leave' },
    { path: '/merchant', element: <Merchant />, title: 'Settings | TailAdmin - Tailwind CSS Admin Dashboard Template' },
    { path: '/chart', element: <Chart />, title: 'Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template' },
    { path: '/partners', element: <Partners />, title: 'Alerts | TailAdmin - Tailwind CSS Admin Dashboard Template' },
    { path: '/partnersDetials/:id', element: <PartnerDetials />, title: 'Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template' },
    { path: '/merchantDetials/:id', element: <MerchantDetials />, title: 'Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template' },
    { path: '/qrDetial/:id', element: <QrDetial />, title: 'Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template' },
    { path: '/auth/signin', element: <SignIn />, title: 'Signin | TailAdmin - Tailwind CSS Admin Dashboard Template' },
  ];

  // Check authentication and navigate accordingly
  useEffect(() => {
    const checkAuth = () => {
      setLoading(true);
      const token = sessionStorage.getItem('token');
      if (!token) {
        navigate('/auth/signin');
      }
      setLoading(false);
    };
    checkAuth();
  }, [navigate]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
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
