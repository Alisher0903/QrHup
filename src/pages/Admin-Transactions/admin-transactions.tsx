import {
    Box,
    Container,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    CircularProgress,
    Button,
} from "@mui/material";
import { useState, useEffect } from "react";
import { Input, Pagination } from "antd";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useGlobalRequest } from "../../hooks/GlobalHook";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { adminTransactionsGet } from "../../hooks/url";
import Dialog from '@mui/material/Dialog';
import { datePicker } from "../../common/global-functions/date-sort";
import { DatePicker, Select } from "antd";
// import { QrStore } from "../../hooks/Store/Qr/qrStore";
import { useTranslation } from "react-i18next";
const { RangePicker } = DatePicker;

export default function AdminTransactions() {
    const { t } = useTranslation()
    const navigator = useNavigate();
    // const { setQrData } = QrStore()
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState({
        paymentTime: "",
        payerBank: "",
        senderName: "",
        rate: 0,
        currency: "",
        amount: 0,
        fee: ""
    });
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [filters, setFilters] = useState({
        merchantName: "",
        amount: 0,
        partnerName: "",
        status: "",
        transId: '',
    })
    const [date, setDate] = useState<any>([])

    const getPartnerUrl = () => {
        const queryParams: string = [
            filters.merchantName ? `merchantName=${filters.merchantName}` : '',
            filters.partnerName ? `partnerName=${filters.partnerName}` : '',
            filters.status ? `status=${filters.status}` : '',
            filters.amount ? `amount=${filters.amount}` : '',
            filters.transId ? `transId=${filters.transId}` : '',
            datePicker(0, date) ? `from=${datePicker(0, date)}` : '',
            datePicker(1, date) ? `to=${datePicker(1, date)}` : '',
        ].filter(Boolean).join('&');

        return `${adminTransactionsGet}?page=${page}&size=${size}${queryParams ? `&${queryParams}` : ''}`;
    }

    const { error, globalDataFunc, response, loading } = useGlobalRequest(
        getPartnerUrl(),
        "GET"
    );

    useEffect(() => {
        globalDataFunc();
    }, [page, size, filters.merchantName, filters.partnerName, filters.status, filters.amount, date, filters.transId,]);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    return (
        <Container>
            <Breadcrumb
                pageName={t("AllTransactions")}
            />
            <div className="bg-white p-5">
                <Typography className="mb-2" color="textPrimary" fontSize={30}>
                    {t("Filters")}
                </Typography>
                <div>
                    <div className="flex lg:flex-row flex-col gap-4 mb-5">
                        <div className="lg:w-[25%]">
                            <Input
                                allowClear
                                size="large"
                                placeholder={t("TransactionsId")}
                                onChange={(e) => setFilters({ ...filters, transId: e.target.value })}
                            />
                        </div>
                        <div className="lg:w-[25%]">
                            <Input
                                allowClear
                                size="large"
                                placeholder={t("Merchantname")}
                                onChange={(e) => setFilters({ ...filters, merchantName: e.target.value })}
                            />
                        </div>
                        <div className="lg:w-[25%]">
                            <Input
                                allowClear
                                size="large"
                                type="number"
                                placeholder={t("Amount")}
                                onChange={(e) => setFilters({ ...filters, amount: +e.target.value })}
                            />
                        </div>

                        <div className="lg:w-[25%]">
                            <Input
                                allowClear
                                size="large"
                                placeholder={t("PartnerName")}
                                onChange={(e) => setFilters({ ...filters, partnerName: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="mb-5 flex flex-col lg:flex-row gap-4">
                        <div className="lg:w-[25%]">
                            <Select
                                size="large"
                                allowClear
                                className="w-full"
                                placeholder={t("Status")}
                                onChange={(value) => setFilters({ ...filters, status: value })}
                                options={[
                                    {
                                        value: 'CANCELED',
                                        label: t("Canceled"),
                                    },
                                    {
                                        value: 'COMPLETED',
                                        label: t("Completed"),
                                    }
                                ]}
                            />
                        </div>

                        <div className="lg:w-[25%]">
                            <RangePicker
                                size="large"
                                allowClear
                                placeholder={[t("StartDate"), t("EndDate")]}
                                onChange={(dates) => setDate(dates)}
                            />
                        </div>
                        {/* <div className="w-[25%]"></div>
                            <div className="w-[25%]"></div> */}
                    </div>
                    {loading ? (
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
                    ) : error ? (
                        <Typography color="error" textAlign="center">
                            {t("LoadData")}
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
                                        <TableCell>No</TableCell>
                                        <TableCell className="min-w-[250px] border-l" align="left">{t("Partner")}</TableCell>
                                        <TableCell className="min-w-[250px] border-l" align="left">{t("Id")}</TableCell>
                                        <TableCell className="min-w-[250px] border-l" align="left">{t("Merchant")}</TableCell>
                                        <TableCell className="min-w-[200px] border-l" align="left">{t("Amount")}</TableCell>
                                        <TableCell className="min-w-[150px] border-l" align="left">{t("Currency")}</TableCell>
                                        <TableCell className="min-w-[200px] border-l" align="left">{t("TransactionTime")}</TableCell>
                                        <TableCell className="min-w-[200px] border-l" align="left">{t("GoToQR")}</TableCell>
                                        <TableCell className="min-w-[200px] border-l" align="left">{t("Status")}</TableCell>
                                        <TableCell className="min-w-[200px] border-l" align="left">{t("Action")}</TableCell>
                                        {/*  <TableCell className="min-w-[160px] border-l" align="left">Status</TableCell> */}
                                        {/* <TableCell className="min-w-[200px]" align="center">Action</TableCell> */}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {response?.object?.map(
                                        (partner: any, index: number) => (
                                            <TableRow key={partner.id || index}>
                                                <TableCell>{(page * 10 + index + 1)}</TableCell>
                                                <TableCell align="left">
                                                    {partner.partnerName || "-"}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {partner.id || "-"}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {partner.merchantName || "-"}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {partner.amount || "-"}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {partner.currency || "-"}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {partner.createdAt ? new Date(partner.createdAt).toLocaleDateString() : ''}
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Button
                                                        onClick={() => {
                                                            navigator(`/qrDetial/${partner.qrId}`)
                                                        }}
                                                    >
                                                        To Qr
                                                    </Button>
                                                </TableCell>
                                                <TableCell align="left">
                                                    {/* {partner.status || "-"} */}
                                                    <div className={partner.status === "COMPLETED" ? "bg-green-500 py-1 rounded-lg text-center text-lg text-white" : "bg-red-500 py-1 rounded-lg text-center text-lg text-white"}>{partner.status === "COMPLETED" ? t("Canceled") : t("Completed")}</div>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Button
                                                        onClick={() => {
                                                            toggleModal();
                                                            setSelectedItem({
                                                                amount: partner.amount,
                                                                currency: partner.currency,
                                                                fee: partner.serviceFee,
                                                                payerBank: partner.bank,
                                                                paymentTime: partner.createdAt,
                                                                rate: partner.rate,
                                                                senderName: partner.sender,
                                                            })
                                                        }}
                                                    >
                                                        <FaEye size={25} color="black" />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                    {!error && <div className="flex justify-end mt-5">
                        <Pagination
                            defaultCurrent={1}
                            current={page + 1}
                            total={response?.totalElements || 0}
                            pageSize={size || 10}
                            onChange={async (pageNumber: number, pageSize: number) => {
                                await setSize(pageSize);
                                await setPage(pageNumber - 1);
                                await globalDataFunc();
                            }}
                            showSizeChanger={true}
                        />
                    </div>}
                </div>
                <Dialog open={isOpen} onClose={toggleModal}>
                    <div style={{ padding: '20px', width: '600px', textAlign: 'left' }}>
                        <div className="flex flex-col gap-5">
                            <div className="flex justify-between">
                                <p className="text-xl font-bold">{t("PaymentTime")}:</p>
                                <p className="text-xl">{new Date(selectedItem.paymentTime).toLocaleDateString() || "---"}</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="text-xl font-bold">{t("PayerBank")}:</p>
                                <p className="text-xl">{selectedItem.payerBank || "---"}</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="text-xl font-bold">{t("SenderName")}:</p>
                                <p className="text-xl">{selectedItem.senderName || "---"}</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="text-xl font-bold">{t("Rate")}:</p>
                                <p className="text-xl">{selectedItem.rate || "---"}</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="text-xl font-bold">{t("Currency")}:</p>
                                <p className="text-xl">{selectedItem.currency || "---"}</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="text-xl font-bold">{t("Amount")}:</p>
                                <p className="text-xl">{selectedItem.amount.toLocaleString() || "---"}</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="text-xl font-bold">{t("Fee")}:</p>
                                <p className="text-xl">{selectedItem.fee || "---"}</p>
                            </div>
                        </div>
                        <Button className="bg-gray-500" onClick={toggleModal} style={{ marginTop: '10px', backgroundColor: "#F4F4F4", color: '#000' }}>{t("Close")}</Button>
                    </div>
                </Dialog>
            </div>
        </Container>
    );
}