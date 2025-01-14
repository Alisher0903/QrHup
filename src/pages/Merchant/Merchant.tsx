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
import { MerchantGet } from "../../hooks/url";
import { Input, Pagination } from "antd";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useGlobalRequest } from "../../hooks/GlobalHook";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { DatePicker, Select } from "antd";
import { datePicker } from "../../common/global-functions/date-sort";
const { RangePicker } = DatePicker;


export default function Merchant() {
    const [nameFilter, setNameFilter] = useState('');
    const [numFilter, setNumFilter] = useState('');
    const [emailFilter, setEmailFilter] = useState('');
    const [inn, setInn] = useState('');
    const [date, setDate] = useState<any>([])
    const [account, setAccount] = useState(0);
    const [mfo, setMfo] = useState(0);
    const [status, setStatus] = useState<boolean>();
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const navigator = useNavigate()

    const getPartnerUrl = () => {
        const queryParams: string = [
            nameFilter ? `name=${nameFilter}` : '',
            inn ? `inn=${inn}` : '',
            datePicker(0, date) ? `from=${datePicker(0, date)}` : '',
            datePicker(1, date) ? `to=${datePicker(1, date)}` : '',
            status ? `status=${status}` : '',
            account ? `account=${account}` : '',
            mfo ? `mfo=${mfo}` : '',

        ].filter(Boolean).join('&');

        return `${MerchantGet}?page=${page}&size=${size}${queryParams ? `&${queryParams}` : ''}`;
    }

    const { error, globalDataFunc, response, loading } = useGlobalRequest(
        getPartnerUrl(),
        "GET"
    );

    useEffect(() => {
        globalDataFunc();
    }, [page, size, nameFilter, numFilter, emailFilter, status, date, inn, account, mfo]);

    return (
        <Container>
            <Breadcrumb
                pageName="All Merchants"
            />
            <Box sx={{ bgcolor: "white", padding: 5 }}>
                <div className="flex flex-row gap-5 mb-5">
                    <div className="w-[25%]">
                        <Input
                            allowClear
                            size="large"
                            placeholder="Search with Mechants name..."
                            onChange={
                                (e) => setNameFilter(e.target.value)
                            }
                        />
                    </div>
                    <div className="w-[25%]">
                        <Input
                            allowClear
                            size="large"
                            placeholder="Search with Ext-ID"
                            onChange={
                                (e) => setNumFilter(e.target.value)
                            }
                        />
                    </div>
                    {/* <div className="w-[25%]">
                        <Input
                            allowClear
                            size="large"
                            placeholder="Search with email"
                            onChange={
                                (e) => setEmailFilter(e.target.value)
                            }
                        />
                    </div> */}

                    <div className="w-[25%]">
                        <Input
                            allowClear
                            size="large"
                            placeholder="Search with INN"
                            onChange={
                                (e) => setInn(e.target.value)
                            }
                        />
                    </div>
                    <div className="w-[25%]">
                        <RangePicker
                            size="large"
                            allowClear
                            onChange={(dates) => setDate(dates)}
                        />
                    </div>
                </div>
                <div className="flex flex-row gap-5 mb-5">

                    <div className="w-[25%]">
                        <Input
                            allowClear
                            size="large"
                            placeholder="Account"
                            onChange={
                                (e) => setAccount(+e.target.value)
                            }
                        />
                    </div>
                    <div className="w-[25%]">
                        <Input
                            allowClear
                            size="large"
                            placeholder="Mfo"
                            onChange={
                                (e) => setMfo(+e.target.value)
                            }
                        />
                    </div>
                    <div className="w-[25%]">
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
                                }
                            ]}
                        />
                    </div>
                    <div className="w-[25%]"></div>
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
                                    <TableCell className="min-w-[200px] border-l" align="left">Merchants name</TableCell>
                                    <TableCell className="min-w-[200px] border-l" align="left">Account</TableCell>
                                    <TableCell className="min-w-[150px] border-l" align="left">MFO</TableCell>
                                    <TableCell className="min-w-[200px] border-l" align="left">Created Time</TableCell>
                                    <TableCell className="min-w-[200px] border-l" align="left">INN</TableCell>
                                    <TableCell className="min-w-[200px] border-l" align="left">Ext-ID</TableCell>
                                    <TableCell className="min-w-[160px] border-l" align="left">Status</TableCell>
                                    <TableCell className="min-w-[200px]" align="center">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {response?.object?.map(
                                    (partner: any, index: number) => (
                                        <TableRow key={partner.id || index}>
                                            <TableCell>{(page * 10 + index + 1)}</TableCell>
                                            <TableCell align="left">
                                                {partner.name || "-"}
                                            </TableCell>
                                            <TableCell align="left">
                                                {partner.account || "-"}
                                            </TableCell>
                                            <TableCell align="left">
                                                {partner.mfo || "-"}
                                            </TableCell>
                                            <TableCell align="left">
                                                {partner.createdTime || "-"}
                                            </TableCell>
                                            <TableCell align="left">
                                                {partner.inn || "-"}
                                            </TableCell>
                                            <TableCell align="left">
                                                {partner.extId || "-"}
                                            </TableCell>
                                            <TableCell align="left">
                                                <Typography className="bg-[#F0B732] uppercase text-center p-3 rounded-full ">
                                                    {partner.active ? "inactive" : "active"}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Button
                                                    onClick={() => {
                                                        navigator(`/merchantDetials/${partner.id}`)
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