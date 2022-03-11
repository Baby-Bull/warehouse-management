import "./app.scss";
import React, { useContext, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Box, CssBaseline, Snackbar, Alert } from "@mui/material";
import Sidebar from "./components/sidebar/Sidebar";
import Products from "./pages/Products/Products";
import Variants from "./pages/Products/Variants"
import SupplyOrder from "./pages/SupplyOrder/NewOrder/SupplyOrder";
import CreateProduct from "./pages/Products/CreateProduct";
import ProductDetails from "./pages/Products/ProductDetails";
import Supplier from "./pages/Suppliers/Suppliers";
import Topbar from "./components/topbar/Topbar";
import CreateSupplier from "./pages/Suppliers/CreateSupplier";
import DetailSupplier from "./pages/Suppliers/DetailSupplier";
import ListOrder from "./pages/SupplyOrder/ListOrder/ListOrder";
import DetailOrder from "./pages/SupplyOrder/DetailOrder/DetailOrder";
import UpdateOrder from "./pages/SupplyOrder/UpdateOrder/UpdateOrder";
import Home from "./pages/Home/Home";
import Login from "./pages/Login_Register/Login";
import Register from "./pages/Login_Register/Register";
import { AuthContext } from "./contextAPI/AuthContext";
import EditProduct from "./pages/Products/EditProduct";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { viVN } from "@mui/material/locale";
import User from "./pages/User/User";
import ReturnReceipts from "./pages/SupplyOrder/DetailOrder/ReturnReceipts";
import RoleBasedRouting from "./components/roleBasedRender/RoleBasedRouting";
import useWindowDimensions from "./components/dimensions/Dimentions";


const theme = createTheme(
  {
    palette: {
      primary: { main: "#1976d2" },
    },
  },
  viVN
);

