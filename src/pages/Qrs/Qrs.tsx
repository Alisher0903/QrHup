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
import { useTranslation } from "react-i18next";
const { RangePicker } = DatePicker;

export default function Partners() {
    const { t } = useTranslation()
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
    }, [page, size, nameFilter, numFilter, emailFilter, date, inn, type, amount, secondDate]);

    return (
        <Container>
            <Breadcrumb
                pageName={t("AllQrs")}
            />
            <Box sx={{ bgcolor: "white", padding: 5 }}>
                <Typography className="mb-2" color="textPrimary" fontSize={30}>
                   {t("Filters")}
                </Typography>
                <div className="flex flex-col lg:flex-row gap-5 mb-5">
                    <div className="lg:w-[25%] ">
                        <Input
                            allowClear
                            size="large"
                            placeholder={t("SearchName")}
                            onChange={
                                (e) => setNameFilter(e.target.value)
                            }
                        />
                    </div>
                    <div className="lg:w-[25%] ">
                        <Input
                            allowClear
                            size="large"
                            placeholder={t("SearchwithExtID")}
                            onChange={
                                (e) => setNumFilter(e.target.value)
                            }
                        />
                    </div>
                    <div className="lg:w-[25%] ">

                        <Input
                            allowClear
                            size="large"
                            placeholder="Amount"
                            onChange={
                                (e) => setAmount(+e.target.value)
                            }
                        />
                    </div>
                    <div className="lg:w-[25%]">
                        <DatePicker
                            size="large"
                            placeholder={t("SelectExpireDate")}
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
                </div>
                <div className="flex flex-col lg:flex-row gap-5 mb-5">
                    <div className="lg:w-[25%] ">
                        <RangePicker
                            size="large"
                            className="w-full"
                            placeholder={[t("StartDate"), t("EndDate")]}
                            allowClear
                            onChange={(dates) => setDate(dates)}
                        />
                    </div>
                    <div className="lg:w-[25%] ">
                        <Select
                            size="large"
                            allowClear
                            className="w-full"
                            placeholder={t("Status")}
                            onChange={(value) => setStatus(value)}
                            options={[
                                {
                                    value: 'ACTIVE',
                                    label: t("Active"),
                                },
                                {
                                    value: 'INACTIVE',
                                    label: t("InActive"),
                                },
                                {
                                    value: 'NEW',
                                    label: t("New"),
                                },
                                {
                                    value: 'PENDING',
                                    label: t("Pending"),
                                },
                                {
                                    value: 'VALIDATION',
                                    label: t("Validation"),
                                },
                                {
                                    value: 'PARTIAL',
                                    label: t("Patrial"),
                                },
                                {
                                    value: 'CLARIFICATION',
                                    label: t("Clarification"),
                                },
                                {
                                    value: 'COMPLETED',
                                    label: t("Completed"),
                                },
                                {
                                    value: 'CANCELED',
                                    label: t("Canceled"),
                                },
                                {
                                    value: 'EXPIRED',
                                    label: t("Expired"),
                                },
                            ]}
                        />
                    </div>
                    <div className="lg:w-[25%] ">
                        <Select
                            size="large"
                            allowClear
                            className="w-full"
                            placeholder={t("Type")}
                            onChange={(value) => setType(value)}
                            options={[
                                {
                                    value: 'STATIC',
                                    label: t("STATIC"),
                                },
                                {
                                    value: 'DYNAMIC',
                                    label: t("DYNAMIC"),
                                },
                            ]}
                        />
                    </div>
                    <div className="lg:w-[25%]"></div>
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
                                    <TableCell className="min-w-[250px] border-l" align="left">{t("Merchantname")}</TableCell>
                                    <TableCell className="min-w-[200px] border-l" align="left">{t("PartnerName")}</TableCell>
                                    <TableCell className="min-w-[200px] border-l" align="left">{t("Amount")}</TableCell>
                                    <TableCell className="min-w-[150px] border-l" align="left">{t("Type")}</TableCell>
                                    <TableCell className="min-w-[200px] border-l" align="left">{t("CreatedTime")}</TableCell>
                                    <TableCell className="min-w-[200px] border-l" align="left">{t("ExpireTime")}</TableCell>
                                    <TableCell className="min-w-[200px] border-l" align="left">Ext-ID</TableCell>
                                    <TableCell className="min-w-[200px] border-l" align="left">{t("Status")}</TableCell>
                                    {/*  <TableCell className="min-w-[160px] border-l" align="left">Status</TableCell> */}
                                    <TableCell className="min-w-[200px]" align="center">{t("Action")}</TableCell>
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
                                                {partner.partner || "-"}
                                            </TableCell>
                                            <TableCell align="left">
                                                {partner.amount || "-"} {partner.amouunt ? partner.currency : ''}
                                            </TableCell>
                                            <TableCell align="left">
                                                {partner.type || "-"}
                                            </TableCell>
                                            <TableCell align="left">
                                                {partner?.createdAt ? partner.createdAt.slice(0,10) : '-'}  {' '}
                                                {partner?.createdAt ? partner.createdAt.slice(11,16) : '-'}
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
