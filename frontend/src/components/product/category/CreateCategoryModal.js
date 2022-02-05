import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import CategoryAPI from "../../../api/CategoryAPI";
import { Add } from "@mui/icons-material";

export default function CreateCategoryModal({ handleSelectCategory, setCategory, setMenuOpen, menuOpen }) {
  const [open, setOpen] = React.useState(false);
  const [categoryData, setCategoryData] = useState({});

  const handleClickOpen = () => {
    setOpen(true);
  };

  function handleChange(evt) {
    const value = evt.target.value;
    setCategoryData({
      ...categoryData,
      [evt.target.name]: value,
    });
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreate = () => {
    console.log(categoryData);
    try {
      CategoryAPI.CreateCategory(categoryData)
        .then(() => {
          CategoryAPI.CategoryList()
            .then((res) => {
              let category = res.data.pop();
              setCategory(category.name)
              handleSelectCategory(category.id);
              setMenuOpen(!menuOpen);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Button
        variant="text"
        fullWidth
        onClick={handleClickOpen}
        startIcon={<Add />}
        sx={{ textTransform: "none", fontSize: "1rem" }}
      >
        Thêm loại sản phẩm mới
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Thêm loại sản phẩm mới
        </DialogTitle>
        <DialogContent sx={{ minWidth: "600px" }}>
          <Box>
            <Box display="flex">
              <Typography variant="subtitle1" id="tableTitle">
                Tên loại sản phẩm
              </Typography>
            </Box>
            <TextField
              fullWidth
              name="name"
              placeholder="Nhập tên loại sản phẩm"
              onChange={handleChange}
            />
            <Box display="flex">
              <Typography variant="subtitle1" id="tableTitle">
                Mô tả loại sản phẩm
              </Typography>
            </Box>
            <TextField
              fullWidth
              multiline
              rows={3}
              name="description"
              placeholder="Nhập mô tả loại sản phẩm"
              onChange={handleChange}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button color="error" variant="outlined" onClick={handleClose}>Hủy</Button>
          <Button color="primary" variant="contained" onClick={handleCreate}>Tạo mới</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
