import  { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
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
    // TextField,
    Button,
    // Modal,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useGlobalRequest } from '../../hooks/GlobalHook';
import { ActionModeratorGet, ActionModeratorGetOne } from '../../hooks/url';
import { Input, Pagination } from 'antd';
import { FaEye } from 'react-icons/fa';

export default function ActionModerator() {
    const { t } = useTranslation()
    const [nameFilter, setNameFilter] = useState('');
    const [table, setTable] = useState('');
    const [tableName, setTableName] = useState('');
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [id, setId] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const getMccUrl = () => {
        const queryParams: string = [
            nameFilter ? `name=${nameFilter}` : '',
            table ? `table=${table}` : '',
            tableName ? `tableName=${tableName}` : '',
        ]
            .filter(Boolean)
            .join('&');
        return `${ActionModeratorGet}?${queryParams
            ? `&${queryParams}&page=${page}&size=${size}`
            : `page=${page}&size=${size}`
            }`;
    };

    const { error, globalDataFunc, response, loading } = useGlobalRequest(
        getMccUrl(),
        'GET',
    );
    const {
        // error: GetoneError,
        globalDataFunc: EffectGetOne,
        response: getOneRes,
    } = useGlobalRequest(`${ActionModeratorGetOne}${id}`, 'GET');

    useEffect(() => {
        const timeout = setTimeout(() => {
            EffectGetOne();
            globalDataFunc();
        }, 1000);
        return () => clearTimeout(timeout);
    }, [page, size, nameFilter, table, tableName, id]);

    // //('getOne res', getOneRes);

    const handleModalOpen = (user: any) => {
        setSelectedUser(user);
        setIsModalOpen(true);
        EffectGetOne();
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
    };

    return (
        <div className='w-full'>
            <Breadcrumb pageName={t("Action")} />
            <Box sx={{ bgcolor: 'white', padding: 5 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }} gap={2}>
                    {/* Filters */}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', sm: 'row' },
                            gap: 2,
                            marginBottom: 3,
                        }}
                    >
                        <Input
                            type="text"
                            size='large'
                            placeholder={t("NameSearch")}
                            onChange={(e) => setNameFilter(e.target.value)}
                        />
                        <Input
                            type="text"
                            size='large'
                            placeholder={t("SearchID")}
                            onChange={(e) => setTable(e.target.value)}
                        />
                        <Input
                            type="text"
                            size='large'
                            placeholder={t("SearchTable")}
                            onChange={(e: any) => setTableName(e.target.value)}
                        />
                    </Box>
                </Box>
                {/* Table */}
                {loading ? (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '200px',
                        }}
                    >
                        <CircularProgress />
                    </Box>
                ) : error ? (
                    <Typography color="info" textAlign="center">
                        {t("ModeratorActionNotFound")}
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
                                    <TableCell className="min-w-[200px]" align="left">
                                        {t("UserName")}
                                    </TableCell>
                                    <TableCell className="min-w-[200px]" align="left">
                                       {t("Action")}
                                    </TableCell>
                                    <TableCell className="min-w-[200px]" align="left">
                                        {t("Createtime")}
                                    </TableCell>
                                    <TableCell className="min-w-[200px]" align="left">
                                        {t("Table")}
                                    </TableCell>
                                    <TableCell className="min-w-[200px]" align="left">
                                        {t("ObjectID")}
                                    </TableCell>
                                    <TableCell className="min-w-[150px]" align="left">
                                        {t("SeeMore")}
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {response?.object?.map((user: any, index: number) => (
                                    <TableRow key={user.id || index}>
                                        <TableCell>{page * 10 + index + 1}</TableCell>
                                        <TableCell align="left">{user.fullName || '-'}</TableCell>
                                        <TableCell align="left">{user.status || '-'}</TableCell>
                                        <TableCell align="left">
                                            {user?.createdAt
                                                ? new Date(user.createdAt).toISOString().split('T')[0]
                                                : '-'}
                                        </TableCell>
                                        <TableCell align="left">{user.tableName || '-'}</TableCell>
                                        <TableCell align="left">{user.tableId || '-'}</TableCell>
                                        <TableCell align="left">
                                            <Button
                                                onClick={() => {
                                                    handleModalOpen(user);
                                                    setId(user.tableId);
                                                }}
                                            >
                                                <FaEye size={30} color="black" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
                {/* Pagination */}
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
            {/* Modal */}
            {/* <Modal open={isModalOpen} onClose={}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        bgcolor: "white",
                        boxShadow: 24,
                        p: 4,
                        borderRadius: "8px",
                    }}
                >
                    <Typography textAlign={"center"} variant="h3" mb={2}>
                        Details
                    </Typography>
                    <Button
                        onClick={handleModalClose}
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2 }}
                    >
                        Close
                    </Button>
                </Box>
            </Modal> */}
            <Dialog open={isModalOpen} onClose={handleModalClose}>
                <DialogTitle>
                    <Typography align="center" fontSize="24px" fontWeight="bold">
                        {t("Details")}
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    {/* QR Details and Transaction Details */}
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            // gap: "16px",
                            backgroundColor: '#f7f7f7',
                            borderRadius: '8px',
                            padding: '16px',
                            width: '100%',
                        }}
                    >
                        {/* QR Details */}
                        <Box>
                            <Typography
                                align="center"
                                fontWeight="bold"
                                fontSize="18px"
                                sx={{ marginBottom: '8px' }}
                            >
                                {t("QRDetails")}
                            </Typography>
                            <Table size="small">
                                <TableBody className="gap-4">
                                    <TableRow
                                        className={
                                            getOneRes?.amount ? 'bg-[#FD314D] text-white' : ''
                                        }
                                    >
                                        <TableCell>
                                            <span
                                                className={
                                                    getOneRes?.amount ? 'bg-[#FD314D] text-white' : ''
                                                }
                                            >
                                                {' '}
                                                {t("Amount")}{' '}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <span
                                                className={
                                                    getOneRes?.amount ? 'bg-[#FD314D] text-white' : ''
                                                }
                                            >
                                                {getOneRes?.qrAmount || '-'}
                                            </span>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow
                                        className={
                                            getOneRes?.currency ? 'bg-[#FD314D] text-white' : ''
                                        }
                                    >
                                        <TableCell>
                                            <span
                                                className={
                                                    getOneRes?.currency ? 'bg-[#FD314D] text-white' : ''
                                                }
                                            >
                                                {t("Currency")}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <span
                                                className={
                                                    getOneRes?.currency ? 'bg-[#FD314D] text-white' : ''
                                                }
                                            >
                                                {getOneRes?.qrCurrency || ''}
                                            </span>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow
                                        className={getOneRes?.date ? 'bg-[#FD314D] text-white' : ''}
                                    >
                                        <TableCell
                                            className={
                                                getOneRes?.date ? 'bg-[#FD314D] text-white' : ''
                                            }
                                        >
                                            <span
                                                className={
                                                    getOneRes?.date ? 'bg-[#FD314D] text-white' : ''
                                                }
                                            >
                                                {t("Date")}
                                            </span>
                                        </TableCell>
                                        <TableCell
                                            className={
                                                getOneRes?.date ? 'bg-[#FD314D] text-white' : ''
                                            }
                                        >
                                            <span
                                                className={
                                                    getOneRes?.date ? 'bg-[#FD314D] text-white' : ''
                                                }
                                            >
                                                {t("ExpireDate")}:{' '}
                                                {getOneRes?.qrDate
                                                    ? new Date(getOneRes.qrDate)
                                                        .toISOString()
                                                        .slice(0, 10)
                                                    : '-'}
                                            </span>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>

                        {/* Transaction Details */}
                        <Box>
                            <Typography
                                align="center"
                                fontWeight="bold"
                                fontSize="18px"
                                sx={{ marginBottom: '8px' }}
                            >
                                {t("TransactionDetails")}
                            </Typography>
                            <Table size="small">
                                <TableBody>
                                    <TableRow
                                        className={
                                            getOneRes?.amount ? 'bg-[#FD314D] text-white' : ''
                                        }
                                    >
                                        <TableCell> </TableCell>
                                        <TableCell>
                                            <span
                                                className={
                                                    getOneRes?.amount ? 'bg-[#FD314D] text-white' : ''
                                                }
                                            >
                                                {getOneRes?.transAmount || '-'}
                                            </span>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow
                                        className={
                                            getOneRes?.currency ? 'bg-[#FD314D] text-white' : ''
                                        }
                                    >
                                        <TableCell> </TableCell>
                                        <TableCell>
                                            <span
                                                className={
                                                    getOneRes?.currency ? 'bg-[#FD314D] text-white' : ''
                                                }
                                            >
                                                {getOneRes?.transCurrency || '-'}
                                            </span>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow
                                        className={getOneRes?.date ? 'bg-[#FD314D] text-white' : ''}
                                    >
                                        <TableCell
                                            className={
                                                getOneRes?.date ? 'bg-[#FD314D] text-white' : ''
                                            }
                                        >
                                            {' '}
                                        </TableCell>
                                        <TableCell>
                                            <span
                                                className={
                                                    getOneRes?.date ? 'bg-[#FD314D] text-white' : ''
                                                }
                                            >
                                                {t("PaymentDate")}:{' '}
                                                {getOneRes?.transDate
                                                    ? new Date(getOneRes.transDate)
                                                        .toISOString()
                                                        .slice(0, 10)
                                                    : '-'}
                                            </span>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Box>

                    {/* More Details Section */}
                    <Box
                        sx={{
                            marginTop: '16px',
                            backgroundColor: '#f7f7f7',
                            borderRadius: '8px',
                            padding: '16px',
                        }}
                    >
                        <Typography
                            align="center"
                            fontWeight="bold"
                            fontSize="18px"
                            sx={{ marginBottom: '16px' }}
                        >
                            {t("MoreDetails")}
                        </Typography>
                        <Table size="small">
                            <TableBody className=" gap-4">
                                <TableRow>
                                    <TableCell>{t("Partner")}</TableCell>
                                    <TableCell>{getOneRes?.partner || '-'}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>{t("Merchant")}</TableCell>
                                    <TableCell>{getOneRes?.merchant || '-'}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>{t("Terminal")}</TableCell>
                                    <TableCell>{getOneRes?.terminal || '-'}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>{t("ConfirmedDate")}</TableCell>
                                    <TableCell>{getOneRes?.terminal || '-'}</TableCell>
                                    <TableCell>Confirmed Date</TableCell>
                                    <TableCell>{getOneRes?.createAt ? new Date(getOneRes.createAt).toLocaleDateString() : '-'}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>{t("Action")}</TableCell>
                                    <TableCell>
                                        {getOneRes?.action ? t("Confirm") : t("Canceled")}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleModalClose}
                        variant="contained"
                        color="primary"
                    >
                        {t("Close")}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
