import React, { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddIcon from '@mui/icons-material/Add';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Rating } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';;


const slides = [
    {
        title: 'Avengers : Endgame',
        description:
            "With the help of remaining allies, the Avengers must assemble once more in order to undo Thanos's actions and undo the chaos to the universe…",
        img: './assets/endgame-banner.png',
    },
    {
        title: 'Kantara',
        description:
            "In the shadowy underworld of Mumbai, one woman rises from betrayal and bloodshed to rewrite the rules of power. ",
        img: './assets/movie-details/movie-poster.png',
    },
    {
        title: 'Kantara',
        description:
            "In the shadowy underworld of Mumbai, one woman rises from betrayal and bloodshed to rewrite the rules of power. ",
        img: './assets/movie-details/movie-poster.png',
    },
    {
        title: 'Kantara',
        description:
            "In the shadowy underworld of Mumbai, one woman rises from betrayal and bloodshed to rewrite the rules of power. ",
        img: './assets/movie-details/movie-poster.png',
    },
    {
        title: 'Kantara',
        description:
            "In the shadowy underworld of Mumbai, one woman rises from betrayal and bloodshed to rewrite the rules of power. ",
        img: './assets/movie-details/movie-poster.png',
    },
    // Add more slide data here
];

const genres = [
    { title: "Action", img: "./assets/movies/genres1.png" },
    { title: "Adventure", img: "./assets/movies/genres2.png" },
    { title: "Comedy", img: "./assets/movies/genres3.png" },
    { title: "Drama", img: "./assets/movies/genres4.png" },
    { title: "Horror", img: "./assets/movies/genres1.png" },
    { title: "Romance", img: "./assets/movies/genres2.png" },
    { title: "Sci-Fi", img: "./assets/movies/genres3.png" },
    { title: "Documentary", img: "./assets/movies/genres4.png" }
];

// const trending = [
//     { description: "2k", title: "1h30min", img: "./assets/movies/trending1.png" },
//     { description: "2k", title: "1h30min", img: "./assets/movies/trending2.png" },
//     { description: "2k", title: "1h30min", img: "./assets/movies/trending3.png" },
//     { description: "2k", title: "1h30min", img: "./assets/movies/trending4.png" },
//     { description: "2k", title: "1h30min", img: "./assets/movies/trending5.png" },
//     { description: "2k", title: "1h30min", img: "./assets/movies/trending1.png" },
//     { description: "2k", title: "1h30min", img: "./assets/movies/trending2.png" },
//     { description: "2k", title: "1h30min", img: "./assets/movies/trending4.png" }
// ];

const release = [
    { title: "Released at 22 April 2025", img: "./assets/movies/new-releases1.png" },
    { title: "Released at 22 April 2025", img: "./assets/movies/new-releases2.png" },
    { title: "Released at 22 April 2025", img: "./assets/movies/new-releases3.png" },
    { title: "Released at 22 April 2025", img: "./assets/movies/new-releases4.png" },
    { title: "Released at 22 April 2025", img: "./assets/movies/new-releases5.png" },
    { title: "Released at 22 April 2025", img: "./assets/movies/new-releases1.png" },
    { title: "Released at 22 April 2025", img: "./assets/movies/new-releases2.png" },
    { title: "Released at 22 April 2025", img: "./assets/movies/new-releases4.png" }
];

const mustWatch = [
    { title: "1h30min", defaultValue: 4.5, img: "./assets/movies/must-watch1.png" },
    { title: "1h30min", defaultValue: 4, img: "./assets/movies/must-watch2.png" },
    { title: "1h30min", defaultValue: 4.5, img: "./assets/movies/must-watch3.png" },
    { title: "1h30min", defaultValue: 4, img: "./assets/movies/must-watch4.png" },
    { title: "1h30min", defaultValue: 4, img: "./assets/movies/must-watch3.png" },
    { title: "1h30min", defaultValue: 4.5, img: "./assets/movies/must-watch1.png" },
    { title: "1h30min", defaultValue: 4, img: "./assets/movies/must-watch2.png" },
    { title: "1h30min", defaultValue: 4.5, img: "./assets/movies/must-watch4.png" }
];



