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
import { QrStore } from "../../hooks/Store/Qr/qrStore";
const { RangePicker } = DatePicker;

export default function AdminTransactions() {
    const navigator = useNavigate();
    const { setQrData } = QrStore()
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
        status: ""
    })
    const [date, setDate] = useState<any>([])

    const getPartnerUrl = () => {
        const queryParams: string = [
            filters.merchantName ? `merchantName=${filters.merchantName}` : '',
            filters.partnerName ? `partnerName=${filters.partnerName}` : '',
            filters.status ? `status=${filters.status}` : '',
            filters.amount ? `amount=${filters.amount}` : '',
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
    }, [page, size, filters.merchantName, filters.partnerName, filters.status, filters.amount, date]);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    return (
        <Container>
            <Breadcrumb
                pageName="All Transactions"
            />
            <div className="bg-white p-5">
                <Typography className="mb-2" color="textPrimary" fontSize={30}>
                    Filters
                </Typography>
                <div>
                    <div className="flex gap-4 mb-5">
                        <div className="w-[25%]">
                            <Input
                                allowClear
                                size="large"
                                placeholder="Merchant name..."
                                onChange={(e) => setFilters({ ...filters, merchantName: e.target.value })}
                            />
                        </div>
                        <div className="w-[25%]">
                            <Input
                                allowClear
                                size="large"
                                type="number"
                                placeholder="Amount..."
                                onChange={(e) => setFilters({ ...filters, amount: +e.target.value })}
                            />
                        </div>
                        <div className="w-[25%]">
                            <RangePicker
                                size="large"
                                allowClear
                                onChange={(dates) => setDate(dates)}
                            />
                        </div>
                        <div className="w-[25%]">
                            <Input
                                allowClear
                                size="large"
                                placeholder="Partner name..."
                                onChange={(e) => setFilters({ ...filters, partnerName: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="w-[23.7%] mb-5">
                        <Select
                            size="large"
                            allowClear
                            className="w-full"
                            placeholder="Status"
                            onChange={(value) => setFilters({ ...filters, status: value })}
                            options={[
                                {
                                    value: 'CANCELED',
                                    label: 'Canceled',
                                },
                                {
                                    value: 'COMPLETED',
                                    label: 'Completed',
                                }
                            ]}
                        />
                    </div>
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
                                    <TableCell>No</TableCell>
                                    <TableCell className="min-w-[250px] border-l" align="left">Partner</TableCell>
                                    <TableCell className="min-w-[250px] border-l" align="left">Merchant</TableCell>
                                    <TableCell className="min-w-[200px] border-l" align="left">Amount</TableCell>
                                    <TableCell className="min-w-[150px] border-l" align="left">Currency</TableCell>
                                    <TableCell className="min-w-[200px] border-l" align="left">Transaction Time</TableCell>
                                    <TableCell className="min-w-[200px] border-l" align="left">Go To QR</TableCell>
                                    <TableCell className="min-w-[200px] border-l" align="left">Status</TableCell>
                                    <TableCell className="min-w-[200px] border-l" align="left">Action</TableCell>
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
                                                <div className={partner.status === "COMPLETED" ? "bg-green-500 py-1 rounded-lg text-center text-lg text-white" : "bg-red-500 py-1 rounded-lg text-center text-lg text-white"}>{partner.status === "COMPLETED" ? "Canceled" : "Canceled"}</div>
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
                            <p className="text-xl font-bold">Payment Time:</p>
                            <p className="text-xl">{selectedItem.paymentTime || "---"}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-xl font-bold">Payer Bank:</p>
                            <p className="text-xl">{selectedItem.payerBank || "---"}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-xl font-bold">Sender Name:</p>
                            <p className="text-xl">{selectedItem.senderName || "---"}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-xl font-bold">Rate:</p>
                            <p className="text-xl">{selectedItem.rate || "---"}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-xl font-bold">Currency:</p>
                            <p className="text-xl">{selectedItem.currency || "---"}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-xl font-bold">Amount:</p>
                            <p className="text-xl">{selectedItem.amount.toLocaleString() || "---"}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-xl font-bold">Fee:</p>
                            <p className="text-xl">{selectedItem.fee || "---"}</p>
                        </div>
                    </div>
                    <Button className="bg-gray-500" onClick={toggleModal} style={{ marginTop: '10px', backgroundColor: "#F4F4F4", color: '#000' }}>Close</Button>
                </div>
            </Dialog>
        </Container>
    );
}