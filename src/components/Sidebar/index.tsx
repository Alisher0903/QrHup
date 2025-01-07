import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Logo from '../../images/logo/logo.svg';
import { RxDashboard } from "react-icons/rx";
import { FaRegUser } from "react-icons/fa";
import { TfiControlSkipBackward } from "react-icons/tfi";
import { FaRegFolderClosed } from "react-icons/fa6";
import { PiUsersThreeBold } from "react-icons/pi";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-99 flex h-screen w-72.5 flex-col overflow-y-hidden bg-white duration-300 ease-linear lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
    >
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <NavLink to="/">
          <img src={Logo} alt="Logo" />
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
        </button>
      </div>
      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          <div>
            <ul className="mb-6 flex flex-col gap-1.5">
              <NavLink
                to="/"
                className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-black duration-300 ease-in-out hover:bg-gray dark:hover:bg-meta-4 ${(pathname === '/' ||
                  pathname.includes('dashboard')) &&
                  'bg-gray-100 text-black'
                  }`}
              >
                <RxDashboard />
                Dashboard
              </NavLink>
              <li>
                <NavLink
                  to="/User"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-black duration-300 ease-in-out hover:bg-gray 
                    ${(pathname === '/User' ||
                      pathname.includes('/User')) &&
                    'bg-gray-100 text-black'
                    }`}
                >
                  <FaRegUser />
                  User
                </NavLink>
              </li>


              <li>
                <NavLink
                  to="/transactions"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-black duration-300 ease-in-out hover:bg-gray 
                    ${(pathname === '/transactions' ||
                      pathname.includes('/transactions')) &&
                    'bg-gray-100 text-black'
                    }`}
                >
                  <TfiControlSkipBackward />
                  Transactions
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/partners"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-black duration-300 ease-in-out hover:bg-gray 
                    ${(pathname === '/partners' ||
                      pathname.includes('/partners')) &&
                    'bg-gray-100 text-black'
                    }`}
                >
                  <PiUsersThreeBold  />
                  Partners
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/administration"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-black duration-300 ease-in-out hover:bg-gray 
                    ${(pathname === '/administration' ||
                      pathname.includes('/administration')) &&
                    'bg-gray-100 text-black'
                    }`}
                >
                  <FaRegFolderClosed />
                  Administration
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/settings"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes('settings') &&
                    'bg-graydark dark:bg-meta-4'
                    }`}
                >
                  Settings
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
