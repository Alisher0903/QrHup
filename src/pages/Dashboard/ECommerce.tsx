import React, { useEffect, useState } from 'react';
import ChartThree from '../../components/Charts/ChartThree';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Box, CircularProgress, Typography } from '@mui/material';
import { useGlobalRequest } from '../../hooks/GlobalHook';
import { ActionGet, statistic_dashboard_transactions, statistic_dashboard_transactions_diagram } from '../../hooks/url';

const ECommerce: React.FC = () => {
  const currentDate = new Date();
  const currentYear = String(currentDate.getFullYear());
  const currentMonth = String(currentDate.getMonth() + 1).padStart(2, "0"); // Oyni 01 formatida olish

  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(currentMonth);

  const getTransactionStatistic = useGlobalRequest(statistic_dashboard_transactions, "GET");
  const getTransactionStatisticDiagram = useGlobalRequest(`${statistic_dashboard_transactions_diagram}?year=${year}&month=${month}`, "GET");
  const actionGet = useGlobalRequest(
    `${ActionGet}?page=0&size=10`,
    "GET"
  );
  useEffect(() => {
    getTransactionStatistic.globalDataFunc();
    actionGet.globalDataFunc();
  }, []);

  useEffect(() => {
    getTransactionStatisticDiagram.globalDataFunc();
  }, [year, month]);

  const rows = [
    { name: 'Jeremy Neigh', punchIn: '9/23/16', punchOut: '5:00 PM', type: 'Admin', totalHours: 8, status: 'Active', action: 'Edit' },
    { name: 'Annette Black', punchIn: '7/27/13', punchOut: '4:00 PM', type: 'User', totalHours: 7, status: 'Inactive', action: 'Edit' },
    { name: 'Theresa Webb', punchIn: '11/7/16', punchOut: '6:00 PM', type: 'Manager', totalHours: 9, status: 'Active', action: 'Edit' },
    { name: 'Kathryn Murphy', punchIn: '11/7/16', punchOut: '3:00 PM', type: 'User', totalHours: 6, status: 'Active', action: 'Edit' },
    { name: 'Courtney Henry', punchIn: '11/7/16', punchOut: '5:00 PM', type: 'Admin', totalHours: 8, status: 'Inactive', action: 'Edit' },
    { name: 'Jane Cooper', punchIn: '11/7/16', punchOut: '4:30 PM', type: 'Manager', totalHours: 8, status: 'Active', action: 'Edit' },
  ];

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
          <ChartThree
            data={getTransactionStatisticDiagram?.response}
            setMonth={setMonth}
            setYear={setYear}
          />
        </div>
        <div className="bg-white grid grid-cols-1 px-5 py-10 md:grid-cols-2 md:gap-6 xl:grid-cols-1">
          <div className="flex justify-between border rounded-xl bg-white shadow-1 p-6 gap-6 ">
            <div className="border-r-2 w-full">
              <p className="text-3xl text-black">{getTransactionStatistic.response?.totalTransAmount || "0"}</p>
              <p className="text-[15px] text-gray-500">Total transaction volume</p>
            </div>
            <div className="w-full">
              <p className="text-3xl text-black">{getTransactionStatistic.response?.activePartnerCount || "0"}</p>
              <p className="text-[15px] text-gray-500">Active users</p>
            </div>
          </div>
          <div className="flex justify-between border rounded-xl bg-white shadow-1 p-6 gap-6 ">
            <div className="border-r-2 w-full">
              <p className="text-3xl text-black">{getTransactionStatistic.response?.averageTransAmount || "0"}</p>
              <p className="text-[15px] text-gray-500">Avarage cheque amount</p>
            </div>
            <div className="w-full">
              <p className="text-3xl text-black">{getTransactionStatistic.response?.completedTransCount || "0"}/{getTransactionStatistic.response?.canceledTransCount || "0"}</p>
              <p className="text-[15px] text-gray-500">Successful/unsuccessful</p>
            </div>
          </div>
        </div>
      </div>
      <TableContainer>

        {actionGet.loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "200px",
            }}
          >
            <CircularProgress />
          </Box>
        ) : actionGet.error ? (
          <Typography color="error" textAlign="center">
            Failed to load data
          </Typography>
        ) : (
          <TableContainer>
            <Table
              className="bg-white"
              sx={{ minWidth: 650 }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow className="bg-gray-300">
                  <TableCell className="border-l">No</TableCell>
                  <TableCell className="border-l min-w-[200px]" align="left">User name</TableCell>
                  <TableCell className="border-l min-w-[200px]" align="left">Action</TableCell>
                  <TableCell className="border-l min-w-[200px]" align="left">Create time</TableCell>
                  <TableCell className="border-l min-w-[200px]" align="left">Table</TableCell>
                  <TableCell className="border-l min-w-[200px]" align="left">Object id</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {actionGet.response?.object?.map(
                  (user: any, index: number) => (
                    <TableRow key={user.id || index}>
                      <TableCell>{(index + 1)}</TableCell>
                      <TableCell align="left">
                        {user.fullName || "-"}
                      </TableCell>
                      <TableCell align="left">
                        {user.status || "-"}
                      </TableCell>
                      <TableCell align="left">
                        {user?.createdAt
                          ? new Date(user.createdAt).toISOString().split('T')[0]
                          : "-"
                        }
                      </TableCell>
                      <TableCell align="left">
                        {user.tableName || "-"}
                      </TableCell>
                      <TableCell align="left">
                        {user.tableId || "-"}
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </TableContainer>
    </>
  );
};

export default ECommerce;
