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

} from "@mui/material";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { useGlobalRequest } from "../../hooks/GlobalHook";
import { useState, useEffect } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { MccGet, MccCreate, MccEdit, MccDelete } from "../../hooks/url";
import { toast } from "react-hot-toast";
import { Pagination } from "antd";


export default function Mcc() {
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [nameFilter, setNameFilter] = useState('');
    const [code, setCode] = useState('');
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [getId, setGetId] = useState(null);

    const [data, setData] = useState({
        name: "",
        code: "",
    });
    const getMccUrl = () => {
        const queryParams: string = [
            nameFilter ? `name=${nameFilter}` : '',
            code ? `code=${code}` : '',
        ].filter(Boolean).join('&');
        return `${MccGet}?page=${page}&size=${size}${queryParams ? `&${queryParams}` : ''}`;
    }
    const { error, globalDataFunc, response, loading } = useGlobalRequest(
        getMccUrl(),
        "GET"
    );

    const { globalDataFunc: postData, response: postRes, error: postError } = useGlobalRequest(
        MccCreate,
        "POST",
        {
            name: data.name,
            code: data.code,
        }
    );
    const { globalDataFunc: EditData, response: EditRes, error: EditError } = useGlobalRequest(
        `${MccEdit}id=${getId}`,
        "PUT",
        {
            name: data.name,
            code: data.code,
        }
    );

    const { globalDataFunc: deleteData, response: deleteRes, error: deleteError } = useGlobalRequest(
        `${MccDelete}id=${getId}`,
        "DELETE",
    );

    useEffect(() => {
        globalDataFunc();
    }, [page, size, nameFilter, code]);

    // Modal Handlers
    const handleAddOpen = () => {
        setData({ name: "", code: "" });
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
    };
    useEffect(() => {
        if (deleteRes) {
            toast.success("User deleted successfully!");
            handleDeleteClose();
            globalDataFunc();
            setGetId(null);
        } else if (deleteError) {
            toast.error("Failed to delete user!");
        }
    }, [deleteRes,deleteError]);
    const HandleEdit = async () => {
        await EditData();
    };
    return (
        <Container>
            <Breadcrumb
                pageName="MCC"
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
                        + Add MCC
                    </Button>
                }
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
                            label="Search with code..."
                            onChange={
                                (e) => setCode(e.target.value)
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
                                    <TableCell className="border-l" align="left">MCC name</TableCell>
                                    <TableCell className="border-l" align="left">MCC code</TableCell>
                                    <TableCell className="border-l" align="left">Create Time</TableCell>
                                    <TableCell className="border-l" align="center">Action</TableCell>
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
                                                {user.createdAt || "-"}
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
                                                            code: user.code,
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

            {/* Add User Modal */}
            <Dialog open={openAddModal} onClose={handleAddClose}>
                <DialogTitle>Add User</DialogTitle>
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
                        label="Code"
                        fullWidth
                        value={data.code}
                        onChange={(e) => {
                            const value = e.target.value;
                            if (/^\d*$/.test(value) && value.length <= 4) {
                                setData({ ...data, code: value });
                            }
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAddClose}>Cancel</Button>
                    <Button
                        disabled={!data.name || !data.code}
                        onClick={handleAddSubmit}
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
                        label="Code"
                        fullWidth
                        value={data.code}
                        onChange={(e) => {
                            const value = e.target.value;
                            // Faqat raqamlar va maksimal uzunlikni tekshirish
                            if (/^\d*$/.test(value) && value.length <= 4) {
                                setData({ ...data, code: value });
                            }
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditClose}>Cancel</Button>
                    <Button
                        disabled={!data.name || !data.code}
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
