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
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Select,

} from "@mui/material";
import { useState, useEffect } from "react";
import { MdEdit } from "react-icons/md";
import { DeleteUser, PartnerGet, PartnerCreate, PartnerEdit, MerchantGet, QrGet } from "../../hooks/url";
import { toast } from "react-hot-toast";
import { Pagination } from "antd";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useGlobalRequest } from "../../hooks/GlobalHook";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";



export default function Partners() {
    // const [openAddModal, setOpenAddModal] = useState(false);
    // const [openEditModal, setOpenEditModal] = useState(false);
    // const [openDeleteModal, setOpenDeleteModal] = useState(false);


    // Filter states

    const [nameFilter, setNameFilter] = useState('');
    const [numFilter, setNumFilter] = useState('');
    const [emailFilter, setEmailFilter] = useState('');
    const [inn, setInn] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [account, setAccount] = useState(0);
    // const [mfo, setMfo] = useState(0);
    const [amount, setAmount] = useState(0);
    const [status, setStatus] = useState<boolean>();

    // Another states
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const navigator = useNavigate()
    const getPartnerUrl = () => {
        const queryParams: string = [
            nameFilter ? `name=${nameFilter}` : '',
            // numFilter ? `phone=${numFilter}` : '',
            // emailFilter ? `email=${emailFilter}` : '',
            inn ? `inn=${inn}` : '',
            fromDate ? `from=${fromDate}` : '',
            toDate ? `to=${toDate}` : '',
            status ? `status=${status}` : '',
            account ? `account=${account}` : '',
            amount ? `amount=${amount}` : '',

        ].filter(Boolean).join('&');

        return `${QrGet}?page=${page}&size=${size}${queryParams ? `&${queryParams}` : ''}`;
    }

    const { error, globalDataFunc, response, loading } = useGlobalRequest(
        getPartnerUrl(),
        "GET"
    );


    useEffect(() => {
        globalDataFunc();
    }, [page, size, nameFilter, numFilter, emailFilter, status, fromDate, toDate, inn, amount]);

    return (
        <Container>
            <Breadcrumb
                pageName="All Qrs"
            />
            <Box sx={{ bgcolor: "white", padding: 5 }}>
                <Typography className="mb-2" color="textPrimary" fontSize={30}>
                    Filters
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column" }} gap={2}>
                    <Box sx={{
                        display: 'grid',
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 5,
                        gap: 2,
                        gridTemplateColumns: 'repeat(1, 1fr)',
                        '@media (min-width: 600px)': {
                            gridTemplateColumns: 'repeat(2, 1fr)',
                        },
                        '@media (min-width: 900px)': {
                            gridTemplateColumns: 'repeat(3, 1fr)',
                        },
                        '@media (min-width: 1200px)': {
                            gridTemplateColumns: 'repeat(3, 1fr)',
                        },
                    }}>
                        <TextField
                            type="text"
                            label="Search with username"
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
                            label="Search with Ext-ID"
                            onChange={
                                (e) => setNumFilter(e.target.value)
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
                            type="email"
                            label="filter with email"
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
                                (e) => setEmailFilter(e.target.value)
                            }
                        />
                        <TextField
                            type="text"
                            label="Search with INN"
                            onChange={
                                (e) => setInn(e.target.value)
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
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Typography>
                                From:
                            </Typography>
                            <TextField
                                type="date"
                                placeholder=""
                                // label="From (Date)"
                                // value={new Date}
                                onChange={
                                    (e) => setFromDate(e.target.value)
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
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Typography>
                                To:
                            </Typography>
                            <TextField
                                type="date"
                                placeholder=""
                                // label="From (Date)"
                                // value={new Date}
                                onChange={
                                    (e) => setToDate(e.target.value)
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
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography>
                                Exp-Date:
                            </Typography>
                            <TextField
                                type="date"
                                placeholder=""
                                // label="From (Date)"
                                // value={new Date}
                                onChange={
                                    (e) => setToDate(e.target.value)
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
                        </Box>
                        <TextField
                            type="text"
                            label="Amount"
                            placeholder="More than the amount entered"
                            onChange={
                                (e) => setAmount(+e.target.value)
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
                        <select className="min-w-[200px] p-3 border-[2px] rounded-md border-black text-black" onChange={
                            (e: any) => {
                                setStatus(e.target.value);
                                console.log(e.target.value);
                            }
                        }>
                            <option selected disabled value={''}>
                                Status
                            </option>
                            <option value='ACTIVE'>
                                Active
                            </option>
                            <option value="INACTIVE">
                                InActive
                            </option>
                        </select>
                    </Box>
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
                                                {partner.amount  || "-"} {partner.amouunt ? partner.currency : ''}
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
                                                        navigator(`/qrDetial/${partner.extId}`)
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
