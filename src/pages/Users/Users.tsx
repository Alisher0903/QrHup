import React, { useState } from 'react';
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Divider,
} from '@mui/material';
import Attendance from './Views/Attendance';
import Leave from './Views/Leave';
import Folder from './Views/Folder';
import Assets from './Views/Assets';
import History from './Views/History';
import Salary from './Views/Salary';
import PayRun from './Views/PayRun';
import Slip from './Views/Slip';
import Address from './Views/Address';
import Contacts from './Views/Contacts';
import Social from './Views/Social';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { BsBag, BsPhone } from 'react-icons/bs';
import { LuWallet } from 'react-icons/lu';
import { IoMdTime } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { MdLanguage } from 'react-icons/md';
import Allowance from './Views/Allowance';

const Users = () => {
  const [selectedTab, setSelectedTab] = useState<number>(0);

  const handleChange = (event: any, newValue: number) => {
    setSelectedTab(newValue);
  };

  const renderPage = () => {
    switch (selectedTab) {
      case 0:
        return <Allowance />;
      case 1:
        return <Attendance />;
      case 2:
        return <Leave />;
      case 3:
        return <Folder />;
      case 4:
        return <Assets />;
      case 5:
        return <History />;
      case 6:
        return <Salary />;
      case 7:
        return <PayRun />;
      case 8:
        return <Slip />;
      case 9:
        return <Address />;
      case 10:
        return <Contacts />;
      case 11:
        return <Social />;
      default:
        return <Attendance />;
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'grey.100', p: 3 }}>
      <Breadcrumb pageName="Users" />

      <Box sx={{ maxWidth: 'lg', mx: 'auto', mt: 4 }} gap={5} display={'flex'}>
        <Card className="w-[35%]">
          <CardContent>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'row', md: 'column' },
                alignItems: { md: 'start' },
                pb: 3,
                borderBottom: '1px solid',
                borderColor: 'grey.300',
                mb: 3,
                justifyContent: 'start',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  marginBottom: 2,
                  justifyContent: 'center',
                  gap: 1,
                  alignItems: 'center',
                }}
              >
                <Avatar
                  src="https://picsum.photos/500"
                  alt="User Avatar"
                  sx={{
                    width: 70,
                    height: 70,
                    border: '2px solid',
                    borderColor: 'grey.300',
                  }}
                />
                <Typography mt={2} mb={3} fontWeight="bold">
                  Kimi Räikkönen
                  <Typography
                    color="text.secondary"
                    fontWeight="normal"
                    className="font-normal"
                  >
                    UX Designer
                  </Typography>
                </Typography>
              </Box>
              <Box sx={{ mt: { xs: 2, md: 0 } }}>
                <Typography
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'row',
                    gap: 2,
                  }}
                  mb={3}
                  variant="body1"
                  fontWeight="bold"
                >
                  <Box
                    sx={{ padding: 1, bgcolor: 'lightgray', borderRadius: 1 }}
                  >
                    <BsBag size={25} />
                  </Box>
                  <div className="flex flex-col">
                    <span>Admin & HRM</span>
                    <span className="text-sm font-normal text-gray-400">
                      Department
                    </span>
                  </div>
                </Typography>
                <Typography
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'row',
                    gap: 2,
                  }}
                  mb={3}
                  variant="body1"
                  fontWeight="bold"
                >
                  {/* <BsBag size={25} /> */}
                  <Box
                    sx={{ padding: 1, bgcolor: 'lightgray', borderRadius: 1 }}
                  >
                    <LuWallet size={25} />
                  </Box>
                  <div className="flex flex-col">
                    <Typography fontWeight={'bold'} color="success.main">
                      $40,000
                    </Typography>
                    <span className="text-sm font-normal text-gray-400">
                      Salary
                    </span>
                  </div>
                </Typography>
                <Typography
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'row',
                    gap: 2,
                  }}
                  mb={3}
                  variant="body1"
                  fontWeight="bold"
                >
                  {/* <BsBag size={25} /> */}
                  <Box
                    sx={{ padding: 1, bgcolor: 'lightgray', borderRadius: 1 }}
                  >
                    <IoMdTime size={25} />
                  </Box>
                  <div className="flex flex-col font-bold">
                    <span>Regular</span>
                    <span className="text-sm font-normal text-gray-400">
                      Work Shift
                    </span>
                  </div>
                </Typography>
                <Typography
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'row',
                    gap: 2,
                  }}
                  mb={3}
                  variant="body1"
                  fontWeight="bold"
                >
                  <Box
                    sx={{ padding: 1, bgcolor: 'lightgray', borderRadius: 1 }}
                  >
                    <LuWallet size={25} />
                  </Box>
                  <div className="flex flex-col">
                    <span>$40,000</span>
                    <span className="text-sm font-normal text-gray-400">
                      Salary
                    </span>
                  </div>
                </Typography>
              </Box>
            </Box>
            <Box mb={3}>
              <Typography variant="subtitle1" fontWeight="bold">
                Contact
              </Typography>
              <Typography
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'row',
                  gap: 2,
                  color: 'gray',
                }}
                mb={3}
                variant="body1"
                fontWeight="bold"
              >
                <Box sx={{ padding: 0.2, borderRadius: 1 }}>
                  <LuWallet size={25} />
                </Box>
                <div className="flex flex-col">
                  <span className="text-sm font-normal text-gray-400">
                    Email
                  </span>
                  <span className="text-sm text-black-2">
                    alwissuryatmaja@gmail.com
                  </span>
                </div>
              </Typography>
              <Typography
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'row',
                  gap: 2,
                  color: 'gray',
                }}
                mb={3}
                variant="body1"
                fontWeight="bold"
              >
                <Box sx={{ padding: 0.2, borderRadius: 1 }}>
                  <BsPhone size={25} />
                </Box>
                <div className="flex flex-col">
                  <span className="text-sm font-normal text-gray-400">
                    Phone
                  </span>
                  <span className="text-sm text-black-2">+6282283386756</span>
                </div>
              </Typography>
              <Typography
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'row',
                  gap: 2,
                  color: 'gray',
                }}
                mb={3}
                variant="body1"
                fontWeight="bold"
              >
                <Box sx={{ padding: 0.2, borderRadius: 1 }}>
                  <MdLanguage size={25} />
                </Box>
                <div className="flex flex-col">
                  <span className="text-sm font-normal text-gray-400">
                    Website
                  </span>
                  <Link to="/" className="text-sm text-blue-500 underline">
                    https://bit.ly/3uOJF79
                  </Link>
                </div>
              </Typography>
            </Box>
          </CardContent>
        </Card>
        <Card sx={{ width: '70', paddingX: '10px' }}>
          <BottomNavigation
            className="overflow-x-auto"
            sx={{ paddingX: '10px', paddingLeft: '150px' }}
            value={selectedTab}
            onChange={handleChange}
            showLabels
          >
            <BottomNavigationAction label="Allowance" />
            <BottomNavigationAction label="Attendance" />
            <BottomNavigationAction label="Leave" />
            <BottomNavigationAction label="Folder" />
            <BottomNavigationAction label="Assets" />
            <BottomNavigationAction label="History" />
            <BottomNavigationAction label="Salary" />
            <BottomNavigationAction label="Pay Run" />
            <BottomNavigationAction label="Slip" />
            <BottomNavigationAction label="Address" />
            <BottomNavigationAction label="Contacts" />
            <BottomNavigationAction label="Social" />
          </BottomNavigation>
          <Box mt={3}>{renderPage()}</Box>
        </Card>
      </Box>
    </Box>
  );
};

export default Users;
