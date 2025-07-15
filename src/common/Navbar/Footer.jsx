import React from 'react'
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export default function Footer() {
    return (
        <div className='bg-black py-3'>
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap">
                    <div className="w-1/2 md:w-1/6 mt-2">
                        <ul className='m-0 p-0 list-none'>
                            <li className="my-2 w-full text-white font-semibold">Home</li>
                            <li className="my-2 w-full text-gray-200">Categories</li>
                            <li className="my-2 w-full text-gray-200">Devices</li>
                            <li className="my-2 w-full text-gray-200">Prices</li>
                            <li className="my-2 w-full text-gray-200">FAQs</li>
                        </ul>
                    </div>
                    <div className="w-1/2 md:w-1/6 mt-2">
                        <ul className='m-0 p-0 list-none'>
                            <li className="my-2 w-full text-white font-semibold">Movies</li>
                            <li className="my-2 w-full text-gray-200">Gernes</li>
                            <li className="my-2 w-full text-gray-200">Trending</li>
                            <li className="my-2 w-full text-gray-200">New Release</li>
                            <li className="my-2 w-full text-gray-200">Popular</li>
                        </ul>
                    </div>
                    <div className="w-1/2 md:w-1/6 mt-2">
                        <ul className='m-0 p-0 list-none'>
                            <li className="my-2 w-full text-white font-semibold">Show</li>
                            <li className="my-2 w-full text-gray-200">Gernes</li>
                            <li className="my-2 w-full text-gray-200">Trending</li>
                            <li className="my-2 w-full text-gray-200">New Release</li>
                            <li className="my-2 w-full text-gray-200">Popular</li>
                        </ul>
                    </div>
                    <div className="w-1/2 md:w-1/6 mt-2">
                        <ul className='m-0 p-0 list-none'>
                            <li className="my-2 w-full text-white font-semibold">Support</li>
                            <li className="my-2 w-full text-gray-200">Contact Us</li>
                        </ul>
                    </div>
                    <div className="w-1/2 md:w-1/6 mt-2">
                        <ul className='m-0 p-0 list-none'>
                            <li className="my-2 w-full text-white font-semibold">Subscription</li>
                            <li className="my-2 w-full text-gray-200">Plans</li>
                            <li className="my-2 w-full text-gray-200">Feature</li>
                        </ul>
                    </div>
                    <div className="w-1/2 md:w-1/6 mt-2">
                        <ul className='m-0 p-0 list-none'>
                            <li className="my-2 w-full text-white font-semibold">Connect With Us</li>
                            <div className="flex">
                                <li className="btn text-white bg-gray-900 m-1 rounded p-2 flex items-center justify-center"><FacebookOutlinedIcon /></li>
                                <li className="btn text-white bg-gray-900 m-1 rounded p-2 flex items-center justify-center"><TwitterIcon /></li>
                                <li className="btn text-white bg-gray-900 m-1 rounded p-2 flex items-center justify-center"><LinkedInIcon /></li>
                            </div>
                        </ul>
                    </div>
                </div>
                <hr className='border-t border-gray-200 my-4' />
                <div className="flex flex-wrap justify-between items-center">
                    <div className="my-1 text-gray-200">@KensDrive, All Rights Reserved</div>
                    <div className='flex gap-3 my-1 items-center'>
                        <div className="text-gray-200">Term of Use</div>
                        <div className="bg-gray-200 w-px h-6"></div>
                        <div className="text-gray-200">Term of Use</div>
                        <div className="bg-gray-200 w-px h-6"></div>
                        <div className="text-gray-200">Cookies Policy</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
