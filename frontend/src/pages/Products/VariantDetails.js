import React from "react";
import { Box, Typography, Button, Divider, Grid } from "@mui/material";
import UnlockAccess from '../../components/roleBasedRender/UnlockAccess'

Number.prototype.format = function (n, x) {
  var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
  return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
};

function VariantDetails({ variantInfo, setViewState }) {
  const showEditForm = () => {
    setViewState(3);
  }
  return (
    (variantInfo && <React.Fragment>
      <Box
        py={2}
        px={1}
        display="flex"
        flexDirection="column"
        backgroundColor="white"
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="subtitle1" id="tableTitle" px={1}>
            Thông tin chi tiết phiên bản
          </Typography>
          <UnlockAccess request={['ADMIN', 'Nhân viên kho']}>
            <Button variant="contained" color="primary" onClick={() => { showEditForm() }}>Chỉnh sửa phiển bản</Button>
          </UnlockAccess>
        </Box>

        <Divider sx={{ my: 1 }} />
        <Box sx={{ height: "15em" }} display="flex" px={1} py={2}>
          <Box
            width="33.3333%"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
          >
            <Typography variant="body2">Mã SKU</Typography>
            <Typography variant="body2">Đơn vị tính</Typography>
            <Typography variant="body2">Kích thước</Typography>
            <Typography variant="body2">Chất liệu</Typography>
            <Typography variant="body2">Màu sắc</Typography>
          </Box>
          <Box
            width="33.3333%"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
          >
            <Typography variant="body2">: {variantInfo.code}</Typography>
            <Typography variant="body2">: {variantInfo.unit}</Typography>
            <Typography variant="body2">: {variantInfo.size}</Typography>
            <Typography variant="body2">: {variantInfo.material}</Typography>
            <Typography variant="body2">: {variantInfo.color}</Typography>
          </Box>
          <Box width="33.3333%" textAlign="center">
            <Box
              sx={{ height: "100%", width: "100%", objectFit: "contain" }}
              component="img"
              // src={variantInfo.imageUrl ? variantInfo.imageUrl : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO6JPHK1VkhnXyF-JblYmBWNQqOsJ1p9AL1JmjnQABCNV3g3Vbn3ILskTCCti96pggJfc&usqp=CAU"}
              src={variantInfo.imageUrl ? variantInfo.imageUrl : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTm1N8tGE9JE-BAn4GgYgG6MHCngMqXZKpZYzAUaI8kaPywl-kM_-9Zk8OnNOhmdt1sBjQ&usqp=CAU"}
              width="129px"
            />
          </Box>
        </Box>
      </Box>
      <Box
        mt={3}
        py={2}
        px={1}
        display="flex"
        flexDirection="column"
        backgroundColor="white"
      >
        <Typography
          // sx={{ flex: "1 1 100%" }}
          variant="subtitle1"
          id="tableTitle"
          px={1}
        >
          Giá sản phẩm
        </Typography>
        <Divider sx={{ my: 1 }} />
        <Box display="flex" flexDirection="column" px={1} py={2}>
          <Grid container>
            <Grid item xs={2}>
              <Typography variant="body2">Giá bán buôn</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body2">
                : {variantInfo.wholeSalePrice.format()}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body2">Giá bán lẻ</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body2">
                : {variantInfo.retailPrice.format()}
              </Typography>
            </Grid>
          </Grid>
          <Divider sx={{ my: 1 }} />
          <Grid container>
            <Grid item xs={2}>
              <Typography variant="body2">Giá nhập</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body2">
                : {variantInfo.originalPrice.format()}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box
        mt={3}
        py={2}
        px={1}
        display="flex"
        flexDirection="column"
        backgroundColor="white"
      >
        <Typography
          // sx={{ flex: "1 1 100%" }}
          variant="subtitle1"
          id="tableTitle"
          px={1}
        >
          Tình trạng kho hàng
        </Typography>
        <Divider sx={{ my: 1 }} />
        <Box display="flex" flexDirection="column" px={1} py={2}>
          <Grid container>
            <Grid item xs={2}>
              <Typography variant="body2">Số lượng trong kho</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body2">
                : {variantInfo.inventoryQuantity}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body2">Số lượng có thể bán</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body2">
                : {variantInfo.sellableQuantity}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box
        my={3}
        py={2}
        px={1}
        display="flex"
        flexDirection="column"
        backgroundColor="white"
      >
        <Typography
          // sx={{ flex: "1 1 100%" }}
          variant="subtitle1"
          id="tableTitle"
          px={1}
        >
          Trạng thái
        </Typography>
        <Divider sx={{ my: 1 }} />
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          px={1}
          py={2}
        >
          <Box>
            <Typography variant="body2" color="primary">{variantInfo.sellableStatus}</Typography>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
    ));
}

export default VariantDetails;
