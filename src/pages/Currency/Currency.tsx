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
import { ActionGet } from "../../hooks/url";
import { Pagination } from "antd";


export default function Currency() {
    const [nameFilter, setNameFilter] = useState('');
    const [table, setTable] = useState('');
    const [tableName, setTableName] = useState('');
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);

    const getMccUrl = () => {
        const queryParams: string = [
            nameFilter ? `name=${nameFilter}` : '',
            table ? `table=${table}` : '',
            tableName ? `tableName=${tableName}` : '',
        ].filter(Boolean).join('&');
        return `${ActionGet}?${queryParams ? `&${queryParams}&page=${page}&size=${size}` : `page=${page}&size=${size}`}`;
    }
    const { error, globalDataFunc, response, loading } = useGlobalRequest(
        getMccUrl(),
        "GET"
    );
    useEffect(() => {
        globalDataFunc();
    }, [page, size, nameFilter, table, tableName]);

    return (
        <Container>
            <Breadcrumb
                pageName="Currency"
            />
            <Box sx={{ bgcolor: "white", padding: 5 }}>
                <Box sx={{ display: "flex", flexDirection: "column" }} gap={2}>
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                        <TextField
                            type="text"
                            label="Search with name"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: 'black',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'black',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: 'black',
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    color: 'black',
                                },
                                '& .MuiInputLabel-root.Mui-focused': {
                                    color: 'black',
                                },
                            }}
                            onChange={
                                (e) => setNameFilter(e.target.value)
                            }
                        />
                        <TextField
                            type="text"
                            label="Search with tabled-ID..."
                            onChange={
                                (e) => setTable(e.target.value)
                            }
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: 'black',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'black',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: 'black',
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    color: 'black',
                                },
                                '& .MuiInputLabel-root.Mui-focused': {
                                    color: 'black',
                                },
                            }}
                        />
                        <TextField
                            type="text"
                            label="Search with Table's Name..."
                            onChange={
                                (e) => setTableName(e.target.value)
                            }
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: 'black',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'black',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: 'black',
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    color: 'black',
                                },
                                '& .MuiInputLabel-root.Mui-focused': {
                                    color: 'black',
                                },
                            }}
                        />
                        <select className="border p-3 rounded-md border-black-2 text-black-2" name="" id="">
                            <option selected disabled value="">Select Status</option>
                            <option>

                            </option>
                        </select>
                    </Box>
                    <Typography className="font-bold" color="textPrimary" mb={3}>
                        Announcements
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
                                    <TableCell className="border-l min-w-[200px]" align="left">symbol</TableCell>
                                    <TableCell className="border-l min-w-[200px]" align="left">Object id</TableCell>
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
                                                    ? new Date(user.createdAt).toISOString().split('T')[0]
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
        </Container>
    );
}
