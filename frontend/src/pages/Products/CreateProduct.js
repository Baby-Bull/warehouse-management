import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Button,
  Divider,
  Grid,
  TextField,
  Switch,
  Chip,
  IconButton,
} from "@mui/material";
import { ArrowBackIosNew, SwapHoriz } from "@mui/icons-material";
import { useHistory } from "react-router-dom";
import "./createProduct.scss";
import ProductAPI from "../../api/ProductAPI";
import CategorySelect from "../../components/product/category/CategorySelect";
import VariantsPreview from "../../components/product/createProduct/VariantsPreview";
import UploadImage from "../../components/uploadImage/UploadImage";

function CreateProduct({ setStateAlert }) {
  const history = useHistory();
  const colorRef = useRef(null);
  const materialRef = useRef(null);
  const sizeRef = useRef(null);
  const [receivedImg, setReceivedImg] = useState("");

  const [colors, setColors] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [sizes, setSizes] = useState([]);

  const [weightUnit, setWeightUnit] = useState(false); //false: gram, true: kilogram
  const [weightValue, setWeightValue] = useState(0);

  const [variants, setVariants] = useState([]);
  const [product, setProduct] = useState({
    inventoryQuantity: 0,
    sellableQuantity: 0,
    size: [""],
    color: [""],
    material: [""],
    unit: "",
    originalPrice: 0,
    wholeSalePrice: 0,
    retailPrice: 0,
    recordStatus: true,
    sellableStatus: true,
    productName: "",
    categoryId: "",
    weight: 0,
    brand: "",
    description: "",
    imageUrl: "",
  });

  useEffect(() => {
    let weight = weightUnit ? (weightValue * 1000) : (weightValue);
    setProduct({
      ...product,
      weight: weight,
      color: [...colors],
      material: [...materials],
      size: [...sizes],
    });
    handleGenerateVariants();
  }, [colors, sizes, materials, weightValue, weightUnit, product.originalPrice, product.retailPrice, product.wholeSalePrice, product.inventoryQuantity, product.sellableQuantity]);

  useEffect(() => {
    setProduct({
      ...product,
      imageUrl: receivedImg
    });
  }, [receivedImg])

  //handle product attributes
  function handleChange(evt) {
    const value = evt.target.value;
    setProduct({
      ...product,
      [evt.target.name]: value,
    });
  }

  function handleChangeNumber(evt) {
    if (evt.target.valueAsNumber) {
      setProduct({
        ...product,
        [evt.target.name]: evt.target.valueAsNumber,
      });
    }
    else {
      setProduct({
        ...product,
        [evt.target.name]: 0,
      });
    }
  }

  const handleImageUrl = (url) => {
    setReceivedImg(url);
  }

  //handle weight
  const handleChangeWeight = (evt) => {
    if (evt.target.valueAsNumber) setWeightValue(evt.target.valueAsNumber)
    else setWeightValue(0);
  };

  function changeWeightUnit() {
    setWeightUnit(!weightUnit);
  }

  //PROPERTIES
  const handleKeyDown = (evt, array, setArray, ref) => {
    if (evt.keyCode === 13 && evt.target.value) {
      let newArray = array;
      if (newArray.includes(evt.target.value)) {
        setStateAlert({
          severity: "warning",
          variant: "filled",
          open: true,
          content: "Giá trị bị trùng",
        });
      } else {
        newArray.push(evt.target.value);
      }
      console.log(variants);
      setArray([...newArray]);
      ref.current.value = "";
    }
  };

  function handleDeleteChip(item, array, setArray) {
    let newArray = array;
    newArray = newArray.filter((chip) => chip !== item);
    setArray([...newArray]);
  }

  //category
  const handleSelectCategory = (categoryId) => {
    setProduct({ ...product, categoryId: categoryId });
  };

  //status
  const handleChangeSellableStatus = (evt) => {
    const value = evt.target.checked;
    setProduct({
      ...product,
      ["sellableStatus"]: value,
    });
  };

  //actions
  const cancelAction = () => {
    setStateAlert({
      severity: "warning",
      variant: "filled",
      open: true,
      content: "Đã hủy tạo thêm phiên bản sản phẩm",
    });
    history.push("/san-pham");
  };

  const handleGenerateVariants = () => {
    let variantsArray = [];
    let colorsArray = [""];
    let materialsAray = [""];
    let sizesArray = [""];
    let inventoryQuantity = product.inventoryQuantity;
    let sellableQuantity = product.sellableQuantity;
    let originalPrice = product.originalPrice;
    let wholeSalePrice = product.wholeSalePrice;
    let retailPrice = product.retailPrice;

    if (colors.length !== 0) colorsArray = colors;
    if (materials.length !== 0) materialsAray = materials;
    if (sizes.length !== 0) sizesArray = sizes;
    colorsArray.forEach(color => {
      materialsAray.forEach(material => {
        sizesArray.forEach(size => {
          variantsArray.push({
            variantCode: "",
            inventoryQuantity: inventoryQuantity,
            sellableQuantity: sellableQuantity,
            size: size,
            color: color,
            material: material,
            unit: product.unit,
            // imageUrl: variants[(index1 + 1) * (index2 + 1) * (index3 + 1)]?.imageUrl,
            //imageUrl: variants[index1 + index2 + index3]?.imageUrl,
            originalPrice: originalPrice,
            wholeSalePrice: wholeSalePrice,
            retailPrice: retailPrice,
            sellableStatus: product.sellableStatus,
          });
        })
      })
    })
    setVariants([...variantsArray]);
  }

  //tu dong generate variants voi img cua product
  const handleGenerateVariantsWithProductVariant = () => {
    let variantsArray = [];
    let colorsArray = [""];
    let materialsAray = [""];
    let sizesArray = [""];
    let inventoryQuantity = product.inventoryQuantity;
    let sellableQuantity = product.sellableQuantity;
    let originalPrice = product.originalPrice;
    let wholeSalePrice = product.wholeSalePrice;
    let retailPrice = product.retailPrice;

    if (colors.length != 0) colorsArray = colors;
    if (materials.length != 0) materialsAray = materials;
    if (sizes.length != 0) sizesArray = sizes;
    colorsArray.forEach(color => {
      materialsAray.forEach(material => {
        sizesArray.forEach(size => {
          variantsArray.push({
            variantCode: "",
            inventoryQuantity: inventoryQuantity,
            sellableQuantity: sellableQuantity,
            size: size,
            color: color,
            material: material,
            unit: product.unit,
            imageUrl: product.imageUrl,
            originalPrice: originalPrice,
            wholeSalePrice: wholeSalePrice,
            retailPrice: retailPrice,
            sellableStatus: product.sellableStatus,
          });
        })
      })
    })
    setVariants([...variantsArray]);
  }

  const handleCreateProduct = () => {
    console.log({
      ...product,
      variants: variants
    })
    ProductAPI.createProduct({
      ...product,
      variants: variants
    })
      .then((res) => {
        setStateAlert({
          severity: "success",
          variant: "filled",
          open: true,
          content: "Đã tạo thêm sản phẩm",
        });
        history.push("/san-pham");
      })
      .catch((err) => {
        setStateAlert({
          severity: "error",
          variant: "filled",
          open: true,
          content: err.response.data,
        });
      });
  };

  return (
    <Box
      className="createProduct-main-content"
      px={4}
      backgroundColor="#F4F6F8"
      minHeight="90vh"
      display="flex"
      flexDirection="column"
    >
      <Box py={1} px={1}>
        <Typography
          underline="none"
          onClick={cancelAction}
          sx={{
            display: "flex",
            "&:hover": {
              cursor: "pointer",
            },
          }}
        >
          <ArrowBackIosNew sx={{ mr: 2 }} />
          Quay lại Danh sách sản phẩm
        </Typography>
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        pt={1}
        pb={2}
        px={1}
      >
        <Typography variant="h4">Tạo mới sản phẩm</Typography>
        <Box display="flex">
          <Button variant="outlined" sx={{ mr: 2 }} onClick={cancelAction}>
            Thoát
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              handleCreateProduct();
            }}
          >
            Lưu sản phẩm
          </Button>
        </Box>
      </Box>
      <Grid className="form-main-createProduct" py={2} px={1} container spacing={3}>
        <Grid className="info-main-createProduct" item xs={8}>
          <Box
            className="info-main-item"
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
                    name="productName"
                    placeholder="Nhập tên sản phẩm"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
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
                <Grid item xs={6}>
                  <Box display="flex">
                    <Typography variant="subtitle1" id="tableTitle">
                      Đơn vị tính
                    </Typography>
                  </Box>
                  <TextField
                    fullWidth
                    name="unit"
                    placeholder="Nhập đơn vị tính"
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Box
            className="info-main-item"
            py={2}
            px={1}
            mt={3}
            display="flex"
            flexDirection="column"
            backgroundColor="white"
          >
            <Typography variant="h6" id="tableTitle" px={1}>
              Giá sản phẩm
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Box display="flex" px={1} py={2}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Box display="flex">
                    <Typography variant="subtitle1" id="tableTitle">
                      Giá bán lẻ
                    </Typography>
                  </Box>
                  <TextField
                    fullWidth
                    type="number"
                    name="retailPrice"
                    placeholder="Nhập giá bán buôn"
                    onChange={handleChangeNumber}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Box display="flex">
                    <Typography variant="subtitle1" id="tableTitle">
                      Giá bán buôn
                    </Typography>
                  </Box>
                  <TextField
                    fullWidth
                    type="number"
                    name="wholeSalePrice"
                    placeholder="Nhập giá bán buôn"
                    onChange={handleChangeNumber}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Divider></Divider>
                </Grid>
                <Grid item xs={6}>
                  <Box display="flex">
                    <Typography variant="subtitle1" id="tableTitle">
                      Giá nhập
                    </Typography>
                  </Box>
                  <TextField
                    fullWidth
                    type="number"
                    name="originalPrice"
                    placeholder="Nhập giá nhập"
                    onChange={handleChangeNumber}
                  />
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Box
            className="info-main-item"
            py={2}
            px={1}
            mt={3}
            display="flex"
            flexDirection="column"
            backgroundColor="white"
          >
            <Typography variant="h6" id="tableTitle" px={1}>
              Thông số phiên bản
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Box display="flex" px={1} py={2}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box display="flex">
                    <Typography variant="subtitle1" id="tableTitle">
                      Màu sắc
                    </Typography>
                  </Box>
                  <TextField
                    fullWidth
                    name="colors"
                    placeholder="Nhập màu sắc"
                    inputRef={colorRef}
                    onKeyDown={(evt) =>
                      handleKeyDown(evt, colors, setColors, colorRef)
                    }
                    InputProps={{
                      startAdornment: colors.map((item, index) => (
                        <Chip
                          key={index}
                          label={item}
                          sx={{ mr: 1 }}
                          onDelete={() =>
                            handleDeleteChip(item, colors, setColors)
                          }
                        />
                      )),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box display="flex">
                    <Typography variant="subtitle1" id="tableTitle">
                      Chất liệu
                    </Typography>
                  </Box>
                  <TextField
                    fullWidth
                    name="materials"
                    placeholder="Nhập chất liệu"
                    inputRef={materialRef}
                    onKeyDown={(evt) =>
                      handleKeyDown(evt, materials, setMaterials, materialRef)
                    }
                    InputProps={{
                      startAdornment: materials.map((item, index) => (
                        <Chip
                          key={index}
                          label={item}
                          sx={{ mr: 1 }}
                          onDelete={() =>
                            handleDeleteChip(item, materials, setMaterials)
                          }
                        />
                      )),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box display="flex">
                    <Typography variant="subtitle1" id="tableTitle">
                      Kích thước
                    </Typography>
                  </Box>
                  <TextField
                    fullWidth
                    name="sizes"
                    placeholder="Nhập kích thước"
                    inputRef={sizeRef}
                    onKeyDown={(evt) =>
                      handleKeyDown(evt, sizes, setSizes, sizeRef)
                    }
                    InputProps={{
                      startAdornment: sizes.map((item, index) => (
                        <Chip
                          key={index}
                          label={item}
                          sx={{ mr: 1 }}
                          onDelete={() =>
                            handleDeleteChip(item, sizes, setSizes)
                          }
                        />
                      )),
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Box
            className="info-main-item"
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
              {/* <Box
                className="file-upload"
                sx={{
                  display: "flex",
                  bgcolor: "background.paper",
                  borderColor: "text.primary",
                  borderStyle: "dashed",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: "5rem",
                  border: 1,
                }}
              >
                <Add sx={{ mr: 2 }} />
                <Typography variant="body2">Kéo thả hoặc&nbsp;</Typography>
                <Typography
                  className="file-upload-btn"
                  variant="body2"
                  sx={{ color: "#0088FF" }}
                >
                  tải ảnh lên từ thiết bị
                </Typography>
            </Box> */}
              {/* <Box
                  width="100%"
                  heigh="273px"
                  sx={{ border: 1, display: "inline-block" }}
                ></Box> */}
              <UploadImage changeImageUrl={handleImageUrl} />
            </Box>
          </Box>
          <Box
            className="info-main-item"
            py={2}
            px={1}
            mt={3}
            display="flex"
            flexDirection="column"
            backgroundColor="white"
          >
            <Typography variant="h6" id="tableTitle" px={1}>
              Khởi tạo kho hàng
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Box display="flex" px={1} py={2}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Box display="flex">
                    <Typography variant="subtitle1" id="tableTitle">
                      Số lượng trong kho
                    </Typography>
                  </Box>
                  <TextField
                    fullWidth
                    type="number"
                    name="inventoryQuantity"
                    placeholder="Nhập số lượng trong kho"
                    onChange={handleChangeNumber}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Box display="flex">
                    <Typography variant="subtitle1" id="tableTitle">
                      Số lượng có thể bán
                    </Typography>
                  </Box>
                  <TextField
                    fullWidth
                    type="number"
                    name="sellableQuantity"
                    placeholder="Nhập số lượng có thể bán"
                    onChange={handleChangeNumber}
                  />
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box
            className="bunusInfo-main-createProduct"
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
                  <CategorySelect handleSelectCategory={handleSelectCategory} />
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
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box display="flex">
                    <Typography
                      variant="subtitle1"
                      id="tableTitle"
                      sx={{ fontWeight: "500" }}
                    >
                      Trạng thái
                    </Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <Typography>Cho phép bán</Typography>
                    <Switch
                      inputProps={{ "aria-label": "Trạng thái" }}
                      size="small"
                      checked={product.sellableStatus ? true : false}
                      onChange={handleChangeSellableStatus}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
        {variants.length > 0 ?
          <Grid className="preview-variant-table" item xs={12}>
            <Box
              py={2}
              px={1}
              display="flex"
              flexDirection="column"
              backgroundColor="white"
              sx={{ width: "fit-content" }}
            >
              <Typography variant="h6" id="tableTitle" px={1}>
                Phiên bản ({variants.length})
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Box display="flex" flexDirection="column" px={1} py={2}>
                <VariantsPreview setVariants={setVariants} productName={product.productName} variants={variants} />
              </Box>
            </Box>
          </Grid>
          :
          null}
      </Grid>
    </Box>
  );
}

export default CreateProduct;
