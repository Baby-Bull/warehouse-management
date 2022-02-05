import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import {
    Button,
    Modal,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    Toolbar,
    Typography,
    Paper,
    Checkbox,
    Tooltip,
    FormControlLabel,
    Switch,
    IconButton,
    Snackbar,
    Alert
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { Link } from 'react-router-dom';
import SupplierAPI from '../../api/SupplierAPI';

// style modal ********************************************/
const style = {
    textAlign: "center",
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid gray',
    boxShadow: 24,
    p: 4,
};

//block func sort table *********************************/
function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}
function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}
// end sort func ***************************************/

// set title for table list suppliers ***************************/
const headCells = [
    {
        id: 'name',
        numeric: false,
        disablePadding: true,
        label: 'Tên nhà cung cấp',
    },
    {
        id: 'manhacungcap',
        numeric: true,
        disablePadding: false,
        label: 'Mã nhà cung cấp',
    },
    {
        id: 'sofax',
        numeric: true,
        disablePadding: false,
        label: 'Số Fax',
    },
    {
        id: 'sodienthoai',
        numeric: true,
        disablePadding: false,
        label: 'Số điện thoại',
    },
    {
        id: 'trangthai',
        numeric: true,
        disablePadding: false,
        label: 'Trạng thái',
    },
];

// function set color status supplier ***********************/
const handleColor = (key) => {
    switch (key) {
        case "Ngừng hợp tác":
            return "red";

        case "Đang hợp tác":
            return "#1ec709";

        default:
            return "black";
    }
}



function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };
    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align="left"
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            <b>{headCell.label}</b>
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
    const { numSelected, handleOpenModal } = props;
    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} đã chọn
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Danh sách nhà cung cấp
                </Typography>
            )}

            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton>
                        <DeleteIcon onClick={() => handleOpenModal(true)} />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton>
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
};
EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};



///////////////////////////// main function ***********************///////////////////////////////
export default function TableSupply(props) {

    // get all infos_suppliers********************************//
    const [trigger, setTrigger] = React.useState(false); // trigger to re-render supplier's info
    const [listSuppliers, setListSuppliers] = React.useState([]);
    React.useEffect(() => {
        const fetchSuppliers = async () => {
            const res = await SupplierAPI.suppliersList();
            setListSuppliers(res.data);
            props.exportSuppliers(res.data)

        }
        fetchSuppliers();
    }, [trigger])

    // handle delete all suppliers *****************************************************/
    const [stateAlert, setStateAlert] = React.useState({ severity: "", variant: "", open: false, content: "" });
    const handleDeleteAllSuppliers = async (listSelected) => {
        await listSelected.map(async (item) => {
            try {
                await SupplierAPI.deleteSupplier(item);
                setStateAlert({ severity: "info", variant: "filled", open: true, content: "Đã xóa nhà cung cấp thành công" })
                setOpenModal(false);
            } catch (error) {
                setStateAlert({ severity: "error", variant: "filled", open: true, content: error.response.data })
            }
        });
        setSelected([]);
        setTrigger(!trigger);
    }


    // block func handle table ListSuppliers   ****************************/
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = listSuppliers.map((n) => n.id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // const handleChangeDense = (event) => {
    //     setDense(event.target.checked);
    // };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - listSuppliers.length) : 0; // end block handle table ******/




    //open and close Modal
    const [openModal, setOpenModal] = React.useState(false);
    const handleOpenModal = (value) => {
        setOpenModal(value);
    }


    return (
        <Box className='table_box' sx={{ width: '100%', marginTop: "1em" }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <EnhancedTableToolbar
                    numSelected={selected.length}
                    handleOpenModal={handleOpenModal}
                />
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={listSuppliers.length}
                        />
                        <TableBody>
                            {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                            {stableSort(listSuppliers, getComparator(order, orderBy))
                                .reverse()
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.id);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, row.id)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.id}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        'aria-labelledby': labelId,
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                padding="none"
                                            >
                                                <Link sx={{color: "black"}} to={`/thong-tin-nha-cung-cap?id=${row.id}`} >{row.name}</Link>
                                            </TableCell>
                                            <TableCell align="left">{row.code}</TableCell>
                                            <TableCell align="left">{row.fax}</TableCell>
                                            <TableCell align="left">{row.phone}</TableCell>
                                            <TableCell
                                                style={{ color: handleColor(row.activityStatus) }}
                                                align="left">{row.activityStatus}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (dense ? 33 : 53) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    labelRowsPerPage="Số hàng một trang"
                    rowsPerPageOptions={[10, 20, 50]}
                    component="div"
                    count={listSuppliers.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            {/* <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense} />}
                label="Xóa padding"
            /> */}
            <Modal
                open={openModal}
                onClose={() => setOpenModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Bạn xác nhận xóa nhà cung cấp đã chọn
                    </Typography><br />
                    <Button onClick={() => setOpenModal(false)} variant="contained">Quay lại</Button>&emsp;&emsp;
                    <Button onClick={() => handleDeleteAllSuppliers(selected)} color="error" variant="contained">Xóa</Button>
                </Box>
            </Modal >
            <Snackbar open={stateAlert.open} autoHideDuration={3000} onClose={() => setStateAlert({ ...stateAlert, open: false })}>
                <Alert onClose={() => setStateAlert({ ...stateAlert, open: false })} severity={stateAlert.severity} variant={stateAlert.variant} sx={{ width: '100%' }}>
                    {stateAlert.content}
                </Alert>
            </Snackbar>
        </Box >
    );
}