const SectionSlider = ({ title, description, data, showTag, slidesToShow = 4 }) => {
    const navigate = useNavigate()
    const sliderRef = useRef(null);
    const [currentGroup, setCurrentGroup] = useState(0);

    const totalGroups = Math.ceil(data.length / slidesToShow); // adjust slidesToShow accordingly

    const settings = {
        dots: false,
        arrows: false,
        infinite: false,
        speed: 500,
        slidesToShow: slidesToShow,
        slidesToScroll: slidesToShow,
        afterChange: index => setCurrentGroup(Math.floor(index / slidesToShow)),
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                }
            }
        ]
    };

    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',  // <-- short month like "Apr"
            year: 'numeric',
        });
    }
    function formatViews(number) {
        if (number >= 1_000_000) {
            return (number / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
        } else if (number >= 1_000) {
            return (number / 1_000).toFixed(1).replace(/\.0$/, '') + 'k';
        }
        return number.toString();
    }

    return (
        <div className="my-12 bg-black">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <div>
                    <h4 className="text-white text-xl font-semibold">{title}</h4>
                    <p className="text-gray-300 text-sm">{description}</p>
                </div>
                <div className="hidden md:flex bg-black p-2 rounded shadow">
                    <div className="flex items-center gap-2">
                        <button
                            className="p-2 bg-red-700 hover:bg-gray-700 rounded-full transition-colors duration-150"
                            onClick={() => sliderRef.current.slickPrev()}
                            aria-label="Previous"
                            type="button"
                        >
                            <ArrowBackIcon className="text-white" />
                        </button>
                        <div className="flex gap-1">
                            {[...Array(totalGroups)].map((_, i) => (
                                <div
                                    key={i}
                                    className={`w-3 h-3 rounded-full border border-gray-400 ${currentGroup === i ? 'bg-white' : 'bg-gray-500'
                                        }`}
                                ></div>
                            ))}
                        </div>
                        <button
                            className="p-2 bg-red-700 hover:bg-gray-700 rounded-full transition-colors duration-150"
                            onClick={() => sliderRef.current.slickNext()}
                            aria-label="Next"
                            type="button"
                        >
                            <ArrowForwardIcon className="text-white" />
                        </button>
                    </div>
                </div>
            </div>

            <Slider ref={sliderRef} {...settings}>
                {data.map((item, index) => (
                    <div key={index} className="p-2 cursor-pointer">
                        <div className="bg-[#18181b] text-white rounded-xl overflow-hidden p-2 relative shadow-lg">
                            <img
                                src={item?.thumbnail || item.img}
                                className="rounded w-full h-[300px] object-cover"
                                alt={item.title}
                            />
                            <Link to={`/movies/${item.title}`}>
                                <div className="flex mt-2 justify-between items-center">
                                    <span className="text-base">{item.title}</span>
                                    <ArrowForwardIosIcon fontSize="small" />
                                </div>
                            </Link>
                            {showTag && <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">Top 10</div>}
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default function MovieScreen() {
    const sliderRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [allMovies, setAllMovies] = useState([]);

    // Temporary static data for all movies
    const staticMovies = [
        {
            title: 'Avengers: Endgame',
            img: './assets/endgame-banner.png',
            thumbnail: './assets/endgame-banner.png',
        },
        {
            title: 'Kantara',
            img: './assets/movie-details/movie-poster.png',
            thumbnail: './assets/movie-details/movie-poster.png',
        },
        {
            title: 'Inception',
            img: './assets/movies/trending1.png',
            thumbnail: './assets/movies/trending1.png',
        },
        {
            title: 'Interstellar',
            img: './assets/movies/trending2.png',
            thumbnail: './assets/movies/trending2.png',
        },
        {
            title: 'The Dark Knight',
            img: './assets/movies/trending3.png',
            thumbnail: './assets/movies/trending3.png',
        },
        {
            title: 'Joker',
            img: './assets/movies/trending4.png',
            thumbnail: './assets/movies/trending4.png',
        },
        {
            title: 'Tenet',
            img: './assets/movies/trending5.png',
            thumbnail: './assets/movies/trending5.png',
        },
        {
            title: 'Pushpa',
            img: './assets/movies/must-watch1.png',
            thumbnail: './assets/movies/must-watch1.png',
        },
        {
            title: 'KGF',
            img: './assets/movies/must-watch2.png',
            thumbnail: './assets/movies/must-watch2.png',
        },
    ];

    const settings = {
        dots: false,
        infinite: true,
        arrows: false, // custom arrows in your UI
        autoplay: true,
        autoplaySpeed: 2000, // Will change slide every 2 seconds
        pauseOnHover: false, // Won't pause on hover
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        afterChange: index => setCurrentIndex(index),
        responsive: [
            {
                breakpoint: 1024, // large tablets and laptops
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    dots: true,
                    autoplay: true,
                    autoplaySpeed: 1000,
                    pauseOnHover: false
                }
            },
            {
                breakpoint: 768, // tablets
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    dots: true,
                    autoplay: true,
                    autoplaySpeed: 2000,
                    pauseOnHover: false
                }
            },
            {
                breakpoint: 480, // mobile phones
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    dots: true,
                    autoplay: true,
                    autoplaySpeed: 2000,
                    pauseOnHover: false
                }
            }
        ]
    };

    useEffect(() => {
        setAllMovies(staticMovies);
    }, []);

    return (
        <div className='MovieScreen mt-20 pt-8'>
            <div className="relative w-full max-w-7xl mx-auto bg-black rounded-xl shadow-lg p-4 md:p-8">
                <Slider ref={sliderRef} {...settings}>
                    {slides.map((slide, i) => (
                        <div key={i} className="relative">
                            <img src={slide.img} alt={slide.title} className="w-full h-[400px] md:h-[500px] object-cover rounded-xl" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col items-center justify-center px-4">
                                <h2 className='text-3xl md:text-5xl font-bold text-center text-white mb-4'>{slide.title}</h2>
                                <p className='hidden md:block text-lg text-gray-200 text-center mb-6'>{slide.description}</p>
                                <div className="flex flex-col md:flex-row gap-4 items-center">
                                    <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full font-semibold text-lg shadow">
                                        <PlayArrowIcon /> Play Now
                                    </button>
                                    <div className='flex gap-2'>
                                        <button className="p-2 bg-black/70 hover:bg-black/90 rounded-full"><AddIcon className="text-white" /></button>
                                        <button className="p-2 bg-black/70 hover:bg-black/90 rounded-full"><ThumbUpOffAltIcon className="text-white" /></button>
                                        <button className="p-2 bg-black/70 hover:bg-black/90 rounded-full"><VolumeOffIcon className="text-white" /></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
                {/* Custom Arrows */}
                <button className="absolute top-1/2 left-4 -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 p-2 rounded-full" onClick={() => sliderRef.current.slickPrev()}>
                    <ArrowBackIosNewIcon className="text-white" />
                </button>
                <button className="absolute top-1/2 right-4 -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 p-2 rounded-full" onClick={() => sliderRef.current.slickNext()}>
                    <ArrowForwardIosIcon className="text-white" />
                </button>
                {/* Custom Dots */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                    {slides.map((_, i) => (
                        <span key={i} className={`w-3 h-3 rounded-full ${currentIndex === i ? 'bg-white' : 'bg-gray-500'}`} />
                    ))}
                </div>
            </div>
            <div className="max-w-7xl mx-auto mt-12">
                <SectionSlider
                    title="All Movies"
                    description="Browse all available movies."
                    data={allMovies}
                    slidesToShow={5}
                />
            </div>
        </div>
    )
}
