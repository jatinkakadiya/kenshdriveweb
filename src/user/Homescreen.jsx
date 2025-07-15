import React, { useRef, useState } from 'react'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Slider from 'react-slick';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, useNavigate } from "react-router-dom"
const devices = [
    {
        title: "Smartphones",
        note: "StreamVibe is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store.",
        img: "/assets/smartphone.png"
    },
    {
        title: "Tablet",
        note: "StreamVibe is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store.",
        img: "/assets/tablet.png"
    },
    {
        title: "Smart TV",
        note: "StreamVibe is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store.",
        img: "/assets/smartTV.png"
    },
    {
        title: "Laptops",
        note: "StreamVibe is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store.",
        img: "/assets/laptop.png"
    },
    {
        title: "Gaming Consoles",
        note: "StreamVibe is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store.",
        img: "/assets/gaming-console.png"
    },
    {
        title: "VR Headsets",
        note: "StreamVibe is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store.",
        img: "/assets/VR.png"
    }
];
const categoryData = [
    {
        title: "Action",
        img: "./assets/home-slider1.png"
    },
    {
        title: "Adventure",
        img: "./assets/home-slider2.png"
    },
    {
        title: "Comedy",
        img: "./assets/home-slider3.png"
    },
    {
        title: "Drama",
        img: "./assets/home-slider4.png"
    },
    {
        title: "Horror",
        img: "./assets/home-slider5.png"
    }
];

const faqData = [
    { id: 1, title: 'What is StreamVibe?', desc: 'StreamVibe is a streaming service that allows you to watch movies and shows on demand.' },
    { id: 2, title: 'How much does StreamVibe cost?', desc: 'StreamVibe is a streaming service that allows you to watch movies and shows on demand.' },
    { id: 3, title: 'What content is available on StreamVibe?', desc: 'StreamVibe is a streaming service that allows you to watch movies and shows on demand.' },
    { id: 4, title: 'How can I watch StreamVibe?', desc: 'StreamVibe is a streaming service that allows you to watch movies and shows on demand.' },
    { id: 5, title: 'How do I sign up for StreamVibe?', desc: 'StreamVibe is a streaming service that allows you to watch movies and shows on demand.' },
    { id: 6, title: 'What is the StreamVibe free trial?', desc: 'StreamVibe is a streaming service that allows you to watch movies and shows on demand.' },
    { id: 7, title: 'How do I contact StreamVibe customer support?', desc: 'StreamVibe is a streaming service that allows you to watch movies and shows on demand.' },
    { id: 8, title: 'What are the StreamVibe payment methods?', desc: 'StreamVibe is a streaming service that allows you to watch movies and shows on demand.' }
];

export default function HomeScreen() {
    const [active, setActive] = useState(1);

    const toggle = (id) => {
        setActive(prev => (prev === id ? null : id));
    };
    const navigate = useNavigate()
    const sliderRef = useRef(null);
    const [currentGroup, setCurrentGroup] = useState(0);

    const slidesToShow = 4;
    const slidesToScroll = 4;
    const totalGroups = Math.ceil(categoryData.length / slidesToScroll);

    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 800,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: false,
        cssEase: "linear",
        slidesToShow,
        slidesToScroll,
        afterChange: (currentSlide) => {
            setCurrentGroup(Math.floor(currentSlide / slidesToScroll));
        },
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    arrows: false,
                    dots: true,
                    autoplay: true,
                    autoplaySpeed: 3000,
                    speed: 800,
                    pauseOnHover: false,
                    cssEase: "linear",
                    customPaging: function (i) {
                        return <div className="slick-dot-bar" />;
                    },
                    appendDots: dots => (
                        <div className="slick-dots-bar">
                            <ul> {dots} </ul>
                        </div>
                    ),
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    arrows: false,
                    dots: true,
                    autoplay: true,
                    autoplaySpeed: 3000,
                    speed: 800,
                    pauseOnHover: false,
                    cssEase: "linear",
                    customPaging: function (i) {
                        return <div className="slick-dot-bar" />;
                    },
                    appendDots: dots => (
                        <div className="slick-dots-bar">
                            <ul> {dots} </ul>
                        </div>
                    ),
                },
            },
        ],
    };

    return (
        <div className="min-h-screen bg-black text-white  pb-10">
            <div className="w-full">
                <img src="./assets/banner-bg-img.png" alt="" className="w-full object-cover" />
            </div>
            <div className="py-12 px-4 md:px-0 flex flex-col items-center">
                <div className="mt-12">
                    <div className="text-3xl md:text-4xl font-bold text-center">The Best Streaming Experience</div>
                    <div className="flex justify-center mt-4">
                        <p className="w-full md:w-3/4 text-center text-gray-200">StreamVibe is the best streaming experience for watching your favorite movies and shows on demand, anytime, anywhere. <span className="hidden md:inline">With StreamVibe, you can enjoy a wide variety of content, including the latest blockbusters, classic movies, popular TV shows, and more. You can also create your own watchlists, so you can easily find the content you want to watch.</span></p>
                    </div>
                    <div className="text-center mt-6">
                        <button className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg text-lg font-semibold shadow transition" onClick={() => navigate("/movie")}> <PlayArrowIcon /> Start Watching Now</button>
                    </div>
                </div>
            </div>
            <div className="my-12"></div>
            <div className="max-w-6xl mx-auto px-4">
             
                
                <div className="my-12"></div>
                <div className="text-2xl font-semibold mb-2">We Provide you streaming experience across various devices.</div>
                <p className="text-gray-300 mb-8">With StreamVibe, you can enjoy your favorite movies and TV shows anytime, anywhere. <span className="hidden md:inline">Our platform is designed to be compatible with a wide range of devices, ensuring that you never miss a moment of entertainment.</span></p>
                <div className="my-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {
                            devices.map((data, idx) => (
                                <div key={idx} className="bg-[#121212] text-white p-6 rounded-2xl border-0 flex flex-col">
                                    <div className="flex items-center mb-4">
                                        <div className="flex justify-center items-center rounded-xl w-14 h-14 bg-[#1a1a1a]">
                                            <img
                                                src={data.img}
                                                alt={data.title}
                                                className="w-6 h-6 object-contain"
                                            />
                                        </div>
                                        <h5 className="ml-4 mb-0 font-medium text-lg">{data.title}</h5>
                                    </div>
                                    <p className="text-gray-300">
                                        {data.note}
                                    </p>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="my-12"></div>
                <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
                    <div>
                        <h4 className="font-bold text-white text-xl mb-1">Frequently Asked Questions</h4>
                        <p className="text-gray-400 m-0">
                            Got questions? We've got answers! Check out our FAQ section to find answers to the most common questions about StreamVibe.
                        </p>
                    </div>
                    <button className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold shadow transition">Ask a Question</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {faqData.map((item, i) => (
                        <div key={item.id}>
                            <div
                                className={`border-b pb-4 cursor-pointer transition-colors ${active === item.id ? 'border-red-600' : 'border-gray-700'}`}
                                onClick={() => toggle(item.id)}
                            >
                                <div className="flex items-start gap-4">
                                    <div className="bg-gray-900 text-white rounded px-4 py-2 font-bold">{String(item.id).padStart(2, '0')}</div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-center">
                                            <h6 className="m-0 text-white text-lg font-semibold">{item.title}</h6>
                                            <div className="text-2xl text-white">
                                                {active === item.id ? '−' : '+'}
                                            </div>
                                        </div>
                                        {active === item.id && item.desc && (
                                            <p className="text-gray-400 mt-2">{item.desc}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
