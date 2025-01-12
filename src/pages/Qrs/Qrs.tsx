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
import { DatePicker, Input, Pagination, Select } from "antd";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useGlobalRequest } from "../../hooks/GlobalHook";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { QrGet } from "../../hooks/url";
import { datePicker } from "../../common/global-functions/date-sort";
const { RangePicker } = DatePicker;

export default function Partners() {
    const [nameFilter, setNameFilter] = useState('');
    const [numFilter, setNumFilter] = useState('');
    const [emailFilter, setEmailFilter] = useState('');
    const [amount, setAmount] = useState(0);
    const [inn, setInn] = useState('');
    const [status, setStatus] = useState('');
    const [type, setType] = useState('');
    const [date, setDate] = useState<any>([]);
    const [secondDate, setSecondDate] = useState<string>("");

    // Another states
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const navigator = useNavigate()
    const getPartnerUrl = () => {
        const queryParams: string = [
            nameFilter ? `name=${nameFilter}` : '',
            inn ? `inn=${inn}` : '',
            datePicker(0, date) ? `from=${datePicker(0, date)}` : '',
            datePicker(1, date) ? `to=${datePicker(1, date)}` : '',
            secondDate ? `expire=${secondDate}` : '',
            amount ? `amount=${amount}` : '',
            status ? `status=${status}` : '',
            type ? `type=${type}` : '',
        ].filter(Boolean).join('&');

        return `${QrGet}?page=${page}&size=${size}${queryParams ? `&${queryParams}` : ''}`;
    }

    const { error, globalDataFunc, response, loading } = useGlobalRequest(
        getPartnerUrl(),
        "GET"
    );

    useEffect(() => {
        globalDataFunc();
    }, [page, size, nameFilter, numFilter, emailFilter, date, inn, type, amount]);

    return (
        <Container>
            <Breadcrumb
                pageName="All Qrs"
            />
            <Box sx={{ bgcolor: "white", padding: 5 }}>
                <Typography className="mb-2" color="textPrimary" fontSize={30}>
                    Filters
                </Typography>
                <div className="flex flex-row gap-5 mb-5">
                    <div className="w-[25%] ">
                        <Input
                            allowClear
                            size="large"
                            placeholder="Search with username"
                            onChange={
                                (e) => setNameFilter(e.target.value)
                            }
                        />
                    </div>
                    <div className="w-[25%] ">
                        <Input
                            allowClear
                            size="large"
                            placeholder="Search with Ext-ID"
                            onChange={
                                (e) => setNumFilter(e.target.value)
                            }
                        />
                    </div>
                    <div className="w-[25%] ">
                        <Input
                            allowClear
                            size="large"
                            placeholder="Search with email"
                            onChange={
                                (e) => setEmailFilter(e.target.value)
                            }
                        />
                    </div>
                    <div className="w-[25%] ">
                        <Input
                            allowClear
                            size="large"
                            placeholder="Search with INN"
                            onChange={
                                (e) => setInn(e.target.value)
                            }
                        />
                    </div>
                </div>
                <div className="flex flex-row gap-5 mb-5">
                    <div className="w-[25%] ">
                        <RangePicker
                            size="large"
                            allowClear
                            onChange={(dates) => setDate(dates)}
                        />
                    </div>
                    <div className="w-[25%]">
                        <DatePicker
                            size="large"
                            className="w-full"
                            allowClear
                            onChange={(dates) => {
                                let date, month, year;

                                date = dates.date();
                                month = dates.month() + 1;
                                year = dates.year();

                                if (month > 0 && month < 10) month = `0${month}`;
                                if (date > 0 && date < 10) date = `0${date}`;

                                setSecondDate(`${year}-${month}-${date}`);
                            }}
                        />
                    </div>
                    <div className="w-[25%] ">
                        <Input
                            allowClear
                            size="large"
                            placeholder="Amount"
                            onChange={
                                (e) => setAmount(+e.target.value)
                            }
                        />
                    </div>
                    <div className="w-[25%] ">
                        <Select
                            size="large"
                            allowClear
                            className="w-full"
                            placeholder="Status"
                            onChange={(value) => setStatus(value)}
                            options={[
                                {
                                    value: 'ACTIVE',
                                    label: 'Active',
                                },
                                {
                                    value: 'INACTIVE',
                                    label: 'InActive',
                                },
                                {
                                    value: 'NEW',
                                    label: 'New',
                                },
                                {
                                    value: 'PENDING',
                                    label: 'Pending',
                                },
                                {
                                    value: 'VALIDATION',
                                    label: 'Validation',
                                },
                                {
                                    value: 'PARTIAL',
                                    label: 'Patrial',
                                },
                                {
                                    value: 'CLARIFICATION',
                                    label: 'Clarification',
                                },
                                {
                                    value: 'COMPLETED',
                                    label: 'Completed',
                                },
                                {
                                    value: 'CANCELED',
                                    label: 'Canceled',
                                },
                                {
                                    value: 'EXPIRED',
                                    label: 'Expired',
                                },
                            ]}
                        />
                    </div>
                    <div className="w-[25%] ">
                        <Select
                             size="large"
                             allowClear
                             className="w-full"
                             placeholder="Type"
                             onChange={(value) => setType(value)}
                             options={[
                                {
                                    value: 'STATIC',
                                    label: 'STATIC',
                                },
                                {
                                    value: 'DYNAMIC',
                                    label: 'DYNAMIC',
                                },
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
                                    <TableCell className="min-w-[250px] border-l" align="left">Merchants name</TableCell>
                                    <TableCell className="min-w-[200px] border-l" align="left">Amount</TableCell>
                                    <TableCell className="min-w-[150px] border-l" align="left">Type</TableCell>
                                    <TableCell className="min-w-[200px] border-l" align="left">Created Time</TableCell>
                                    <TableCell className="min-w-[200px] border-l" align="left">Expire Time</TableCell>
                                    <TableCell className="min-w-[200px] border-l" align="left">Ext-ID</TableCell>
                                    <TableCell className="min-w-[200px] border-l" align="left">Status</TableCell>
                                    {/*  <TableCell className="min-w-[160px] border-l" align="left">Status</TableCell> */}
                                    <TableCell className="min-w-[200px]" align="center">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {response?.object?.map(
                                    (partner: any, index: number) => (
                                        <TableRow key={partner.id || index}>
                                            <TableCell>{(page * 10 + index + 1)}</TableCell>
                                            <TableCell align="left">
                                                {partner.merchant || "-"}
                                            </TableCell>
                                            <TableCell align="left">
                                                {partner.amount || "-"} {partner.amouunt ? partner.currency : ''}
                                            </TableCell>
                                            <TableCell align="left">
                                                {partner.type || "-"}
                                            </TableCell>
                                            <TableCell align="left">
                                                {partner.createDate || "-"}
                                            </TableCell>
                                            <TableCell align="left">
                                                {partner.expire || "-"}
                                            </TableCell>
                                            <TableCell align="left">
                                                {partner.extId || "-"}
                                            </TableCell>
                                            <TableCell align="left">
                                                <Typography className="bg-[#F0B732] uppercase text-center p-3 rounded-full ">
                                                    {partner.status || '-'}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Button
                                                    onClick={() => {
                                                        navigator(`/qrDetial/${partner.id}`)
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
                <div className="flex justify-end mt-5">
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
                </div>
            </Box>
        </Container>
    );
}
