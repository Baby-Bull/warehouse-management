import * as React from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { makeStyles } from "@material-ui/core/styles";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Divider from "@mui/material/Divider";
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Modal from '@mui/material/Modal';
import UnlockAccess from '../../../components/roleBasedRender/UnlockAccess'

import {
    Link,
    useHistory
} from "react-router-dom";


import './DetailOrder.scss';
import OrderAPI from '../../../api/OrderAPI'
import PaymentAPI from "../../../api/PaymentAPI";
import ImportReceiptsAPI from "../../../api/ImportReceiptsAPI";
import ReturnReceiptsAPI from "../../../api/ReturnReceiptsAPI";


Number.prototype.format = function (n, x) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
};

export default function DetailOrder({ setStateAlert }) {

    const [order, setOrder] = React.useState();
    const [codeOrder, setCodeOrder] = React.useState();
    const [expectedTime, setExpectedTime] = React.useState();
    const [totalAmount, setTotalAmount] = React.useState();
    const [description, setDescription] = React.useState();
    const [debt, setDebt] = React.useState();
    const [discount, setDiscount] = React.useState(0);
    const [nameSupplier, setNameSupplier] = React.useState();
    const [address, setAddRess] = React.useState();
    const [email, setEmail] = React.useState();
    const searchParam = window.location.search.replace("?code=", "");

    const [date, setDate] = React.useState(null);
    const [numProduct, setNumProduct] = React.useState(0);
    const history = useHistory();

    const [openMenu, setOpenMenu] = React.useState(false);
    const [openImport, setOpenImport] = React.useState(true);
    const [openPaymented, setOpenPaymented] = React.useState(true);

    const [payment, setPayment] = React.useState("");
    const [historyPaid, setHistoryPaid] = React.useState([]);

    const [historyImport, setHistoryImport] = React.useState([]);

    const [historyReturn, setHistoryReturn] = React.useState([]);

    const [productList, setProductList] = React.useState([]);

    const [num, setNum] = React.useState([]);

    const [openImportHistory, setOpenImportHistory] = React.useState([]);
    const [openPaymentHistory, setOpenPaymentHistory] = React.useState([]);
    const [openReturnHistory, setOpenReturnHistory] = React.useState([]);

    const [active, setActive] = React.useState(1);



    const handleActive = (item) => {
        if (item?.importedStatus == "???? nh???p kho") {
            setActive(2);
        }
        if (item?.status == "???? ho??n th??nh") {
            setActive(3);
        }
    }
    const handleOpenPayment = () => {
        // setOpenPayment(!openPayment);
        setOpenPaymented(!openPaymented);
        setPayment("");
    }
    const handleOpenImport = () => {
        setOpenImport(!openImport);
        // let numImport = [];
        // productList.map((item) => {
        //     numImport[item.variant.id] = 0;
        //     historyImport.lineItems.map((importItem) => {
        //         if (item.variant.id == importItem.variantId) {
        //             numImport[item.variant.id] -= importItem.quantity;
        //         }
        //     });
        //     historyReturn.lineItems.map((importItem) => {
        //         if (item.variant.id == importItem.variantId) {
        //             numImport[item.variant.id] += importItem.quantity;
        //         }
        //     });
        // }) numImport[product.variant.id]
        setNum(
            productList.reduce(
                (obj, product) => ({ ...obj, [product.variant.id]: 0 }), {}
            )
        )
    }

    const handOpenHistoryPayment = (items) => {
        setHistoryPaid(items);
        setOpenPaymentHistory(
            items.reduce(
                (obj, product) => ({ ...obj, [product.id]: false }), {}
            )
        )
    }
    const handOpenHistoryImport = (items) => {
        setHistoryImport(items)
        setOpenImportHistory(
            items.reduce(
                (obj, product) => ({ ...obj, [product.code]: false }), {}
            )
        )
    }
    const handOpenHistoryReturn = (items) => {
        setHistoryReturn(items)
        setOpenReturnHistory(
            items.reduce(
                (obj, product) => ({ ...obj, [product.code]: false }), {}
            )
        )
    }


    // Thanh toan
    const SubmitPayment = async () => {
        // handleOpenPayment();
        try {
            await PaymentAPI.Paid(searchParam, { amount: payment });
            handleOpenPayment();
            setStateAlert({
                severity: "success",
                variant: "filled",
                open: true,
                content: "???? thanh to??n ????n h??ng th??nh c??ng",
            });

        } catch (err) {
            setStateAlert({
                severity: "error",
                variant: "filled",
                open: true,
                content: err.response.data,
            });
        }
        // const res = await PaymentAPI.Paid(searchParam, { amount: payment });
        // // res.then(respons => {
        // handleOpenPayment();
        // // setOpenPaymented(true);
        // // })


    }

    // Nhap kho
    const SubmitImport = async () => {

        let data = [];
        productList.map((item) => {
            let dataTmp = {};
            dataTmp["variantId"] = item.variant.id;
            dataTmp["quantity"] = Number(num[item.variant.id]);
            data.push(dataTmp);
        })
        try {

            await ImportReceiptsAPI.Import(searchParam, { lineItems: data });
            handleOpenImport();
            setStateAlert({
                severity: "success",
                variant: "filled",
                open: true,
                content: "???? nh???p kho th??nh c??ng",
            });

        } catch (err) {
            setStateAlert({
                severity: "error",
                variant: "filled",
                open: true,
                content: err.response.data,
            });
        }
    }

    // huy don hang
    const handleDeleteOrder = async () => {
        try {
            await OrderAPI.deleteOrder(searchParam);
            history.push("/nhap-hang");
            setStateAlert({
                severity: "success",
                variant: "filled",
                open: true,
                content: "???? hu??? ????n h??ng th??nh c??ng",
            });

        } catch (err) {
            setStateAlert({
                severity: "error",
                variant: "filled",
                open: true,
                content: err.response.data,
            });
        }
    }
    const useStyles = makeStyles((theme) => ({
        inputRoot: {
            color: "black",
            fontFamily: "Roboto Mono",
            backgroundColor: "#ffff",
            marginTop: 17,
            height: 42,

            "& .MuiOutlinedInput-notchedOutline": {
                borderWidth: "1px",
                borderColor: "#888888",
                height: 42,
                padding: 0,
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
                borderWidth: "1px",
                color: "black"

            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderWidth: "1px",
                color: "black"
            },
            "& #combo-box-demo": {
                padding: 0,
                color: "#888888"
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
        'Ho??n Th??nh',
    ];

    // paymentType
    const paymentType = [
        { label: 'Ti???n m???t' },
        { label: 'Chuy???n kho???n' }
    ]


    async function getData() {
        try {
            console.log(searchParam);
            const orderRes = await OrderAPI.OrderItem(searchParam);
            const ProductRes = await OrderAPI.VariantOrder(searchParam);
            const HistoryPaidRes = await PaymentAPI.HistoryPaid(searchParam);
            const HistoryImportRes = await ImportReceiptsAPI.HistoryImport(searchParam);
            const HistoryReturnRes = await ReturnReceiptsAPI.HistoryReturn(searchParam);

            setProductList(ProductRes.data);

            setOrder(orderRes.data);
            setPayment(orderRes.data.totalAmount - orderRes.data.paidAmount);
            setNameSupplier(orderRes.data.supplier.name);
            setDebt(orderRes.data.supplier.debt);
            setEmail(orderRes.data.supplier.email);
            setAddRess(orderRes.data.supplier.address);
            setCodeOrder(orderRes.data.code);
            setExpectedTime(orderRes.data.expectedTime);
            setTotalAmount(orderRes.data.totalAmount);
            setDiscount(orderRes.data.discount);
            setDescription(orderRes.data.description);

            // setHistoryPaid(HistoryPaidRes.data);
            handOpenHistoryPayment(HistoryPaidRes.data);

            // setHistoryImport(HistoryImportRes.data);
            handOpenHistoryImport(HistoryImportRes.data);

            handOpenHistoryReturn(HistoryReturnRes.data);

            handleActive(orderRes.data);



            let tmp = 0;
            ProductRes.data.map((item) => {
                tmp += item.suppliedQuantity;

            })
            setNumProduct(tmp);

        }
        catch (err) {
            console.log(err);
        }

    }
    React.useEffect(() => {
        getData();
    }, [openPaymented, openImport])



    // css nhap kho
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        border: '1px solid #000',
        boxShadow: 5,
        p: 4,
    };

    // console.log(productList);
    const gobackOrder = () => {
        history.push("/nhap-hang");
    }
    return (

        <div>
            <Box py={2} px={5} sx={{ flexGrow: 1, minHeight: "85vh" }} className="body main-detailOrder-content">
                <Box className="header-page-detail">
                    <Box className="back" onClick={gobackOrder}>
                        <ArrowBackIosIcon />
                        <Box>????n nh???p h??ng</Box>
                    </Box>
                    <Box sx={{ width: '100%' }} className="time-line">
                        <Stepper activeStep={active} alternativeLabel>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </Box>
                    <Box className="tag-button" ml={2}>
                        <Typography sx={{ fontSize: 36, fontWeight: 450 }}>{codeOrder}</Typography>
                        <UnlockAccess request={['ADMIN', 'Nh??n vi??n kho']}>
                            {
                                (order?.status == "???? ho??n th??nh") ? null :
                                    <Box sx={{ display: "flex", alignItems: "center" }} >
                                        {
                                            (order?.transactionStatus == "Ch??a thanh to??n" && order?.importedStatus == "Ch??? nh???p kho") ?
                                                <Button variant="outlined" color="error" sx={{ width: "50px", marginRight: "16px" }} onClick={handleDeleteOrder}> Hu??? </Button>
                                                : null
                                        }

                                        <Link to={`/nhap-hang/sua-don-hang?code=${searchParam}`} className="link-update">
                                            <Button variant="contained" sx={{ width: "200px" }}> Ch???nh s???a ????n h??ng</Button>
                                        </Link>
                                    </Box>
                            }
                        </UnlockAccess>
                    </Box>

                </Box>
                <Box className="test"  >
                    <Box className="supplier">
                        <Box >
                            <Typography className="title">
                                Th??ng tin ????n nh???p h??ng
                            </Typography>
                            <Box className="headerSupply">
                                <Box className="nameSupply">
                                    <PersonRoundedIcon sx={{ marginRight: "10px" }} />
                                    <Typography sx={{ marginRight: "5px", fontWeight: 600 }}>{nameSupplier}</Typography>

                                </Box>
                                <Typography className="debt" sx={{ fontWeight: 600 }}>C??ng n???: {debt?.format()} vnd</Typography>
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
                        <Box className="header-Product">
                            <div style={{ width: "10%", textAlign: "center" }}>M?? SKU</div>
                            <div style={{ width: "50%", float: "left", paddingLeft: "15px" }}>T??n s???n ph???m</div>
                            <div style={{ width: "10%", textAlign: "center" }}>????n v???</div>
                            <div style={{ width: "10%", textAlign: "center" }}>S??? l?????ng</div>
                            <div style={{ width: "10%", textAlign: "center" }}>Gi?? nh???p</div>
                            <div style={{ width: "10%", textAlign: "center" }}>Th??nh ti???n</div>
                        </Box>
                        <Box className="bodyProducts">

                            <List sx={{ width: "100%" }}>
                                {

                                    productList?.map(item => {
                                        return (
                                            <ListItem className="product-item"
                                            >
                                                <Typography sx={{ width: '10%', alignItems: "center", textAlign: "center" }}>{item.variant.code}</Typography>
                                                <Typography sx={{ width: '50%', paddingLeft: "5px", fontWeight: 550 }} >{item.variant.variantName}</Typography>
                                                <Typography sx={{ width: '10%', textAlign: "center" }}>{item.variant.unit}</Typography>
                                                <Box sx={{ width: '10%', textAlign: "center" }}>{item.suppliedQuantity.format()}</Box>
                                                <Box sx={{ width: '10%', textAlign: "center" }}>{item.price.format()}</Box>

                                                <Typography sx={{ width: '10%', textAlign: "center" }}>{(item.suppliedQuantity * item.price).format()}</Typography>

                                            </ListItem>)
                                    })
                                }

                            </List>
                            <Box className="pay-info">
                                <Box className="pay-info-item">
                                    <Typography>T???ng s???n ph???m</Typography>
                                    <Typography>{numProduct}</Typography>
                                </Box>
                                <Box className="pay-info-item">
                                    <Typography>T???ng lo???i s???n ph???m</Typography>
                                    <Typography>{productList?.length}</Typography>
                                </Box>
                                <Box className="pay-info-item">
                                    <Typography>T???ng ti???n</Typography>
                                    <Typography>{(totalAmount * 100 / 94).format()} vnd</Typography>
                                </Box>
                                <Box className="pay-info-item" sx={{ color: "#007BFF" }}>
                                    <Typography >T???ng chi???t kh???u</Typography>
                                    <Typography>{discount}</Typography>
                                </Box>
                                <Box className="pay-info-item">
                                    <Typography sx={{ fontWeight: 700 }}>Ph???i tr???</Typography>
                                    <Typography>{totalAmount?.format()} vnd</Typography>
                                </Box>

                            </Box>
                        </Box>

                    </Box>
                    <Box className="payment" pl={2} sx={{ backgroundColor: "white", border: "1px solid #e4e4e4" }}>
                        <Box className="header-payment" pt={2} mb={2}>
                            <Box className="header-payment-info">
                                <Box sx={{ display: "flex" }}>
                                    <AccountBalanceWalletIcon />
                                    <Typography sx={{ fontWeight: 600 }} ml={2} >Thanh To??n</Typography>
                                </Box>
                                <Box sx={{ display: "flex", justifyContent: "space-between" }} mt={2}>
                                    <Typography>???? thanh to??n: {(order?.paidAmount)?.format()} vnd </Typography>
                                    <Typography>C??n ph???i tr???: {(order?.totalAmount - order?.paidAmount)?.format()} vnd </Typography>
                                </Box>
                            </Box>
                            <UnlockAccess request={['ADMIN', 'K??? to??n']}>
                                {
                                    (order?.transactionStatus == "???? thanh to??n") ? null :


                                        openPaymented ?
                                            <Box className="btn-payment">
                                                <Button variant="contained"
                                                    onClick={handleOpenPayment} sx={{ width: "180px" }}
                                                >X??c nh???n thanh to??n</Button>
                                            </Box> : null


                                }
                            </UnlockAccess>
                        </Box>
                        {
                            openPaymented ?
                                <Box className="history-paid" sx={{ display: "flex" }} mt={2} mb={2}>

                                    <Divider />
                                    <Timeline>
                                        {
                                            historyPaid ? historyPaid.map((item, index) => {
                                                // let opend = false;
                                                // const opendItem = () => {
                                                //     opend = true;
                                                // }
                                                return (
                                                    <TimelineItem key={index} >
                                                        <TimelineSeparator>
                                                            <TimelineDot color="primary" />
                                                            <TimelineConnector />
                                                        </TimelineSeparator>
                                                        <TimelineContent>
                                                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                                                <Typography ml={2} sx={{ cursor: "pointer" }} onClick={() => setOpenPaymentHistory({ ...openPaymentHistory, [item.id]: !openPaymentHistory[item.id] })} >X??c nh???n thanh to??n <span style={{ fontWeight: 600 }}>{(item.amount).format()} vnd</span> th??nh c??ng</Typography>
                                                                <Typography ml={2}>{item.createdAt}</Typography>
                                                            </Box>

                                                            {
                                                                openPaymentHistory ?
                                                                    openPaymentHistory[item.id] ?
                                                                        <Box sx={{ display: "flex", justifyContent: "space-between" }} mt={2}>
                                                                            <Box sx={{ width: "50%" }} ml={2}>
                                                                                <Typography sx={{ color: "#6f6f6f" }} >S??? ti???n thanh to??n</Typography>
                                                                                <Typography >{(item.amount).format()} vnd</Typography>
                                                                            </Box>
                                                                            <Box sx={{ width: "50%" }}>
                                                                                <Typography sx={{ color: "#6f6f6f" }}>Ng?????i thanh to??n</Typography>
                                                                                <Typography>{item.createdBy.username}</Typography>
                                                                            </Box>

                                                                        </Box> : null
                                                                    : null
                                                            }
                                                        </TimelineContent>
                                                    </TimelineItem>
                                                )
                                            }) : null
                                        }

                                    </Timeline>


                                </Box> :
                                <Box className="body-payment" mt={2}>
                                    <Divider />
                                    <Box className="body-payment-info" mt={2}>
                                        <Box className="payment-type">
                                            <Typography sx={{ fontWeight: 600 }} >L???a ch???n h??nh th???c thanh to??n</Typography>
                                            <Autocomplete
                                                disablePortal
                                                id="combo-box-demo"
                                                options={paymentType}
                                                sx={{ width: 200, color: "black" }}
                                                classes={classes}
                                                renderInput={(params) => <TextField {...params} sx={{ color: "black" }} placeholder="Ch???n ph????ng th???c thanh to??n" />}
                                            />
                                        </Box>
                                        <Box className="payment-amount">
                                            <Typography sx={{ fontWeight: 600 }} mb={2}>S??? ti???n thanh to??n</Typography>
                                            <TextField id="outlined-basic" variant="outlined"
                                                sx={{ width: 200, height: 40 }}
                                                value={Number(payment)}
                                                onChange={e => setPayment(e.target.value)} />
                                        </Box>
                                    </Box>
                                    <Box sx={{ display: "flex" }} mt={2} mb={2}>
                                        <Button variant="outlined" ml={2} color="error"
                                            onClick={handleOpenPayment}
                                        >????ng</Button>
                                        <Button variant="contained" sx={{ marginLeft: "16px" }}
                                            onClick={SubmitPayment}
                                        >Thanh to??n</Button>
                                    </Box>
                                </Box>

                        }

                    </Box>
                    <Box className="import" pl={2} sx={{ backgroundColor: "white", border: "1px solid #e4e4e4" }}>
                        <Box className="header-import" pt={2} mb={2}>
                            <Box sx={{ display: "flex" }}>
                                <LocalShippingIcon />
                                <Typography sx={{ fontWeight: 600 }} ml={2}>Nh???p Kho</Typography>
                            </Box>
                            <UnlockAccess request={['ADMIN', 'Nh??n vi??n kho']}>
                                {
                                    (order?.importedStatus == "???? nh???p kho") ? null :
                                        <Box className="btn-import">
                                            <Button variant="contained" sx={{ width: "180px" }}
                                                onClick={handleOpenImport}>  X??c nh???n nh???p kho  </Button>
                                        </Box>
                                }
                            </UnlockAccess>



                        </Box>
                        {
                            (historyImport.length != 0) ?
                                <Box className="history-import" sx={{ display: "flex" }} mt={2} mb={2}>
                                    <Divider />
                                    <Timeline className="body-history-import">
                                        {
                                            historyImport ? historyImport.map((item) => {
                                                return (
                                                    <TimelineItem>
                                                        <TimelineSeparator>
                                                            <TimelineDot color="primary" />
                                                            <TimelineConnector />
                                                        </TimelineSeparator>
                                                        <TimelineContent>
                                                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                                                <Typography ml={2} sx={{ cursor: "pointer" }} onClick={() => setOpenImportHistory({ ...openImportHistory, [item.code]: !openImportHistory[item.code] })}><span style={{ fontWeight: 550 }}>{item.code}</span> ???? nh???p kho</Typography>
                                                                <Typography ml={2}>{item.createdAt}</Typography>
                                                            </Box>
                                                            {
                                                                openImportHistory ?
                                                                    openImportHistory[item.code] ?
                                                                        <Box>
                                                                            <Box sx={{ display: "flex", justifyContent: "space-between" }} mt={2}>
                                                                                <Box sx={{ width: "50%" }} ml={2}>
                                                                                    <Typography sx={{ color: "#6f6f6f" }}>M?? phi???u nh???p kho</Typography>
                                                                                    <Typography>{item.code}</Typography>
                                                                                </Box>
                                                                                <Box sx={{ width: "50%" }} >
                                                                                    <Typography sx={{ color: "#6f6f6f" }}>Ng?????i nh???p kho</Typography>
                                                                                    <Typography>{item.creatorName}</Typography>
                                                                                </Box>
                                                                            </Box>
                                                                            <Box mt={2} ml={2} >
                                                                                <Typography sx={{ color: "#6f6f6f" }}>S???n ph???m</Typography>
                                                                                {
                                                                                    item.lineItems.map((variantImport) => {
                                                                                        if (variantImport.quantity != 0)
                                                                                            return (
                                                                                                <Box>{(variantImport.quantity).format()} x {variantImport.name}</Box>
                                                                                            )
                                                                                    })
                                                                                }
                                                                            </Box>
                                                                        </Box> : null
                                                                    : null
                                                            }


                                                        </TimelineContent>
                                                    </TimelineItem>
                                                )
                                            }) : null
                                        }

                                    </Timeline>
                                </Box> : null
                        }

                        <Modal
                            open={!openImport}
                            onClose={handleOpenImport}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style} className="modal-import">
                                <Typography id="modal-modal-title" variant="h6" component="h2" mb={2}>
                                    Nh???p kho
                                </Typography>
                                <Divider />
                                <Box id="modal-modal-description" sx={{ mt: 2 }}>
                                    <Box className="header-Product" sx={{ display: "flex" }}>
                                        <Box sx={{ width: "75%", float: "left", paddingLeft: "15px", fontWeight: 600, fontSize: 16 }}>T??n s???n ph???m</Box>
                                        <Box sx={{ width: "25%", textAlign: "center", fontWeight: 600, fontSize: 16 }}>S??? l?????ng Nh???p</Box>
                                    </Box>
                                    <List sx={{ width: "100%" }}>
                                        {

                                            productList?.map(item => {
                                                return (
                                                    <ListItem className="product-item"
                                                    //  sx={{border: "1px solid #9b9999"}}
                                                    >
                                                        <Typography sx={{ width: '75%', paddingLeft: "5px", fontWeight: 500 }} >{item.variant.variantName}</Typography>
                                                        <Box sx={{ width: '25%', textAlign: "center" }}><input type="text" style={{ width: '80%', height: 35 }} name="num" value={num[item.variant.id]}
                                                            onChange={e =>
                                                                setNum({ ...num, [item.variant.id]: e.target.value })}
                                                        /></Box>
                                                    </ListItem>)
                                            })
                                        }

                                    </List>
                                    <Divider />
                                    <Box ml={40} mt={2}>
                                        <Button variant="outlined" color="error" sx={{ width: "50px", marginRight: "16px" }} onClick={handleOpenImport}> Tho??t </Button>
                                        <Button variant="contained" onClick={SubmitImport} sx={{ width: "100px" }}> Nh???p Kho</Button>
                                    </Box>
                                </Box>
                            </Box>
                        </Modal>

                    </Box>
                    <Box className="return" mt={2} pl={2} sx={{ backgroundColor: "white", border: "1px solid #e4e4e4" }} >
                        <Box className="header-return" pt={2} mb={2} sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Box className="header-return-info">
                                <Box sx={{ display: "flex" }}>
                                    <AccountBalanceWalletIcon />
                                    <Typography sx={{ fontWeight: 600 }} ml={2} >Ho??n tr???</Typography>
                                </Box>
                            </Box>
                            {
                                (order?.importedStatus == "Ch??? nh???p kho" || order?.importedStatus == "Ho??n tr??? to??n b???") ? null :
                                    <Box className="btn-return" sx={{ width: "30%", textAlign: "center" }}>
                                        <Link style={{ textDecoration: "none" }} to={`/don-hang/hoan-tra?id=${searchParam}`}>
                                            <Button variant="contained" sx={{ width: "180px" }}>
                                                X??c nh???n ho??n tr???</Button>
                                        </Link>

                                    </Box>
                            }

                        </Box>
                        {

                            (historyReturn.length != 0) ?
                                <Box className="history-import" sx={{ display: "flex" }} mt={2} mb={2}>
                                    <Divider />
                                    <Timeline className="body-history-import">
                                        {
                                            historyReturn ? historyReturn.map((item) => {
                                                return (
                                                    <TimelineItem>
                                                        <TimelineSeparator>
                                                            <TimelineDot color="primary" />
                                                            <TimelineConnector />
                                                        </TimelineSeparator>
                                                        <TimelineContent>
                                                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                                                <Typography ml={2} sx={{ cursor: "pointer" }} onClick={() => setOpenReturnHistory({ ...openReturnHistory, [item.code]: !openReturnHistory[item.code] })}><span style={{ fontWeight: 550 }}>{item.code}</span> ???? ho??n tr???</Typography>
                                                                <Typography ml={2}>{item.createdAt}</Typography>
                                                            </Box>
                                                            {
                                                                openReturnHistory ?
                                                                    openReturnHistory[item.code] ?
                                                                        <Box>
                                                                            <Box sx={{ display: "flex", justifyContent: "space-between" }} mt={2}>
                                                                                <Box sx={{ width: "50%" }} ml={2}>
                                                                                    <Typography sx={{ color: "#6f6f6f" }}>M?? phi???u ho??n tr???</Typography>
                                                                                    <Typography>{item.code}</Typography>
                                                                                </Box>
                                                                                <Box sx={{ width: "50%" }} >
                                                                                    <Typography sx={{ color: "#6f6f6f" }}>Ng?????i th???c hi???n</Typography>
                                                                                    <Typography>{item.creatorName}</Typography>
                                                                                </Box>
                                                                            </Box>
                                                                            <Box mt={2} ml={2} >
                                                                                <Typography sx={{ color: "#6f6f6f" }}>S???n ph???m</Typography>
                                                                                {
                                                                                    item.lineItems.map((variantImport) => {


                                                                                        // {
                                                                                        if (variantImport.quantity != 0)
                                                                                            return (
                                                                                                <Box>{variantImport.quantity} x {variantImport.name}</Box>
                                                                                            )

                                                                                        // } 


                                                                                    })
                                                                                }
                                                                            </Box>
                                                                        </Box> : null
                                                                    : null
                                                            }


                                                        </TimelineContent>
                                                    </TimelineItem>
                                                )
                                            }) : null
                                        }

                                    </Timeline>
                                </Box> : null
                        }
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
                                    {expectedTime}
                                </Box>
                            </Box>
                            <Box className="note">
                                <Box className="title">Ghi ch??</Box>
                                <Box sx={{ paddingLeft: "20px" }}>{description}</Box>
                            </Box>

                        </Box>
                    </Box>
                </Box>

                {/* </Grid> */}
            </Box>
        </div>

    );
}