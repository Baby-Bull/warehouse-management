import { Button, Grid, Modal, TextareaAutosize, TextField } from '@mui/material'
import React, { useRef, useState } from 'react'
import "./detailSupplier.scss"
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { DebtTable, HistoryOrderTable } from '../../components/table/TableDetailSupplier';
import { ArrowBackIosNew } from "@mui/icons-material";
import SupplierAPI from '../../api/SupplierAPI';
import { useHistory } from 'react-router-dom';
import UnlockAccess from '../../components/roleBasedRender/UnlockAccess'


const style = {
    textAlign: "center",
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


//tab panel
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};
function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}// end tab panel

// function set color status supplier ***********************/
const handleColor = (key) => {
    switch (key) {
        case "Ngừng hợp tác":
            return "red";

        case "Đang hợp tác":
            return "#1ec709";

        default:
            return "black";
    }
}


/////////////////////////////////////////////////////////////////////////////main func /////////////////////////////////////////////
export default function DetailSupplier({ setStateAlert }) {
    const history = useHistory();

    // const [stateAlert, setStateAlert] = useState({ severity: "", variant: "", open: false, content: "" });

    //open and close Modal
    const [openModal, setOpenModal] = React.useState(false);
    const handleOpenModal = (string) => {
        setModeModal(string)
        setOpenModal(true);
    }
    const handleCloseModal = () => setOpenModal(false);

    //set mode modal ==> delete or edit
    const [modeModal, setModeModal] = useState("")

    //get info supplier
    const searchParam = window.location.search.replace("?id=", "");
    const [trigger, setTrigger] = useState(false); // trigger to re-render supplier's info
    const [supplier, setSupplier] = React.useState({});
    React.useEffect(() => {
        const fetchSupplier = async () => {
            const res = await SupplierAPI.supplierItem(searchParam);
            setSupplier(res.data);
            setCodeSupplier(res.data.code);
            setNameSupplier(res.data.name);
            setAddressSupplier(res.data.address);
            setPhoneSupplier(res.data.phone);
            setEmailSupplier(res.data.email);
            setWebsiteSupplier(res.data.website);
            setFaxSupplier(res.data.fax);
            setDescriptionSupplier(res.data.description);
        }
        fetchSupplier();
    }, [trigger])// end get supplier


    //delete supplier
    const handleDeleteSupplier = async () => {
        try {
            await SupplierAPI.deleteSupplier(searchParam);
            setStateAlert({ severity: "info", variant: "filled", open: true, content: "Đã xóa nhà cung cấp thành công" })
            setTrigger(!trigger);
            handleCloseModal();
            history.push("/nha-cung-cap");
        } catch (error) {
            setStateAlert({ severity: "error", variant: "filled", open: true, content: error.response.data })
        }
    }

    // edit supplier
    const [codeSupplier, setCodeSupplier] = React.useState(supplier?.code);
    const [nameSupplier, setNameSupplier] = React.useState(supplier.name);
    const [addressSupplier, setAddressSupplier] = React.useState(supplier?.address);
    const [phoneSupplier, setPhoneSupplier] = React.useState(supplier?.phone);
    const [emailSupplier, setEmailSupplier] = React.useState(supplier?.email);
    const [websiteSupplier, setWebsiteSupplier] = React.useState(supplier?.website);
    const [faxSupplier, setFaxSupplier] = React.useState(supplier?.fax);
    const [descriptionSupplier, setDescriptionSupplier] = React.useState(supplier?.description);
    const activityStatus = useRef(supplier?.activityStatus);
    const recordStatus = useRef(supplier?.recordStatus);
    const handleEditSupplier = async () => {
        try {
            const currentSupplier = {
                name: nameSupplier,
                code: codeSupplier,
                address: addressSupplier,
                phone: phoneSupplier,
                email: emailSupplier,
                website: websiteSupplier,
                fax: faxSupplier
            }
            await SupplierAPI.updateSupplier(searchParam, currentSupplier);
            setStateAlert({ severity: "success", variant: "filled", open: true, content: "Bạn đã cập nhật mới nhà cung cấp" })
            setTrigger(!trigger);
            handleCloseModal();
        } catch (error) {
            setStateAlert({ severity: "error", variant: "filled", open: true, content: error.response.data })
            console.log(error);
        }
    }


    //get orders by supplier
    const [historyOrders, setHistoryOrders] = React.useState([])
    React.useEffect(() => {
        const fetchHistoryOrder = async () => {
            const res = await SupplierAPI.ordersBySupplier(searchParam);
            setHistoryOrders(res.data);
        }
        fetchHistoryOrder();
    }, [searchParam])



    // set value tab panel 
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (
        <div className="detail_supplier_page">
            <div className="detail_supplier_content">
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
                <div className="activity">
                    <Button className="button_activity" variant="outlined"><i className="far fa-question-circle"></i> <span>Trợ giúp</span> </Button>
                </div>
                <div style={{ marginTop: "-4em" }} className="tagname_supplier">
                    <h2 style={{ fontSize: "2em" }}>{supplier.name}</h2>
                </div>
                <div className="info_supplier">
                    <div className="first_info">
                        <div className="first_info_upper">
                            <Grid className="upper_items" container spacing={2}>
                                <Grid className="upper_item" item xs={4}>
                                    Thông tin nhà cung cấp
                                </Grid>
                                <Grid className="upper_item" item xs={4}>
                                    <p style={{ color: handleColor(supplier.activityStatus) }}>{supplier.activityStatus}</p>
                                </Grid>
                                <UnlockAccess request={['ADMIN', 'Nhân viên kho']}>
                                    <Grid className="upper_item" item xs={4}>
                                        <Button color="error" onClick={() => handleOpenModal("delete")} variant="outlined">
                                            Xóa
                                        </Button>&emsp;
                                        <Button onClick={() => handleOpenModal("edit")} variant="contained">
                                            Chỉnh sửa
                                        </Button>
                                    </Grid>
                                </UnlockAccess>
                            </Grid>

                        </div>
                        <hr style={{ opacity: "0.3" }} />
                        <div className="first_info_under">
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <ul style={{ listStyle: "none" }}>
                                        <li><strong>Tên nhà cung cấp: </strong>{supplier.name}
                                        </li>
                                        <li><strong>Mã nhà cung cấp: </strong>{supplier.code}
                                        </li>
                                        <li> <strong>Số điện thoại: </strong>{supplier.phone}
                                        </li>
                                    </ul>
                                </Grid>
                                <Grid item xs={6}>
                                    <ul style={{ listStyle: "none" }}>
                                        <li><strong>Email: </strong>{supplier.email}
                                        </li>
                                        <li><strong>Số Fax: </strong>{supplier.fax}
                                        </li>
                                        <li><strong>Địa chỉ: </strong>{supplier.address}
                                        </li>
                                    </ul>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                    <div className="first_info second_info">
                        <div style={{ paddingBottom: "1em" }}>
                            <strong>Thông tin bổ sung</strong>
                        </div>
                        <Box
                            sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: "100%" }}
                        >
                            <Tabs
                                orientation="vertical"
                                variant="scrollable"
                                value={value}
                                onChange={handleChange}
                                aria-label="Vertical tabs example"
                                sx={{ borderRight: 1, borderColor: 'divider' }}
                            >
                                <Tab label="Lịch sử nhập hàng" {...a11yProps(0)} />
                                <Tab label="Công nợ" {...a11yProps(1)} />
                                <Tab label="Ghi chú" {...a11yProps(2)} />
                            </Tabs>
                            <TabPanel style={{ width: "100%" }} value={value} index={0}>
                                {(historyOrders.length == 0) ? <h3 className='empty_content'>Chưa có thông tin</h3> : <HistoryOrderTable ordersBySupplier={historyOrders} />}
                            </TabPanel>
                            <TabPanel style={{ width: "100%" }} value={value} index={1}>
                                {(historyOrders.length == 0) ? <h3 className='empty_content'>Chưa có thông tin</h3> : <DebtTable ordersBySupplier={historyOrders} />}
                            </TabPanel>
                            <TabPanel value={value} index={2}>
                                <TextareaAutosize
                                    disabled
                                    aria-label="minimum height"
                                    minRows={10}
                                    value={supplier.description}
                                    style={{ width: "60vw", paddingTop: "1em", paddingLeft: "1em" }}
                                />
                            </TabPanel>
                        </Box>
                    </div>
                </div>
            </div>
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                {(modeModal == "delete") ?
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Bạn xác nhận xóa nhà cung cấp này
                        </Typography><br />
                        <Button onClick={handleCloseModal} variant="contained">Quay lai</Button>&emsp;&emsp;
                        <Button onClick={handleDeleteSupplier} color="error" variant="contained">Xoa</Button>
                    </Box>
                    :
                    <Box sx={{
                        textAlign: "center",
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: "80%",
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4,
                    }}>
                        <div className="createSupplier_form">
                            <div className="left_info">
                                <div className="left_info_first">
                                    <div>
                                        <strong style={{ width: "100%" }}>Thông tin cơ bản</strong>
                                    </div>
                                    <TextField key={1} value={nameSupplier} type="text" onChange={(e) => setNameSupplier(e.target.value)} className="left_info_first_input" required id="outlined-required" label="Tên nhà cung cấp" />
                                    <TextField key={2} value={codeSupplier} type="text" onChange={(e) => setCodeSupplier(e.target.value)} className="left_info_first_input left" required id="outlined-required" label="Mã nhà cung cấp" />
                                    <TextField key={3} value={phoneSupplier} type="text" onChange={(e) => setPhoneSupplier(e.target.value)} className="left_info_first_input" required id="outlined-required" label="Số điện thoại" />
                                    <TextField key={4} value={emailSupplier} type="text" onChange={(e) => setEmailSupplier(e.target.value)} className="left_info_first_input left" required id="outlined-required" label="Email" />
                                    <TextField key={5} value={addressSupplier} type="text" onChange={(e) => setAddressSupplier(e.target.value)} className="left_info_first_input address" id="outlined-required" label="Địa chỉ" />
                                </div>
                                <div className="left_info_first second">
                                    <div>
                                        <strong style={{ width: "100%" }}>Thông tin bổ sung</strong>
                                    </div>
                                    <TextField key={6} value={faxSupplier} type="text" onChange={(e) => setFaxSupplier(e.target.value)} className="left_info_first_input" id="outlined-required" label="Số Fax" />
                                    <TextField key={7} value={websiteSupplier} type="text" onChange={(e) => setWebsiteSupplier(e.target.value)} className="left_info_first_input left" id="outlined-required" label="Website" />
                                    <TextField className="left_info_first_input" id="outlined-required" label="Mã số thuế" />
                                    <TextField key={8} value={descriptionSupplier} type="text" onChange={(e) => setDescriptionSupplier(e.target.value)} className="left_info_first_input address" id="outlined-required" label="Mô tả nhà cung cấp" />
                                </div>
                            </div>
                            <div className="activity">
                                <Button onClick={handleEditSupplier} variant="contained">Xác nhận</Button>&emsp;&emsp;
                                <Button onClick={handleCloseModal} color="error" variant="contained">Hủy bỏ</Button>
                            </div>
                        </div>
                    </Box>
                }
            </Modal>
            {/* <Snackbar open={stateAlert.open} autoHideDuration={3000} onClose={() => setStateAlert({ ...stateAlert, open: false })}>
                <Alert onClose={() => setStateAlert({ ...stateAlert, open: false })} severity={stateAlert.severity} variant={stateAlert.variant} sx={{ width: '100%' }}>
                    {stateAlert.content}
                </Alert>
            </Snackbar> */}
        </div >
    )
}
