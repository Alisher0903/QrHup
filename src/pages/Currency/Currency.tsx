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
    TextField,

} from "@mui/material";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { useGlobalRequest } from "../../hooks/GlobalHook";
import { useState, useEffect } from "react";
import { CurrencyGet } from "../../hooks/url";
import { Input, Pagination } from "antd";


export default function Currency() {
    const [nameFilter, setNameFilter] = useState('');
    const [table, setTable] = useState('');
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);

    const getMccUrl = () => {
        const queryParams: string = [
            nameFilter ? `name=${nameFilter}` : '',
            table ? `code=${table}` : '',
        ].filter(Boolean).join('&');
        return `${CurrencyGet}${queryParams ? `&${queryParams}&page=${page}&size=${size}` : `page=${page}&size=${size}`}`;
    }
    const { error, globalDataFunc, response, loading } = useGlobalRequest(
        getMccUrl(),
        "GET"
    );
    useEffect(() => {
        globalDataFunc();
    }, [page, size, nameFilter, table]);

    return (
        <Container>
            <Breadcrumb
                pageName="Currency"
            />
            <Box sx={{ bgcolor: "white", padding: 5 }}>
                <Box sx={{ display: "flex", flexDirection: "column" }} gap={2}>
                    < div className="flex flex-row gap-5">
                        <div className="w-[25%]">
                            <Input
                                allowClear
                                size="large"
                                placeholder="Search with username"
                                onChange={
                                    (e) => setNameFilter(e.target.value)
                                }
                            />
                        </div>
                        <div className="w-[25%]">
                            <Input
                                allowClear
                                size="large"
                                placeholder="Search with Code"
                                onChange={
                                    (e) => setTable(e.target.value)
                                }
                            />
                        </div>
                        <div className="w-[25%]"></div>
                        <div className="w-[25%]"></div>
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
                                    <TableCell className="border-l min-w-[200px]" align="left">Name</TableCell>
                                    <TableCell className="border-l min-w-[200px]" align="left">Code</TableCell>
                                    <TableCell className="border-l min-w-[200px]" align="left">Symbol</TableCell>
                                    <TableCell className="border-l min-w-[200px]" align="left">Active</TableCell>
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
                                                {user.status ? "-" : ' sdqew'}
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
        </Container >
    );
}
