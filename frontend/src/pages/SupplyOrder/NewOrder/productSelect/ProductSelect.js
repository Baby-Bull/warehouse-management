import './ProductSelect.scss';

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { makeStyles } from "@material-ui/core/styles";
import List from '@mui/material/List';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItem from '@mui/material/ListItem';
import CancelIcon from '@mui/icons-material/Cancel';
import ProductAPI from '../../../../api/ProductAPI';

import emptyBox from './empty_box.png'



Number.prototype.format = function (n, x) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
};

export default function ProductSelect({ setProduct, setDiscountFinal }) {

    const [lastProduct, setLastProduct] = React.useState([]);
    const [productList, setProductList] = React.useState([]);
    const [numProduct, setNumProduct] = React.useState(0);
    const [numCategory, setNumCategory] = React.useState(0);
    const [total, setTotal] = React.useState(0);
    const [productSelect, setProductSelect] = React.useState([]);
    const [check, setCheck] = React.useState(false);
    const [discount, setDiscount] = React.useState(0);

    const [originalPrice, setOriginalPrice] = React.useState([]);
    const [num, setNum] = React.useState([]);

    const [openDiscount, setOpenDiscount] = React.useState(false);





    const handleOpenChangeDiscount = () => {

    }
    const handleOpenDiscount = () => {
        setOpenDiscount(!openDiscount);
    }


    function add(newValue) {
        const productAdd = [
            // copy the current users state
            ...productSelect, (newValue)
            // now you can add a new object to add to the array

        ];
        if (!check) {
            setProductSelect(
                productAdd
            )
        }

    }

    async function handleSelectProd(event, newValue) {
        console.log(newValue);
        if (newValue == null) { }
        else {
            setCheck(false);
            let checked = false;
            productSelect.map((product) => {
                if (product.id == newValue.id) {
                    checked = true;
                    setCheck(true);
                }
            })
            console.log(check);
            if (!checked) {
                add(newValue);
            }

            // const productAdd = [
            //     // copy the current users state
            //     ...productSelect,
            //     // now you can add a new object to add to the array
            //     (newValue)
            //   ];
            // console.log(check);
            // if(!check) {
            //     setProductSelect(
            //        productAdd
            //     )
            // }
        }
    }
    function handDeleteProduct(id) {

        setProductSelect(productSelect.filter(item => item.id !== id));
    }

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
                // borderColor: "white"
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
    const handleOriPrice = async (list) => {
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
        setDiscountFinal(discount);
    }, [discount])
    React.useEffect(() => {
        let tmp = 0;
        let numCate = 0;
        let totalTmp = 0;
        const test = [];
        console.log(lastProduct);
        console.log(num);
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
        setProduct(test);
        setNumProduct(tmp);
        setNumCategory(numCate);
        setTotal(totalTmp);

    }, [num, productSelect, originalPrice]);

    async function getData() {
        const result = await ProductAPI.getAllVariants();

        setProductList(result.data);
        handleOriPrice(result.data);
        setDiscountFinal(discount);


        return true;
    }

    React.useEffect(() => {
        getData();

    }, []);


    // console.log(productSelect);
    // console.log(lastProduct);
    console.log(productList);

    return (
        <div>
            <Box className="Products">
                <Typography className="title">
                    Thông tin đơn nhập hàng
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
                            getOptionLabel={(option) => option.variantName}
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
                                            <Box>Số lượng: {option.inventoryQuantity.format()}</Box>
                                        </Box>
                                    </Box>
                                </Box>
                            )}
                            // sx={{ width: 500 }}
                            renderInput={(params) => <TextField {...params} style={{ padding: 0 }} placeholder="Chọn sản phẩm cần nhập" />}
                        />
                    </Box>
                    {/* <Button variant="outlined" className="btn-more-select">Chọn nhiều</Button> */}
                </Box>
                <Box className="header-Product">
                    <div style={{ width: "10%", textAlign: "center" }}>Mã SKU</div>
                    <div style={{ width: "48.5%", float: "left", paddingLeft: "15px" }}>Tên sản phẩm</div>
                    <div style={{ width: "10%", textAlign: "center" }}>Đơn vị</div>
                    <div style={{ width: "10%", textAlign: "center" }}>Số lượng</div>
                    <div style={{ width: "10%", textAlign: "center" }}>Giá nhập</div>
                    <div style={{ width: "10%", textAlign: "center" }}>Thành tiền</div>
                    <div style={{ width: "1.5%", textAlign: "center" }}></div>
                </Box>
                <Box className="bodyProducts">

                    <List>
                        {

                            productSelect.map(item => {
                                return (
                                    <ListItem className="product-item" key={item.id}
                                    >
                                        <Typography sx={{ width: '10%', textAlign: "center" }}>{item.code}</Typography>
                                        <Typography sx={{ width: '48%', paddingLeft: "5px", fontWeight: 550 }} >{item.variantName}</Typography>
                                        <Typography sx={{ width: '10%', textAlign: "center" }}>{item.unit}</Typography>
                                        <Box sx={{ width: '10%', textAlign: "center" }}><input type="text" style={{ width: '80%', height: 35 }} name="num" value={(num[item.id])}
                                            onChange={e =>
                                                setNum({ ...num, [item.id]: e.target.value })}
                                        /></Box>
                                        <Box sx={{ width: '10%', textAlign: "center" }}><input type="text" style={{ width: '80%', height: 35 }} name="originalPrice" value={(originalPrice[item.id])}
                                            onChange={e => setOriginalPrice({ ...originalPrice, [item.id]: e.target.value })}
                                        /></Box>

                                        <Typography sx={{ width: '10%', textAlign: "center" }}>{Number(num[item.id] * originalPrice[item.id]).format()}</Typography>
                                        <CancelIcon sx={{ width: '2%', textAlign: "center" }} onClick={() => handDeleteProduct(item.id)} />

                                    </ListItem>)
                            })
                        }

                    </List>
                    {
                        (productSelect.length == 0) ?

                        <Box sx={{textAlign: "center"}}  mb={2}>
                            <img src={emptyBox} style={{width: "200px", height: "200px"}} />
                            <Typography>Bạn chưa chọn sản phẩm nào</Typography>
                        </Box> : null

                    
                        
                    }
                    <Box className="pay-info-new">
                        <Box className="pay-info-item">
                            <Typography>Tổng sản phẩm</Typography>
                            <Typography>{numProduct?.format()}</Typography>
                        </Box>
                        <Box className="pay-info-item">
                            <Typography>Tổng loại sản phẩm</Typography>
                            <Typography>{numCategory?.format}</Typography>
                        </Box>
                        <Box className="pay-info-item">
                            <Typography>Tổng tiền</Typography>
                            <Typography>{total?.format()} vnd</Typography>
                        </Box>
                        <Box className="pay-info-item" sx={{ color: "#007BFF", cursor: "pointer" }}>
                            <Typography onClick={handleOpenDiscount} sx={{ display: "flex", alignItems: "center" }}>
                                <Typography>Tổng chiết khấu</Typography>
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
                                            sx={{ marginLeft: "20px", backgroundColor: "#007BFF" }}>Áp dụng</Button>
                                    </Box>

                                </Box>
                        }
                        <Box className="pay-info-item">
                            <Typography sx={{ fontWeight: 700 }}>Phải trả</Typography>
                            <Typography>{Number((total * (100 - discount) / 100).toFixed(2)).format()} vnd</Typography>
                        </Box>

                    </Box>
                </Box>
            </Box>
        </div>
    )
}