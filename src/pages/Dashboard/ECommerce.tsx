import { useEffect, useState } from 'react';
import ChartThree from '../../components/Charts/ChartThree';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Box, CircularProgress, Typography } from '@mui/material';
import { useGlobalRequest } from '../../hooks/GlobalHook';
import { ActionGet, statistic_dashboard_merchants, statistic_dashboard_transactions, statistic_dashboard_transactions_diagram } from '../../hooks/url';
import { useTranslation } from 'react-i18next';

const ECommerce: React.FC = () => {
  // const [page, setPage] = useState(0)
  const { t } = useTranslation()
  const currentDate = new Date();
  const currentYear = String(currentDate.getFullYear());
  const currentMonth = String(currentDate.getMonth() + 1).padStart(2, "0");

  const [year, setYear] = useState<string | null>(null);
  const [month, setMonth] = useState<string | null>(null);

  const getTransactionStatistic = useGlobalRequest(statistic_dashboard_transactions, "GET");
  const getMerchantsStatistic = useGlobalRequest(statistic_dashboard_merchants, "GET");
  const getTransactionStatisticDiagram = useGlobalRequest(`${statistic_dashboard_transactions_diagram}?year=${year ? year : currentYear}&month=${month ? month : currentMonth}`, "GET");
  const actionGet = useGlobalRequest(
    `${ActionGet}?page=0&size=10`,
    "GET"
  );
  useEffect(() => {
    getTransactionStatistic.globalDataFunc();
    actionGet.globalDataFunc();
    getMerchantsStatistic.globalDataFunc();
  }, []);

  useEffect(() => {
    getTransactionStatisticDiagram.globalDataFunc();
  }, [year, month]);

  return (
    <div className='w-full'>
      <Breadcrumb pageName={t("statistics")} />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4">
        <div className="flex flex-col border rounded-xl bg-white shadow-2 p-6 gap-4 ">
          <h3 className="font-medium text-black ">{t("ActiveNerchants")}</h3>
          <p className="text-2xl text-blue-600">{getMerchantsStatistic.response?.activeMerchantCount || "0"}</p>
        </div>
        <div className="flex flex-col border rounded-xl bg-white shadow-2 p-6 gap-4 ">
          <h3 className="font-medium text-black ">{t("InactiveMerchants")}</h3>
          <p className="text-2xl text-blue-600">{getMerchantsStatistic.response?.noActiveMerchantCount || "0"}</p>
        </div>
        <div className="flex flex-col border rounded-xl bg-white shadow-2 p-6 gap-4 ">
          <h3 className="font-medium text-black">{t("ActiveTerminals")}</h3>
          <p className="text-2xl text-blue-600">{getMerchantsStatistic.response?.activeTerminalCount || "0"}</p>
        </div>
        <div className="flex flex-col border rounded-xl bg-white shadow-2 p-6 gap-4 ">
          <h3 className="font-medium text-black"> {t("InactiveTerminals")}</h3>
          <p className="text-2xl text-blue-600">{getMerchantsStatistic.response?.noActiveTerminalCount || "0"}</p>
        </div>
        <div className="flex flex-col border rounded-xl bg-white shadow-2 p-6 gap-4 ">
          <h3 className="font-medium text-black"> {t("ActivePartner")}</h3>
          <p className="text-2xl text-blue-600">{getTransactionStatistic.response?.activePartnerCount|| "0"}</p>
        </div>
        <div className="flex flex-col border rounded-xl bg-white shadow-2 p-6 gap-4 ">
          <h3 className="font-medium text-black"> {t("InactivePartner")}</h3>
          <p className="text-2xl text-blue-600">{getTransactionStatistic.response?.notActivePartnerCount|| "0"}</p>
        </div>
      </div>

      <div className="mt-4 mb-10 bg-white grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-2">
        <div className="relative w-full h-64 md:h-80 xl:h-96">
          <ChartThree
            data={getTransactionStatisticDiagram?.response}
            setMonth={setMonth}
            setYear={setYear}
          />
        </div>

        <div className="bg-white grid grid-cols-1 gap-4 p-4">
          <div className="flex flex-col sm:flex-row border rounded-xl bg-white shadow-1 p-4 sm:p-6">
            <div className="flex-1 border-b-2 sm:border-b-0 sm:border-r-2 pb-4 sm:pb-0 sm:pr-6">
              <p className="text-xl sm:text-2xl md:text-3xl text-black text-center sm:text-left">
                {getTransactionStatistic.response?.totalTransAmount ? getTransactionStatistic.response?.totalTransAmount.toFixed() : "0"}
              </p>
              <p className="text-[13px] sm:text-[15px] text-gray-500 text-center sm:text-left mt-2">
                {t("TotalTransactionVolume")}
              </p>
            </div>
            <div className="flex-1 pt-4 sm:pt-0 sm:pl-6">
              <p className="text-xl sm:text-2xl md:text-3xl text-black text-center sm:text-left">
                {/* {getTransactionStatistic.response?.activePartnerCount || "0"} */}
                {getTransactionStatistic.response?.completedTransCount ? getTransactionStatistic.response?.completedTransCount.toFixed() : "0"}
              </p>
              <p className="text-[13px] sm:text-[15px] text-gray-500 text-center sm:text-left mt-2">
                {t("Successful")}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row border rounded-xl bg-white shadow-1 p-4 sm:p-6">
            <div className="flex-1 border-b-2 sm:border-b-0 sm:border-r-2 pb-4 sm:pb-0 sm:pr-6">
              <p className="text-xl sm:text-2xl md:text-3xl text-black text-center sm:text-left">
                {getTransactionStatistic.response?.averageTransAmount ? getTransactionStatistic.response?.averageTransAmount.toFixed() : "0"}
              </p>
              <p className="text-[13px] sm:text-[15px] text-gray-500 text-center sm:text-left mt-2">
                {t("AvarageChequeAmount")}
              </p>
            </div>
            <div className="flex-1 pt-4 sm:pt-0 sm:pl-6">
              <p className="text-xl sm:text-2xl md:text-3xl text-black text-center sm:text-left">
                {getTransactionStatistic.response?.canceledTransCount || "0"}
              </p>
              <p className="text-[13px] sm:text-[15px] text-gray-500 text-center sm:text-left mt-2">
                {t("Unsuccessful")}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className='py-2'>
        <p className='text-2xl mb-2 font-semibold text-black'>{t('ActionsSystem')}</p>
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
            {/* Failed to load data */}
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
                  <TableCell className="border-l min-w-[200px]" align="left">{t("UserName")}</TableCell>
                  <TableCell className="border-l min-w-[200px]" align="left">{t("Action")}</TableCell>
                  <TableCell className="border-l min-w-[200px]" align="left">{t("CreateTime")}</TableCell>
                  <TableCell className="border-l min-w-[200px]" align="left">{t("Table")}</TableCell>
                  <TableCell className="border-l min-w-[200px]" align="left">{t("ObjectId")}</TableCell>
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
                          ? user.createdAt.slice(0, 10)
                          : "-"
                        }
                        {" "}
                        {user?.createdAt
                          ? user.createdAt.slice(11, 16)
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
            {/* <Pagination
                        defaultCurrent={1}
                        current={page + 1}
                        total={actionGet?.totalPage || 0}
                        onChange={async (pageNumber: number, pageSize: number) => {
                            // await setSize(pageSize);
                            await setPage(pageNumber - 1);
                            // await globalDataFunc();
                        }}
                        showSizeChanger={true}
                    /> */}
          </TableContainer>
        )}
      </TableContainer>
    </div>
  );
};

export default ECommerce;
