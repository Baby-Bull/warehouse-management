import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Divider,
  Grid,
  TextField,
  Switch,
} from "@mui/material";
import ProductAPI from "../../api/ProductAPI";
import VariantAPI from "../../api/VariantAPI";
import UploadImage from "../../components/uploadImage/UploadImage";
import { styled } from "@mui/material/styles";

const CustomDisableInput = styled(TextField)(() => ({
  ".MuiInputBase-input.Mui-disabled": {
    WebkitTextFillColor: "#000",
    color: "#000"
  }
}));

function CreateVariant({ productId, triggerReload, setViewState, setStateAlert }) {
  const [variantInfo, setVariantInfo] = useState({
    variantCode: "",
    inventoryQuantity: 0,
    sellableQuantity: 0,
    size: "",
    color: "",
    imageUrl: "",
    material: "",
    unit: "",
    originalPrice: 0,
    wholeSalePrice: 0,
    retailPrice: 0,
    sellableStatus: 0,
  });


  const [receivedImg, setReceivedImg] = useState("")
  const handleImageUrl = (url) => {
    setReceivedImg(url)
  }

  useEffect(() => {
    VariantAPI.getLatestVariantCode()
      .then((res) => {
        setVariantInfo({
          ...variantInfo,
          variantCode: res.data
        });
      })
      .catch(err => {
        setStateAlert({ severity: "warning", variant: "filled", open: true, content: "Đã hủy chỉnh sửa phiên bản sản phẩm" });
        setViewState(1);
      })
  }, [])

  function handleChange(evt) {
    const value = evt.target.value;
    setVariantInfo({
      ...variantInfo,
      [evt.target.name]: value,
    });
  }

  function handleChangeNumber(evt) {
    console.log("edit as number")
    if (evt.target.valueAsNumber) {
      setVariantInfo({
        ...variantInfo,
        [evt.target.name]: evt.target.valueAsNumber,
      });
    }
    else {
      setVariantInfo({
        ...variantInfo,
        [evt.target.name]: 0,
      });
    }
  }

  const handleChangeSellableStatus = (evt) => {
    const value = evt.target.checked;
    setVariantInfo({
      ...variantInfo,
      ["sellableStatus"]: value,
    });
  };

  const cancelAction = () => {
    setStateAlert({ severity: "warning", variant: "filled", open: true, content: "Đã hủy chỉnh sửa phiên bản sản phẩm" });
    setViewState(1);
  }

  function handleCreateVariant() {
    variantInfo.imageUrl = receivedImg;
    console.log(variantInfo);
    ProductAPI.createVariant(productId, variantInfo).then((res) => {
      setStateAlert({ severity: "success", variant: "filled", open: true, content: "Đã tạo thêm phiên bản sản phẩm" });
      triggerReload();
      setViewState(1);
    })
      .catch(err => {
        setStateAlert({ severity: "error", variant: "filled", open: true, content: err.response.data });
      });
  }
  return (
    <React.Fragment>
      <Box
        py={2}
        px={1}
        display="flex"
        flexDirection="column"
        backgroundColor="white"
      >
        <Typography variant="subtitle1" id="tableTitle" px={1}>
          Thông tin phiên bản
        </Typography>
        <Divider sx={{ my: 1 }} />
        <Box display="flex" px={1} py={2}>
          <Box
            width="66.66667%"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            marginRight={2}
          >
            <Grid container>
              <Typography variant="body2">Mã SKU</Typography>
              <CustomDisableInput
                fullWidth
                disabled
                size="small"
                name="variantCode"
                placeholder="Nhập mã SKU phiên bản"
                onChange={handleChange}
                value={variantInfo.variantCode || ""}
              />
            </Grid>
            <Box>
              <Typography variant="body2">Đơn vị tính</Typography>
              <TextField
                fullWidth
                size="small"
                name="unit"
                placeholder="Nhập đơn vị tính"
                onChange={handleChange}
                value={variantInfo.unit}
              />
            </Box>
            <Box>
              <Typography variant="body2">Màu sắc</Typography>
              <TextField
                fullWidth
                size="small"
                name="color"
                placeholder="Nhập màu sắc"
                onChange={handleChange}
                value={variantInfo.color}
              />
            </Box>
            <Box>
              <Typography variant="body2">Chất liệu</Typography>
              <TextField
                fullWidth
                size="small"
                name="material"
                placeholder="Nhập chất liệu"
                onChange={handleChange}
                value={variantInfo.material}
              />
            </Box>
            <Box>
              <Typography variant="body2">Kích thước</Typography>
              <TextField
                fullWidth
                size="small"
                name="size"
                placeholder="Nhập kích thước"
                onChange={handleChange}
                value={variantInfo.size}
              />
            </Box>
          </Box>
          <Box width="33.3333%" textAlign="center">
            <UploadImage changeImageUrl={handleImageUrl} />
          </Box>
        </Box>
      </Box>
      <Box
        mt={3}
        py={2}
        px={1}
        display="flex"
        flexDirection="column"
        backgroundColor="white"
      >
        <Typography
          // sx={{ flex: "1 1 100%" }}
          variant="subtitle1"
          id="tableTitle"
          px={1}
        >
          Giá sản phẩm
        </Typography>
        <Divider sx={{ my: 1 }} />
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          px={1}
          py={2}
        >
          <Box>
            <Typography variant="body2">Giá bán lẻ</Typography>
            <TextField
              fullWidth
              type="number"
              size="small"
              name="retailPrice"
              placeholder="Nhập giá bán lẻ"
              onChange={handleChangeNumber}
              value={variantInfo.retailPrice}
            />
          </Box>
          <Box>
            <Typography variant="body2">Giá bán buôn</Typography>
            <TextField
              fullWidth
              type="number"
              size="small"
              name="wholeSalePrice"
              placeholder="Nhập giá bán buôn"
              onChange={handleChangeNumber}
              value={variantInfo.wholeSalePrice}
            />
          </Box>
          <Box>
            <Typography variant="body2">Giá nhập</Typography>
            <TextField
              fullWidth
              type="number"
              size="small"
              name="originalPrice"
              placeholder="Nhập giá nhập"
              onChange={handleChangeNumber}
              value={variantInfo.originalPrice}
            />
          </Box>
        </Box>
      </Box>
      <Box
        mt={3}
        py={2}
        px={1}
        display="flex"
        flexDirection="column"
        backgroundColor="white"
      >
        <Typography
          // sx={{ flex: "1 1 100%" }}
          variant="subtitle1"
          id="tableTitle"
          px={1}
        >
          Khởi tạo kho hàng
        </Typography>
        <Divider sx={{ my: 1 }} />
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          px={1}
          py={2}
        >
          <Box>
            <Typography variant="body2">Số lượng trong kho</Typography>
            <TextField
              fullWidth
              type="number"
              size="small"
              name="inventoryQuantity"
              placeholder="Nhập số lượng kho khởi tạo"
              onChange={handleChangeNumber}
              value={variantInfo.inventoryQuantity}
            />
          </Box>
          <Box>
            <Typography variant="body2">Số lượng có thể bán</Typography>
            <TextField
              fullWidth
              type="number"
              size="small"
              name="sellableQuantity"
              placeholder="Nhập số lượng có thể bán"
              onChange={handleChangeNumber}
              value={variantInfo.sellableQuantity}
            />
          </Box>
        </Box>
      </Box>
      <Box
        mt={3}
        py={2}
        px={1}
        display="flex"
        flexDirection="column"
        backgroundColor="white"
      >
        <Typography
          // sx={{ flex: "1 1 100%" }}
          variant="subtitle1"
          id="tableTitle"
          px={1}
        >
          Trạng thái
        </Typography>
        <Divider sx={{ my: 1 }} />
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          px={1}
          py={2}
        >
          <Box>
            <Typography variant="body2">Cho phép bán</Typography>
            <Switch
              inputProps={{ "aria-label": "Trạng thái" }}
              size="small"
              onChange={handleChangeSellableStatus}
            />
          </Box>
        </Box>
      </Box>
      <Box
        my={3}
        px={1}
        display="flex"
        justifyContent="flex-end"
      >
        <Button variant="outlined" color="error" sx={{ mr: 2 }} onClick={cancelAction}>Hủy</Button>
        <Button variant="contained" color="primary" onClick={() => handleCreateVariant()}>Thêm phiên bản</Button>
      </Box>
    </React.Fragment>
  );
}

export default CreateVariant;
