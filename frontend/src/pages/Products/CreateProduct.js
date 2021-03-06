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
          content: "Gi?? tr??? b??? tr??ng",
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
      content: "???? h???y t???o th??m phi??n b???n s???n ph???m",
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
          content: "???? t???o th??m s???n ph???m",
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
          Quay l???i Danh s??ch s???n ph???m
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
        <Typography variant="h4">T???o m???i s???n ph???m</Typography>
        <Box display="flex">
          <Button variant="outlined" sx={{ mr: 2 }} onClick={cancelAction}>
            Tho??t
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              handleCreateProduct();
            }}
          >
            L??u s???n ph???m
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
              Th??ng tin chung
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Box display="flex" px={1} py={2}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box display="flex">
                    <Typography variant="subtitle1" id="tableTitle">
                      T??n s???n ph???m
                    </Typography>
                  </Box>
                  <TextField
                    fullWidth
                    name="productName"
                    placeholder="Nh???p t??n s???n ph???m"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Box display="flex">
                    <Typography variant="subtitle1" id="tableTitle">
                      Kh???i l?????ng
                    </Typography>
                  </Box>
                  <TextField
                    fullWidth
                    name="weight"
                    placeholder="Nh???p kh???i l?????ng"
                    type="number"
                    onChange={(e) => handleChangeWeight(e)}
                    InputProps={{
                      endAdornment: (
                        <React.Fragment>
                          <Typography
                            aria-label="Thay ?????i ????n v??? kh???i l?????ng"
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
                      ????n v??? t??nh
                    </Typography>
                  </Box>
                  <TextField
                    fullWidth
                    name="unit"
                    placeholder="Nh???p ????n v??? t??nh"
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
              Gi?? s???n ph???m
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Box display="flex" px={1} py={2}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Box display="flex">
                    <Typography variant="subtitle1" id="tableTitle">
                      Gi?? b??n l???
                    </Typography>
                  </Box>
                  <TextField
                    fullWidth
                    type="number"
                    name="retailPrice"
                    placeholder="Nh???p gi?? b??n bu??n"
                    onChange={handleChangeNumber}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Box display="flex">
                    <Typography variant="subtitle1" id="tableTitle">
                      Gi?? b??n bu??n
                    </Typography>
                  </Box>
                  <TextField
                    fullWidth
                    type="number"
                    name="wholeSalePrice"
                    placeholder="Nh???p gi?? b??n bu??n"
                    onChange={handleChangeNumber}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Divider></Divider>
                </Grid>
                <Grid item xs={6}>
                  <Box display="flex">
                    <Typography variant="subtitle1" id="tableTitle">
                      Gi?? nh???p
                    </Typography>
                  </Box>
                  <TextField
                    fullWidth
                    type="number"
                    name="originalPrice"
                    placeholder="Nh???p gi?? nh???p"
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
              Th??ng s??? phi??n b???n
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Box display="flex" px={1} py={2}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box display="flex">
                    <Typography variant="subtitle1" id="tableTitle">
                      M??u s???c
                    </Typography>
                  </Box>
                  <TextField
                    fullWidth
                    name="colors"
                    placeholder="Nh???p m??u s???c"
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
                      Ch???t li???u
                    </Typography>
                  </Box>
                  <TextField
                    fullWidth
                    name="materials"
                    placeholder="Nh???p ch???t li???u"
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
                      K??ch th?????c
                    </Typography>
                  </Box>
                  <TextField
                    fullWidth
                    name="sizes"
                    placeholder="Nh???p k??ch th?????c"
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
              ???nh s???n ph???m
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
                <Typography variant="body2">K??o th??? ho???c&nbsp;</Typography>
                <Typography
                  className="file-upload-btn"
                  variant="body2"
                  sx={{ color: "#0088FF" }}
                >
                  t???i ???nh l??n t??? thi???t b???
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
              Kh???i t???o kho h??ng
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Box display="flex" px={1} py={2}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Box display="flex">
                    <Typography variant="subtitle1" id="tableTitle">
                      S??? l?????ng trong kho
                    </Typography>
                  </Box>
                  <TextField
                    fullWidth
                    type="number"
                    name="inventoryQuantity"
                    placeholder="Nh???p s??? l?????ng trong kho"
                    onChange={handleChangeNumber}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Box display="flex">
                    <Typography variant="subtitle1" id="tableTitle">
                      S??? l?????ng c?? th??? b??n
                    </Typography>
                  </Box>
                  <TextField
                    fullWidth
                    type="number"
                    name="sellableQuantity"
                    placeholder="Nh???p s??? l?????ng c?? th??? b??n"
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
              Th??ng tin b??? sung
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
                      Lo???i s???n ph???m
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
                      placeholder="Ch???n nh??n hi???u"
                    >
                      Nh??n hi???u
                    </Typography>
                  </Box>
                  <TextField
                    fullWidth
                    name="brand"
                    placeholder="Nh???p nh??n hi???u"
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
                      M?? t??? s???n ph???m
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
                      Tr???ng th??i
                    </Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <Typography>Cho ph??p b??n</Typography>
                    <Switch
                      inputProps={{ "aria-label": "Tr???ng th??i" }}
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
                Phi??n b???n ({variants.length})
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
