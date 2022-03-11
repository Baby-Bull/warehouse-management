import MuiAlert from '@mui/material/Alert';
import { ArrowBackIosNew } from "@mui/icons-material";
import { Button, Divider, TextField, Snackbar, Typography, Grid, Box } from '@mui/material';
import React, { useRef, useState } from 'react';
import "./createSupplier.scss"
import { useHistory } from 'react-router-dom';
import SupplierAPI from '../../api/SupplierAPI';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export default function CreateSupplier({ setStateAlert }) {

    const code = useRef("");
    const name = useRef("");
    const address = useRef("");
    const phone = useRef("");
    const email = useRef("");
    const website = useRef("");
    const description = useRef("");
    const fax = useRef("");
    const debt = useRef(0);

    const history = useHistory();

    const handleCreate = async (e) => {
        e.preventDefault();
        const supplier = {
            code: code.current.value,
            name: name.current.value,
            address: address.current.value,
            phone: phone.current.value,
            email: email.current.value,
            website: website.current.value,
            description: description.current.value,
            fax: fax.current.value,
            debt: debt.current.value
        }
        try {
            const res = await SupplierAPI.createSupplier(supplier);
            setStateAlert({ severity: "success", variant: "filled", open: true, content: "Đã tạo mới nhà cung cấp thành công" })
            history.push("/nha-cung-cap");
        } catch (error) {
            setStateAlert({ severity: "error", variant: "filled", open: true, content: error.response.data })
        }
    }

    const [NameStaff, setNameStaff] = useState("");
    const [time, setTime] = useState(new Date());
    const handleChangeStaff = (event) => {
        setNameStaff(event.target.value);
    };


    // const [stateAlert, setStateAlert] = useState({ severity: "", variant: "", open: false, content: "" });
    //const [openAlertSuccess, setOpenAlertSuccess] = React.useState(false);

    return (
        <div className='createSupplier_page'>
            <div className="createSupplier_content">
                <div className="navig">
                    <Typography
                        underline="none"
                        onClick={() => history.push("/nha-cung-cap")}
                        sx={{
                            display: 'flex',
                            '&:hover': {
                                cursor: 'pointer',
                            }
                        }}
                    >
                        <ArrowBackIosNew sx={{ mr: 2 }} />
                        Quay lại trang trước
                    </Typography>
                </div>
                <Typography sx={{ margin: " 1em 0em -1.5em 1em" }} variant="h4">Tạo mới nhà cung cấp</Typography>
                <div className="activity">
                    <Button onClick={() => history.push("/nha-cung-cap")} className="button_activity" variant="outlined">Thoát</Button>
                    <Button onClick={handleCreate} className="button_activity" variant="contained"> Lưu kết quả</Button>
                </div>
                <div className="createSupplier_form">
                    <div className="left_info">
                        <div className="left_info_first">
                            <Typography variant="h6" id="tableTitle" px={1}>
                                Thông tin chung
                            </Typography>
                            <Divider sx={{ my: 1 }} />
                            <Box display="flex" px={1} py={2}>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <Box display="flex">
                                            <Typography variant="subtitle1" id="tableTitle">
                                                Tên nhà cung cấp
                                            </Typography>
                                        </Box>
                                        <TextField
                                            fullWidth
                                            name="productName"
                                            placeholder="Nhập tên nhà cung cấp"
                                            inputRef={name}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Box display="flex">
                                            <Typography variant="subtitle1" id="tableTitle">
                                                Mã nhà cung cấp
                                            </Typography>
                                        </Box>
                                        <TextField
                                            fullWidth
                                            name="unit"
                                            placeholder="Nhập mã nhà cung cấp"
                                            inputRef={code}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Box display="flex">
                                            <Typography variant="subtitle1" id="tableTitle">
                                                Số điện thoại
                                            </Typography>
                                        </Box>
                                        <TextField
                                            inputRef={phone}
                                            fullWidth
                                            name="unit"
                                            placeholder="Nhập số điện thoại"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Box display="flex">
                                            <Typography variant="subtitle1" id="tableTitle">
                                                Email
                                            </Typography>
                                        </Box>
                                        <TextField
                                            inputRef={email}
                                            fullWidth
                                            name="unit"
                                            placeholder="Nhập email"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Box display="flex">
                                            <Typography variant="subtitle1" id="tableTitle">
                                                Địa chỉ nhà cung cấp
                                            </Typography>
                                        </Box>
                                        <TextField
                                            inputRef={address}
                                            fullWidth
                                            name="unit"
                                            placeholder="Nhập địa chỉ"
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                        </div>
                        <div className="left_info_first second">
                            <Typography variant="h6" id="tableTitle" px={1}>
                                Thông tin bổ sung
                            </Typography>
                            <Divider sx={{ my: 1 }} />
                            <Box display="flex" px={1} py={2}>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <Box display="flex">
                                            <Typography variant="subtitle1" id="tableTitle">
                                                Số fax
                                            </Typography>
                                        </Box>
                                        <TextField
                                            fullWidth
                                            name="productName"
                                            placeholder="Nhập số fax"
                                            inputRef={fax}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Box display="flex">
                                            <Typography variant="subtitle1" id="tableTitle">
                                                Website
                                            </Typography>
                                        </Box>
                                        <TextField
                                            fullWidth
                                            name="unit"
                                            placeholder="Nhập website"
                                            inputRef={website}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Box display="flex">
                                            <Typography variant="subtitle1" id="tableTitle">
                                                Mô tả
                                            </Typography>
                                        </Box>
                                        <TextField
                                            inputRef={description}
                                            fullWidth
                                            name="unit"
                                            placeholder="Nhập mô tả"
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
