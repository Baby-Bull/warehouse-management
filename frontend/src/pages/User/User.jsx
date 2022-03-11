import React from 'react'
import { Grid, Box, Radio, Snackbar, Alert, IconButton, RadioGroup, Paper, FormControlLabel, TextField, Avatar, Button, Modal, Input, TableContainer, Table, TableCell, TablePagination, TableRow, TableHead, TableBody } from '@mui/material';
import { styled } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import MailIcon from '@mui/icons-material/Mail';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import BrowserUpdatedIcon from '@mui/icons-material/BrowserUpdated';
import EditIcon from '@mui/icons-material/Edit';
import { AddCircle } from '@mui/icons-material';
import UsersApi from '../../api/UsersApi';
import { Link, useHistory } from "react-router-dom";


const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


const columns = [
    { id: 'Id nhân viên', label: 'Id nhân viên' },
    { id: 'Tên nhân viên', label: 'Tên nhân viên' },
    { id: 'role', label: 'Vai trò nhân viên' },
    { id: 'email', label: 'Email nhân viên' },
    { id: 'activity ', label: 'Thao tac' },
];

const checkRole = (JSON.parse(sessionStorage.getItem("token"))?.role[0].name === "ADMIN");

export default function User() {
    const history = useHistory();

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };



    //set mode modal ==> delete or edit
    const [modeModal, setModeModal] = React.useState("")
    //open and close Modal
    const [openModal, setOpenModal] = React.useState(false);
    const handleOpenModal = (string) => {
        setModeModal(string)
        setOpenModal(true);
    }
    const handleCloseModal = () => setOpenModal(false);

    // get all users********************************//
    const [trigger, setTrigger] = React.useState(false); // trigger to re-render users
    const [listUsers, setListUsers] = React.useState([]);
    React.useEffect(() => {
        const fetchListUsers = async () => {
            const res = await UsersApi.getAllUsers();
            setListUsers(res.data);
        }
        fetchListUsers();
    }, [trigger])

    // get an user********************************//
    const [trigger2, setTrigger2] = React.useState(false);
    const [currentUser, setCurrentUser] = React.useState({});
    React.useEffect(() => {
        const fetchCurrentUser = async () => {
            const res = await UsersApi.getUserById(window.location.search.replace("?id=", "") ? window.location.search.replace("?id=", "") : JSON.parse(sessionStorage.getItem("token"))?.id);
            setCurrentUser(res.data);
            setEditUserRole(res.data.role);
            setEditUsername(res.data.username);
            setEditUserEmail(res.data.email);
        }
        fetchCurrentUser();
    }, [trigger2, trigger])

    const [stateAlert, setStateAlert] = React.useState({ severity: "", variant: "", open: false, content: "" });
    // create an user******************************************//
    const [newUserRole, setNewUserRole] = React.useState()
    const [newUsername, setNewUsername] = React.useState()
    const [newUserPassword, setNewUserPassword] = React.useState()
    const [newUserPasswordAgain, setNewUserPasswordAgain] = React.useState()
    const [newUserEmail, setNewUserEmail] = React.useState()
    const createNewUserHandle = async (e) => {
        e.preventDefault();
        const newUser = {
            username: newUsername,
            email: newUserEmail,
            password: newUserPassword,
            role: newUserRole
        }
        if (newUsername === "" || newUserEmail === "" || newUserPassword === "") {
            setStateAlert({ severity: "error", variant: "standard", open: true, content: "Yêu cầu điền tên đăng ký, email và mật khẩu" })
        } else {
            if (newUserPassword !== newUserPasswordAgain) {
                setStateAlert({ severity: "error", variant: "filled", open: true, content: "Mật khẩu và xác nhận mật khẩu không khớp" })
            } else {
                try {
                    await UsersApi.createUserStaff(newUser);
                    setTrigger(!trigger);
                    setStateAlert({ severity: "success", variant: "filled", open: true, content: "Tạo nhân viên thành công" })
                    setOpenModal(false);
                } catch (error) {
                    setStateAlert({ severity: "error", variant: "filled", open: true, content: error.response.data })
                }
            }

        }
    }

    //delete user 
    const deleteAnUser = async (id) => {
        await UsersApi.deleteUserStaff(id);
        setTrigger(!trigger);
        setStateAlert({ severity: "success", variant: "filled", open: true, content: "Đã xóa người dùng này" })
        setOpenModal(false);
    }

    // edit an user 

    const [editUserRole, setEditUserRole] = React.useState([])
    const [editUsername, setEditUsername] = React.useState(currentUser.username)
    const [editUserEmail, setEditUserEmail] = React.useState(currentUser.email)
    const [editUserPassword, setEditUserPassword] = React.useState()
    const editAnUser = async () => {
        const user = {
            username: editUsername,
            email: editUserEmail,
            password: editUserPassword,
            role: editUserRole
        }
        console.log(user);
        try {
            await UsersApi.updateUserStaff(currentUser.id, user)
            setTrigger(!trigger);
            setStateAlert({ severity: "success", variant: "filled", open: true, content: "Đã chinh sua người dùng này" })
            setOpenModal(false);
        } catch (error) {
            setStateAlert({ severity: "error", variant: "filled", open: true, content: error.response.data })
        }
    }


    return (
        <div style={{ background: "#F4F6F8", padding: "0 2em 1em 0", height: "100%" }}>
            <Grid sx={{ textAlign: "end" }}>
                {checkRole && <Button onClick={() => handleOpenModal("create")} variant="contained" sx={{ marginTop: "2em" }} startIcon={<AddCircle />}>Thêm nhân viên</Button>}
            </Grid>
            <Box sx={{ flexGrow: 1, margin: 0, backGround: "white" }}>
                <Grid sx={{ margin: 0 }} container spacing={2}>
                    <Grid item xs={4}>
                        <Item>
                            <Avatar
                                alt="Remy Sharp"
                                src="https://datdainhacua.vn/images/icons/noUser.png?width=160"
                                sx={{ width: "14em", height: "14em", margin: "auto", opacity: "0.5" }}
                            />
                            <Button sx={{ fontSize: "0.8em", textTransform: 'capitalize', margin: "0.5em 0 2em 0" }} variant="outlined">Thay ảnh</Button>
                            <h3><strong style={{ fontSize: "1.5em" }}>{currentUser.roles?.map((role) => (role.name))}</strong></h3>
                        </Item>
                    </Grid>
                    <Grid item xs={8}>
                        <Item sx={{ padding: "2em 0" }}>
                            <Grid sx={{ display: "flex", textAlign: "left", padding: "1em 2em", alignItems: "center" }}>
                                <Grid item xs={5} >
                                    <PersonIcon sx={{ margin: "0 1em -0.2em 0" }} /> <strong  >Họ và tên</strong>
                                </Grid>
                                <Grid item xs={7} >
                                    {currentUser.username}
                                </Grid>
                            </Grid>
                            <Grid sx={{ display: "flex", textAlign: "left", padding: "1em 2em", alignItems: "center" }}>
                                <Grid item xs={5} >
                                    <InfoIcon sx={{ margin: "0 1em -0.2em 0" }} /> <strong  >Id nhân viên</strong>
                                </Grid>
                                <Grid item xs={7} >
                                    {currentUser.id}
                                </Grid>
                            </Grid>
                            <Grid sx={{ display: "flex", textAlign: "left", padding: "1em 2em", alignItems: "center" }}>
                                <Grid item xs={5} >
                                    <MailIcon sx={{ margin: "0 1em -0.2em 0" }} /> <strong  >Email</strong>
                                </Grid>
                                <Grid item xs={7} >
                                    {currentUser.email}
                                </Grid>
                            </Grid>
                            <Grid sx={{ display: "flex", textAlign: "left", padding: "1em 2em", alignItems: "center" }}>
                                <Grid item xs={5} >
                                    <LeaderboardIcon sx={{ margin: "0 1em -0.2em 0" }} /> <strong  >Vai trò</strong>
                                </Grid>
                                <Grid item xs={7} >
                                    {currentUser.roles?.map((role) => (role.name))}
                                </Grid>
                            </Grid>
                            {checkRole && <Grid sx={{ textAlign: "end", paddingTop: "2.4em" }}>
                                <Button
                                    onClick={() => {
                                        handleOpenModal("update")
                                    }
                                    }
                                    variant="outlined"
                                    startIcon={<BrowserUpdatedIcon />}
                                    sx={{ fontSize: "0.8em", textTransform: 'capitalize', margin: "0.5em 2em 2em 0" }}>
                                    Chỉnh sửa thông tin
                                </Button>
                            </Grid>}
                        </Item>
                    </Grid>
                </Grid>
            </Box >
            {checkRole &&
                <Grid sx={{ padding: "4em 0em 1em 1em" }}>
                    <h3 style={{ marginBottom: "1em" }}><strong style={{ fontSize: "1.5em" }}>Thông tin nhân viên đang hoạt động</strong></h3>
                    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                        <TableContainer sx={{ padding: "0 0 0 2em", maxHeight: 440 }}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                align="left"
                                            >
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {listUsers
                                        .reverse()
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row) => {
                                            return (
                                                <TableRow>
                                                    <TableCell align="left">{row.id} </TableCell>
                                                    <TableCell
                                                        sx={{ cursor: "pointer" }}
                                                        onClick={() => {
                                                            history.push("/nguoi-dung?id=" + row.id);
                                                            setTrigger2(!trigger2);
                                                        }}
                                                        align="left">
                                                        {row.username}
                                                    </TableCell>
                                                    <TableCell align="left">{row.roles?.map((r) => (r.name))} </TableCell>
                                                    <TableCell align="left">{row.email} </TableCell>
                                                    <TableCell align="left">
                                                        <IconButton onClick={() => deleteAnUser(row.id)} aria-label="delete">
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            labelRowsPerPage="Số hàng một trang"
                            rowsPerPageOptions={[10, 20, 50]}
                            component="div"
                            count={listUsers.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>
                </Grid>
            }
            {
                (modeModal === "update") ?
                    <Modal
                        open={openModal}
                        onClose={handleCloseModal}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        sx={{ margin: 0, padding: "6em", textAlign: "center" }}
                    >
                        <Box sx={{ flexGrow: 1, margin: "auto", background: "white", width: "60vw" }}>
                            <Grid sx={{ margin: 0, display: "grid", padding: "3em", textAlign: "center " }} container spacing={2}>
                                <h3><strong style={{ fontSize: "1.5em" }} >Thay đổi thông tin nhân viên</strong></h3>
                                <Grid sx={{ display: "flex", textAlign: "left", padding: "1em 2em", alignItems: "center" }}>
                                    <Grid item xs={5} >
                                        <PersonIcon sx={{ margin: "0 1em -0.2em 0" }} /> <strong >Họ và tên</strong>
                                    </Grid>
                                    <Grid item xs={7} >
                                        <TextField key={1} defaultValue={currentUser.username} onChange={(e) => setEditUsername(e.target.value)} sx={{ width: "90%" }} />
                                    </Grid>
                                </Grid>
                                <Grid sx={{ display: "flex", textAlign: "left", padding: "1em 2em", alignItems: "center" }}>
                                    <Grid item xs={5} >
                                        <InfoIcon sx={{ margin: "0 1em -0.2em 0" }} /> <strong  >Id nhân viên</strong>
                                    </Grid>
                                    <Grid item xs={7} >
                                        <TextField key={3} disabled sx={{ width: "90%" }} defaultValue={currentUser.id} />
                                    </Grid>
                                </Grid>
                                <Grid sx={{ display: "flex", textAlign: "left", padding: "1em 2em", alignItems: "center" }}>
                                    <Grid item xs={5} >
                                        <MailIcon sx={{ margin: "0 1em -0.2em 0" }} /> <strong  >Email</strong>
                                    </Grid>
                                    <Grid item xs={7} >
                                        <TextField key={2} onChange={(e) => setEditUserEmail(e.target.value)} sx={{ width: "90%" }} defaultValue={currentUser.email} />
                                    </Grid>
                                </Grid>
                                <Grid sx={{ display: "flex", textAlign: "left", padding: "1em 2em", alignItems: "center" }}>
                                    <Grid item xs={5} >
                                        <MailIcon sx={{ margin: "0 1em -0.2em 0" }} /> <strong  >Mật khẩu</strong>
                                    </Grid>
                                    <Grid item xs={7} >
                                        <TextField key={4} onChange={(e) => setEditUserPassword(e.target.value)} sx={{ width: "90%" }} />
                                    </Grid>
                                </Grid>
                                <Grid sx={{ display: "flex", textAlign: "left", padding: "1em 2em", alignItems: "center" }}>
                                    <Grid item xs={5} >
                                        <LeaderboardIcon sx={{ margin: "0 1em -0.2em 0" }} /> <strong  >Vai trò</strong>
                                    </Grid>
                                    <RadioGroup
                                        onChange={(e) => setEditUserRole([{ "name": e.target.value }])}
                                        aria-label="gender"
                                        defaultValue={currentUser.roles[0].name}
                                        name="radio-buttons-group"
                                        sx={{ marginLeft: "4em", display: "inline-block", alignItems: "center" }}
                                    >
                                        <FormControlLabel value="ADMIN" control={<Radio />} label="Admin" />
                                        <FormControlLabel value="Nhân viên kho" control={<Radio />} label="Nhân viên kho" />
                                        <FormControlLabel value="Kế toán" control={<Radio />} label="Kế toán" />
                                    </RadioGroup>
                                </Grid>
                                <Grid sx={{ textAlign: "end", paddingTop: "2.4em" }}>
                                    <Button onClick={() => editAnUser()} variant="outlined" color="success" sx={{ fontSize: "0.8em", textTransform: 'capitalize', margin: "0.5em 0 2em 0" }}>Lưu thay đổi</Button>
                                    <Button onClick={() => setOpenModal(false)} variant="outlined" color="error" sx={{ fontSize: "0.8em", textTransform: 'capitalize', margin: "0.5em 2em 2em 2em" }}>Quay lại</Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Modal>
                    :
                    <Modal
                        open={openModal}
                        onClose={handleCloseModal}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        sx={{ margin: 0, padding: "6em", textAlign: "center" }}
                    >
                        <Box sx={{ margin: "auto", background: "white", width: "50%", padding: "2em 3em" }}>
                            <h3><strong style={{ fontSize: "1.5em" }} >Tạo mới nhân viên</strong></h3>
                            <TextField
                                onChange={(e) => setNewUsername(e.target.value)}
                                required
                                id="outlined-required"
                                label="Tên đăng nhập nhân viên"
                                sx={{ margin: "1em 0", width: "100%" }}
                            />
                            <TextField
                                onChange={(e) => setNewUserEmail(e.target.value)}
                                required
                                id="outlined-required"
                                label="Email nhân viên"
                                sx={{ margin: "1em 0", width: "100%" }}
                            />
                            <TextField
                                onChange={(e) => setNewUserPassword(e.target.value)}
                                required
                                id="outlined-required"
                                label="Mật khẩu"
                                sx={{ margin: "1em 0", width: "100%" }}
                            />
                            <TextField
                                onChange={(e) => setNewUserPasswordAgain(e.target.value)}
                                required
                                id="outlined-required"
                                label="Nhập lại mật khẩu"
                                sx={{ margin: "1em 0", width: "100%" }}
                            />
                            <Grid sx={{ display: "flex", alignItems: "center" }}>
                                <h3><strong>Chọn vai trò của nhân viên</strong></h3>
                                <RadioGroup
                                    onChange={(e) => setNewUserRole(e.target.value)}
                                    aria-label="gender"
                                    name="radio-buttons-group"
                                    sx={{ marginLeft: "4em", display: "inline-block", alignItems: "center" }}
                                >
                                    <FormControlLabel value="Nhân viên kho" control={<Radio />} label="Nhân viên kho" />
                                    <FormControlLabel value="Kế toán" control={<Radio />} label="Kế toán" />
                                </RadioGroup>
                            </Grid>
                            <Grid sx={{ textAlign: "end", paddingTop: "2.4em" }}>
                                <Button onClick={createNewUserHandle} variant="outlined" sx={{ fontSize: "0.8em", textTransform: 'capitalize', margin: "0.5em 0 2em 0" }}>Xac nhan</Button>
                                <Button onClick={() => setOpenModal(false)} variant="outlined" color="error" sx={{ fontSize: "0.8em", textTransform: 'capitalize', margin: "0.5em 2em 2em 2em" }}>Quay lại</Button>
                            </Grid>
                        </Box>
                    </Modal>
            }
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={stateAlert.open}
                autoHideDuration={2000}
                onClose={() => setStateAlert({ ...stateAlert, open: false })}
            >
                <Alert
                    onClose={() => setStateAlert({ ...stateAlert, open: false })}
                    severity={stateAlert.severity}
                    variant={stateAlert.variant}
                    sx={{ width: '100%' }}
                >
                    {stateAlert.content}
                </Alert>
            </Snackbar>
        </div >
    )
}
