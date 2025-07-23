import React, { useState, useRef, useEffect } from 'react';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Dialog } from '@headlessui/react';
import { Link } from "react-router-dom";
import Path from "../Path";

export default function Footer() {
    const [isOpen, setIsOpen] = useState(false);
    const closeButtonRef = useRef(null);

    // Focus management for accessibility
    useEffect(() => {
        if (isOpen && closeButtonRef.current) {
            closeButtonRef.current.focus();
        }
    }, [isOpen]);

    return (
        <footer className='bg-black text-white py-6'>
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap gap-6">
                    {/* Navigation Links */}
                    <div className="w-full md:w-auto">
                        <h3 className="text-lg font-semibold mb-3">Navigation</h3>
                        <ul className='space-y-2'>
                            <li>
                                <Link to={Path.home} className="text-gray-300 hover:text-white transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to={Path.movie} className="text-gray-300 hover:text-white transition-colors">
                                    Local Video Player
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="text-gray-300 hover:text-white transition-colors">
                                    FAQs
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div className="w-full md:w-auto">
                        <h3 className="text-lg font-semibold mb-3">Support</h3>
                        <ul className='space-y-2'>
                            <li>
                                <Link to="#" className="text-gray-300 hover:text-white transition-colors">
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="text-gray-300 hover:text-white transition-colors">
                                    Genres
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Subscription */}
                    <div className="w-full md:w-auto">
                        <h3 className="text-lg font-semibold mb-3">Subscription</h3>
                        <ul className='space-y-2'>
                            <li>
                                <Link to="#" className="text-gray-300 hover:text-white transition-colors">
                                    Plans
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="text-gray-300 hover:text-white transition-colors">
                                    Features
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div className="w-full md:w-auto">
                        <h3 className="text-lg font-semibold mb-3">Connect With Us</h3>
                        <div className="flex gap-2">
                            <a href="#" className="text-gray-300 hover:text-white transition-colors p-2 bg-gray-800 rounded-full hover:bg-gray-700" aria-label="Facebook">
                                <FacebookOutlinedIcon fontSize="small" />
                            </a>
                            <a href="#" className="text-gray-300 hover:text-white transition-colors p-2 bg-gray-800 rounded-full hover:bg-gray-700" aria-label="Twitter">
                                <TwitterIcon fontSize="small" />
                            </a>
                            <a href="#" className="text-gray-300 hover:text-white transition-colors p-2 bg-gray-800 rounded-full hover:bg-gray-700" aria-label="LinkedIn">
                                <LinkedInIcon fontSize="small" />
                            </a>
                        </div>
                    </div>
                </div>

                <hr className='border-gray-700 my-6' />

                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-gray-400 text-sm">
                        © {new Date().getFullYear()} KensDrive, All Rights Reserved
                    </div>
                    <div className='flex gap-4 items-center'>
                        <button 
                            onClick={() => setIsOpen(true)} 
                            className="text-gray-400 hover:text-white transition-colors text-sm"
                        >
                            Terms & Conditions
                        </button>
                        <div className="bg-gray-700 w-px h-4"></div>
                        <Link to="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                            Privacy Policy
                        </Link>
                    </div>
                </div>
            </div>

            {/* Terms Modal */}
            <Dialog 
                open={isOpen} 
                onClose={() => setIsOpen(false)} 
                className="relative z-50"
                initialFocus={closeButtonRef}
            >
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="mx-auto max-w-3xl w-full rounded-lg bg-white p-6 max-h-[90vh] overflow-y-auto shadow-xl">
                        <div className="flex justify-between items-start mb-4">
                            <Dialog.Title className="text-2xl font-bold text-gray-800">
                                Terms and Conditions
                            </Dialog.Title>
                            <button 
                                ref={closeButtonRef}
                                onClick={() => setIsOpen(false)}
                                className="text-gray-500 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 text-xl font-bold p-1 rounded transition-colors"
                                aria-label="Close terms dialog"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="text-base text-gray-700 space-y-4 pr-4">
                            <p><strong>Effective Date:</strong> 21/7/25</p>
                            <p>Welcome to KenshDrive! These Terms and Conditions ("Terms") govern your use...</p>
                            
                            <section className="pt-2">
                                <h2 className="font-bold text-lg text-gray-900">1. Acceptance of Terms</h2>
                                <p>By accessing or using KenshDrive...</p>
                            </section>
                            
                            <section className="pt-2">
                                <h2 className="font-bold text-lg text-gray-900">2. Services Provided</h2>
                                <p>KenshDrive offers file hosting, sharing...</p>
                            </section>
                            
                            {/* Add remaining sections similarly */}
                            
                            <section className="pt-2">
                                <h2 className="font-bold text-lg text-gray-900">10. Contact Information</h2>
                                <p>KenshDrive Support<br />Email: kensdrive@gmail.com</p>
                            </section>
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </footer>
    );
}