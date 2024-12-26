import React, { useState } from 'react';
import { BottomNavigation, BottomNavigationAction, Box, Card, CardContent, Typography, Avatar, Divider, Link } from '@mui/material';
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

const Users = () => {
  const [selectedTab, setSelectedTab] = useState<number>(0);

  const handleChange = (event: any, newValue: number) => {
    setSelectedTab(newValue);
  };

  const renderPage = () => {
    switch (selectedTab) {
      case 0:
        return <Attendance />;
      case 1:
        return <Leave />;
      case 2:
        return <Folder />;
      case 3:
        return <Assets />;
      case 4:
        return <History />;
      case 5:
        return <Salary />;
      case 6:
        return <PayRun />;
      case 7:
        return <Slip />;
      case 8:
        return <Address />;
      case 9:
        return <Contacts />;
      case 10:
        return <Social />;
      default:
        return <Attendance />;
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'grey.100', p: 3 }}>
      <Breadcrumb pageName="Users" />

      <Box sx={{ maxWidth: 'lg', mx: 'auto', mt: 4 }} gap={5} display={'flex'} >
        <Card className='w-auto'>
          <CardContent>
            {/* User Info */}
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
              <Box sx={{display:'flex', }}>
                <Avatar
                  src="https://picsum.photos/500"
                  alt="User Avatar"
                  sx={{ width: 96, height: 96, border: '2px solid', borderColor: 'grey.300' }}
                />
                <Typography variant="h6" mb={3} fontWeight="bold">
                  Kimi Räikkönen
                  <Typography color="text.secondary">UX Designer</Typography>
                </Typography>
              </Box>
              <Box sx={{ mt: { xs: 2, md: 0 } }}>

                <Typography mb={3} variant="body2" color="text.secondary" mt={1}>
                  Admin & HRM Department
                </Typography>
                <Typography sx={{ display: 'flex', flexDirection: 'column' }} mb={3} variant="body1" fontWeight="bold" color="success.main">
                  <span>
                    $40,000
                  </span>
                  <span className='text-sm text-gray'>
                    Salary
                  </span>
                </Typography>
                <Typography color="text.secondary">Regular Work Shift</Typography>
                <Typography color="text.secondary">Joined: 12 February 2023</Typography>
              </Box>
            </Box>
            <Box mb={3}>
              <Typography variant="subtitle1" fontWeight="bold">
                Contact
              </Typography>
              <Typography color="text.secondary">Email: alwisyuryatmaja@gmail.com</Typography>
              <Typography color="text.secondary">Phone: +6282233836756</Typography>
              <Link href="#" color="primary" underline="hover">
                Website
              </Link>
            </Box>


          </CardContent>
        </Card>
        <Card sx={{ width: '70%', paddingX: '10px' }}>
          <BottomNavigation className='overflow-x-auto' sx={{paddingX: '10px', paddingLeft:'20px'}} value={selectedTab} onChange={handleChange} showLabels>
            <BottomNavigationAction sx={{marginLeft: '20px'}} label="Attendance" />
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
