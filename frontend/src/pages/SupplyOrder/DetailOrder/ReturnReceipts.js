import * as React from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Button from '@mui/material/Button';
import { makeStyles } from "@material-ui/core/styles";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';


import Modal from '@mui/material/Modal';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory
} from "react-router-dom";


import './ReturnReceipts.scss';
import OrderAPI from "../../../api/OrderAPI";
import ReturnReceiptsAPI from "../../../api/ReturnReceiptsAPI";






export default function ReturnReceipts({ setStateAlert }) {


    const idOrder = window.location.search.replace("?id=", "");
    const [order, setOrder] = React.useState();
    const [variantOrder, setVariantOrder] = React.useState([]);
    const [reason, setReason] = React.useState("");

    const [num, setNum] = React.useState([]);

    const [totalNum, setTotalNum] = React.useState("");
    const [totalProduct, setTotalProduct] = React.useState("");
    const [totalAmountReturn, setTotalAmountReturn] = React.useState("");

    const history = useHistory();


    const handleNumReturn = async (list) => {
        setNum(
            list.reduce(
                (obj, product) => ({ ...obj, [product.variant.id]: 0 }),
                {}
            )
        )

    }

    const SubmitReturn = async () => {
        let lineItems = [];
        variantOrder.map((item) => {
            let dataTmp = {};
            dataTmp["variantId"] = item.variant.id;
            dataTmp["quantity"] = Number(num[item.variant.id]);
            lineItems.push(dataTmp);
        });
        let data = {
            note: reason,
            lineItems: lineItems
        }

        try {
            await ReturnReceiptsAPI.Return(idOrder, data);
            setStateAlert({
                severity: "success",
                variant: "filled",
                open: true,
                content: "???? ho??n tr??? ????n h??ng th??nh c??ng",
              });
            history.goBack();
        } catch (err) {
            setStateAlert({
                severity: "error",
                variant: "filled",
                open: true,
                content: err.response.data,
            });
        }
    }

    React.useEffect(() => {
        let tmp = 0;
        let totalTmp = 0;
        variantOrder.map((item) => {
            tmp += Number(num[item.variant.id]);
            totalTmp += Number(num[item.variant.id]) * Number(item?.price) * Number((100 - item?.order.discount) /100);
        });
        setTotalNum(tmp);
        setTotalAmountReturn(totalTmp);

    },[num])

    React.useEffect(() => {
        const getData = async () => {
            try {
                const orderRes = await OrderAPI.OrderItem(idOrder);
                const VariantOrdertRes = await OrderAPI.VariantOrder(idOrder);

                setOrder(orderRes.data);
                setVariantOrder(VariantOrdertRes.data);
                handleNumReturn(VariantOrdertRes.data);

            } catch (err) {
                console.log(err);
            }
        }
        getData()
    }, []);
    console.log(variantOrder);
    return (
        <Box py={2} px={5} sx={{ flexGrow: 1 , minHeight: "91vh"}} className="body">
            <Box className="header-return">
                <Box onClick={history.goBack}
                 sx={{display: "flex", cursor: "pointer"}}>
                    <ArrowBackIosIcon />
                    <Box>????n nh???p h??ng <span style={{fontWeight: 500}}>{order?.code}</span></Box>
                </Box>
                <Box mt={2} mb={4} >
                    <Typography sx={{fontSize: "22px", fontWeight: 600}}>T???o ho??n tr??? cho ????n nh???p {order?.code}</Typography>
                </Box>
            </Box>
            <Box className="body-content">
                <Box className="info-return" >
                    <Box >
                        <Box sx={{backgroundColor: "white", border: "1px solid #e4e4e4"}}  pt={2}>
                            <Typography ml={2} mb={2} sx={{fontWeight: 550, fontSize: "16px"}}>Th??ng tin s???n ph???m tr???</Typography>
                            <Box className="header-Product"
                             sx={{display: "flex", fontWeight: 550, backgroundColor: "#F4F6F8", border: "1px solid #e4e4e4", height: "35px", alignItems: "center"}}>
                                <div style={{ width: "10%", textAlign: "center" }}>M?? SKU</div>
                                <div style={{ width: "60%", float: "left", paddingLeft: "15px" }}>T??n s???n ph???m</div>
                                <div style={{ width: "10%", textAlign: "center" }}>S??? l?????ng</div>
                                <div style={{ width: "10%", textAlign: "center" }}>Gi?? tr??? h??ng</div>
                                <div style={{ width: "10%", textAlign: "center" }}>Th??nh ti???n</div>
                            </Box>
                            <List sx={{border: "1px solid #e4e4e4"}}>
                                {
                                    variantOrder?.map(item => {
                                        return (
                                            <ListItem className="product-item" sx={{paddingLeft: 0, border: "1px solid #e4e4e4"}}
                                            >
                                                <Typography sx={{ width: '10%', alignItems: "center", textAlign: "center" }}>{item?.variant.code}</Typography>
                                                <Typography sx={{ width: '60%', paddingLeft: "5px", fontWeight: 550 }} >{item?.variant.variantName}</Typography>
                                                <Box sx={{ width: '10%', textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center" }}><input type="text" style={{ width: '80%', height: 35 }} name="num" value={num[item.id.variantId]}
                                                    onChange={e =>
                                                        setNum({ ...num, [item.id.variantId]: e.target.value })}
                                                /></Box>
                                                <Box sx={{ width: '10%', textAlign: "center" }}>{item?.price}</Box>

                                                <Typography sx={{ width: '10%', textAlign: "center" }}>{(Number(num[item.id.variantId]) * item?.price)?.toLocaleString()}</Typography>
                                                
                                            </ListItem>
                                        )
                                    })
                                }
                            </List>
                            <Box sx={{marginLeft: "calc(100% - 280px)"}} mt={3} pr={2} pb={3}>
                                <Box sx={{display: "flex", justifyContent: "space-between"}} >
                                    <Typography sx={{fontWeight: 550}}>S??? l?????ng h??ng tr???:</Typography>
                                    <Typography>{totalNum}</Typography>
                                </Box>
                                <Box mt={2} sx={{display: "flex", justifyContent: "space-between"}}>
                                    <Typography sx={{fontWeight: 550}}>T???ng gi?? tr??? tr???:</Typography>
                                    <Typography>{Number(totalAmountReturn)?.toFixed(2)} vnd</Typography>
                                </Box>
                            </Box>

                        </Box>
                    </Box>
                </Box>
                <Box className="detail" >
                    <Box pl={2} pb={2} pt={2} sx={{backgroundColor: "white", border: "1px solid #e4e4e4"}}>
                        <Typography  sx={{fontWeight: 550}}>Nh?? cung c???p</Typography>
                        <Typography mt={2}>{order?.supplier.name}</Typography>
                    </Box>
                    <Box pl={2} mt={2} pb={2} pt={2} sx={{backgroundColor: "white", border: "1px solid #e4e4e4"}}>
                        <Typography sx={{fontWeight: 550}}>L?? do ho??n tr???</Typography>
                        <textarea onChange={(e) => setReason(e.target.value)} style={{marginTop: "16px", width: "95%", height: "50px"}}>{reason}</textarea>
                    </Box>
                    <Button variant="contained" className="btn-order"
                     sx={{position: "absolute", marginRight: "35px"}}
                         onClick={SubmitReturn}
                         >Ho??n tr???</Button>

                </Box>
            </Box>

        </Box>
    )
}