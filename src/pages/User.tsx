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
} from "@mui/material";
import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";
import { useGlobalRequest } from "../hooks/GlobalHook";
import { useState, useEffect } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { AddUser, UserGet, DeleteUser, EditUser } from "../hooks/url";
import { toast } from "react-hot-toast";
import { Input, Pagination } from "antd";
import { useTranslation } from "react-i18next";

export default function User() {
    const { t } = useTranslation()
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [nameFilter, setNameFilter] = useState('');
    const [numFilter, setNumFilter] = useState('');
    // const [roleFilter, setRoleFilter] = useState('');
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [getId, setGetId] = useState(null);

    const [data, setData] = useState({
        name: "",
        phone: "+998",
        password: "",
    });

    const { error, globalDataFunc, response, loading } = useGlobalRequest(
        `${UserGet}${`fullName=${nameFilter}&`}${`phone=${numFilter}&`}page=${page}&size=${size}`,
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

    const { globalDataFunc: deleteData, response: deleteRes, error: deleteError } = useGlobalRequest(
        `${DeleteUser}id=${getId}`,
        "DELETE",
    );

    useEffect(() => {
        const timeout = setTimeout(() => {
            globalDataFunc();
        }, 1000);
        return () => clearTimeout(timeout);
    }, [page, size, nameFilter, numFilter]);

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
    };
    useEffect(() => {
        if (postRes) {
            toast.success(t("UserAdded"));
            handleAddClose();
            globalDataFunc();
        } else if (postError) {
            toast.error(t("ErrorAddUser"));
        }
    }, [postRes, postError]);

    useEffect(() => {
        if (EditRes) {
            toast.success(t("UserEdited"));
            globalDataFunc()
            handleEditClose();
            setGetId(null);
        } else if (EditError) {
            toast.error(t("ErrorEditUser"));
        }
    }, [EditRes, EditError]);
    const handleDeleteSubmit = async () => {
        await deleteData();
    };

    useEffect(() => {
        if (deleteRes) {
            toast.success(t("UserDeleted"));
            handleDeleteClose();
            globalDataFunc();
            setGetId(null);
        } else if (deleteError) {
            toast.error("ErrorDeleteUser");
        }
    }, [deleteRes, deleteError]);
    const HandleEdit = async () => {
        await EditData();
    };
    return (
        <div className="w-full">
            <Breadcrumb
                pageName={t("AllUser")}
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
                        + {t("AddUser")}
                    </Button>
                }
            />
            <Box sx={{ bgcolor: "white", padding: 5 }}>
                <div className="flex flex-col lg:flex-row gap-5 mb-5">
                    <div className="lg:w-[25%]">
                        <Input
                            size="large"
                            placeholder={t("UserNameSearch")}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNameFilter(e.target.value)}
                        />
                    </div>
                    <div className="lg:w-[25%]">
                        <Input
                            size="large"
                            placeholder={t("SearchUserName")}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNumFilter(e.target.value)}
                        />
                    </div>
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
                    <Typography color="info" textAlign="center">
                        {t("UsersNotFound")}
                    </Typography>
                ) : (
                    <TableContainer>
                        <Table
                            className="bg-white"
                            sx={{ minWidth: 650 }}
                            aria-placeholder="simple table"
                        >
                            <TableHead>
                                <TableRow className="bg-gray-300">
                                    <TableCell >No</TableCell>
                                    <TableCell className="border-l" align="left">{t("UserName")}</TableCell>
                                    <TableCell className="border-l" align="left">{t("PhoneNumber")}</TableCell>
                                    <TableCell className="border-l" align="center">{t("Action")}</TableCell>
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
                                                <span className="select-none">{user.phone ? "+" : ''}</span>{user.phone || "-"}
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
                                                            phone: `+${user.phone}`,
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
                {!error && <div className="flex justify-center mt-5">
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
                </div>}
            </Box>

            {/* Add User Modal */}
            <Dialog open={openAddModal} onClose={handleAddClose}>
                <DialogTitle>{t("AddUser")}</DialogTitle>
                <DialogContent>
                    <Input
                        size="large"
                        placeholder={t("AddUserName")}
                        className="mb-3"
                        value={data.name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setData({ ...data, name: e.target.value })
                        }
                    />
                    <Input
                        size="large"
                        // margin="dense"
                        placeholder={t("Phone")}
                        className="mb-3"
                        value={data.phone}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
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
                    <Input
                        size="large"
                        placeholder={t("EnterYourPassword")}
                        type="password"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setData({ ...data, password: e.target.value })
                        }
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAddClose}>{t("Cancel")}</Button>
                    <Button
                        disabled={!data.name || !data.phone || data?.password?.length < 3}
                        onClick={handleAddSubmit}
                    >
                        {t("Add")}
                    </Button>
                </DialogActions>
            </Dialog>
            {/* Edit User Modal */}
            <Dialog open={openEditModal} onClose={handleEditClose}>
                <DialogTitle>{t("EditUser")}</DialogTitle>
                <DialogContent className="">
                    <Input
                        size="large"
                        className="mb-3"
                        placeholder={t("Namee")}
                        value={data.name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setData({ ...data, name: e.target.value })
                        }
                    />
                    <Input
                        className="mb-3"
                        size="large"
                        placeholder={t("Phone")}
                        value={data.phone}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            let newValue = e.target.value;
                            if (/^\+?\d*$/.test(newValue)) {
                                if (newValue.length <= 13) {
                                    setData({ ...data, phone: newValue });
                                }
                            }
                        }}
                    />
                    <Input
                        size="large"
                        // margin="dense"
                        placeholder={t("EnterYourPassword")}
                        // className="mb-3"
                        type="password"
                        value={data.password}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setData({ ...data, password: e.target.value })
                        }
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditClose}>{t("Cancel")}</Button>
                    <Button
                        disabled={!data.name || !data.phone || data?.password?.length < 3}
                        onClick={() => {
                            HandleEdit();
                        }}
                    >
                        {t("Save")}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Delete User Modal */}
            <Dialog open={openDeleteModal} onClose={handleDeleteClose}>
                <DialogTitle>{t("DeleteUser")}</DialogTitle>
                <DialogContent>
                    <Typography variant="h6">
                        {t("delete")}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteClose}>{t("Cancel")}</Button>
                    <Button onClick={handleDeleteSubmit} color="error">
                        {t("Del")}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
