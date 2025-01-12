import React from 'react';
import ChartThree from '../../components/Charts/ChartThree';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { Table, TableHead, TableBody, TableRow, TableCell, TableContainer } from '@mui/material';

const rows = [
  { name: 'Jeremy Neigh', punchIn: '9/23/16', punchOut: '5:00 PM', type: 'Admin', totalHours: 8, status: 'Active', action: 'Edit' },
  { name: 'Annette Black', punchIn: '7/27/13', punchOut: '4:00 PM', type: 'User', totalHours: 7, status: 'Inactive', action: 'Edit' },
  { name: 'Theresa Webb', punchIn: '11/7/16', punchOut: '6:00 PM', type: 'Manager', totalHours: 9, status: 'Active', action: 'Edit' },
  { name: 'Kathryn Murphy', punchIn: '11/7/16', punchOut: '3:00 PM', type: 'User', totalHours: 6, status: 'Active', action: 'Edit' },
  { name: 'Courtney Henry', punchIn: '11/7/16', punchOut: '5:00 PM', type: 'Admin', totalHours: 8, status: 'Inactive', action: 'Edit' },
  { name: 'Jane Cooper', punchIn: '11/7/16', punchOut: '4:30 PM', type: 'Manager', totalHours: 8, status: 'Active', action: 'Edit' },
];

const ECommerce: React.FC = () => {
  return (
    <>
      <Breadcrumb pageName="Statistics" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 ">
        <div className="flex flex-col border rounded-xl bg-white shadow-2 p-6 gap-6 ">
          <h3 className="font-medium text-black ">E-commerce Overview</h3>
          <p className="text-3xl text-blue-600">0</p>
        </div>
        <div className="flex flex-col border rounded-xl bg-white shadow-2 p-6 gap-6 ">
          <h3 className="font-medium text-black ">E-commerce Overview</h3>
          <p className="text-3xl text-blue-600">0</p>
        </div>
        <div className="flex flex-col border rounded-xl bg-white shadow-2 p-6 gap-6 ">
          <h3 className="font-medium text-black">E-commerce Overview</h3>
          <p className="text-3xl text-blue-600">0</p>
        </div>
      </div>

      <div className="mt-4 mb-10 bg-white grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-2">
        <div className="">
          <ChartThree />
        </div>
        <div className="bg-white grid grid-cols-1 px-5 py-10 md:grid-cols-2 md:gap-6 xl:grid-cols-1">
          <div className="flex justify-between border rounded-xl bg-white shadow-1 p-6 gap-6 ">
            <div className="border-r-2 w-full">
              <p className="text-3xl text-black">12</p>
              <p className="text-[15px] text-gray-500">Total transaction volume</p>
            </div>
            <div className="w-full">
              <p className="text-3xl text-black">45</p>
              <p className="text-[15px] text-gray-500">Active users</p>
            </div>
          </div>
          <div className="flex justify-between border rounded-xl bg-white shadow-1 p-6 gap-6 ">
            <div className="border-r-2 w-full">
              <p className="text-3xl text-black">890</p>
              <p className="text-[15px] text-gray-500">Active users</p>
            </div>
            <div className="w-full">
              <p className="text-3xl text-black">313/23</p>
              <p className="text-[15px] text-gray-500">Successful/unsuccessful</p>
            </div>
          </div>
        </div>
      </div>

      <TableContainer>
        <Table className='bg-white' sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow className='bg-gray-300'>
              <TableCell>Profile</TableCell>
              <TableCell align="right">Punch In</TableCell>
              <TableCell align="right">Punched Out</TableCell>
              <TableCell align="right">Type</TableCell>
              <TableCell align="right">Total hours</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.punchIn}</TableCell>
                <TableCell align="right">{row.punchOut}</TableCell>
                <TableCell align="right">{row.type}</TableCell>
                <TableCell align="right">{row.totalHours}</TableCell>
                <TableCell align="right">{row.status}</TableCell>
                <TableCell align="right">{row.action}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> 
    </>
  );
};

export default ECommerce;
