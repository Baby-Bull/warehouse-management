import React from 'react'
//import "./highchart.js";
import "./home.scss"
import ReportAPI from '../../api/ReportAPI';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { Box, Grid, Paper, MenuItem, Select, FormControl } from '@mui/material'
import { styled } from '@mui/material/styles';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import CodeOffIcon from '@mui/icons-material/CodeOff';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: "100%"
}));

export default function Home() {
    // set year for charts
    const [yearChart, setYearChart] = React.useState(2022);
    const handleChangeYear = (event) => {
        setYearChart(event.target.value);
    };

    // get totalSuppliedQuantity from api report
    const [totalSuppliedQuantity, setTotalSuppliedQuantity] = React.useState([])
    React.useEffect(() => {
        const fetchReportAPI = async () => {
            const res = await ReportAPI.totalSuppliedQuantity(yearChart);
            setTotalSuppliedQuantity(res.data)
        }
        fetchReportAPI();
    }, [yearChart])

    // get totalSuppliedQuantity from api report
    const [totalOrders, setTotalOrders] = React.useState([])
    React.useEffect(() => {
        const fetchReportAPI = async () => {
            const res = await ReportAPI.totalOrders(yearChart);
            setTotalOrders(res.data)
        }
        fetchReportAPI();
    }, [yearChart])

    // get totalEachmonth from api report
    const [totalEachMonth, setTotalEachMonth] = React.useState([])
    React.useEffect(() => {
        const fetchReportAPI = async () => {
            const res = await ReportAPI.eachMonth(yearChart);
            setTotalEachMonth(res.data)
        }
        fetchReportAPI();
    }, [yearChart])

    // get totalEachmonth last year from api report
    const [totalEachMonthLastYear, setTotalEachMonthLastYear] = React.useState([])
    React.useEffect(() => {
        const fetchReportAPI = async () => {
            const res = await ReportAPI.eachMonth(yearChart - 1);
            setTotalEachMonthLastYear(res.data)
        }
        fetchReportAPI();
    }, [yearChart])

    // all index get from api
    const totalOrdersCurrentYear = (totalOrders.reduce((a, b) => a + b, 0));
    const totalSuppliedQuantityCurrentYear = (totalSuppliedQuantity.reduce((a, b) => a + b, 0));
    const totalOrdersLastYear = (totalEachMonthLastYear.map((e) => e.totalOrders).reduce((a, b) => a + b, 0));
    const totalSuppliedQuantityLastYear = (totalEachMonthLastYear.map((e) => e.totalSuppliedQuantity).reduce((a, b) => a + b, 0));
    const totalAmountCurrentYear = (totalEachMonth.map((e) => e.totalAmount).reduce((a, b) => a + b, 0));
    const totalAmountLastYear = (totalEachMonthLastYear.map((e) => e.totalAmount).reduce((a, b) => a + b, 0));


    const options = {
        chart: {
            zoomType: 'xy',
            color: '#4b8afd'
        },
        title: {
            text: 'Biểu đồ sản phẩm và đơn hàng đã nhập của doanh nghiệp'
        },
        subtitle: {
            text: 'Số liệu từ bên kế toán'
        },
        xAxis: [{
            categories: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6',
                'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
            crosshair: true
        }],
        yAxis: [{ // Primary yAxis
            labels: {
                format: '{value} đơn',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            },
            title: {
                text: 'Tổng số đơn nhập hàng',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            }
        }, { // Secondary yAxis
            title: {
                text: 'Tổng số sản phẩm đã nhập',
                style: {
                    color: "#4b8afd"
                }
            },
            labels: {
                format: '{value} sp',
                style: {
                    color: "#4b8afd"
                }
            },
            opposite: true
        }],
        tooltip: {
            shared: true
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            x: 120,
            verticalAlign: 'top',
            y: 100,
            floating: true,
            backgroundColor:
                Highcharts.defaultOptions.legend.backgroundColor || // theme
                'rgba(255,255,255,0.25)'
        },
        series: [{
            name: 'Tổng số sản phẩm',
            type: 'column',
            yAxis: 1,
            data: totalSuppliedQuantity,
            tooltip: {
                valueSuffix: ' sp'
            }

        }, {
            name: 'Tổng số đơn hàng',
            type: 'spline',
            data: totalOrders,
            tooltip: {
                valueSuffix: ' đơn'
            }
        }]
    }

    const options2 = {
        chart: {
            type: 'column',
            zoomType: 'xy'
        },
        title: {
            text: 'Đồ thị thông kê tài chính doanh nghiệp'
        },
        xAxis: {
            categories: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12']
        },
        yAxis: {
            title: {
                text: 'Số tiền ( đơn vị VND )'
            }
        },
        credits: {
            enabled: false
        },
        series: [{
            name: 'Tổng tiền',
            data: totalEachMonth.map((e) => e.totalAmount),
            color: "#4b8afd"
        }, {
            name: 'Tiền đã trả',
            data: totalEachMonth.map((e) => e.paidAmount),
            color: "#20ff46"
        }
            // , {
            //     name: 'Tiền còn nợ',
            //     data: totalEachMonth.map((e) => e.debtAmount),
            //     color: "#ff3e3e"
            // }
        ]
    };

    return (
        <Box className="home-main-content" pt={2} pb={4} px={4} sx={{ background: "#F4F6F8", height: "100%" }}>
            <Box sx={{ width: '100%' }}>
                <Grid className="cards-index-home" container spacing={2}>
                    <Grid className="card-index-home" item xs={3}>
                        <Item sx={{ background: "linear-gradient(to bottom, #7900c5, #0d3585);", color: "white" }}>
                            <h3><strong style={{ fontSize: "1.3em" }}>Tổng sản phẩm</strong></h3>
                            <Grid pt={4} pl={4} container spacing={2}>
                                <Grid xs={6}>
                                    {totalSuppliedQuantityCurrentYear.toLocaleString()}<br />
                                    {(totalSuppliedQuantityCurrentYear >= totalSuppliedQuantityLastYear) ?
                                        <ArrowUpwardIcon sx={{ marginBottom: "-0.3em", color: "#2eff2e", fontSize: "1.8em" }} /> :
                                        <ArrowDownwardIcon sx={{ marginBottom: "-0.3em", color: "#ff4e4e", fontSize: "1.8em" }} />
                                    }
                                    {(totalSuppliedQuantityCurrentYear === 0 || totalSuppliedQuantityLastYear === 0) ?
                                        "Chưa so sánh" : ((Math.abs(totalSuppliedQuantityCurrentYear - totalSuppliedQuantityLastYear) / totalSuppliedQuantityLastYear * 100).toFixed(2) + " %")
                                    }
                                </Grid>
                                <Grid xs={6}>
                                    <i style={{ fontSize: "3em" }} className="fas fa-cubes"></i>
                                </Grid>
                            </Grid>
                        </Item>
                    </Grid>
                    <Grid className="card-index-home" item xs={3}>
                        <Item sx={{ background: "linear-gradient(to bottom, #7900c5, #0d3585)", color: "white" }}>
                            <h3><strong style={{ fontSize: "1.3em" }}>Tổng số đơn</strong></h3>
                            <Grid pt={4} pl={4} container spacing={2}>
                                <Grid xs={6}>
                                    {totalOrdersCurrentYear.toLocaleString()}<br />
                                    {(totalOrdersCurrentYear >= totalOrdersLastYear) ?
                                        <ArrowUpwardIcon sx={{ marginBottom: "-0.3em", color: "#2eff2e", fontSize: "1.8em" }} /> :
                                        <ArrowDownwardIcon sx={{ marginBottom: "-0.3em", color: "#ff4e4e", fontSize: "1.8em" }} />
                                    }
                                    {(totalOrdersCurrentYear === 0 || totalOrdersLastYear === 0) ?
                                        "Chưa so sánh" : ((Math.abs(totalOrdersCurrentYear - totalOrdersLastYear) / totalOrdersLastYear * 100).toFixed(2) + " %")
                                    }
                                </Grid>
                                <Grid xs={6}>
                                    <i style={{ fontSize: "3em" }} className="fas fa-clipboard-list"></i>
                                </Grid>
                            </Grid>
                        </Item>
                    </Grid>
                    <Grid className="card-index-home" item xs={3}>
                        <Item sx={{ background: "linear-gradient(to bottom, #7900c5, #0d3585)", color: "white" }}>
                            <h3><strong style={{ fontSize: "1.3em" }}>Tổng tiền hàng</strong></h3>
                            <Grid pt={4} pl={4} container spacing={2}>
                                <Grid xs={6}>
                                    {totalAmountCurrentYear.toLocaleString()}<br />
                                    {(totalAmountCurrentYear >= totalAmountCurrentYear) ?
                                        <ArrowUpwardIcon sx={{ marginBottom: "-0.3em", color: "#2eff2e", fontSize: "1.8em" }} /> :
                                        <ArrowDownwardIcon sx={{ marginBottom: "-0.3em", color: "#ff4e4e", fontSize: "1.8em" }} />
                                    }
                                    {(totalAmountCurrentYear === 0 || totalAmountLastYear === 0) ?
                                        "Chưa so sánh" : ((Math.abs(totalAmountCurrentYear - totalAmountLastYear) / totalAmountLastYear * 100).toFixed(2) + " %")
                                    }
                                </Grid>
                                <Grid xs={6}>
                                    <i style={{ fontSize: "3em" }} className="fas fa-dollar-sign"></i>
                                </Grid>
                            </Grid>
                        </Item>
                    </Grid>
                    <Grid className="card-index-home" item xs={3}>
                        <Item sx={{ background: "linear-gradient(to bottom, #7900c5, #0d3585)", color: "white" }}>
                            <h3><strong style={{ fontSize: "1.3em" }}>Tổng số nhà cung cấp</strong></h3>
                            <Grid pt={4} pl={4} container spacing={2}>
                                <Grid xs={6}>
                                    92 <br />
                                    <CodeOffIcon sx={{ marginBottom: "-0.3em", color: "#fff700", fontSize: "1.8em" }} /> Không so sánh
                                </Grid>
                                <Grid xs={6}>
                                    <i style={{ fontSize: "3em" }} className="fas fa-warehouse"></i>
                                </Grid>
                            </Grid>
                        </Item>
                    </Grid>
                </Grid>
            </Box>
            <Box className="highchart1" spacing={2} sx={{ display: "flex" }} pt={4} pb={4} >
                <Grid className="grid-highchart2" item xs={9.5} >
                    <HighchartsReact
                        sx={{ width: "100%" }}
                        highcharts={Highcharts}
                        options={options}
                    />
                </Grid>
                <Grid className="grid-highchart1" sx={{ marginLeft: "2em", display: "grid" }} item xs={2.5}>
                    <Item className="item-highchart1-1">
                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                            <strong style={{ fontSize: "1.3em" }}>Chọn năm thống kê:</strong>
                            <br />
                            <Select
                                value={yearChart}
                                onChange={handleChangeYear}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                            >
                                <MenuItem value={2019}>2019</MenuItem>
                                <MenuItem value={2020}>2020</MenuItem>
                                <MenuItem value={2021}>2021</MenuItem>
                                <MenuItem value={2022}>2022</MenuItem>
                            </Select>
                        </FormControl>
                    </Item>
                    <br />
                    <Item className="item-highchart1-2" >
                        <strong style={{ fontSize: "1.3em" }}>Thông số:</strong>
                        <br />
                        <br />
                        <ul style={{ listStyle: "none", textAlign: "left" }}>
                            <li><strong>Sản phẩm cao nhất :</strong> Tháng <strong style={{ color: "#2eff2e" }}>{totalSuppliedQuantity.indexOf(Math.max.apply(null, totalSuppliedQuantity)) + 1}</strong> </li>
                            <br />
                            <li><strong>Sản phẩm thấp nhất :</strong> Tháng <strong style={{ color: "#ff4e4e" }}>{totalSuppliedQuantity.indexOf(Math.min.apply(null, totalSuppliedQuantity)) + 1}</strong></li>
                            <br />
                            <br />
                            <li><strong>Số đơn cao nhất :</strong> Tháng <strong style={{ color: "#2eff2e" }}>{totalOrders.indexOf(Math.max.apply(null, totalOrders)) + 1}</strong> </li>
                            <br />
                            <li><strong>Số đơn thấp nhất :</strong> Tháng <strong style={{ color: "#ff4e4e" }}>{totalOrders.indexOf(Math.min.apply(null, totalOrders)) + 1}</strong></li>
                        </ul>
                    </Item>
                </Grid>
            </Box>
            <Box>
                <Grid item xs={12} >
                    <HighchartsReact
                        sx={{ width: "100%", marginBottom: "1em" }}
                        highcharts={Highcharts}
                        options={options2}
                    />
                </Grid>
            </Box>
        </Box>
    )
}
