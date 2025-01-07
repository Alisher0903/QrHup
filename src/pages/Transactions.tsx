import { Box, Button, CircularProgress, Container, Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import { MdDelete, MdEdit } from 'react-icons/md';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { useGlobalRequest } from '../hooks/GlobalHook';

const Transactions = () => {
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [nameFilter, setNameFilter] = useState('');
    const [numFilter, setNumFilter] = useState('');
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [getId, setGetId] = useState(null);

    const [data, setData] = useState({
        name: "",
        phone: "+998",
        password: "",
    });

    const { error, globalDataFunc, response, loading } = useGlobalRequest(
        `${'UserGet'}${`fullName=${nameFilter}&`}${`phone=${numFilter}&`}page=${page}&size=${size}`,
        "GET"
    );

    const { globalDataFunc: postData, response: postRes } = useGlobalRequest(
        'AddUser',
        "POST",
        {
            name: data.name,
            phone: data.phone.replaceAll("+", ""),
            password: data.password,
        }
    );
    const { globalDataFunc: EditData, response: EditRes } = useGlobalRequest(
        `${'EditUser'}id=${getId}`,
        "PUT",
        {
            name: data.name,
            phone: data.phone.replaceAll("+", ""),
            password: data.password,
        }
    );

    const { globalDataFunc: deleteData, response: deleteRes } = useGlobalRequest(
        `${'DeleteUser'}id=${getId}`,
        "DELETE",
    );

    useEffect(() => {
        globalDataFunc();
    }, [nameFilter, numFilter]);

    // Modal Handlers
    const handleAddOpen = () => {
        setData({ name: "", phone: "+998", password: "" });
        setOpenAddModal(true);
    };

    const handleAddClose = () => setOpenAddModal(false);

    const handleEditClose = () => setOpenEditModal(false);

    const handleDeleteClose = () => setOpenDeleteModal(false);

    const handleAddSubmit = async () => {
        await postData();
        if (postRes) {
            toast.success("User added successfully!");
            handleAddClose();
            globalDataFunc();
        } else {
            toast.error("Failed to add user!");
        }
    };

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

    const HandleEdit = async () => {
        await EditData();
        try {
            if (EditRes) {
                toast.success("User edited successfully!");
                globalDataFunc()
                handleEditClose();
                setGetId(null);
            }
        } catch (error) {

        }
    };
    return (
        <Container>
            <Breadcrumb
                pageName="All User"
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
                        + Add User
                    </Button>
                }
            />
            <Box sx={{ bgcolor: "white", padding: 5 }}>
                <Box sx={{ display: "flex", flexDirection: "column" }} gap={2}>
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
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
                    </Box>
                    <Typography color="textPrimary" mb={3}>
                        All Users
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
                                    <TableCell>No</TableCell>
                                    <TableCell align="right">Name</TableCell>
                                    <TableCell align="right">Phone</TableCell>
                                    <TableCell align="center">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {response?.object?.map(
                                    (user: any, index: number) => (
                                        <TableRow key={user.id || index}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell align="right">
                                                {user.name || "-"}
                                            </TableCell>
                                            <TableCell align="right">
                                                {user.phone || "-"}
                                            </TableCell>
                                            <TableCell align="center">
                                                <Button
                                                    onClick={() => {
                                                        setGetId(user.id);
                                                        setOpenDeleteModal(true);
                                                    }}
                                                >
                                                    <MdDelete size={20} color="black" />
                                                </Button>
                                                <Button
                                                    onClick={() => {
                                                        setGetId(user.id);
                                                        setData({
                                                            name: user.name,
                                                            phone: user.phone,
                                                            password: "",
                                                        });
                                                        setOpenEditModal(true);
                                                    }}
                                                >
                                                    <MdEdit size={20} color="black" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    )
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Box>
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
    )
};

export default Transactions;
