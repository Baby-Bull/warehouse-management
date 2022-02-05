import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Divider,
  Grid,
  TextField,
  IconButton,
} from "@mui/material";
import { ArrowBackIosNew, SwapHoriz } from "@mui/icons-material";
import { useHistory, useParams } from "react-router-dom";
import "./createProduct.scss";
import ProductAPI from "../../api/ProductAPI";
import CategorySelect from "../../components/product/category/CategorySelect";
import UpdateImage from "../../components/uploadImage/UpdateImage";

function EditProduct({ setStateAlert }) {
  const history = useHistory();
  const params = useParams();
  const [loading, setLoading] = useState(true);

  const [weightUnit, setWeightUnit] = useState(false); //false: gram, true: kilogram
  const [weightValue, setWeightValue] = useState(0);
  const [categoryName, setCategoryName] = useState("");
  const [receivedImg, setReceivedImg] = useState("");

  const [product, setProduct] = useState({});

  async function getData() {
    const result = await ProductAPI.product(params.id);
    setProduct({
      ...result.data,
      categoryId: result.data.category.id
    });
    setCategoryName(result.data.category);
    setWeightValue(result.data.weight);
    setReceivedImg(result.data.imageUrl);
    setLoading(false);
  }

  useEffect(() => {
    getData();

    return () => {
      setLoading(true);
    };
  }, []);

  useEffect(() => {
    setProduct({
      ...product,
      imageUrl: receivedImg
    });
  }, [receivedImg])

  useEffect(() => {
    let weight = weightUnit ? weightValue * 1000 : weightValue;
    setProduct({
      ...product,
      weight: weight,
      categoryId: product.categoryId
    });
  }, [weightValue, weightUnit, product.categoryId]);

  //product properties
  function handleChange(evt) {
    const value = evt.target.value;
    setProduct({
      ...product,
      [evt.target.name]: value,
    });
  }

  //category
  const handleSelectCategory = (categoryId) => {
    setProduct({
      ...product,
      categoryId: categoryId
    })
  };

  const handleImageUrl = (url) => {
    setReceivedImg(url);
  }

  //handle weight
  const handleChangeWeight = (evt) => {
    if(evt.target.valueAsNumber) setWeightValue(evt.target.valueAsNumber)
    else setWeightValue(0);
  };

  function changeWeightUnit() {
    setWeightUnit(!weightUnit);
  }

  //actions
  const cancelAction = () => {
    setStateAlert({
      severity: "warning",
      variant: "filled",
      open: true,
      content: "Đã hủy tạo thêm phiên bản sản phẩm",
    });
    history.go(-1);
  };

  const handleEditProduct = () => {
    console.log(
      product
    );
    ProductAPI.updateProduct(params.id, {
      productName: product.name,
      categoryId: product.categoryId,
      weight: product.weight,
      brand: product.brand,
      description: product.description,
      imageUrl: product.imageUrl,
    })
    .then((res) => {
      setStateAlert({ severity: "success", variant: "filled", open: true, content: "Đã chỉnh sửa sản phẩm" });
      history.go(-1);
    })
    .catch(err => {
      setStateAlert({ severity: "error", variant: "filled", open: true, content: err.response.data });
      // history.go(-1);
    });
  };

  return !loading ? (
    <Box
      px={4}
      backgroundColor="#F4F6F8"
      minHeight="90vh"
      display="flex"
      flexDirection="column"
    >
      <Box py={1}>
        <Typography
          underline="none"
          onClick={() => history.push("/san-pham")}
          sx={{
            display: "flex",
            "&:hover": {
              cursor: "pointer",
            },
          }}
        >
          <ArrowBackIosNew sx={{ mr: 2 }} onClick={cancelAction} />
          Quay lại Danh sách sản phẩm
        </Typography>
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        pt={1}
        pb={2}
      >
        <Typography variant="h4">Chỉnh sửa thông tin sản phẩm</Typography>
        <Box display="flex">
          <Button variant="outlined" sx={{ mr: 2 }} onClick={cancelAction}>
            Thoát
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              handleEditProduct();
            }}
          >
            Lưu thông tin
          </Button>
        </Box>
      </Box>
      <Grid py={2} px={1} container spacing={3}>
        <Grid item xs={8}>
          <Box
            py={2}
            px={1}
            display="flex"
            flexDirection="column"
            backgroundColor="white"
          >
            <Typography variant="h6" id="tableTitle" px={1}>
              Thông tin chung
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Box display="flex" px={1} py={2}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box display="flex">
                    <Typography variant="subtitle1" id="tableTitle">
                      Tên sản phẩm
                    </Typography>
                  </Box>
                  <TextField
                    fullWidth
                    name="name"
                    placeholder="Nhập tên sản phẩm"
                    onChange={handleChange}
                    value={product.name || ""}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box display="flex">
                    <Typography variant="subtitle1" id="tableTitle">
                      Khối lượng
                    </Typography>
                  </Box>
                  <TextField
                    fullWidth
                    name="weight"
                    placeholder="Nhập khối lượng"
                    type="number"
                    defaultValue={weightValue || 0}
                    onChange={(e) => handleChangeWeight(e)}
                    InputProps={{
                      endAdornment: (
                        <React.Fragment>
                          <Typography
                            aria-label="Thay đổi đơn vị khối lượng"
                            edge="end"
                          >
                            {!weightUnit ? "g" : "kg"}
                          </Typography>
                          <IconButton onClick={() => changeWeightUnit()}>
                            <SwapHoriz />
                          </IconButton>
                        </React.Fragment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Box
            py={2}
            px={1}
            mt={3}
            display="flex"
            flexDirection="column"
            backgroundColor="white"
          >
            <Typography variant="h6" id="tableTitle" px={1}>
              Ảnh sản phẩm
            </Typography>
            <Box px={1} py={2} width="100%" textAlign="center">
              <UpdateImage imgUrl={product.imageUrl} changeImageUrl={handleImageUrl}/>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box
            py={2}
            px={1}
            display="flex"
            flexDirection="column"
            backgroundColor="white"
          >
            <Typography variant="h6" id="tableTitle" px={1}>
              Thông tin bổ sung
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Box display="flex" px={1} py={2}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box display="flex">
                    <Typography
                      variant="subtitle1"
                      id="tableTitle"
                      sx={{ fontWeight: "500" }}
                    >
                      Loại sản phẩm
                    </Typography>
                  </Box>
                  <CategorySelect
                    handleSelectCategory={handleSelectCategory}
                    categoryName={categoryName}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box display="flex">
                    <Typography
                      variant="subtitle1"
                      id="tableTitle"
                      sx={{ fontWeight: "500" }}
                      placeholder="Chọn nhãn hiệu"
                    >
                      Nhãn hiệu
                    </Typography>
                  </Box>
                  <TextField
                    fullWidth
                    name="brand"
                    placeholder="Nhập nhãn hiệu"
                    onChange={handleChange}
                    value={product.brand || ""}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box display="flex">
                    <Typography
                      variant="subtitle1"
                      id="tableTitle"
                      sx={{ fontWeight: "500" }}
                    >
                      Mô tả sản phẩm
                    </Typography>
                  </Box>
                  <TextField
                    fullWidth
                    name="description"
                    multiline
                    rows={3}
                    onChange={handleChange}
                    value={product.description || ""}
                  />
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  ) : (
    <div>loading</div>
  );
}

export default EditProduct;
