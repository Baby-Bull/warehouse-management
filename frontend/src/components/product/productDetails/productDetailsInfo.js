import React from 'react'
import {
  Box,
  Typography,
} from "@mui/material";
import DescriptionDialog from "./DescriptionDialog";

Number.prototype.format = function(n, x) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
  };

function productDetailsInfo({product, variantNumber }) {
    return (
        <Box display="flex">
          <Box
            width="30%"
            display="flex"
            justifyContent="center"
            alignItems="center"
            px={2}
            py={2}
          >
            <img
              src={`https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=164&h=164&fit=crop&auto=format`}
              srcSet={`https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              alt="anh"
              loading="lazy"
              px={2}
              py={2}
            />
          </Box>
          <Box width="70%" display="flex" px={2} py={2}>
            <Box
              width="25%"
              display="flex"
              flexDirection="column"
              justifyContent="space-evenly"
              height="100%"
            >
              <Typography>Loại sản phẩm</Typography>
              <Typography>Nhãn hiệu</Typography>
              <Typography>Khối lượng</Typography>
            </Box>
            <Box
              width="25%"
              display="flex"
              flexDirection="column"
              justifyContent="space-evenly"
              height="100%"
            >
              <Typography>: {product.category}</Typography>
              <Typography>: {product.brand}</Typography>
              <Typography>: {product.weight}</Typography>
            </Box>
            <Box
              width="25%"
              display="flex"
              flexDirection="column"
              justifyContent="space-evenly"
              height="100%"
            >
              <Typography>Ngày tạo</Typography>
              <Typography>Số phiên bản</Typography>
              <DescriptionDialog description={product.description} />
            </Box>
            <Box
              width="25%"
              display="flex"
              flexDirection="column"
              justifyContent="space-evenly"
              height="100%"
            >
              <Typography>: {product.createdAt}</Typography>
              <Typography>: {variantNumber.format()}</Typography>
              {/* placeholder */}
              <Typography sx={{ opacity: "0" }}>.</Typography>
            </Box>
          </Box>
        </Box>
    )
}

export default productDetailsInfo
