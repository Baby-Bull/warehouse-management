import React from "react";
import PropTypes from "prop-types";
import {
  SquareRounded,
  CheckBoxRounded,
} from "@mui/icons-material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import UnlockAccess from '../../components/roleBasedRender/UnlockAccess'

Number.prototype.format = function(n, x) {
  var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
  return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
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

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    numSelected,
    rowCount,
    variants,
    setViewState,
    handleDelete
  } = props;
  const showCreateForm = () => {
    setViewState(2);
  }

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
              //fix cho nay
              //   `${'Đã chọn' + ${numSelected} 'phiên bản'}: 'Đã chọn tất cả phiên bản',
              "aria-label": "Đã chọn tất cả phiên bản",
            }}
          />
        </TableCell>
        <TableCell padding="none">
          <Box
            py={2}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            height="30px"
          >
            {numSelected === 0 && (
              <React.Fragment>
                <Typography
                  variant="subtitle2"
                  id="tableTitle"
                  sx={{ fontSize: "1rem", fontWeight: "normal" }}
                  component="div"
                >
                  Phiên bản ({variants.length})
                </Typography>
                <UnlockAccess request={['ADMIN', 'Nhân viên kho']}>
                <Button variant="contained" color="primary" onClick={() => { showCreateForm() }}>Thêm phiên bản</Button>
                </UnlockAccess>
              </React.Fragment>
            )}
            {numSelected !== variants.length && numSelected > 0 && (
              <Typography
                variant="subtitle2"
                id="tableTitle"
                sx={{ fontSize: "1rem", fontWeight: "normal" }}
                component="div"
              >
                Đã chọn {numSelected} phiên bản
              </Typography>
            )}
            {numSelected === variants.length && numSelected > 0 && (
              <Typography
                variant="subtitle2"
                id="tableTitle"
                sx={{ fontSize: "1rem", fontWeight: "normal" }}
                component="div"
              >
                Đã chọn tất cả phiên bản
              </Typography>
            )}
            <UnlockAccess request={['ADMIN', 'Nhân viên kho']}>
              {numSelected > 0 && (
                <Button variant="outlined" color="error" onClick={handleDelete}>
                  Xóa
                </Button>
              )}
            </UnlockAccess>
          </Box>
        </TableCell>
      </TableRow>
      <TableRow></TableRow>
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
  variants: PropTypes.array.isRequired,
  setViewState: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default function EnhancedTable({ setVariantInfo, variants, setViewState, handleDeleteVariant, chosenOneVariant, triggerReload }) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(500); //list all variants
  const [chosenVariant, setChosenVariant] = React.useState(chosenOneVariant);


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = variants.map((n) => n.code);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleDelete = () => {
    let IDs = [];
    for (let i = 0; i < selected.length; i++) {
      let result = variants.filter(v => v.code === selected[i]);
      IDs.push(result[0].id);
      // handleDeleteVariant(result[0].id);
    }
    IDs.forEach(id => {
      handleDeleteVariant(id);
    })
    triggerReload();
  }

  const handleClick = (event, code) => {
    const selectedIndex = selected.indexOf(code);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, code);
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

  const handleChoseVariant = (even, code) => {
    setVariantInfo(variants.find(variant => variant.code === code));
    setViewState(1);
  };

  const isSelected = (code) => selected.indexOf(code) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - variants.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper elevation={0} square sx={{ width: "100%", mb: 2, padding: 1 }}>
        {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
        <TableContainer>
          <Table aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={variants.length}
              variants={variants}
              setViewState={setViewState}
              handleDelete={handleDelete}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(variants, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.code);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.code}
                      selected={isItemSelected}
                      sx={{
                        backgroundColor:
                          row.code === chosenVariant
                            ? "#1976d2"
                            : "none",
                        "&:hover": {
                          cursor: "pointer",
                        },
                      }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                          onClick={(event) => {
                            handleClick(event, row.code)
                          }}
                          icon={
                            <SquareRounded
                              stroke={"gray"}
                              strokeWidth={1}
                              sx={{ color: "white" }}
                            />
                          }
                          checkedIcon={<CheckBoxRounded />}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        onClick={(event) => {
                          handleChoseVariant(event, row.code);
                          setChosenVariant(row.code);
                        }}
                      >
                        <Box py={1} display="flex" alignItems="center">
                          <Box
                            width="40px"
                            height="40px"
                            backgroundColor="white"
                            mr={2}
                          >
                            <img alt="Ảnh phiên bản sản phẩm" style={{ width: "40px", height: "40px" }} src={row.imageUrl ? row.imageUrl : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTm1N8tGE9JE-BAn4GgYgG6MHCngMqXZKpZYzAUaI8kaPywl-kM_-9Zk8OnNOhmdt1sBjQ&usqp=CAU"} />
                          </Box>
                          <Box
                            py={1}
                            flex="1"
                            display="flex"
                            flexDirection="column"
                            sx={{
                              color:
                                (row.code === chosenVariant && isSelected(row.code) === false)
                                  ? "white"
                                  : "black",
                              "&:hover": {
                                cursor: "pointer",
                              },
                            }}
                          >
                            <Typography
                              variant="subtitle2"
                              sx={{ fontSize: "1rem", fontWeight: "normal" }}
                            >
                              {row.code}
                            </Typography>
                            <Box display="flex">
                              <Typography sx={{ flex: 1}}>Tồn kho: {row.inventoryQuantity.format()}</Typography>
                              <Typography sx={{ flex: 1}}>Có thể bán: {row.sellableQuantity.format()}</Typography>
                            </Box>
                          </Box>
                        </Box>
                      </TableCell>
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
      </Paper>
    </Box>
  );
}
