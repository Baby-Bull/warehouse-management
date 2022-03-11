import React, { useState } from 'react';
import "./login.scss";
import { useContext, useRef } from 'react';
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from '../../contextAPI/AuthContext';
import { CircularProgress } from "@material-ui/core";
import axios from 'axios';
import { Alert, Snackbar } from '@mui/material';

export default function Login() {

    const [stateAlert, setStateAlert] = useState({ severity: "", variant: "", open: false, content: "" });

    const username = useRef("");
    const password = useRef("");
    const { user, isFetching, error, dispatch } = useContext(AuthContext);
    const history = useHistory();

    const LoginCall = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });
        const inputlogin = {
            username: username.current.value,
            password: password.current.value
        }
        if (username.current.value == "" || password.current.value == "") {
            setStateAlert({ severity: "error", variant: "standard", open: true, content: "Yêu cầu điền tên đăng nhập và mật khẩu" })
        } else {
            try {
                const res = await axios.post("https://storage-management-backend-ndt.herokuapp.com/login", inputlogin);
                dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
                window.location.replace("/trang-chu");

            } catch (error) {
                setStateAlert({ severity: "error", variant: "filled", open: true, content: "Tên đăng nhập hoặc mật khẩu không đúng" })
                dispatch({ type: "LOGIN_FAILURE", payload: error });
            }
        }
    }

    return (
        <div className="login_page">
            <div className="background">
                <img className='logo_image' src="https://www.sapo.vn/Themes/Portal/Default/StylesV2/images/home/bg-banner-tet-1280.png?v=7" alt="" />
            </div>
            <div className="container">
                {/* <div className="img">
                    <img className='logo_image' src="./images/logo2.PNG" alt="" />
                </div> */}
                <div className="screen">
                    <div className="screen__content">
                        <form onSubmit={LoginCall} className="login">
                            <div className="login__field">
                                <i className="login__icon fas fa-user" />
                                <input ref={username} type="text" className="login__input" placeholder="Tên đăng nhập" />
                            </div>
                            <div className="login__field">
                                <i className="login__icon fas fa-lock" />
                                <input ref={password} type="password" className="login__input" placeholder="Mật khẩu" />
                            </div>
                            <button type='submit' className="button login__submit">
                                {isFetching ? <CircularProgress color="white" size="20px" /> :
                                    <>
                                        <span className="button__text">Đăng nhập</span>
                                        <i className="button__icon fas fa-chevron-right" />
                                    </>
                                }
                            </button>
                            <Link to={"/register"} className="button login__submit">
                                <span className="button__text">Đăng ký tài khoản Admin</span>
                                <i className="button__icon fas fa-chevron-right" />
                            </Link>
                        </form>
                    </div>
                    <div className="screen__background">
                        <span className="screen__background__shape screen__background__shape4" />
                        <span className="screen__background__shape screen__background__shape3" />
                        <span className="screen__background__shape screen__background__shape2" />
                        <span className="screen__background__shape screen__background__shape1" />
                    </div>
                </div>
            </div>

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
        </div>
    )
}
