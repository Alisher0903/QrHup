import { useState, useEffect } from 'react';
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
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useGlobalRequest } from '../../hooks/GlobalHook';
import { ActionModeratorGetOne, ClarifyGet, ModeratorChangeStatus } from '../../hooks/url';
import { DatePicker, Input, Pagination, Select } from 'antd';
import { FaEye } from 'react-icons/fa';
import { datePicker } from '../../common/global-functions/date-sort';
import toast from 'react-hot-toast';

export default function Clarify() {
    const { t } = useTranslation()
    const [merchantNameFilter, setMerchantNameFilter] = useState('');
    const [amountFilter, setAmountFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [date, setDate] = useState<any>([])
    const [id, setId] = useState('');
    const [status, setStatus] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { RangePicker } = DatePicker;
    const getMccUrl = () => {
        const queryParams: string = [
            merchantNameFilter ? `merchantName=${merchantNameFilter}` : '',
            amountFilter ? `amount=${amountFilter}` : '',
            statusFilter ? `status=${statusFilter}` : '',
            datePicker(0, date) ? `from=${datePicker(0, date)}` : '',
            datePicker(1, date) ? `to=${datePicker(1, date)}` : '',
        ]
            .filter(Boolean)
            .join('&');
        return `${ClarifyGet}${queryParams
            ? `&${queryParams}&page=${page}&size=${size}`
            : `page=${page}&size=${size}`
            }`;
    };

    const { error, globalDataFunc, response, loading } = useGlobalRequest(
        getMccUrl(),
        'GET',
    );
    const { error: errorPost, globalDataFunc: EffectPost, response: rePost } = useGlobalRequest(
        `${ModeratorChangeStatus}transId=${id}&status=${status}`,
        'POST',
        {}
    );
    const {
        globalDataFunc: EffectGetOne,
        response: getOneRes,
    } = useGlobalRequest(`${ActionModeratorGetOne}${id}`, 'GET');
    const HandleChangeStatus = () => {
        if (status) {
            return EffectPost();
        }
    }
    useEffect(() => {
        if (rePost) {
            toast.success('Status Successfuly changed',);
            handleModalClose()
            globalDataFunc();
            EffectGetOne();
        } else if (errorPost) {
            toast.error('Error to change status')
        }
    }, [rePost, errorPost])

    useEffect(() => {
        globalDataFunc();
        EffectGetOne();
    }, [page, size, merchantNameFilter, amountFilter, statusFilter, id, statusFilter, date]);

    console.log('getOne res', getOneRes);

    const handleModalOpen = () => {
        setIsModalOpen(true);
        EffectGetOne();
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    return (
        <Container>
            <Breadcrumb pageName={t("Action")} />
            <Box sx={{ bgcolor: 'white', padding: 5 }}>
                <Box sx={{ display: 'grid', flexDirection: 'column' }} gap={2}>
                    {/* Filters */}
                    <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 mb-2'
                    >
                        <Input
                            type='text'
                            size='large'
                            width={30}
                            placeholder={t("SearchName")}
                            value={merchantNameFilter}
                            onChange={(e) => {
                                setMerchantNameFilter(e.target.value);
                            }}
                        />
                        <Input
                            type='text'
                            placeholder={t("SearchAmount")}
                            value={amountFilter}
                            onChange={(e) => {
                                setAmountFilter(e.target.value);
                            }}
                        />
                        <RangePicker
                            allowClear
                            onChange={(dates) => setDate(dates)}
                        />
                        <Select
                            size="large"
                            allowClear
                            placeholder={t("Status")}
                            onChange={(e) => setStatusFilter(e)}
                            options={[
                                {
                                    value: "PARTIAL",
                                    label: t("partial"),
                                },
                                {
                                    value: "CLARIFICATION",
                                    label: t("Clarification"),
                                }
                            ]}
                        />
                    </div>
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
                    <Typography color="error" textAlign="center">
                        {t("LoadData")}
                    </Typography>
                ) : (
                    <TableContainer>
                        <Table
                            className="bg-white"
                            sx={{ minWidth: 650 }}
                            aria-label="simple amountFilter"
                        >
                            <TableHead>
                                <TableRow className="bg-gray-300">
                                    <TableCell className="min-w-[100px] ">No</TableCell>
                                    <TableCell className="min-w-[200px] border-l" align="left">
                                        {t("Name")}
                                    </TableCell>
                                    <TableCell className="min-w-[200px] border-l" align="left">
                                        {t("Amount")}
                                    </TableCell>
                                    <TableCell className="min-w-[200px] border-l" align="left">
                                        {t("CreatedTime")}
                                    </TableCell>
                                    <TableCell className="min-w-[200px] border-l" align="left">
                                        {t("Status")}
                                    </TableCell>
                                    <TableCell className="min-w-[200px] border-l" align="center">
                                        {t("Action")}
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {response?.object?.map((user: any, index: number) => (
                                    <TableRow key={user.id || index}>
                                        <TableCell>{page * 10 + index + 1}</TableCell>
                                        <TableCell align="left">{user.merchantName || '-'}</TableCell>
                                        <TableCell align="left">{user.amount || '-'}</TableCell>
                                        <TableCell align="left">
                                            {user?.createdAt
                                                ? new Date(user.createdAt).toISOString().split('T')[0]
                                                : '-'}
                                        </TableCell>
                                        <TableCell className={'uppercase'} align="left">{user.status || '-'}</TableCell>
                                        <TableCell align="center">
                                            <Button
                                                onClick={() => {
                                                    handleModalOpen();
                                                    setId(user.transId);
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
                                {/* <TableRow>
                                    <TableCell>Confirmed Date</TableCell>
                                    <TableCell>{getOneRes?.terminal || '-'}</TableCell>
                                </TableRow> */}
                                {/* <TableRow>
                                    <TableCell>Action</TableCell>
                                    <TableCell>
                                        {getOneRes?.action ? 'Confirm' : 'Canceled'}
                                    </TableCell>
                                </TableRow> */}
                            </TableBody>
                        </Table>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={async () => {
                            await setStatus('CANCELED')
                            HandleChangeStatus();
                        }}
                        className='bg-transparent text-black border'
                    >
                        {t("CancelPayment")}
                    </Button>
                    <Button
                        onClick={async () => {
                            await setStatus('COMPLETED')
                            HandleChangeStatus();
                        }}
                        variant="contained"
                        color="primary"
                    >
                        {t("ConfirmPayment")}
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}
