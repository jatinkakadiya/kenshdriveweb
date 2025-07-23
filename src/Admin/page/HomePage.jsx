import React from "react";
import {
    Box,
    Typography,
    Container,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    useMediaQuery,
    useTheme
} from "@mui/material";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
    AreaChart,
    Area,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar
} from "recharts";
import {
    MoreVert,
    ArrowUpward,
    ArrowDownward,
    Movie,
    Theaters,
    People,
    MonetizationOn,
    FilterList,
    Refresh
} from "@mui/icons-material";
import { useState } from "react";
import { useEffect } from "react";
import { Apihelper } from "../../common/service/ApiHelper";

// Sample data


const revenueData = [
    { name: "Jan", revenue: 2800, },
    { name: "Feb", revenue: 3500, },
    { name: "Mar", revenue: 9800, },
    { name: "Apr", revenue: 3908, },
    { name: "May", revenue: 4800, },
    { name: "Jun", revenue: 6800, },
];





const AnalyticsCard = ({ icon, title, value, change, isIncrease, onClick }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));


    return (

        <Paper
            sx={{
                p: isMobile ? 2 : 3,
                bgcolor: "#111",
                color: "white",
                borderRadius: 2,
                height: '100%',
                cursor: onClick ? 'pointer' : 'default',
                transition: 'transform 0.2s',
                '&:hover': {
                    transform: onClick ? 'translateY(-5px)' : 'none',
                    boxShadow: onClick ? '0 5px 15px rgba(255, 0, 0, 0.3)' : 'none'
                }
            }}
            onClick={onClick}
        >

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box>
                    <Typography variant={isMobile ? "caption" : "body2"} sx={{ color: '#999' }}>{title}</Typography>
                    <Typography variant={isMobile ? "h5" : "h4"} sx={{ mt: 1 }}>{value}</Typography>
                </Box>
                <Box sx={{
                    bgcolor: '#1E1E1E',
                    width: isMobile ? 40 : 50,
                    height: isMobile ? 40 : 50,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    {React.cloneElement(icon, { fontSize: isMobile ? "small" : "medium" })}
                </Box>
            </Box>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                mt: 2,
                color: isIncrease ? '#4CAF50' : '#F44336'
            }}>
                {isIncrease ? <ArrowUpward fontSize={isMobile ? "small" : "medium"} /> : <ArrowDownward fontSize={isMobile ? "small" : "medium"} />}
                <Typography variant={isMobile ? "caption" : "body2"} sx={{ ml: 0.5 }}>
                    {change} {isIncrease ? 'Increase' : 'Decrease'} from last month
                </Typography>
            </Box>
        </Paper>
    );
};

