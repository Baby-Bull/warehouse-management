import * as React from 'react';
import { AppBar, Box, Toolbar, Button, Typography, Modal, Avatar, List, ListItem, ListItemIcon, ListItemText, ListItemButton, Collapse } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import MenuIcon from '@mui/icons-material/Menu';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import PhoneIcon from '@mui/icons-material/Phone';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import LogoutIcon from '@mui/icons-material/Logout';
import { AuthContext } from '../../contextAPI/AuthContext';
import HelpIcon from '@mui/icons-material/Help';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Link } from 'react-router-dom';
import useWindowDimensions from "../dimensions/Dimentions";
import "./topbar.scss";

const navList = [{ title: 'Sản phẩm', url: '/san-pham' }, { title: 'Quản lý kho', url: '/kho-hang' }, { title: 'Nhập hàng', url: '/nhap-hang' }, { title: 'Nhà cung cấp', url: '/nha-cung-cap' }];
const subMenuList = [{ title: 'Hotline:', url: '/hotline', phone: '1900 0000' }, { title: 'Thông tin tài khoản', url: '/nguoi-dung' }]
const navListIcons = [
    <LocalMallIcon />, <WarehouseIcon />, <AddShoppingCartIcon />, <AddBusinessIcon />
]
const userNavListIcons = [<PhoneIcon />, <ContactMailIcon />]

export default function Topbar({ headerTitle, setHeaderTitle }) {

    const { height, width } = useWindowDimensions();

    const { dispatch } = React.useContext(AuthContext);
    const handleClickLogout = () => {
        dispatch({ type: "LOGOUT" });
    }

    const [openModalMenu, setOpenModalMenu] = React.useState(false);
    const handleOpenModalMenu = () => setOpenModalMenu(true);
    const handleCloseModalMenu = () => setOpenModalMenu(false);

    const [openSubMenu, setopenSubMenu] = React.useState(false);
    const handleSubMenu = () => {
        setopenSubMenu(!openSubMenu);
    };

    return (
        <div>
            <Box sx={{ flexGrow: 1, background: "white" }}>
                <AppBar sx={{ background: "white", height: '100%' }} position="static">
                    <Toolbar>
                        <Typography className="title_topbar" >
                            {headerTitle}
                        </Typography>
                        <Box className='right_topbar' >
                            <Button className="right_topbar_button" variant="text">Trợ giúp
                                <HelpIcon className="button_icon" />
                            </Button>
                            <Button className="right_topbar_button" variant="text">Góp ý
                                <FavoriteBorderIcon className="button_icon" />
                            </Button>
                            {(width > 980) ?
                                <Link onClick={() => {
                                    setOpenModalMenu(false);
                                    setHeaderTitle("Thông tin người sử dụng");
                                }} to="/nguoi-dung">
                                    <Avatar src="" />
                                </Link> :
                                <Button sx={{ background: "#27274b", color: "white" }} onClick={handleOpenModalMenu}><MenuIcon fontSize='medium' /></Button>
                            }
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>
            {(width < 980) && <Modal
                open={openModalMenu}
                onClose={handleCloseModalMenu}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className='drawerMini'>
                    <Link onClick={() => {
                        setOpenModalMenu(false);
                        setHeaderTitle("Trang quản lý");
                    }} to="/trang-chu"><img style={{ width: "100%" }} className='logo_image' src="./images/logo.PNG" alt="" /></Link>
                    <List className="nav_leftbar">
                        {navList.map((navItem, index) => (
                            <Link to={navItem.url} className="nav_link" key={index}>
                                <ListItem className="nav_leftbar_item" button key={navItem.title} onClick={() => {
                                    setOpenModalMenu(false);
                                    setHeaderTitle(navItem.title);
                                }}>
                                    <ListItemIcon className="nav_item_icon">
                                        {navListIcons[index]}
                                    </ListItemIcon>
                                    <ListItemText primary={navItem.title} />
                                </ListItem>
                            </Link>
                        ))}

                        <ListItemButton onClick={handleSubMenu}>
                            <ListItemIcon>
                                <AccountCircleIcon sx={{ color: 'white' }} />
                            </ListItemIcon>
                            <ListItemText primary="Tài khoản" />
                            {openSubMenu ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={openSubMenu} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {subMenuList.map((navItem, index) => (
                                    <React.Fragment>
                                        {navItem.phone ?
                                            <ListItemButton className="nav_leftbar_item" button key={navItem.title} sx={{ pl: 4 }}>
                                                <ListItemIcon className="nav_item_icon">
                                                    {userNavListIcons[index]}
                                                </ListItemIcon>
                                                <ListItemText primary={navItem.title} />
                                                <a style={{ color: "white", textDecoration: "none" }} href="tel:1900 0000"> 1900 0000 </a>
                                            </ListItemButton>
                                            :
                                            <Link to={navItem.url} className="nav_link" key={index}>
                                                <ListItemButton className="nav_leftbar_item" button key={navItem.title} sx={{ pl: 4 }} onClick={() => {
                                                    setOpenModalMenu(false);
                                                    setHeaderTitle(navItem.title)
                                                }}>
                                                    <ListItemIcon className="nav_item_icon">
                                                        {userNavListIcons[index]}
                                                    </ListItemIcon>
                                                    <ListItemText primary={navItem.title} />
                                                </ListItemButton>
                                            </Link>
                                        }

                                    </React.Fragment>
                                ))}
                                <Link onClick={handleClickLogout} to="/login" className="nav_link" >
                                    <ListItemButton className="nav_leftbar_item" sx={{ pl: 4 }}>
                                        <ListItemIcon className="nav_item_icon">
                                            <LogoutIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Đăng xuất" />
                                    </ListItemButton>
                                </Link>
                            </List>
                        </Collapse>
                    </List>
                </Box >
            </Modal>}
        </div>
    );
}
