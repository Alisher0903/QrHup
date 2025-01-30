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
} from "@mui/material";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { useGlobalRequest } from "../../hooks/GlobalHook";
import { useState, useEffect } from "react";
import { ActionGet } from "../../hooks/url";
import { DatePicker, Input, Pagination, Select } from "antd";
import { useTranslation } from "react-i18next";
import { datePicker } from "../../common/global-functions/date-sort";
const { RangePicker } = DatePicker;

export default function Action() {
    const { t } = useTranslation()
    const [nameFilter, setNameFilter] = useState('');
    const [table, setTable] = useState('');
    const [tableName, setTableName] = useState('');
    const [status, setStatus] = useState('');
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [date, setDate] = useState<any>([]);

    const getMccUrl = () => {
        const queryParams: string = [
            nameFilter ? `name=${nameFilter}` : '',
            table ? `tableId=${table}` : '',
            tableName ? `tableName=${tableName}` : '',
            status ? `status=${status}` : '',
            datePicker(0, date) ? `from=${datePicker(0, date)}` : '',
            datePicker(1, date) ? `to=${datePicker(1, date)}` : '',
        ].filter(Boolean).join('&');
        return `${ActionGet}?${queryParams ? `&${queryParams}&page=${page}&size=${size}` : `page=${page}&size=${size}`}`;
    }
    const { error, globalDataFunc, response, loading } = useGlobalRequest(
        getMccUrl(),
        "GET"
    );
    useEffect(() => {
        globalDataFunc();
    }, [page, size, nameFilter, table, tableName, status, date]);

    return (
        <div className="w-full">
            <Breadcrumb
                pageName={t("Action")}
            />
            <Box sx={{ bgcolor: "white", padding: 5 }}>
                <Box sx={{ display: "flex", flexDirection: "column" }} gap={2}>
                    <div className="flex flex-col lg:flex-row gap-5 mb-5">
                        <div className="lg:w-[25%]">
                            <Input
                                allowClear
                                size="large"
                                placeholder={t("NameSearch")}
                                onChange={
                                    (e) => setNameFilter(e.target.value)
                                }
                            />
                        </div>
                        <div className="lg:w-[25%]">
                            <Input
                                allowClear
                                size="large"
                                placeholder={t("SearchwithObjectID")}
                                onChange={(e) => setTable(e.target.value)}
                            />
                        </div>
                        <div className="lg:w-[25%]">
                            <Input
                                allowClear
                                size="large"
                                placeholder={t("SearchTable")}
                                onChange={(e) => setTableName(e.target.value)}
                            />
                        </div>
                        <div className="lg:w-[25%]">
                            <Select
                                size="large"
                                allowClear
                                className="w-full"
                                placeholder={t("Status")}
                                onChange={(value) => setStatus(value)}
                                options={[
                                    {
                                        value: 'CANCELED',
                                        label: "CANCELED",
                                    },
                                    {
                                        value: 'COMPLETED',
                                        label: "COMPLETED",
                                    }
                                ]}
                            />
                        </div>
                        <div className="lg:w-[25%]">
                            <RangePicker
                                size="large"
                                className="w-full"
                                placeholder={[t("StartDate"), t("EndDate")]}
                                allowClear
                                onChange={(dates) => setDate(dates)}
                            />
                        </div>
                    </div>
                </Box>
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
                                    <TableCell className="border-l">No</TableCell>
                                    <TableCell className="border-l min-w-[200px]" align="left">{t("UserName")}</TableCell>
                                    <TableCell className="border-l min-w-[200px]" align="left">{t("Action")}</TableCell>
                                    <TableCell className="border-l min-w-[200px]" align="left"> {t("CreatedTime")}</TableCell>
                                    <TableCell className="border-l min-w-[200px]" align="left">{t("Table")}</TableCell>
                                    <TableCell className="border-l min-w-[200px]" align="left">{t("ObjectID")}</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {response?.object?.map(
                                    (user: any, index: number) => (
                                        <TableRow key={user.id || index}>
                                            <TableCell>{(page * 10 + index + 1)}</TableCell>
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
                    </TableContainer>
                )}
                <div className="flex justify-center mt-5">
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
        </div>
    );
}
