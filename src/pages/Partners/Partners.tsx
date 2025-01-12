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
import { MdEdit } from "react-icons/md";
import { DeleteUser, PartnerGet, PartnerCreate, PartnerEdit } from "../../hooks/url";
import { toast } from "react-hot-toast";
import { Input, Pagination } from "antd";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { DatePicker, Select } from "antd";
import { datePicker } from "../../common/global-functions/date-sort";
import { PartnersStore } from "../../hooks/Store/Partners/partnerStore";
const { RangePicker } = DatePicker;

export default function Partners() {
    const { setPartners } = PartnersStore()
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    // Filter states
    const [nameFilter, setNameFilter] = useState('');
    const [numFilter, setNumFilter] = useState('');
    const [emailFilter, setEmailFilter] = useState('');
    const [inn, setInn] = useState('');
    const [mFO, setMFO] = useState('');
    const [account, setAccount] = useState('');
    const [date, setDate] = useState<any>([])
    const [status, setStatus] = useState<boolean>();
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
    });
    const getPartnerUrl = () => {
        const queryParams: string = [
            nameFilter ? `name=${nameFilter}` : '',
            numFilter ? `phone=${numFilter}` : '',
            emailFilter ? `email=${emailFilter}` : '',
            inn ? `inn=${inn}` : '',
            mFO ? `mfo=${mFO}` : '',
            account ? `account=${account}` : '',
            datePicker(0, date) ? `from=${datePicker(0, date)}` : '',
            datePicker(1, date) ? `to=${datePicker(1, date)}` : '',
            status ? `status=${status}` : '',

        ].filter(Boolean).join('&');

        return `${PartnerGet}?page=${page}&size=${size}${queryParams ? `&${queryParams}` : ''}`;
    }

    const { error, globalDataFunc, response, loading } = useGlobalRequest(
        getPartnerUrl(),
        "GET"
    );

    const { globalDataFunc: postData, response: postRes, error: postError } = useGlobalRequest(
        PartnerCreate,
        "POST",
        {
            name: data.name, // 1
            phone: data.phone.replaceAll("+", ""), // 2
            url: data.url, // 4
            address: data.address, // 5
            email: data.email, // 6
            inn: data.inn, // 7
            serviceFee: data.serviceFee, // 9
            mfo: data.mfo, // 10
            account: data.account, // 11
        }
    );
    const { globalDataFunc: EditData, response: EditRes, error: EditError } = useGlobalRequest(
        `${PartnerEdit}id=${getId}`,
        "PUT",
        {
            name: data.name, // 1
            phone: data.phone.replaceAll("+", ""), // 2
            url: data.url, // 4
            address: data.address, // 5
            email: data.email, // 6
            inn: data.inn, // 7
            serviceFee: data.serviceFee, // 9
            mfo: data.mfo, // 10
            account: data.account, // 11
        }
    );

    const { globalDataFunc: deleteData, response: deleteRes } = useGlobalRequest(
        `${DeleteUser}id=${getId}`,
        "DELETE",
    );

    useEffect(() => {
        globalDataFunc();
    }, [page, size, nameFilter, numFilter, emailFilter, status, date, inn, mFO, account]);

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
            // password: "",
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
            toast.error(postError);
        }
    }, [postRes, postError]);



    useEffect(() => {
        if (EditRes) {
            toast.success("User edited successfully!");
            globalDataFunc()
            handleEditClose();
            setGetId(null);
        } else if (EditError) {
            toast.error(EditError);
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
                toast.error(error);
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
                pageName="All Partners"
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
                <div className="flex flex-row gap-5 mb-5">
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
                            placeholder="Search with phone"
                            onChange={
                                (e) => setNumFilter(e.target.value)
                            }
                        />
                    </div>
                    <div className="w-[25%]">
                        <Input
                            allowClear
                            size="large"
                            placeholder="Search with email"
                            onChange={
                                (e) => setEmailFilter(e.target.value)
                            }
                        />
                    </div>
                    <div className="w-[25%]">
                        <Input
                            allowClear
                            size="large"
                            placeholder="Search with INN"
                            onChange={
                                (e) => setInn(e.target.value)
                            }
                        />
                    </div>
                </div>
                <div className="flex flex-row gap-5 mb-5">
                    <div className="w-[25%]">
                        <RangePicker
                            size="large"
                            allowClear
                            onChange={(dates) => setDate(dates)}
                        />
                    </div>
                    <div className="w-[25%]">
                        <Select
                            size="large"
                            allowClear
                            className="w-full"
                            placeholder="Status"
                            onChange={(value) => setStatus(value)}
                            options={[
                                {
                                    value: 'ACTIVE',
                                    label: 'Active',
                                },
                                {
                                    value: 'INACTIVE',
                                    label: 'InActive',
                                }
                            ]}
                        />
                    </div>
                    <div className="w-[25%]">
                        <Input
                            allowClear
                            size="large"
                            placeholder="Search with MFO"
                            onChange={
                                (e) => setMFO(e.target.value)
                            }
                        />
                    </div>
                    <div className="w-[25%]">
                        <Input
                            allowClear
                            size="large"
                            placeholder="Search with Account"
                            onChange={
                                (e) => setAccount(e.target.value)
                            }
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
                                    <TableCell className="min-w-[200px] border-l" align="left">Email</TableCell>
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
                                                {partner.email || "-"}
                                            </TableCell>
                                            <TableCell align="left">
                                                {partner.inn || "-"}
                                            </TableCell>
                                            <TableCell align="left">
                                                <Typography className={!partner.active ? "bg-yellow-500 text-center text-white p-3 rounded-lg" : "bg-green-500 text-white text-center p-3 rounded-lg"}>
                                                    {partner.active ? "ACTIVE" : "INACTIVE"}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Button
                                                    onClick={() => {
                                                        navigator(`/partnersDetials/${partner.id}`);
                                                        setPartners(partner);
                                                    }}
                                                >
                                                    <FaEye size={25} color="black" />
                                                </Button>
                                                <Button
                                                    onClick={() => {
                                                        setOpenEditModal(true);
                                                        setData({
                                                            name: partner.name,
                                                            phone: partner.phone,
                                                            account: partner.account,
                                                            mfo: partner.mfo,
                                                            inn: partner.inn,
                                                            email: partner.email,
                                                            serviceFee: partner.serviceFee,
                                                            address: partner.address,
                                                            url: partner.url,
                                                        });
                                                        setGetId(partner.id)
                                                    }}
                                                >
                                                    <MdEdit size={25} color="black" />
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
                <DialogContent className="flex flex-col gap-3" style={{ width: '600px' }}>
                    <Input
                        allowClear
                        placeholder="Name"
                        size="large"
                        value={data.name}
                        onChange={(e) => setData({ ...data, name: e.target.value })}
                    />
                    <Input
                        allowClear
                        placeholder="URL"
                        size="large"
                        value={data.url}
                        onChange={(e) => setData({ ...data, url: e.target.value })}
                    />
                    <Input
                        allowClear
                        placeholder="Address"
                        size="large"
                        value={data.address}
                        onChange={(e) => setData({ ...data, address: e.target.value })}
                    />
                    <Input
                        allowClear
                        placeholder="Phone"
                        size="large"
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
                    <Input
                        allowClear
                        placeholder="Email"
                        size="large"
                        value={data.email}
                        onChange={(e) => setData({ ...data, email: e.target.value })}
                    />
                    <Input
                        allowClear
                        placeholder="INN"
                        size="large"
                        value={data.inn}
                        onChange={(e) => setData({ ...data, inn: e.target.value })}
                    />
                    <Input
                        allowClear
                        placeholder="Service Fee"
                        size="large"
                        value={data.serviceFee}
                        onChange={(e) => setData({ ...data, serviceFee: Number(e.target.value) })}
                    />
                    <Input
                        allowClear
                        placeholder="MFO"
                        type="number"
                        size="large"
                        value={data.mfo}
                        onChange={(e) => setData({ ...data, mfo: e.target.value })}
                    />
                    <Input
                        allowClear
                        placeholder="Account"
                        type="number"
                        size="large"
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
                    <Button onClick={handleEditClose}>Cancel</Button>
                    <Button
                        disabled={
                            !data.name ||
                            !data.account ||
                            !data.address ||
                            !data.email ||
                            !data.inn ||
                            !data.mfo ||
                            !data.phone ||
                            !data.serviceFee ||
                            !data.url}
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
