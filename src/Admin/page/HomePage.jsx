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
import { all } from "axios";

// Sample data
const viewData = [
    { name: "Jan", views: 4200, premium: 1200, },
    { name: "Feb", views: 3800, premium: 1000, },
    { name: "Mar", views: 5500, premium: 1800, },
    { name: "Apr", views: 3100, premium: 900, },
    { name: "May", views: 4800, premium: 1500, },
    { name: "Jun", views: 5200, premium: 2000, },
    { name: "Jul", views: 5200, premium: 2000, },
];

const revenueData = [
    { name: "Jan", revenue: 2800, },
    { name: "Feb", revenue: 3500, },
    { name: "Mar", revenue: 9800, },
    { name: "Apr", revenue: 3908, },
    { name: "May", revenue: 4800, },
    { name: "Jun", revenue: 6800, },
];

const pieData = [
    { name: "Action", value: 35 },
    { name: "Comedy", value: 25 },
    { name: "Drama", value: 20 },
    { name: "Horror", value: 12 },
    { name: "Sci-Fi", value: 8 },
];

const platformData = [
    { platform: "Theater", users: 35 },
    { platform: "Streaming", users: 45 },
    { platform: "TV", users: 15 },
    { platform: "Other", users: 5 },
];

const recentMovies = [
    { id: 1, title: "The Last Warrior", views: "1.2M", rating: 8.2, duration: "2h 15m" },
    { id: 2, title: "Midnight City", views: "890K", rating: 7.6, duration: "1h 52m" },
    { id: 3, title: "Space Odyssey", views: "1.5M", rating: 8.8, duration: "2h 28m" },
    { id: 4, title: "Lost Treasure", views: "760K", rating: 7.1, duration: "1h 45m" },
    { id: 5, title: "Dark Forest", views: "1.1M", rating: 8.0, duration: "2h 05m" },
];

