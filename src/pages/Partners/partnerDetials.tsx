import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGlobalRequest } from '../../hooks/GlobalHook';
import { MerchantPartner, PartnerStatistic, QrsPartner, TerminalsPartner, TransactionPartner, } from '../../hooks/url';
import { Box, Button, Tab, Table, TableBody, TableCell, TableHead, TableRow, Tabs, Typography, } from '@mui/material';
import { IoChevronBackOutline } from 'react-icons/io5';
import { Pagination } from 'antd';
import { PartnersStore } from '../../hooks/Store/Partners/partnerStore';

export default function PartnerDetials() {
  // States
  const { id } = useParams<string>();
  const [pageQr, setPageQr] = useState(0);
  const [pageMerchant, setPageMerchant] = useState(0);
  const [pageTerminal, setPageTerminal] = useState(0);
  const [pageTransaction, setPageTransaction] = useState(0);
  const [selectedTab, setSelectedTab] = useState(0);
  const { partners } = PartnersStore();

  const handleChange = (_: any | null, newValue: number) => {
    setSelectedTab(newValue);
  };

  const { response: statisticsGet, globalDataFunc: GetSattistics } =
    useGlobalRequest(`${PartnerStatistic}partnerId=${id}`, 'GET');
  const { response: QrGet, globalDataFunc: GetqrCall } = useGlobalRequest(
    `${QrsPartner}partnerId=${id}&page=${pageQr}&size=10`,
    'GET',
  );
  const { response: MerchantGet, globalDataFunc: MerchantEffect } =
    useGlobalRequest(
      `${MerchantPartner}partnerId=${id}&page=${pageMerchant}&size=10`,
      'GET',
    );
  const { response: TerminalGet, globalDataFunc: TerminalEffect } =
    useGlobalRequest(
      `${TerminalsPartner}partnerId=${id}&page=${pageTerminal}&size=10`,
      'GET',
    );

  const { response: TransactionGet, globalDataFunc: TransactionEffect } =
    useGlobalRequest(
      `${TransactionPartner}partnerId=${id}&page=${pageTransaction}&size=10`,
      'GET',
    );

  const navigator = useNavigate();
  useEffect(() => {
    GetSattistics();
    GetqrCall();
    MerchantEffect();
    TerminalEffect();
    TransactionEffect();
  }, [id]);

  return (
    <div className="bg-gray-100  flex flex-col items-center">
      <div className="flex justify-between mb-3 w-full">
        <Button
          className="outline-none border-none hover:bg-transparent"
          onClick={() => {
            navigator(-1);
          }}
        >
          <IoChevronBackOutline color="black" size={30} />
        </Button>
      </div>
      <div className="w-full ">
        <div className="flex justify-between gap-9">
          <div className="w-full bg-white shadow-xl rounded-xl p-6">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between pb-2 border-b-[1px] border-gray-500">
                <p className="text-md font-semibold">Name</p>
                <p className="text-md font-semibold">
                  {partners?.name || '-'}
                </p>
              </div>
              <div className="flex justify-between pb-2 border-b-[1px] border-gray-500">
                <p className="text-md font-semibold">Push url</p>
                <p className="text-md font-semibold">
                  {partners?.url || '-'}
                </p>
              </div>
              <div className="flex justify-between pb-2 border-b-[1px] border-gray-500">
                <p className="text-md font-semibold">Phone number</p>
                <p className="text-md font-semibold">
                  +{partners?.phone || '-'}
                </p>
              </div>
              <div className="flex justify-between pb-2 border-b-[1px] border-gray-500">
                <p className="text-md font-semibold">E-Mail</p>
                <p className="text-md font-semibold">
                  {partners?.email || '-'}
                </p>
              </div>
              <div className="flex justify-between pb-2 border-b-[1px] border-gray-500">
                <p className="text-md font-semibold">Status</p>
                <Typography className={!partners?.active ? "bg-yellow-500 text-center text-white p-3 rounded-lg" : "bg-green-500 text-white text-center p-3 rounded-lg"}>
                  {partners?.active ? "ACTIVE" : "INACTIVE"}
                </Typography>
              </div>
              <div className="flex justify-between pb-2 border-b-[1px] border-gray-500">
                <p className="text-md font-semibold">Address</p>
                <p className="text-md font-semibold">
                  {partners?.address || '-'}
                </p>
              </div>
              <div className="flex justify-between pb-2 border-b-[1px] border-gray-500">
                <p className="text-md font-semibold">INN</p>
                <p className="text-md font-semibold">
                  {partners?.inn || '-'}
                </p>
              </div>
              <div className="flex justify-between pb-2 border-b-[1px] border-gray-500">
                <p className="text-md font-semibold">Api-key</p>
                <p className="text-[15px] font-semibold">
                  {partners?.apiKey || '-'}
                </p>
              </div>
              <div className="flex justify-between pb-2 border-b-[1px] border-gray-500">
                <p className="text-md font-semibold">Account</p>
                <p className="text-md font-semibold">
                  {partners?.account || '-'}
                </p>
              </div>
              <div className="flex justify-between pb-2 border-b-[1px] border-gray-500">
                <p className="text-md font-semibold">MFO</p>
                <p className="text-md font-semibold">
                  {partners?.mfo || '-'}
                </p>
              </div>
              <div className="flex justify-between pb-2 border-b-[1px] border-gray-500">
                <p className="text-md font-semibold">Service fee</p>
                <p className="text-md font-semibold">
                  {partners?.serviceFee || '0'} %
                </p>
              </div>
            </div>
          </div>
          <div className="w-[40%] bg-white shadow-md rounded-xl border-l-2 flex flex-col p-6 gap-5">
            <div className="flex justify-between pb-2  border-b-[1px] border-gray-500">
              <p className="text-md font-semibold">Merchants:</p>
              <p className="text-md font-semibold">
                {statisticsGet?.merchantCount || '0'}
              </p>
            </div>
            <div className="flex justify-between pb-2 border-b-[1px] border-gray-500">
              <p className="text-md font-semibold">Terminals:</p>
              <p className="text-md font-semibold">
                {statisticsGet?.terminalCount || '0'}
              </p>
            </div>
            <div className="flex justify-between pb-2 border-b-[1px] border-gray-500">
              <p className="text-md font-semibold">QRs:</p>
              <p className="text-md font-semibold">
                {statisticsGet?.qrCount || '-'}
              </p>
            </div>
            {/* <div className="flex justify-between pb-2 border-b-[1px] border-gray-500">
              <p className="text-md font-semibold">Api-Key</p>
              <p className="text-md font-semibold">
                {statisticsGet?.apiKey || '-'}
              </p>
            </div> */}
            <div className="flex justify-between pb-2 border-b-[1px] border-gray-500">
              <p className="text-md font-semibold">Transactions:</p>
              <div className="text-md font-semibold flex flex-col items-start justify-start">
                <span>{statisticsGet?.transactionCount || '0'} (Success)</span>
                <span>{statisticsGet?.transactionAmount || '0'} UZS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Box
        sx={{
          width: '100%',
          bgcolor: 'background.paper',
          borderRadius: 5,
          boxShadow: 2,
          marginTop: 3,
          padding: 3,
        }}
      >
        <Tabs value={selectedTab} onChange={handleChange}>
          <Tab label="Qr" />
          <Tab label="Merchant" />
          <Tab label="Terminal" />
          <Tab label="Transactions" />
        </Tabs>
        <Box sx={{ p: 3, overflow: 'auto' }}>
          {selectedTab === 0 && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Table
                className="bg-white"
                sx={{ minWidth: 650 }}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow className="bg-gray-300">
                    <TableCell>No</TableCell>
                    <TableCell className="min-w-[250px] border-l" align="left">
                      Partner
                    </TableCell>
                    <TableCell className="min-w-[200px] border-l" align="left">
                      Account
                    </TableCell>
                    <TableCell className="min-w-[150px] border-l" align="left">
                      Type
                    </TableCell>
                    <TableCell className="min-w-[200px] border-l" align="left">
                      Created time
                    </TableCell>
                    <TableCell className="min-w-[200px] border-l" align="left">
                      Expire time
                    </TableCell>
                    <TableCell className="min-w-[160px] border-l" align="left">
                      Status
                    </TableCell>
                    {/* <TableCell className="min-w-[200px]" align="center">Action</TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {QrGet?.object && QrGet.object.length !== 0 ? QrGet?.object?.map((partner: any, index: number) => (
                    <TableRow key={partner.id || index}>
                      <TableCell>{pageQr * 10 + index + 1}</TableCell>
                      <TableCell align="left">
                        {partner.partner || '-'}
                      </TableCell>
                      <TableCell align="left">
                        {partner.amount || '-'}
                      </TableCell>
                      <TableCell align="left">{partner.type || '-'}</TableCell>
                      <TableCell align="left">
                        {partner.createdAt || '-'}
                      </TableCell>
                      <TableCell align="left">
                        {partner.expire || '-'}
                      </TableCell>
                      <TableCell align="left">
                        <Typography
                          fontSize={15}
                          className="bg-[#327bf0] text-white  text-center p-3 rounded-full "
                        >
                          {partner.status}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )) : (
                    <TableCell colSpan={10}>
                      <Typography color="error" textAlign="center">
                        Failed to load data
                      </Typography>
                    </TableCell>
                  )}
                </TableBody>
              </Table>
              {QrGet?.object && QrGet.object.length !== 0 && <Pagination
                defaultCurrent={1}
                current={pageQr + 1}
                total={QrGet?.totalElements || 0}
                // pageSize={size || 10}
                onChange={async (pageNumber: number) => {
                  await setPageQr(pageNumber - 1);
                  await QrGet();
                }}
                showSizeChanger={false}
              />}
            </Box>
          )}
          {selectedTab === 1 && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Table
                className="bg-white"
                // sx={{ minWidth: 650 }}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow className="bg-gray-300">
                    <TableCell>No</TableCell>
                    <TableCell className="min-w-[250px] border-l" align="left">
                      Merchant
                    </TableCell>
                    <TableCell className="min-w-[200px] border-l" align="left">
                      Addres
                    </TableCell>
                    <TableCell className="min-w-[200px] border-l" align="left">
                      Mfo
                    </TableCell>
                    <TableCell className="min-w-[200px] border-l" align="left">
                      Account
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {MerchantGet?.object && MerchantGet?.object.length !== 0 ? MerchantGet?.object?.map((qr: any, index: number) => (
                    <TableRow key={qr.id || index}>
                      <TableCell>{pageQr * 10 + index + 1}</TableCell>
                      <TableCell align="left">{qr.name || '-'}</TableCell>
                      <TableCell align="left">
                        {qr.address || '-'}
                      </TableCell>
                      <TableCell align="left">{qr.mfo || '-'}</TableCell>
                      <TableCell align="left">
                        {qr.account || '-'}
                      </TableCell>
                    </TableRow>
                  )) : (
                    <TableCell colSpan={10}>
                      <Typography color="error" textAlign="center">
                        Failed to load data
                      </Typography>
                    </TableCell>
                  )}
                </TableBody>
              </Table>
              {MerchantGet?.object && MerchantGet?.object.length !== 0 && <Pagination
                defaultCurrent={1}
                current={pageMerchant + 1}
                total={MerchantGet?.totalElements || 0}
                onChange={async (pageNumber: number) => {
                  await setPageMerchant(pageNumber - 1);
                  await QrGet();
                }}
                showSizeChanger={false}
              />}
            </Box>
          )}
          {selectedTab === 2 && (
            <Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Table
                  className="bg-white"
                  sx={{ minWidth: 650 }}
                  aria-label="simple table"
                >
                  <TableHead>
                    <TableRow className="bg-gray-300">
                      <TableCell>No</TableCell>
                      <TableCell
                        className="min-w-[250px] border-l"
                        align="left"
                      >
                        Terminal's name
                      </TableCell>
                      <TableCell
                        className="min-w-[200px] border-l"
                        align="left"
                      >
                        Merchant's name
                      </TableCell>
                      <TableCell
                        className="min-w-[150px] border-l"
                        align="left"
                      >
                        MCC
                      </TableCell>
                      <TableCell
                        className="min-w-[160px] border-l"
                        align="left"
                      >
                        Status
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {TerminalGet?.object && TerminalGet?.object.length ? TerminalGet?.object?.map((terminal: any, index: number) => (
                      <TableRow key={terminal.id || index}>
                        <TableCell>{pageQr * 10 + index + 1}</TableCell>
                        <TableCell align="left">
                          {terminal.name || '-'}
                        </TableCell>
                        <TableCell align="left">
                          {terminal.merchantName || '-'}
                        </TableCell>
                        <TableCell align="left">
                          {terminal.mcc || '-'}
                        </TableCell>
                        <TableCell align="left">
                          <Typography
                            fontSize={15}
                            className={` uppercase  text-center p-3 rounded-full ${terminal.active ? 'text-white bg-[#327bf0]' : 'text-red-500'} `}
                          >
                            {terminal.active ? 'active' : 'Inactive'}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    )) : (
                      <TableCell colSpan={10}>
                        <Typography color="error" textAlign="center">
                          Failed to load data
                        </Typography>
                      </TableCell>
                    )}
                  </TableBody>
                </Table>
                {TerminalGet?.object && TerminalGet?.object.length !== 0 && <Pagination
                  defaultCurrent={1}
                  current={pageTerminal + 1}
                  total={TerminalGet?.totalElements || 0}
                  // pageSize={size || 10}
                  onChange={async (pageNumber: number) => {
                    await setPageTerminal(pageNumber - 1);
                    await TerminalEffect();
                  }}
                  showSizeChanger={false}
                />}
              </Box>
            </Typography>
          )}
          {selectedTab === 3 && (
            <Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Table
                  className="bg-white"
                  sx={{ minWidth: 650 }}
                  aria-label="simple table"
                >
                  <TableHead>
                    <TableRow className="bg-gray-300">
                      <TableCell>No</TableCell>
                      <TableCell
                        className="min-w-[250px] border-l"
                        align="left"
                      >
                        Bank
                      </TableCell>
                      <TableCell
                        className="min-w-[200px] border-l"
                        align="left"
                      >
                        Sender
                      </TableCell>
                      <TableCell
                        className="min-w-[150px] border-l"
                        align="left"
                      >
                        Rate
                      </TableCell>
                      <TableCell
                        className="min-w-[160px] border-l"
                        align="left"
                      >
                        Currency
                      </TableCell>
                      <TableCell
                        className="min-w-[160px] border-l"
                        align="left"
                      >
                        Amount
                      </TableCell>
                      <TableCell
                        className="min-w-[160px] border-l"
                        align="left"
                      >
                        Service-Fee
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {TransactionGet?.object && TransactionGet?.object.length ? TransactionGet?.object?.map((transaction: any, index: number) => (
                      <TableRow key={transaction.id || index}>
                        <TableCell>{pageQr * 10 + index + 1}</TableCell>
                        <TableCell align="left">
                          {transaction.bank || '-'}
                        </TableCell>
                        <TableCell align="left">
                          {transaction.sender || '-'}
                        </TableCell>
                        <TableCell align="left">
                          {transaction.rate || '-'}
                        </TableCell>
                        <TableCell align="left">
                          {transaction.currency || '-'}
                        </TableCell>
                        <TableCell align="left">
                          {transaction.amount || '-'}
                        </TableCell>
                        <TableCell align="left">
                          {transaction.serviceFee || '-'}
                        </TableCell>
                      </TableRow>
                    )) : (
                      <TableCell colSpan={10}>
                        <Typography color="error" textAlign="center">
                          Failed to load data
                        </Typography>
                      </TableCell>
                    )}
                  </TableBody>
                </Table>
                {TransactionGet?.object && TransactionGet?.object.length !== 0 && <Pagination
                  defaultCurrent={1}
                  current={pageTransaction + 1}
                  total={TransactionGet?.totalElements || 0}
                  // pageSize={size || 10}
                  onChange={async (pageNumber: number) => {
                    await setPageTransaction(pageNumber - 1);
                    await TransactionEffect();
                  }}
                  showSizeChanger={false}
                />}
              </Box>
            </Typography>
          )}
        </Box>
      </Box>
    </div>
  );
}