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
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { useGlobalRequest } from "../../hooks/GlobalHook";
import { useState, useEffect } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { AddUser, UserGet, DeleteUser, EditUser, PartnerGet } from "../../hooks/url";
import { toast } from "react-hot-toast";
import { Pagination } from "antd";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Option } from "antd/es/mentions";


export default function Partners() {
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    // Filter states
    const [nameFilter, setNameFilter] = useState('');
    const [numFilter, setNumFilter] = useState('');
    const [emailFilter, setEmailFilter] = useState('');
    const [inn, setInn] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [status, setStatus] = useState<boolean>();

    // Another states
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [getId, setGetId] = useState(null);
    const navigator = useNavigate()
    const [data, setData] = useState({
        name: "",
        url: "",
        address: "",
        phone: "+998",
        email: "",
        inn: "",
        serviceFee: 0,
        mfo: "",
        account: "",
        password: "",
    });

    const { error, globalDataFunc, response, loading } = useGlobalRequest(
        `${PartnerGet}${nameFilter && `name=${nameFilter}&`}${numFilter && `phone=${numFilter}&`}${emailFilter && `email=${emailFilter}&`} ${inn && `inn=${inn}&`} ${fromDate && `from=${fromDate}&`}${toDate && `to=${toDate}&`}${status && `status=${status}&`} page=${page}&size=${size}`,
        "GET"
    );

    const { globalDataFunc: postData, response: postRes, error: postError } = useGlobalRequest(
        AddUser,
        "POST",
        {
            name: data.name,
            phone: data.phone.replaceAll("+", ""),
            password: data.password,
        }
    );
    const { globalDataFunc: EditData, response: EditRes, error: EditError } = useGlobalRequest(
        `${EditUser}id=${getId}`,
        "PUT",
        {
            name: data.name,
            phone: data.phone.replaceAll("+", ""),
            password: data.password,
        }
    );

    const { globalDataFunc: deleteData, response: deleteRes } = useGlobalRequest(
        `${DeleteUser}id=${getId}`,
        "DELETE",
    );

    useEffect(() => {
        globalDataFunc();
    }, [page, size, nameFilter, numFilter,emailFilter, status, fromDate, toDate, inn]);

    // Modal Handlers
    const handleAddOpen = () => {
        setData({
            name: "",
            url: "",
            address: "",
            phone: "+998",
            email: "",
            inn: "",
            serviceFee: 0,
            mfo: "",
            account: "",
            password: "",
        });
        setOpenAddModal(true);
    };

    const handleAddClose = () => setOpenAddModal(false);

    const handleEditClose = () => setOpenEditModal(false);

    const handleDeleteClose = () => setOpenDeleteModal(false);

    const handleAddSubmit = async () => {
        await postData();

    };
    useEffect(() => {
        if (postRes) {
            toast.success("User added successfully!");
            handleAddClose();
            globalDataFunc();
        } else if (postError) {
            toast.error("Failed to add user!");
        }
    }, [postRes, postError]);


    
    useEffect(() => {
        if (EditRes) {
            toast.success("User edited successfully!");
            globalDataFunc()
            handleEditClose();
            setGetId(null);
        } else if (EditError) {
            toast.error("Failed to edit user!");
        }
    }, [EditRes, EditError]);
    const handleDeleteSubmit = async () => {
        await deleteData();
        try {
            if (deleteRes) {
                toast.success("User deleted successfully!");
                handleDeleteClose();
                globalDataFunc();
                setGetId(null);
            } else {
                toast.error("Failed to delete user!");
            }
        } catch (error) {
            console.log(error);
        }
    };
    console.log("FormData", data);

    const HandleEdit = async () => {
        await EditData();
    };
    return (
        <Container>
            <Breadcrumb
                pageName="All partners"
                child={
                    <Button
                        className="bg-gray-900 rounded-xl text-white"
                        style={{
                            backgroundColor: "#212143",
                            padding: "10px 25px",
                            color: "white",
                            borderRadius: "10px",
                        }}
                        onClick={handleAddOpen}
                    >
                        + Add Partner
                    </Button>
                }
            />
            <Box sx={{ bgcolor: "white", padding: 5 }}>
                <Box sx={{ display: "flex", flexDirection: "column" }} gap={2}>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: { xs: 'column', sm: 'row' }, marginBottom: 5, gap: 2 }}>
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
                            label="Search with phone"
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
                        <select className="min-w-[200px] p-2 border" onChange={
                            (e: any) => {
                                setStatus(e.target.value);
                                console.log(e.target.value);

                            }
                        }>
                            <option selected value='ACTIVE'>
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
                                    <TableCell className="min-w-[200px] border-l" align="left">Partner name</TableCell>
                                    <TableCell className="min-w-[200px] border-l" align="left">Account</TableCell>
                                    <TableCell className="min-w-[150px] border-l" align="left">MFO</TableCell>
                                    <TableCell className="min-w-[200px] border-l" align="left">Phone</TableCell>
                                    <TableCell className="min-w-[200px] border-l" align="left">INN</TableCell>
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
                                                {partner.phone || "-"}
                                            </TableCell>
                                            <TableCell align="left">
                                                {partner.inn || "-"}
                                            </TableCell>
                                            <TableCell align="left">
                                                <Typography className="bg-[#F0B732] text-center p-3 rounded-full ">
                                                    {partner.status ? "ACTIVE" : "INACTIVE"}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Button
                                                    onClick={() => {
                                                        navigator(`/partnerDetials/${partner.id}`)
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

            {/* Add User Modal */}
            <Dialog open={openAddModal} onClose={handleAddClose}>
                <DialogTitle>Add User</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Name"
                        fullWidth
                        value={data.name}
                        onChange={(e) => setData({ ...data, name: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="URL"
                        fullWidth
                        value={data.url}
                        onChange={(e) => setData({ ...data, url: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Address"
                        fullWidth
                        value={data.address}
                        onChange={(e) => setData({ ...data, address: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Phone"
                        fullWidth
                        value={data.phone}
                        onChange={(e) => {
                            let newValue = e.target.value;
                            if (/^\+?\d*$/.test(newValue)) {
                                if (!newValue.startsWith("+998")) {
                                    newValue = "+998";
                                }
                                if (newValue.length <= 13) {
                                    setData({ ...data, phone: newValue });
                                }
                            }
                        }}
                    />
                    <TextField
                        margin="dense"
                        label="Email"
                        fullWidth
                        value={data.email}
                        onChange={(e) => setData({ ...data, email: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="INN"
                        fullWidth
                        value={data.inn}
                        onChange={(e) => setData({ ...data, inn: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Service Fee"
                        fullWidth
                        type="number"
                        value={data.serviceFee}
                        onChange={(e) => setData({ ...data, serviceFee: Number(e.target.value) })}
                    />
                    <TextField
                        margin="dense"
                        label="MFO"
                        fullWidth
                        value={data.mfo}
                        onChange={(e) => setData({ ...data, mfo: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Account"
                        fullWidth
                        value={data.account}
                        onChange={(e) => setData({ ...data, account: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAddClose}>Cancel</Button>
                    <Button
                        disabled={
                            !data.name ||
                            !data.phone ||
                            data.phone.length < 13 ||
                            !data.email ||
                            data.serviceFee <= 0 ||
                            !data.inn ||
                            !data.mfo ||
                            !data.account
                        }
                        onClick={() => {
                            handleAddSubmit();
                        }}
                    >
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
            {/* Edit User Modal */}
            <Dialog open={openEditModal} onClose={handleEditClose}>
                <DialogTitle>Edit User</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Name"
                        fullWidth
                        value={data.name}
                        onChange={(e) =>
                            setData({ ...data, name: e.target.value })
                        }
                    />
                    <TextField
                        margin="dense"
                        label="Phone"
                        fullWidth
                        value={data.phone}
                        onChange={(e) => {
                            let newValue = e.target.value;
                            if (/^\+?\d*$/.test(newValue)) {
                                if (!newValue.startsWith("+998")) {
                                    newValue = "+998";
                                }
                                if (newValue.length <= 13) {
                                    setData({ ...data, phone: newValue });
                                }
                            }
                        }}
                    />
                    <TextField
                        margin="dense"
                        label="Password"
                        type="password"
                        fullWidth
                        value={data.password}
                        onChange={(e) =>
                            setData({ ...data, password: e.target.value })
                        }
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditClose}>Cancel</Button>
                    <Button
                        disabled={!data.name || !data.phone || data?.password?.length < 3}
                        onClick={() => {
                            HandleEdit();
                        }}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Delete User Modal */}
            <Dialog open={openDeleteModal} onClose={handleDeleteClose}>
                <DialogTitle>Delete User</DialogTitle>
                <DialogContent>
                    <Typography variant="h6">
                        Are you sure you want to delete this user?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteClose}>Cancel</Button>
                    <Button onClick={handleDeleteSubmit} color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}