const COLORS = ["#FF0000", "#FF5733", "#FF8C00", "#FFC300", "#F9E79F"];
const PLATFORM_COLORS = ["#FF0000", "#FF8C00", "#FFC300", "#F9E79F"];

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
    const [timeRange, setTimeRange] = React.useState('6months');
    const [activeCard, setActiveCard] = React.useState(null);

    const [totelView, settotelView] = useState(null)
    const [genrePopularity, setGenrePopularity] = useState(null)
    const [revenumovise, setrevenumovise] = useState(null)
    async function fatchview() {


        try {
            const [totelview, GenrePopularity,Revenumovise] = await Promise.all([
                Apihelper.totelView(),
                Apihelper.genreview(),
                Apihelper.revenumovise()
            ])
            if (totelview.status == 200 && GenrePopularity.status === 200) {
                // console.log(totelview.data)
                settotelView(totelview.data)
                setGenrePopularity(GenrePopularity.data)
                setrevenumovise(Revenumovise.data)
                console.log(Revenumovise.data)
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
                <div className={`grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 mb-4`}>

                    <div className="flex justify-center">
                        <AnalyticsCard
                            icon={<Movie className="text-red-600" />}
                            title="Total Movies"
                            value="247"
                            change="12%"
                            isIncrease={true}
                            onClick={() => setActiveCard('movies')}
                        />
                    </div>
                    <div className="flex justify-center">
                        <AnalyticsCard
                            icon={<Theaters className="text-red-600" />}
                            title="Screenings"
                            value="1,892"
                            change="8%"
                            isIncrease={true}
                            onClick={() => setActiveCard('screenings')}
                        />
                    </div>
                    <div className="flex justify-center">
                        <AnalyticsCard
                            icon={<People className="text-red-600" />}
                            title="Total Viewers"
                            value={formatNumber(totelView ? totelView : 0)}
                            change="5%"
                            // isIncrease={false}
                            onClick={() => setActiveCard('viewers')}
                        />
                    </div>

                    <div className="flex justify-center">
                        <AnalyticsCard
                            icon={<MonetizationOn className="text-red-600" />}
                            title="Revenue"
                            value="$18.7M"
                            change="15%"
                            isIncrease={true}
                            onClick={() => setActiveCard('revenue')}
                        />
                    </div>
                </div>


                {/* Charts Row 1 */}

                <div className={`grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6 mb-4`}>
                    {/* Monthly Views Chart */}
                    <div className="bg-[#111] p-3 md:p-5 h-full rounded-md">
                        <div className="flex justify-between items-center mb-2 md:mb-4">
                            <h2 className="text-white text-base md:text-lg font-semibold">Monthly Views</h2>
                            <button className="text-gray-400 p-1 md:p-2">
                                <MoreVert fontSize={isMobile ? "small" : "medium"} />
                            </button>
                        </div>
                        <div className="w-full h-[250px] md:h-[350px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={viewData}>
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
                                    <Bar dataKey="premium" fill="#FF0000" radius={[4, 4, 0, 0]} name="Premium" />
                                    <Bar dataKey="standard" fill="#FF8C00" radius={[4, 4, 0, 0]} name="Standard" />
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

                {/* Charts Row 2 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 mb-4">
                    {/* Genre Popularity */}
                    <div className="bg-[#111] p-3 md:p-4 h-full rounded-md">
                        <div className="flex justify-between items-center mb-2 md:mb-4">
                            <h2 className="text-white text-sm md:text-lg font-semibold">Genre Popularity</h2>
                            <button className="text-gray-400 p-1 md:p-2">
                                <MoreVert fontSize={isMobile ? "small" : "medium"} />
                            </button>
                        </div>
                        <div className="w-full h-[200px] md:h-[300px]">
                            {/* <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={pieData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={isMobile ? 40 : 60}
                                        outerRadius={isMobile ? 70 : 90}
                                        paddingAngle={5}
                                        dataKey="value"
                                        label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                                    >
                                        {pieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
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
                                </PieChart>
                            </ResponsiveContainer> */}
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={genrePopularity}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={isMobile ? 40 : 60}
                                        outerRadius={isMobile ? 70 : 90}
                                        paddingAngle={5}
                                        dataKey="views"
                                        label={({ name, percent }) => percent + "%"}
                                        nameKey="category"
                                    >
                                        {genrePopularity?.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        formatter={(value, name, props) => [`${value} views`, props.payload.category]}
                                        contentStyle={{
                                            backgroundColor: '#222',
                                            borderColor: '#333',
                                            color: 'white',
                                        }}
                                    />
                                    {!isMobile && (
                                        <Legend wrapperStyle={{ color: '#999', paddingTop: '10px' }} />
                                    )}
                                </PieChart>
                            </ResponsiveContainer>

                        </div>
                    </div>

                    {/* Viewing Platforms */}
                    <div className="bg-[#111] p-3 md:p-4 h-full rounded-md">
                        <div className="flex justify-between items-center mb-2 md:mb-4">
                            <h2 className="text-white text-sm md:text-lg font-semibold">Viewing Platforms</h2>
                            <button className="text-gray-400 p-1 md:p-2">
                                <MoreVert fontSize={isMobile ? "small" : "medium"} />
                            </button>
                        </div>
                        <div className="w-full h-[200px] md:h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius={isMobile ? "70%" : "80%"} data={platformData}>
                                    <PolarGrid stroke="#333" />
                                    <PolarAngleAxis dataKey="platform" stroke="#999" />
                                    <PolarRadiusAxis angle={30} domain={[0, 50]} stroke="#333" />
                                    <Radar
                                        name="Users"
                                        dataKey="users"
                                        stroke="#FF0000"
                                        fill="#FF0000"
                                        fillOpacity={0.4}
                                    />
                                    {!isMobile && (
                                        <Legend wrapperStyle={{ color: '#999', paddingTop: '10px' }} />
                                    )}
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#222',
                                            borderColor: '#333',
                                            color: 'white',
                                        }}
                                    />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Platform Share */}
                    <div className="bg-[#111] p-3 md:p-4 h-full rounded-md">
                        <div className="flex justify-between items-center mb-2 md:mb-4">
                            <h2 className="text-white text-sm md:text-lg font-semibold">Platform Share</h2>
                            <button className="text-gray-400 p-1 md:p-2">
                                <MoreVert fontSize={isMobile ? "small" : "medium"} />
                            </button>
                        </div>
                        <div className="w-full h-[200px] md:h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={platformData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        outerRadius={isMobile ? 70 : 90}
                                        innerRadius={isMobile ? 40 : 60}
                                        fill="#8884d8"
                                        dataKey="users"
                                        label={({ platform, percent }) => `${platform}: ${(percent * 100).toFixed(0)}%`}
                                    >
                                        {platformData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={PLATFORM_COLORS[index % PLATFORM_COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#222',
                                            borderColor: '#333',
                                            color: 'white',
                                        }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>


                {/* Movies Table */}
                <Paper sx={{ p: isMobile ? 1 : 2, bgcolor: "#111" }}>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: isMobile ? 1 : 2,
                        flexDirection: isMobile ? 'column' : 'row',
                        gap: isMobile ? 1 : 0
                    }}>
                        <Typography variant={isMobile ? "subtitle1" : "h6"} sx={{ color: 'white' }}>
                            Top Performing Movies
                        </Typography>
                        <Box sx={{
                            display: 'flex',
                            gap: 1,
                            width: isMobile ? '100%' : 'auto'
                        }}>
                            <FormControl size="small" sx={{ minWidth: isMobile ? '100%' : 120 }}>
                                <InputLabel sx={{ color: '#999' }}>Sort By</InputLabel>
                                <Select
                                    defaultValue="revenue"
                                    sx={{
                                        color: 'white',
                                        '& .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#333'
                                        },
                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#555'
                                        }
                                    }}
                                    label="Sort By"
                                >
                                    <MenuItem value="revenue">Revenue</MenuItem>
                                    <MenuItem value="views">Views</MenuItem>
                                    <MenuItem value="rating">Rating</MenuItem>
                                </Select>
                            </FormControl>
                            {!isMobile && (
                                <IconButton sx={{ color: '#999' }}>
                                    <MoreVert />
                                </IconButton>
                            )}
                        </Box>
                    </Box>
                    <TableContainer>
                        <Table size={isMobile ? "small" : "medium"}>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ color: '#999', borderColor: '#333' }}>Movie</TableCell>
                                    {!isMobile && (
                                        <TableCell align="right" sx={{ color: '#999', borderColor: '#333' }}>Duration</TableCell>
                                    )}
                                    <TableCell align="right" sx={{ color: '#999', borderColor: '#333' }}>Views</TableCell>
                                    <TableCell align="right" sx={{ color: '#999', borderColor: '#333' }}>Rating</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {revenumovise?.map((movie) => (
                                    <TableRow
                                        key={movie._id}
                                        sx={{
                                            '&:last-child td': { borderBottom: 0 },
                                            '&:hover': { bgcolor: '#1E1E1E' }
                                        }}
                                    >
                                        <TableCell sx={{ color: 'white', borderColor: '#333' }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <Movie sx={{ color: 'red', mr: 1, fontSize: isMobile ? "small" : "medium" }} />
                                                <Typography variant={isMobile ? "body2" : "body1"}>
                                                    {isMobile ? movie.name.split(' ').slice(0, 2).join(' ') + (movie.name.split(' ').length > 2 ? '...' : '') : movie.name}
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                        {!isMobile && (
                                            <TableCell align="right" sx={{ color: 'white', borderColor: '#333' }}>{movie.duration}</TableCell>
                                        )}
                                        <TableCell align="right" sx={{ color: 'white', borderColor: '#333' }}>{movie.views}</TableCell>
                                        <TableCell align="right" sx={{ color: 'white', borderColor: '#333' }}>
                                            <Box sx={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                bgcolor: movie.rating >= 8 ? 'rgba(76, 175, 80, 0.2)' : 'rgba(255, 152, 0, 0.2)',
                                                px: 1,
                                                borderRadius: 1
                                            }}>
                                                {movie.rating}/5
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Container>
        </Box>
    );
};

export default MovieAnalytics;