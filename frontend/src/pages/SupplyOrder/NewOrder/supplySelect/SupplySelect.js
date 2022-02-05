import "./SupplySelect.scss";

import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { useHistory } from 'react-router-dom';
import SupplierAPI from '../../../../api/SupplierAPI';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

Number.prototype.format = function(n, x) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
  };
export default function SupplySelect({setSupplier}) {
    const [detailSupply, setDetailSupply] = React.useState(false);
    const [Search, setSearch] = React.useState(true);
    const [supplierList, setSupplierList] = React.useState([]);
    const [value, setValue] = React.useState();
    // const [supplier, setSupplier] = React.useState();
 

    const history = useHistory();
   
    const useStyles = makeStyles((theme) => ({
        inputRoot: {
            color: "black",
            fontFamily: "Roboto Mono",
            backgroundColor: "#ffff",
            marginTop: 0,
            height: 40,

            "& .MuiOutlinedInput-notchedOutline": {
                borderWidth: "1px",
                borderColor: "white",
                height: 40,
                padding: 0,
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
                borderWidth: "0px",
                // borderColor: "white"

            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderWidth: "0px",
                // borderColor: "white"
            },
            "& #combo-box-demo": {
                padding: 0,
            }
            // ,
            // "& .MuiAutocomplete-root": {
            //     ariaExpanded: "true",
            // }
        },
        clearIndicator: {
            color: "black"
        }
    }));
    const classes = useStyles();

    const showDetail = async  (event, newValue) => {
        // await getSupplier(newValue.id);
        setSearch(!Search);
        setDetailSupply(!detailSupply);
        setValue(newValue);;
        setSupplier(newValue.id)
    
    }

     
    const closeDetail = () => {
        setSearch(!Search);
        setDetailSupply(!detailSupply);
        
    }
    async function getData() {
        const result = await SupplierAPI.suppliersList();
        setSupplierList(result.data);
  
        return true;
    }

    React.useEffect(() => {
        // async function getData() {
        //     const result = await SupplierAPI.suppliersList();
        //     setSupplierList(result.data);
        //     console.log(result.data);
            
        // }
        getData();
 
    }, []);
    // console.log(supplierList);
    // console.log(value);
    return (
        <div>
            <Box className="Supply">
                <div className="title">Thông tin nhà cung cấp</div>
                {
                    Search ?
                    <Box className="selectSupply-info" >
                    <SearchIcon className="icon-search" /> 
                    <Autocomplete className="selectSupply"i
                        classes={classes}
                        disablePortal
                        
                        getOptionLabel={(option) => option.name}
                        renderOption={(props ,option) => (
                            <Box {...props}>
                            <AccountCircleRoundedIcon />
                            <Box ml={2}>
                                {option.name}
                                </Box> 
                               </Box>
                        )
                           
                         
                        }
                        // open={showDetail}
                        id="combo-box-demo"
                        options={supplierList}
                        onChange={(event, newValue) => showDetail(event, newValue)}
                        // onClose={closeDetail}
                        // sx={{ width: 500 }}
                        renderInput={(params) => <TextField {...params} style={{ padding: 0 }}
                            placeholder="Chọn nhà cung cấp" />}
                    />
                     </Box>: null
                }
                {
                    detailSupply ?
                        <Box>
                            <Box className="headerSupply">
                                <Box className="nameSupply">
                                    <PersonRoundedIcon sx={{marginRight: "10px"}} />
                                    <Typography sx={{marginRight: "5px"}}>{value.name}</Typography>
                                    <CancelOutlinedIcon sx={{cursor: "pointer"}} onClick={closeDetail} />
                                </Box>
                                <Typography className="debt">Công nợ: {(value.debt.format())}vnd</Typography>
                            </Box>
                            <Divider />
                            <Box className="detail-supplier">
                                <Box className="export-address">
                                    <Typography className="title-add">Địa chỉ xuất hàng</Typography>
                                    <Typography>Giao hàng</Typography>
                                    <Typography>----</Typography>
                                    <Typography>{value.address}</Typography>
                                   
                                    <Typography>Email: {value.email}</Typography>
                                </Box>
                                <Box className="billing-ex-add">
                                    <Typography className="title-add" >Địa chỉ xuất hàng</Typography>
                                    <Typography>Giao hàng</Typography>
                                    <Typography>----</Typography>
                                    <Typography>{value.address}</Typography>
                                  
                                    <Typography>Email: {value.email}</Typography>
                                </Box>
                            </Box>
                        </Box>
                        : null
                }
            </Box>
        </div>
    );
}
