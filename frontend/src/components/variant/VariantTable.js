import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import { visuallyHidden } from "@mui/utils";

import { Link } from "react-router-dom";
import UnlockAccess from "../../components/roleBasedRender/UnlockAccess";

Number.prototype.format = function (n, x) {
  var re = "\\d(?=(\\d{" + (x || 3) + "})+" + (n > 0 ? "\\." : "$") + ")";
  return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, "g"), "$&,");
};

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
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
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

const headCells = [
  {
    id: "img",
    numeric: true,
    disablePadding: true,
    label: "Ảnh",
    width: "5%",
  },
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Tên phiên bản sản phẩm",
    width: "25%",
  },
  {
    id: "sellableQuantity",
    numeric: true,
    disablePadding: true,
    label: "Có thể bán",
    width: "10%",
  },
  {
    id: "inventoryQuantity",
    numeric: true,
    disablePadding: true,
    label: "Tồn kho",
    width: "10%",
  },
  {
    id: "createdAt",
    numeric: true,
    disablePadding: true,
    label: "Ngày khởi tạo",
    width: "10%",
  },
  {
    id: "retailPrice",
    numeric: true,
    disablePadding: true,
    label: "Giá bán lẻ",
    width: `${40 / 3}%`,
  },
  {
    id: "originalPrice",
    numeric: true,
    disablePadding: true,
    label: "Giá nhập",
    width: `${40 / 3}%`,
  },
  {
    id: "wholeSalePrice",
    numeric: true,
    disablePadding: true,
    label: "Giá bán buôn",
    width: `${40 / 3}%`,
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
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
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "center" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            width={headCell.width}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
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
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { variants, numSelected, handleDelete } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected === 0 && (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Danh sách phiên bản
        </Typography>
      )}
      {numSelected !== variants.length && numSelected > 0 && (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          Đã chọn {numSelected} phiên bản
        </Typography>
      )}
      {numSelected === variants.length && numSelected > 0 && (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          Đã chọn tất cả phiên bản
        </Typography>
      )}
      <UnlockAccess request={["ADMIN", "Nhân viên kho"]}>
        {numSelected > 0 ? (
          <Button
            variant="outlined"
            color="error"
            onClick={() => handleDelete()}
          >
            Xóa
          </Button>
        ) : null}
      </UnlockAccess>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  handleDelete: PropTypes.func.isRequired,
  variants: PropTypes.array.isRequired,
};

export default function VariantsTable({
  variants,
  handleDeleteVariant,
  triggerReload,
}) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  React.useEffect(() => {
    setSelected([]);
  }, [variants]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event, rows) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleDelete = () => {
    console.log("selected: " + selected);
    selected.forEach((id) => {
      handleDeleteVariant(id);
    });
    triggerReload();
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - variants.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          handleDelete={handleDelete}
          variants={variants}
        />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={(event) =>
                handleSelectAllClick(event, variants)
              }
              onRequestSort={handleRequestSort}
              rowCount={variants.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(variants, getComparator(order, orderBy))
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
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none">
                        <img
                          alt="Ảnh phiên bản sản phẩm"
                          style={{ width: "40px", height: "40px" }}
                          src={
                            row.imageUrl
                              ? row.imageUrl
                              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTm1N8tGE9JE-BAn4GgYgG6MHCngMqXZKpZYzAUaI8kaPywl-kM_-9Zk8OnNOhmdt1sBjQ&usqp=CAU"
                          }
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        <Link
                          to={{
                            pathname: `/san-pham/${row.product.id}`,
                            chosenVariant: row,
                          }}
                          style={{ textDecoration: "none", color: "#000" }}
                        >
                          <Typography>{row.variantName}</Typography>
                        </Link>
                      </TableCell>
                      <TableCell align="center">
                        {row.sellableQuantity}
                      </TableCell>
                      <TableCell align="center">
                        {row.inventoryQuantity}
                      </TableCell>
                      <TableCell align="center">{row.createdAt}</TableCell>
                      <TableCell sx={{ paddingRight: "100px" }} align="right">
                        {row.retailPrice.format()}
                      </TableCell>
                      <TableCell sx={{ paddingRight: "100px" }} align="right">
                        {row.originalPrice.format()}
                      </TableCell>
                      <TableCell sx={{ paddingRight: "100px" }} align="right">
                        {row.wholeSalePrice.format()}
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 50.5 * emptyRows,
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
          count={variants.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
