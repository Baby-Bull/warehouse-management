import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { makeStyles } from "@material-ui/core/styles";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import * as moment from 'moment';
import { useHistory } from "react-router-dom";

import './SupplyOrder.scss';
import SupplySelect from './supplySelect/SupplySelect';
import ProductSelect from './productSelect/ProductSelect';
import OrderAPI from '../../../api/OrderAPI';

export default function SupplyOrder({ setStateAlert }) {
    const [supplier, setSupplier] = React.useState();
    const code = React.useRef("");
    const [discount, setDiscountFinal] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [product, setProduct] = React.useState();
    const [date, setDate] = React.useState('');
    const history = useHistory();

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
        'Đặt hàng',
        'Nhập Kho',
        'Thanh toán',
    ];

    const SubmitOrder = async () => {
        let data = {
            orderCode: code.current.value,
            supplierId: supplier,
            description: description,
            deliveryTime: moment(date).format('YYYY-MM-DD'),
            discount: discount,
            lineItems: product
        };
        console.log(data);
        // try {
        OrderAPI.createOrder(data)
            .then(res => {
                setStateAlert({
                    severity: "success",
                    variant: "filled",
                    open: true,
                    content: "Đã tạo đơn hàng thành công",
                });
                history.push(`/nhap-hang/don-hang?code=${res.data.id}`);
            }).catch((err) => {
                setStateAlert({
                    severity: "error",
                    variant: "filled",
                    open: true,
                    content: err.response.data,
                });
            });

    }

    return (

        <div>
            <Box py={2} px={5} sx={{ flexGrow: 1, minHeight: "91vh" }} className="supplyOrder-main-content">
                <Box sx={{ width: "100%" }} className="navig">
                    <Box className="back" onClick={history.goBack}>
                        <ArrowBackIosIcon />
                        <Box>Đơn nhập hàng</Box>
                    </Box>
                    <Box sx={{ width: '35%' }} className="time-line">
                        <Stepper activeStep={0} alternativeLabel>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </Box>
                </Box>
                <Box className="activity-order" mt={2}>
                    <Box className="test"  >
                        <SupplySelect setSupplier={setSupplier} />
                        <ProductSelect setProduct={setProduct} setDiscountFinal={setDiscountFinal} />
                    </Box>
                    <Box sx={{ paddingLeft: "10px" }} className="more-info">
                        <Box className="more-info-detail-created">
                            <Box className="title">Thông tin bổ sung</Box>
                            <Box className="code-supply-order">
                                <Box className='title'>Mã đơn nhập hàng</Box>
                                <TextField inputRef={code} id="outlined-basic" className="info" variant="outlined" />
                            </Box>
                            <Box className="time-supply-order">
                                <Box className='title'>Ngày nhận hàng</Box>
                                <Box className="time">
                                    <LocalizationProvider dateAdapter={AdapterDateFns}  >
                                        <DatePicker
                                            // inputFormat="yyyy/MM/dd"
                                            value={date}

                                            onChange={(views) => {
                                                setDate(views);
                                            }}
                                            renderInput={(params) => <TextField {...params} placeholder="Ngày nhận" />}
                                        />
                                    </LocalizationProvider>
                                </Box>
                            </Box>
                            <Box className="note">
                                <Box className="title">Ghi chú</Box>
                                <textarea className="content-note" onChange={(e) => setDescription(e.target.value)}></textarea>
                            </Box>

                            <Box sx={{ padding: "3em 0em 0em 0em!important" }}>
                                <Button variant="contained" className="btn-order" onClick={SubmitOrder}>Đặt hàng
                                </Button>
                            </Box>

                        </Box>
                    </Box>
                </Box>

                {/* </Grid> */}
            </Box>
        </div>

    );
}