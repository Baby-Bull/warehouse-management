import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import "./topbar.scss";
import { Avatar, Button, Typography } from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Link } from 'react-router-dom';


export default function Topbar({ headerTitle, setHeaderTitle }) {

    return (
        <Box sx={{ flexGrow: 1, background: "white"}}>
            <AppBar sx={{ background: "white", height: '9vh' }} position="static">
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
                        <Link onClick={() => setHeaderTitle("Thông tin người sử dụng")} to="/nguoi-dung">
                            <Avatar src="" />
                        </Link>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
