import React from "react";
import {
  TextField,
  Table,
  TableHead,
  TableBody,
  TableRow,
} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { TableCell } from "@material-ui/core";
import UploadImageForMultipleVariants from "../../uploadImage/UploadImageForMultipleVariants";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  sticky: {
    width: "30%",
    position: "sticky",
    left: 0,
    background: "white",
    boxShadow: "5px 2px 5px grey",
    // borderRight: "2px solid black",
  },
});

function VariantsPreview({ variants, setVariants, productName }) {
  const classes = useStyles();


  const handleImageUrl = (url, index) => {
    let newVariants = variants;
    newVariants[index] = { ...newVariants[index], imageUrl: url };
    setVariants([...newVariants]);
  }

  function handleChangeNumber(evt, index) {
    const value = evt.target.value;
    const name = evt.target.name;
    let newVariants = variants;

    if (evt.target.valueAsNumber) {
      newVariants[index] = { ...newVariants[index], [name]: value };
    } else {
      newVariants[index] = { ...newVariants[index], [name]: 0 };
    }
    setVariants([...newVariants]);
  }

  const getVariantName = (variant) => {
    let colorName = variant.color ? ` - ${variant.color}` : "";
    let sizeName = variant.size ? ` - ${variant.size}` : "";
    let materialName = variant.material ? ` - ${variant.material}` : "";
    return productName + sizeName + colorName + materialName;
  };

  return (
    <React.Fragment>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell
              className={classes.sticky}
              style={{ tableLayout: "fixed" }}
            >
              Phiên bản
            </TableCell>
            <TableCell>Ảnh sản phẩm</TableCell>
            <TableCell>Giá bán lẻ</TableCell>
            <TableCell>Giá bán sỉ</TableCell>
            <TableCell>Giá nhập</TableCell>
            <TableCell>Tồn ban đầu</TableCell>
            <TableCell>Có thể bán</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {variants?.map((variant, index) => (
            <TableRow key={index}>
              <TableCell className={classes.sticky} component="th">
                {getVariantName(variant)}
              </TableCell>
              <TableCell>
                <UploadImageForMultipleVariants variantImg={variant.imageUrl} index={index} changeImageUrl={handleImageUrl} />
              </TableCell>
              <TableCell>
                <TextField
                  name="retailPrice"
                  type="number"
                  value={variant.retailPrice}
                  onChange={(evt) => handleChangeNumber(evt, index)}
                />
              </TableCell>
              <TableCell>
                <TextField
                  name="wholeSalePrice"
                  type="number"
                  value={variant.wholeSalePrice}
                  onChange={(evt) => handleChangeNumber(evt, index)}
                />
              </TableCell>
              <TableCell>
                <TextField
                  name="originalPrice"
                  type="number"
                  value={variant.originalPrice}
                  onChange={(evt) => handleChangeNumber(evt, index)}
                />
              </TableCell>
              <TableCell>
                <TextField
                  name="inventoryQuantity"
                  type="number"
                  value={variant.inventoryQuantity}
                  onChange={(evt) => handleChangeNumber(evt, index)}
                />
              </TableCell>
              <TableCell>
                <TextField
                  name="sellableQuantity"
                  type="number"
                  value={variant.sellableQuantity}
                  onChange={(evt) => handleChangeNumber(evt, index)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}

export default VariantsPreview;
