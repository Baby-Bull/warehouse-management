import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  TextField,
  Typography,
  InputAdornment,
  MenuItem
} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { Search, ArrowDropDown } from "@mui/icons-material";
import CategoryAPI from "../../../api/CategoryAPI";
import CreateCategoryModal from './CreateCategoryModal'
import "./style.scss";

const useStyles = makeStyles(() => ({
  noBorder: {
    border: "none"
  }
}));

function CategorySelect({handleSelectCategory, categoryName}) {
  const classes = useStyles();
  const searchRef = useRef(null);
  const [searchInput, setSearchInput] = useState('');
  const [category, setCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [searchedCategories, setSearchedCategories] = useState([]);

  const [menuOpen, setMenuOpen] = useState(false);

  function getData() {
    CategoryAPI.CategoryList().then((result) => {
      setCategories(result.data);
      setSearchedCategories(result.data);
      setCategory(categoryName);
      if (categoryName) {
        let oldCategory = result.data.find(c => c.name === categoryName);
        handleSelectCategory(oldCategory.id);
      }
    }).catch((err) => {
      console.log(err);
    })
  }
  useEffect(() => {
    getData();
  }, []);

  const onClickChild = (e) => {
    e.stopPropagation();
    console.log('magic!');
  }

  //inputs
  const handleChange = (e) => {
    let value = e.target.value.toLowerCase();
    setSearchInput(value);
    let input = value.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
    let result = categories.filter(category => category.name.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").indexOf(input) >= 0);
    setSearchedCategories([...result]);
  }

  //create category in text input
  const handleKeyDown = (evt) => {
    if(evt.keyCode === 13 && evt.target.value) {
      try {
        CategoryAPI.CreateCategory({
          name: searchRef.current.value,
          description: ""
        })
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
      searchRef.current.value = "";
    }
   };

   //
   const handleSelect = (id) => {
    let selectedCategory = categories.find(category => category.id === id);
    setCategory(selectedCategory.name);
    handleSelectCategory(id);
    setMenuOpen(!menuOpen);
   }

  return (
    <Box>
      <div
        className={`dropDownSelect` + (menuOpen ? " open" : "")}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <Typography>
          {category ? category : "Chọn loại sản phẩm"}
        </Typography>
        <ArrowDropDown
          className={`dropDownIcon` + (menuOpen ? " iconOpen" : "")}
        />
        {menuOpen ? (
        <div className="menuDiv" onClick={(e)=> onClickChild(e)}>
          <Box>
            <TextField
              variant="outlined"
              fullWidth
              name="category"
              value={searchInput}
              placeholder="Tìm kiếm hoặc thêm loại sản phẩm mới"
              inputRef={searchRef}
              onChange={(e) => handleChange(e)}
              onKeyDown={(evt) => handleKeyDown(evt)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
                classes: { notchedOutline: classes.noBorder }
              }}
            />
          </Box>
          <Box>
            {searchedCategories.map(category => (
              <MenuItem key={category.id} onClick={() => handleSelect(category.id)}>
                <Typography >{category.name}</Typography>
              </MenuItem>
            ))}
          </Box>
          <Box>
            <CreateCategoryModal handleSelectCategory={handleSelectCategory} setCategory={setCategory} setMenuOpen={setMenuOpen} menuOpen={menuOpen}/>
          </Box>
        </div>
      ) : (
        ""
      )}
      </div>
    </Box>
  );
}

export default CategorySelect;
