import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import Settings from './pages/Settings';
import Buttons from './pages/UiElements/Buttons';
import DefaultLayout from './layout/DefaultLayout';
import User from './pages/User';
import Transactions from './pages/Transactions';
import Partners from './pages/Partners/Partners';
import PartnerDetials from './pages/Partners/partnerDetials';

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
    { path: '/transactions', element: <Transactions />, title: 'Tables | Leave' },
    { path: '/settings', element: <Settings />, title: 'Settings | TailAdmin - Tailwind CSS Admin Dashboard Template' },
    { path: '/chart', element: <Chart />, title: 'Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template' },
    { path: '/partners', element: <Partners />, title: 'Alerts | TailAdmin - Tailwind CSS Admin Dashboard Template' },
    { path: '/partnerDetials/:id', element: <PartnerDetials />, title: 'Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template' },
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
