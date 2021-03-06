import * as React from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { makeStyles } from "@material-ui/core/styles";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Divider from "@mui/material/Divider";
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import Autocomplete from '@mui/material/Autocomplete';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CancelIcon from '@mui/icons-material/Cancel';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import * as moment from 'moment';

import { useHistory } from "react-router-dom";

import './UpdateOrder.scss';
import OrderAPI from '../../../api/OrderAPI'
import ProductAPI from "../../../api/ProductAPI";

Number.prototype.format = function (n, x) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
};
export default function DetailOrder({ setStateAlert }) {

    const [order, setOrder] = React.useState();
    const [codeOrder, setCodeOrder] = React.useState();
    const [expectedTime, setExpectedTime] = React.useState();
    const [totalAmount, setTotalAmount] = React.useState();
    const [description, setDescription] = React.useState("");
    const [debt, setDebt] = React.useState();
    const [nameSupplier, setNameSupplier] = React.useState();
    const [address, setAddRess] = React.useState();
    const [email, setEmail] = React.useState();
    const [discount, setDiscount] = React.useState('');
    const [openDiscount, setOpenDiscount] = React.useState(false);

    const searchParam = window.location.search.replace("?code=", "");

    const [date, setDate] = React.useState(null);
    const history = useHistory();

    const [numProduct, setNumProduct] = React.useState(0);
    const [numCategory, setNumCategory] = React.useState(0);
    const [total, setTotal] = React.useState(0);


    const [productList, setProductList] = React.useState([]);
    const [productSelect, setProductSelect] = React.useState([]);
    const [variantOrder, setVariantOrder] = React.useState([]);

    const [productSelectLast, setProductSelectLast] = React.useState([]);

    const [originalPrice, setOriginalPrice] = React.useState([]);
    const [num, setNum] = React.useState([]);

    const SubmitUpdate = async () => {
        let data = {
            orderCode: codeOrder,
            supplierId: order.supplier.id,
            description: description,
            deliveryTime: moment(date).format('YYYY-MM-DD'),
            discount: discount,
            lineItems: productSelectLast
        };
        console.log(data);
        try {
            await OrderAPI.updateOrder(searchParam, data);
            setStateAlert({
                severity: "success",
                variant: "filled",
                open: true,
                content: "???? c???p nh???t ????n h??ng th??nh c??ng",
            });
            history.goBack();
            // history.push("/nhap-hang");
        } catch (err) {
            setStateAlert({
                severity: "error",
                variant: "filled",
                open: true,
                content: err.response.data,
            });
        }
    }
    const handleOpenDiscount = () => {
        setOpenDiscount(!openDiscount);
    }

    async function add(newValue) {
        const productAdd = [
            // copy the current users state
            ...productSelect, (newValue)
            // now you can add a new object to add to the array

        ];

        await setProductSelect(
            productAdd
        )


    }

    async function handleSelectProd(event, newValue) {
        console.log(newValue);
        if (newValue == null) { }
        else {
            // setCheck(false);
            let checked = false;
            productSelect.map((product) => {
                if (product.id == newValue.id) {
                    checked = true;
                    // setCheck(true);
                }
            })
            console.log(checked);
            if (!checked) {
                await add(newValue);
            }
        }
    }

    function handDeleteProduct(id) {

        setProductSelect(productSelect.filter(item => item.id !== id));
    }

    const handleOriPrice = async (list) => {
        setOriginalPrice(
            list.reduce(
                (obj, product) => ({ ...obj, [product.variant.id]: product.price }),
                {}
            )
        )
        setNum(
            list.reduce(
                (obj, product) => ({ ...obj, [product.variant.id]: product.suppliedQuantity }),
                {}
            )
        )
        // Quantity();
    }
    const handleOriPriceProduct = async (list) => {
        setOriginalPrice(
            list.reduce(
                (obj, product) => ({ ...obj, [product.id]: product.originalPrice }),
                {}
            )
        )
        setNum(
            list.reduce(
                (obj, product) => ({ ...obj, [product.id]: 1 }),
                {}
            )
        )
    }


    React.useEffect(() => {
        let tmp = 0;
        let numCate = 0;
        let totalTmp = 0;
        const test = [];
        // console.log(lastProduct);
        console.log(num);
        console.log(originalPrice);
        productSelect.map((item) => {
            tmp += Number(num[item.id]);
            numCate += 1;
            totalTmp += Number(num[item.id]) * Number(originalPrice[item.id]);
            let productTmp = {}
            productTmp["variantId"] = item.id;
            productTmp["price"] = originalPrice[item.id];
            productTmp["quantity"] = Number(num[item.id]);
            test.push(productTmp);

            // setLastProduct( [
            //     // copy the current users state
            //     ...lastProduct,  (productTmp)
            //     // now you can add a new object to add to the array

            // ]);

        });
        setProductSelectLast(test);
        setNumProduct(tmp);
        setNumCategory(numCate);
        setTotal(totalTmp);

    }, [num, productSelect, originalPrice]);

    const useStyles = makeStyles((theme) => ({
        inputRoot: {
            color: "black",
            fontFamily: "Roboto Mono",
            backgroundColor: "#ffff",
            marginTop: 0,
            height: 40,

            "& .MuiOutlinedInput-notchedOutline": {
                borderWidth: "1px",
                borderColor: "white",
                height: 40,
                padding: 0,
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
                borderWidth: "0px",

            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderWidth: "0px",
            },
            "& #combo-box-demo": {
                padding: 0,
            }
        },
        clearIndicator: {
            color: "black"
        }
    }));
    const classes = useStyles();
    const steps = [
        '?????t h??ng',
        'Nh???p Kho',
        'Thanh to??n',
    ];

    async function getData() {
        try {
            // console.log(searchParam);
            const orderRes = await OrderAPI.OrderItem(searchParam);
            const ProductRes = await ProductAPI.getAllVariants();
            const VariantOrdertRes = await OrderAPI.VariantOrder(searchParam);

            let tmp = [];
            VariantOrdertRes.data.map((item) => {
                tmp.push(item.variant)
            })
            setProductSelect(tmp);

            setVariantOrder(VariantOrdertRes.data);
            setProductList(ProductRes.data);
            setOrder(orderRes.data);
            handleOriPriceProduct(ProductRes.data);
            handleOriPrice(VariantOrdertRes.data);

            setDate(orderRes.data.expectedTime);

            setNameSupplier(orderRes.data.supplier.name);
            setDebt(orderRes.data.supplier.debt);
            setEmail(orderRes.data.supplier.email);
            setAddRess(orderRes.data.supplier.address);
            setCodeOrder(orderRes.data.code);
            setExpectedTime(orderRes.data.expectedTime);
            setTotalAmount(orderRes.data.totalAmount);
            setDiscount(orderRes.data.discount);

        }
        catch (err) {
            console.log(err);
        }

    }
    React.useEffect(() => {
        getData();
    }, [])
    // console.log(productSelectLast);

    return (
        <Box py={2} px={5} sx={{ flexGrow: 1 }} className="main-updateOrder-content body">
            <Box className="navig">
                <Box className="back" onClick={history.goBack}>
                    <ArrowBackIosIcon />
                    <Box>????n nh???p h??ng</Box>
                </Box>
                <Box sx={{ width: '100%' }} className="time-line">
                    <Stepper activeStep={1} alternativeLabel>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Box>
                <Box className="tag-button" ml={2}>
                    <Typography sx={{ fontSize: 36, fontWeight: 450 }}>{codeOrder}</Typography>
                    <Button variant="contained" className="btn-order" onClick={SubmitUpdate}>L??u
                    </Button>
                </Box>
            </Box>
            <Box className="test">
                <Box className="supplier">
                    <Box >
                        <Typography className="title">
                            Th??ng tin ????n nh???p h??ng
                        </Typography>

                        <Box className="headerSupply">
                            <Box className="nameSupply">
                                <PersonRoundedIcon sx={{ marginRight: "20px" }} />
                                <Typography sx={{ marginRight: "5px", fontWeight: 600 }}>{nameSupplier}</Typography>

                            </Box>
                            <Typography className="debt" sx={{ fontWeight: 600 }} >C??ng n???: {debt?.format()} vnd</Typography>
                        </Box>
                    </Box>
                    <Divider />
                    <Box className="detail-supplier">
                        <Box className="export-address">
                            <Typography className="title-add">?????a ch??? xu???t h??ng</Typography>
                            <Typography>Giao h??ng</Typography>
                            <Typography>----</Typography>
                            <Typography>{address}</Typography>
                            {/* <Typography>Qu???n Ba ????nh - H?? N???i</Typography> */}
                            <Typography>Email: {email}</Typography>
                        </Box>
                        <Box className="billing-ex-add">
                            <Typography className="title-add" >?????a ch??? xu???t ho?? ????n</Typography>
                            <Typography>Giao h??ng</Typography>
                            <Typography>----</Typography>
                            <Typography>{address}</Typography>
                            {/* <Typography>Qu???n Ba ????nh - H?? N???i</Typography> */}
                            <Typography>Email: {email}</Typography>
                        </Box>
                    </Box>
                </Box>
                <Box className="product">
                    <Typography className="title">
                        Th??ng tin ????n nh???p h??ng
                    </Typography>
                    <Box className="selectproduct">
                        <Box className="selectProduct-info">
                            <SearchIcon className="icon-search" />
                            <Autocomplete className="selectProductItem"
                                classes={classes}
                                disablePortal
                                onChange={(event, newValue) => handleSelectProd(event, newValue)}
                                id="combo-box-demo"
                                options={productList}
                                // open="true"
                                getOptionLabel={(option) => option.product.name}
                                renderOption={(props, option) => (
                                    <Box {...props}>
                                        <Box><img
                                            style={{ width: "35px", height: "35px" }}
                                            src={
                                                option.imageUrl
                                                    ? option.imageUrl
                                                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTm1N8tGE9JE-BAn4GgYgG6MHCngMqXZKpZYzAUaI8kaPywl-kM_-9Zk8OnNOhmdt1sBjQ&usqp=CAU"
                                            }
                                        /></Box>
                                        <Box className="info">
                                            <Box sx={{ display: "flex" }} className="info-prod" >
                                                <Box sx={{ fontWeight: 550 }}>{option.variantName}</Box>
                                                <Box>{option.originalPrice.format()}</Box>
                                            </Box>
                                            <Box sx={{ display: "flex" }} className="info-prod">
                                                <Box>{option.code}</Box>
                                                <Box>S??? l?????ng: {option.inventoryQuantity.format()}</Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                )}
                                // sx={{ width: 500 }}
                                renderInput={(params) => <TextField {...params} style={{ padding: 0 }} placeholder="Ch???n s???n ph???m c???n nh???p" />}
                            />
                        </Box>
                        {/* <Button variant="outlined" className="btn-more-select">Ch???n nhi???u</Button> */}
                    </Box>
                    <Box className="header-Product">
                        <div style={{ width: "10%", textAlign: "center" }}>M?? SKU</div>
                        <div style={{ width: "48.5%", float: "left", paddingLeft: "15px" }}>T??n s???n ph???m</div>
                        <div style={{ width: "10%", textAlign: "center" }}>????n v???</div>
                        <div style={{ width: "10%", textAlign: "center" }}>S??? l?????ng</div>
                        <div style={{ width: "10%", textAlign: "center" }}>Gi?? nh???p</div>
                        <div style={{ width: "10%", textAlign: "center" }}>Th??nh ti???n</div>
                        <div style={{ width: "1.5%", textAlign: "center" }}></div>
                    </Box>
                    <Box className="bodyProducts">

                        <List>
                            {

                                productSelect?.map(item => {
                                    return (
                                        <ListItem className="product-item"
                                        >
                                            <Typography sx={{ width: '10%', alignItems: "center" }}>{item.code}</Typography>
                                            <Typography sx={{ width: '48%', paddingLeft: "5px", fontWeight: 550 }} >{item.variantName}</Typography>
                                            <Typography sx={{ width: '10%', textAlign: "center" }}>{item.unit}</Typography>
                                            <Box sx={{ width: '10%', textAlign: "center" }}><input type="text" style={{ width: '80%', height: 35 }} name="num" value={(num[item.id])}
                                                onChange={e =>
                                                    setNum({ ...num, [item.id]: e.target.value })}
                                            /></Box>
                                            <Box sx={{ width: '10%', textAlign: "center" }}><input type="text" style={{ width: '80%', height: 35 }} name="originalPrice" value={(originalPrice[item.id])}
                                                onChange={e => setOriginalPrice({ ...originalPrice, [item.id]: e.target.value })}
                                            /></Box>

                                            <Typography sx={{ width: '10%', textAlign: "center" }}>{(Number(num[item.id]) * Number(originalPrice[item.id]))?.format()}</Typography>
                                            <CancelIcon sx={{ width: '2%', textAlign: "center" }} onClick={() => handDeleteProduct(item.id)} />
                                        </ListItem>)
                                })
                            }

                        </List>
                        <Box className="pay-info">
                            <Box className="pay-info-item">
                                <Typography>T???ng s???n ph???m</Typography>
                                <Typography>{numProduct?.format()}</Typography>
                            </Box>
                            <Box className="pay-info-item">
                                <Typography>T???ng lo???i s???n ph???m</Typography>
                                <Typography>{numCategory?.format()}</Typography>
                            </Box>
                            <Box className="pay-info-item">
                                <Typography>T???ng ti???n</Typography>
                                <Typography>{total?.format()} vnd</Typography>
                            </Box>
                            <Box className="pay-info-item" sx={{ color: "#007BFF", cursor: "pointer" }}>
                                <Typography onClick={handleOpenDiscount} sx={{ display: "flex", alignItems: "center" }}>
                                    <Typography>T???ng chi???t kh???u</Typography>
                                    <ArrowDropDownIcon />
                                </Typography>
                                <Typography>{discount}%</Typography>
                            </Box>
                            {
                                !openDiscount ? null :
                                    <Box className="changeDiscount" sx={{ width: "100%" }}>
                                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                                <TextField

                                                    onChange={e => setDiscount(e.target.value)} >

                                                </TextField>
                                                <Typography>%</Typography>
                                            </Box>
                                            <Button variant="contained" className="btn-discount" onClick={handleOpenDiscount}
                                                sx={{ marginLeft: "20px", backgroundColor: "#007BFF" }}>??p d???ng</Button>
                                        </Box>

                                    </Box>
                            }
                            <Box className="pay-info-item">
                                <Typography sx={{ fontWeight: 700 }}>Ph???i tr???</Typography>
                                <Typography>{Number((total * Number(100 - discount) / 100).toFixed(2)).format()} vnd</Typography>

                            </Box>

                        </Box>
                    </Box>
                </Box>
            </Box>

            <Box sx={{ paddingLeft: "10px" }} className="more-info">
                <Box className="more-info-detail">
                    <Box className="title">Th??ng tin b??? sung</Box>
                    <Box className="code-supply-order">
                        <Box className='title'>M?? ????n nh???p h??ng</Box>
                        <Box className="info">{codeOrder}</Box>
                    </Box>
                    <Box className="time-supply-order">
                        <Box className='title'>Ng??y nh???n h??ng</Box>
                        <Box className="time">
                            <LocalizationProvider dateAdapter={AdapterDateFns}  >
                                <DatePicker
                                    inputFormat="yyyy/MM/dd"
                                    value={date}

                                    onChange={(views) => {
                                        setDate(views);
                                    }}
                                    renderInput={(params) => <TextField {...params} placeholder="Ng??y nh???n" />}
                                />
                            </LocalizationProvider>
                        </Box>
                        {/* <Box className="time">
                                {expectedTime}
                            </Box> */}
                    </Box>
                    <Box className="note">
                        <Box className="title">Ghi ch??</Box>
                        <textarea className="content-note" onChange={(e) => setDescription(e.target.value)}>{description}</textarea>
                        <Box></Box>
                    </Box>
                </Box>
            </Box>
            {/* </Grid> */}
        </Box>

    );
}