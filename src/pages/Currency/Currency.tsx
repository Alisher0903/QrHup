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
import { CurrencyEditActive, CurrencyGet } from "../../hooks/url";
import { Input, Pagination, Checkbox, Select } from "antd";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";


export default function Currency() {
    const { t } = useTranslation()
    const [nameFilter, setNameFilter] = useState('');
    const [table, setTable] = useState('');
    const [page, setPage] = useState(0);
    const [status, setStatus] = useState<boolean>();
    const [size, setSize] = useState(10);
    const [id, setId] = useState(0);
    const [active, setActive] = useState<boolean>();

    const getMccUrl = () => {
        const queryParams: string = [
            nameFilter ? `name=${nameFilter}` : '',
            table ? `code=${table}` : '',
            status ? `active=${status}` : '',
        ].filter(Boolean).join('&');
        return `${CurrencyGet}${queryParams ? `&${queryParams}&page=${page}&size=${size}` : `page=${page}&size=${size}`}`;
    }
    const { error, globalDataFunc, response, loading } = useGlobalRequest(
        getMccUrl(),
        "GET"
    ); const { error: ErrorChange, globalDataFunc: effectChange, response: responseChange } = useGlobalRequest(
        `${CurrencyEditActive}id=${id}&active=${active}`,
        "POST",
        {}
    );
    const handleChangeActive = () => {
        effectChange();
    }
    useEffect(() => {
        if (responseChange) {
            globalDataFunc();
            toast.success(responseChange);
        } else if (ErrorChange) {
            toast.error(ErrorChange)
        }
    }, [responseChange, ErrorChange])
    useEffect(() => {
        globalDataFunc();
    }, [page, size, nameFilter, table, status]);

    return (
        <div className="w-full">
            <Breadcrumb
                pageName={t("Currency")}
            />
            <Box sx={{ bgcolor: "white", padding: 5 }}>
                <Box sx={{ display: "flex", flexDirection: "column" }} gap={2}>
                    < div className="flex flex-col lg:flex-row gap-5 mb-5">
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
                                placeholder={t("SearchWithCode")}
                                onChange={
                                    (e) => setTable(e.target.value)
                                }
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
                                    value: true,
                                    label: t("Active"),
                                },
                                {
                                    value: false,
                                    label: t("InActive"),
                                }
                            ]}
                        />
                    </div>
                    </div>
                    <Typography className="font-bold" color="textPrimary" mb={3}>

                    </Typography>
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
                                    <TableCell className="border-l min-w-[200px]" align="left">{t("Namee")}</TableCell>
                                    <TableCell className="border-l min-w-[200px]" align="left">{t("Code")}</TableCell>
                                    <TableCell className="border-l min-w-[200px]" align="left">{t("Symbol")}</TableCell>
                                    <TableCell className="border-l min-w-[200px]" align="left">{t("Action")}</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {response?.object?.map(
                                    (user: any, index: number) => (
                                        <TableRow key={user.id || index}>
                                            <TableCell>{(page * 10 + index + 1)}</TableCell>
                                            <TableCell align="left">
                                                {user.name || "-"}
                                            </TableCell>
                                            <TableCell align="left">
                                                {user.code || "-"}
                                            </TableCell>
                                            <TableCell align="left">
                                                {user.symbol || "-"}
                                            </TableCell>
                                            <TableCell align="left">
                                                <Checkbox
                                                    // defaultChecked={user.active}
                                                    checked={user.active}
                                                    onChange={async (e: any) => {
                                                        await setId(user.id); 
                                                        await setActive(e.target.checked);
                                                        // console.log(e.target.checked);
                                                        handleChangeActive();
                                                    }}
                                                />
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
