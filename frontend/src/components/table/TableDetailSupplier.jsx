import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';



// Row.propTypes = {
//     row: PropTypes.shape({
//         calories: PropTypes.number.isRequired,
//         carbs: PropTypes.number.isRequired,
//         fat: PropTypes.number.isRequired,
//         history: PropTypes.arrayOf(
//             PropTypes.shape({
//                 amount: PropTypes.number.isRequired,
//                 customerId: PropTypes.string.isRequired,
//                 date: PropTypes.string.isRequired,
//             }),
//         ).isRequired,
//         name: PropTypes.string.isRequired,
//         price: PropTypes.number.isRequired,
//         protein: PropTypes.number.isRequired,
//     }).isRequired,
// };

// function set color -- status of activity ***********************/
const handleColor = (key) => {
    switch (key) {
        case "Chưa thanh toán":
            return "red";

        case "Thanh toán một phần":
            return "blue";

        case "Đã thanh toán":
            return "#1ec709";

        case "Đang giao dịch":
            return "blue";

        case "Chờ nhập kho":
            return "black";

        case "Đã nhập kho":
            return "#1ec709";

        default:
            return "black";
    }
}


function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.id}
                </TableCell>
                <TableCell>{row.code}</TableCell>
                <TableCell sx={{ color: handleColor(row.transactionStatus) }}>{row.transactionStatus}</TableCell>
                <TableCell sx={{ color: handleColor(row.importedStatus) }}>{row.importedStatus}</TableCell>
                <TableCell sx={{ color: handleColor(row.status) }}>{row.status}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Chi tiết
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Nhân viên</TableCell>
                                        <TableCell>Tạo đơn</TableCell>
                                        <TableCell>Cập nhật</TableCell>
                                        <TableCell>Tổng tiền hàng</TableCell>
                                        <TableCell>Đã trả</TableCell>
                                        <TableCell>Ngày nhập dự kiến</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell sx={{ padding: "1.2em" }} component="th" scope="row">{row.createdBy.username}</TableCell>
                                        <TableCell>{row.createdAt}</TableCell>
                                        <TableCell>{row.updatedAt}</TableCell>
                                        <TableCell>{(row.totalAmount).toLocaleString()}</TableCell>
                                        <TableCell>{(row.paidAmount).toLocaleString()}</TableCell>
                                        <TableCell>{row.expectedTime}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}



export function HistoryOrderTable({ ordersBySupplier }) {

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Id Đơn nhập</TableCell>
                        <TableCell>Mã</TableCell>
                        <TableCell>Trạng thái thanh toán</TableCell>
                        <TableCell>Trạng thái nhập</TableCell>
                        <TableCell>Trạng thái giao dịch</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {ordersBySupplier.map((row) => (
                        <Row key={row.name} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}



export function DebtTable({ ordersBySupplier }) {

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center" colSpan={3}>
                            Phần thông tin đơn nợ
                        </TableCell>
                        <TableCell align="center">Số nợ</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="center">Id đơn nợ</TableCell>
                        <TableCell align="center">Tổng tiền</TableCell>
                        <TableCell align="center">Đã trả</TableCell>
                        <TableCell align="center">Còn nợ</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {ordersBySupplier.map((row) => (
                        <TableRow key={row.desc}>
                            <TableCell align="center">{row.id}</TableCell>
                            <TableCell style={{ color: "blue" }} align="center">{(row.totalAmount.toLocaleString())}</TableCell>
                            <TableCell style={{ color: "green" }} align="center">{(row.paidAmount.toLocaleString())}</TableCell>
                            <TableCell style={{ color: "red" }} align="center">{(row.totalAmount - row.paidAmount).toLocaleString()}</TableCell>
                        </TableRow>
                    ))}

                    <TableRow>
                        <TableCell rowSpan={3} />
                        <TableCell colSpan={2}>Tổng nợ</TableCell>
                        <TableCell style={{ color: "red" }} align="center">{(ordersBySupplier.map((row) => (row.totalAmount - row.paidAmount)).reduce((sum, i) => sum + i, 0)).toLocaleString()}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer >
    );
}