const MovieAnalytics = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
    const [monthlytotal, setmonthlytotal] = React.useState(null);
    const [activeCard, setActiveCard] = React.useState(null);

    const [totelView, settotelView] = useState(null)
    const [toteleprimum, settoteleprimum] = useState(null)
    const [totelprofit, settotelprofit] = useState(null);
    const [totelmovise, settotelmovise] = useState(null);
    const [toteluser, settoteluser] = useState(null);
    async function fatchview() {


        try {
            const [totelview, totelmonthycount, totelprimum, totelearnings, totelmovies, toteluser, monthlypremium] = await Promise.all([
                Apihelper.totelView(),
                Apihelper.monthlytotal(),
                Apihelper.premiumtypecounts(),
                Apihelper.totelearnings(),
                Apihelper.ListMovise(),
                Apihelper.toteluser(),
                Apihelper.monthlypremium()

            ])


            settoteleprimum(totelprimum.data)
            setmonthlytotal(totelmonthycount.data)
            settotelprofit(totelearnings.data)
            settotelmovise(totelmovies.data.data.movies)
            settoteluser(toteluser.data)
            if (totelview.status == 200) {
                // console.log(totelview.data)
                settotelView(totelview.data)
            } else {
                console.log("error")
            }

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fatchview()
    }, [])

    console.log(toteleprimum)

    function formatNumber(num) {
        if (num >= 10000000) return (num / 10000000).toFixed(1) + 'Cr';
        if (num >= 100000) return (num / 100000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num;
    }
    return (
        <Box sx={{ bgcolor: 'black', minHeight: '100vh', py: isMobile ? 2 : 4 }}>
            <Container maxWidth="xl">
                {/* Header with Filters */}
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: isMobile ? 2 : 4,
                    flexDirection: isMobile ? 'column' : 'row',
                    gap: isMobile ? 2 : 0
                }}>
                    <Typography variant={isMobile ? "h5" : "h4"} sx={{
                        color: 'white',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        mb: isMobile ? 1 : 0
                    }}>
                        <Theaters sx={{ color: 'red', mr: 2, fontSize: isMobile ? "medium" : "large" }} />
                        Movie Analytics
                    </Typography>
                </Box>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 mb-4">
                    <div className="flex justify-center">
                        <AnalyticsCard
                            icon={<Movie className="text-red-600" />}
                            title="Total Movies"
                            value={formatNumber(totelmovise ? totelmovise.length : 0)}
                            isIncrease={true}
                            onClick={() => setActiveCard('movies')}
                        />
                    </div>
                    <div className="flex justify-center">
                        <AnalyticsCard
                            icon={<People className="text-red-600" />}
                            title="Total users"
                            value={formatNumber(toteluser ? toteluser.total : 0)}
                            onClick={() => setActiveCard('viewers')}
                        />
                    </div>
                    <div className="flex justify-center">
                        <AnalyticsCard
                            icon={<MonetizationOn className="text-red-600" />}
                            title="Revenue"
                            value={"₹" + formatNumber(totelprofit ? totelprofit : 0)}
                            change="15%"
                            isIncrease={true}
                            onClick={() => setActiveCard('revenue')}
                        />
                    </div>
                    {toteleprimum && toteleprimum.map((x, idx) => (
                        <div className="flex justify-center" key={idx}>
                            <AnalyticsCard
                                icon={<MonetizationOn className="text-red-600" />}
                                title={`${x.type.charAt(0).toUpperCase() + x.type.slice(1)} Premium`}
                                value={x.count}
                                isIncrease={true}
                                onClick={() => setActiveCard('revenue')}
                            />
                        </div>
                    ))}
                </div>


                {/* Charts Row 1 */}

                <div className={`grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6 mb-4`}>
                    {/* Monthly Views Chart */}
                    <div className="bg-[#111] p-3 md:p-5 h-full rounded-md">
                        <div className="flex justify-between items-center mb-2 md:mb-4">
                            <h2 className="text-white text-base md:text-lg font-semibold">Monthly earnings</h2>
                            <button className="text-gray-400 p-1 md:p-2">
                                <MoreVert fontSize={isMobile ? "small" : "medium"} />
                            </button>
                        </div>
                        <div className="w-full h-[250px] md:h-[350px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={monthlytotal}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                                    <XAxis dataKey="name" stroke="#999" />
                                    <YAxis stroke="#999" />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#222',
                                            borderColor: '#333',
                                            color: 'white',
                                        }}
                                    />
                                    {!isMobile && (
                                        <Legend wrapperStyle={{ color: '#999', paddingTop: '10px' }} />
                                    )}
                                    <Bar dataKey="premium" fill="#FF0000" radius={[4, 4, 0, 0]} name="earnings" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Revenue & Profit Chart */}
                    <div className="bg-[#111] p-3 md:p-5 h-full rounded-md">
                        <div className="flex justify-between items-center mb-2 md:mb-4">
                            <h2 className="text-white text-base md:text-lg font-semibold">Revenue & Profit</h2>
                            <button className="text-gray-400 p-1 md:p-2">
                                <MoreVert fontSize={isMobile ? "small" : "medium"} />
                            </button>
                        </div>
                        <div className="w-full h-[250px] md:h-[350px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={revenueData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                                    <XAxis dataKey="name" stroke="#999" />
                                    <YAxis stroke="#999" />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#222',
                                            borderColor: '#333',
                                            color: 'white',
                                        }}
                                    />
                                    {!isMobile && (
                                        <Legend wrapperStyle={{ color: '#999', paddingTop: '10px' }} />
                                    )}
                                    <Area
                                        type="monotone"
                                        dataKey="revenue"
                                        stroke="#FF0000"
                                        fill="#FF0000"
                                        fillOpacity={0.2}
                                        strokeWidth={2}
                                        name="Revenue"
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="profit"
                                        stroke="#4CAF50"
                                        fill="#4CAF50"
                                        fillOpacity={0.2}
                                        strokeWidth={2}
                                        name="Profit"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </Container>
        </Box>
    );
};

export default MovieAnalytics;