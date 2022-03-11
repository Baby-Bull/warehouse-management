import './ListOrder.scss';

import * as React from 'react';
import { CSVLink } from "react-csv";
// import { Box, Autocomplete, Button, TextField, Divider, InputAdornment } from '@mui/material'
import { Download, Upload, AddCircle, Search, FilterAltOutlined, FilterAlt } from '@mui/icons-material';
import { Box, TextField, InputAdornment, Autocomplete, Button, Divider, Card, CardContent, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material'
import { Link } from 'react-router-dom'
import TableOrder from '../../../components/table/TableListOrder';
import UnlockAccess from '../../../components/roleBasedRender/UnlockAccess'
import OrderAPI from '../../../api/OrderAPI';

export default function ListOrder() {
    const Fillter = [
        { title: 'Đang giao dịch', label: 'Trạng thái' },
        { title: 'Đã hoàn thành', label: 'Trạng thái' },
        { title: 'Chưa thanh toán', label: 'Thanh toán' },
        { title: 'Thanh toán một phần', label: 'Thanh toán' },
        { title: 'Đã thanh toán', label: 'Thanh toán' },
        { title: 'Chờ nhập kho', label: 'Nhập kho' },
        { title: 'Nhập kho một phần', label: 'Nhập kho' },
        { title: 'Đã nhập kho', label: 'Nhập kho' }

    ];
    const statuss = [
        { name: 'Đang giao dịch' },
        { name: 'Đã hoàn thành' }
    ]
    const payments = [
        { name: 'Chưa thanh toán' },
        { name: 'Thanh toán một phần' },
        { name: 'Đã thanh toán' }
    ]
    const imports = [
        { name: 'Chờ nhập kho' },
        { name: 'Nhập kho một phần' },
        { name: 'Đã nhập kho' },
        { name: 'Hoàn trả một phần' },
        { name: 'Hoàn trả toàn bộ' }
    ]
    const [statusFilter, setStatusFilter] = React.useState('');
    const [paymentFilter, setPaymentFilter] = React.useState('');
    const [importFilter, setImportFilter] = React.useState('');

    const handleChangeStatus = (e) => {
        let value = e.target.value;
        setStatusFilter(value);
        // console.log(value);
    }
    const handleChangePayments = (e) => {
        let value = e.target.value;
        setPaymentFilter(value);
        // console.log(value);
    }
    const handleChangeImports = (e) => {
        let value = e.target.value;
        setImportFilter(value);
        // console.log(value);
    }

    const options = Fillter.map((option) => {
        const firstLetter = option.label;
        return {
            firstLetter: /The/.test(firstLetter) ? '0-9' : firstLetter,
            ...option,
        };
    });

    // header xuất file
    const headers = [
        { label: "Mã đơn hàng", key: 'code' },
        { label: "Tên nhà cung cấp", key: 'supplier.name' },
        { label: "SĐT nhà cung cấp", key: 'supplier.phone' },
        { label: "Trạng thái đơn hàng", key: 'status' },
        { label: "Trạng thái thanh toán", key: 'transactionStatus' },
        { label: "Trạng thái nhập kho", key: 'importedStatus' },
        { label: "Tổng tiền", key: 'totalAmount' },
        { label: "Đã trả", key: 'paidAmount' },
        { label: "Người tạo", key: 'createdBy.username' },
        { label: "Ngày mong muốn nhận", key: 'expectedTime' },
        { label: "Thời gian tạo đơn", key: 'createdAt' },
        { label: "Mô tả", key: 'description' }
    ];

    const [searchInput, setSearchInput] = React.useState('');
    const [searchedProducts, setSearchedProducts] = React.useState([]);
    const [listOrder, setListOrder] = React.useState([]);

    //inputs
    const handleChange = (e) => {
        let value = e.target.value.toLowerCase();
        // let value = 'thanh toán một phần';
        setSearchInput(value);
        let input = value.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
        let result = listOrder.filter(product => product.code.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").indexOf(input) >= 0);
        setSearchedProducts([...result]);
    }
    const handleFillter = () => {

        let test = listOrder;

        if (statusFilter != "" || paymentFilter != "" || importFilter != "") {
            if (statusFilter != "") {
                let result = test.filter(product => product.status === statusFilter);
                test = result;
                setSearchedProducts([...result]);
            }
            if (paymentFilter != "") {
                let result = test.filter(product => product.transactionStatus === paymentFilter);
                test = result;
                setSearchedProducts([...result]);
            }
            if (importFilter != "") {
                let result = searchedProducts.filter(product => product.importedStatus === importFilter);
                test = result;
                setSearchedProducts([...result]);
            }
        } else {
            let result = listOrder;
            setSearchedProducts([...result]);
        }


    }

    React.useEffect(() => {
        setSearchedProducts(listOrder);
        handleFillter();
    }, [statusFilter, paymentFilter, importFilter])
    React.useEffect(() => {
        const fetchOrders = async () => {
            const res = await OrderAPI.OrderList();
            setListOrder(res.data);
            setSearchedProducts(res.data);
        }
        fetchOrders();
    }, [])
    // console.log(searchedProducts);
    return (
        <Box className="supplierOrder-main-content" px={4} pt={2} backgroundColor="#F4F6F8" minHeight='91vh' >

            <Box display='flex' flexDirection='column'>

                <Box display='flex' justifyContent='space-between' py={2} px={2} backgroundColor='white'>
                    <CSVLink data={searchedProducts} headers={headers} filename="Orders.csv" target="_blank"
                        style={{ display: "flex", alignItems: "center", textDecoration: "none", color: "black" }}
                    >
                        <Download />
                        Xuất File
                    </CSVLink>
                    <UnlockAccess request={['ADMIN', 'Nhân viên kho']}>
                        <Box>
                            <Link style={{ textDecoration: "none" }} to="/nhap-hang/tao-don-nhap-hang">
                                <Button variant="contained" sx={{ width: 200 }} startIcon={<AddCircle />}>Tạo đơn nhập hàng</Button>
                            </Link>
                        </Box>
                    </UnlockAccess>
                </Box>
                <Divider />
                <Box className="filter-search" py={2} px={2} display='flex' justifyContent='space-between' backgroundColor='white'>
                    <Box display='flex' alignItems='center' sx={{ width: "60%" }} className="search">
                        <TextField
                            placeholder="Tìm kiếm"
                            sx={{
                                width: '100%', height: "40px"
                            }}

                            value={searchInput}
                            onChange={(e) => handleChange(e)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search />
                                    </InputAdornment>
                                ),
                            }}
                            variant="outlined"
                        // size='small'
                        />
                    </Box>

                    <Box className="filter" display='flex' alignItems='center' ml={10} sx={{ width: 600, justifyContent: "space-between" }}>
                        <FormControl >

                            <Select
                                value={statusFilter}
                                size='small'
                                displayEmpty
                                onChange={handleChangeStatus}
                                renderValue={
                                    statusFilter !== "" ? undefined : () => <Typography sx={{ color: "#aaa" }}>Trạng thái</Typography>
                                }
                            >
                                <MenuItem value="">
                                    <Typography >Tất cả</Typography>
                                </MenuItem>
                                {statuss.map(item => (
                                    <MenuItem value={item.name}>
                                        <Typography >{item.name}</Typography>
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl >

                            <Select
                                value={paymentFilter}
                                size='small'
                                displayEmpty
                                onChange={handleChangePayments}
                                renderValue={
                                    paymentFilter !== "" ? undefined : () => <Typography sx={{ color: "#aaa" }}>Thanh toán</Typography>
                                }
                            >
                                <MenuItem value="">
                                    <Typography >Tất cả</Typography>
                                </MenuItem>
                                {payments.map(item => (
                                    <MenuItem value={item.name}>
                                        <Typography >{item.name}</Typography>
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl >

                            <Select
                                value={importFilter}
                                size='small'
                                displayEmpty
                                onChange={handleChangeImports}
                                renderValue={
                                    importFilter !== "" ? undefined : () => <Typography sx={{ color: "#aaa" }}>Nhập kho</Typography>
                                }
                            >
                                <MenuItem value="">
                                    <Typography >Tất cả</Typography>
                                </MenuItem>
                                {imports.map(item => (
                                    <MenuItem value={item.name}>
                                        <Typography >{item.name}</Typography>
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>

                </Box>
                <TableOrder searchedProducts={searchedProducts} />
            </Box>
        </Box>
    );
}