function App() {

  const { height, width } = useWindowDimensions();

  const [headerTitle, setHeaderTitle] = useState("Trang quản lý");
  const { token } = useContext(AuthContext);
  const [stateAlert, setStateAlert] = useState({
    severity: "",
    variant: "",
    open: false,
    content: "",
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="App" style={{ display: "flex", flexDirection: "column" }}>
        <Router className="App1">
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />

            {!token ?
              <Login />
              :
              <Box sx={{ display: "flex", width: "100%", background: "#27274b", }}>
                <CssBaseline />
                {(width > 980) && <Sidebar setHeaderTitle={setHeaderTitle} />}
                <Box className="box_content" component="main">
                  <Topbar headerTitle={headerTitle} setHeaderTitle={setHeaderTitle} ></Topbar>
                  {/* <Route exact path="/san-pham">
                    <Products setStateAlert={setStateAlert} />
                  </Route>
                  <Route path="/tao-san-pham">
                    <CreateProduct setStateAlert={setStateAlert} />
                  </Route>
                  <Route exact path="/san-pham/:id">
                    <ProductDetails setStateAlert={setStateAlert} />
                  </Route>
                  <Route path="/san-pham/:id/chinh-sua" >
                    <EditProduct setStateAlert={setStateAlert} />
                  </Route>
                  <Route path="/trang-chu" component={Home}></Route>
                  <Route exact path="/kho-hang">
                    <Variants setStateAlert={setStateAlert} />
                  </Route>
                  <Route path="/kiem-hang"></Route>
                  <Route exact path="/nha-cung-cap" component={Supplier} />
                  <Route path="/nha-cung-cap/tao-moi-nha-cung-cap" component={CreateSupplier}></Route>
                  <Route path="/thong-tin-nha-cung-cap" component={DetailSupplier}></Route>

                  <Route exact path="/nhap-hang" component={ListOrder} />
                  <Route path="/nhap-hang/tao-don-nhap-hang">
                    <SupplyOrder setStateAlert={setStateAlert} />
                  </Route>
                  <Route path="/nhap-hang/don-hang" >
                    <DetailOrder setStateAlert={setStateAlert} />
                  </Route>
                  <Route path="/nhap-hang/sua-don-hang" >
                    <UpdateOrder setStateAlert={setStateAlert} />
                  </Route>
                  <Route path="/don-hang/hoan-tra">
                    <ReturnReceipts setStateAlert={setStateAlert} />
                  </Route>
                  <Route path="/nguoi-dung" component={User}></Route>
                  <Route path="/cai-dat"></Route> */}

                  {/* Role based render */}
                  <RoleBasedRouting exact path="/san-pham" roles={['ADMIN', 'Nhân viên kho', 'Kế toán']} currRole={token.role[0].name}>
                    <Products setStateAlert={setStateAlert} />
                  </RoleBasedRouting>
                  <RoleBasedRouting path="/tao-san-pham" roles={['ADMIN', 'Nhân viên kho']}>
                    <CreateProduct setStateAlert={setStateAlert} />
                  </RoleBasedRouting>
                  <RoleBasedRouting exact path="/san-pham/:id" roles={['ADMIN', 'Nhân viên kho', 'Kế toán']}>
                    <ProductDetails setStateAlert={setStateAlert} />
                  </RoleBasedRouting>
                  <RoleBasedRouting path="/san-pham/:id/chinh-sua" roles={['ADMIN', 'Nhân viên kho']}>
                    <EditProduct setStateAlert={setStateAlert} />
                  </RoleBasedRouting>
                  <RoleBasedRouting path="/trang-chu" roles={['ADMIN', 'Nhân viên kho', 'Kế toán']}>
                    <Home />
                  </RoleBasedRouting>
                  <RoleBasedRouting exact path="/kho-hang" roles={['ADMIN', 'Nhân viên kho', 'Kế toán']}>
                    <Variants setStateAlert={setStateAlert} />
                  </RoleBasedRouting>
                  <RoleBasedRouting path="/kiem-hang" roles={['ADMIN', 'Nhân viên kho', 'Kế toán']}></RoleBasedRouting>
                  <RoleBasedRouting exact path="/nha-cung-cap" roles={['ADMIN', 'Nhân viên kho', 'Kế toán']}>
                    <Supplier />
                  </RoleBasedRouting>
                  <RoleBasedRouting path="/nha-cung-cap/tao-moi-nha-cung-cap" roles={['ADMIN', 'Nhân viên kho']}>
                    <CreateSupplier setStateAlert={setStateAlert} />
                  </RoleBasedRouting>
                  <RoleBasedRouting path="/thong-tin-nha-cung-cap" roles={['ADMIN', 'Nhân viên kho', 'Kế toán']}>
                    <DetailSupplier setStateAlert={setStateAlert} />
                  </RoleBasedRouting>
                  <RoleBasedRouting exact path="/nhap-hang" roles={['ADMIN', 'Nhân viên kho', 'Kế toán']}>
                    <ListOrder />
                  </RoleBasedRouting>
                  <RoleBasedRouting path="/nhap-hang/tao-don-nhap-hang" roles={['ADMIN', 'Nhân viên kho']}>
                    <SupplyOrder setStateAlert={setStateAlert} />
                  </RoleBasedRouting>
                  <RoleBasedRouting path="/nhap-hang/don-hang" roles={['ADMIN', 'Nhân viên kho', 'Kế toán']}>
                    <DetailOrder setStateAlert={setStateAlert} />
                  </RoleBasedRouting>
                  <RoleBasedRouting path="/nhap-hang/sua-don-hang" roles={['ADMIN', 'Nhân viên kho', 'Kế toán']}>
                    <UpdateOrder setStateAlert={setStateAlert} />
                  </RoleBasedRouting>
                  <RoleBasedRouting path="/don-hang/hoan-tra" roles={['ADMIN', 'Nhân viên kho', 'Kế toán']}>
                    <ReturnReceipts setStateAlert={setStateAlert} />
                  </RoleBasedRouting>
                  <RoleBasedRouting path="/nguoi-dung" roles={['ADMIN', 'Nhân viên kho', 'Kế toán']}>
                    <User />
                  </RoleBasedRouting>
                  {/*<RoleBasedRouting path="/cai-dat"></RoleBasedRouting> */}
                  {stateAlert.severity && (
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
                        sx={{ width: "100%" }}
                      >
                        {stateAlert.content}
                      </Alert>
                    </Snackbar>
                  )}
                </Box>
              </Box>}
          </Switch>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
