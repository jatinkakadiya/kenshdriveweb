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
            <p>Welcome to KenshDrive! These Terms and Conditions ("Terms") govern your use of our website and services, accessible at https://kenshdrive.co.in By using our platform, you agree to these Terms. If you do not agree, please do not use our services.</p>
            
            <section className="pt-2">
              <h2 className="font-bold text-lg text-gray-900">1. Acceptance of Terms</h2>
              <p>By accessing or using KenshDrive, you confirm that you are at least 13 years old and have the legal capacity to enter into a binding agreement. If you are using the service on behalf of an organization, you represent that you have authority to bind that entity to these Terms.</p>
            </section>
            
            <section className="pt-2">
              <h2 className="font-bold text-lg text-gray-900">2. Services Provided</h2>
              <p>KenshDrive offers file hosting, sharing, and content storage services. We reserve the right to update, modify, or discontinue any feature or service without prior notice.</p>
            </section>
            
            <section className="pt-2">
              <h2 className="font-bold text-lg text-gray-900">3. User Responsibilities</h2>
              <p>When using our service, you agree that:</p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>You will not upload or share illegal, harmful, or copyrighted content without permission.</li>
                <li>You are solely responsible for the content you upload or share.</li>
                <li>You will not use our service to distribute viruses, malware, or any other harmful software.</li>
                <li>You will comply with all applicable local, national, and international laws and regulations.</li>
              </ul>
              <p className="mt-2">Violation of these terms may result in suspension or termination of your access.</p>
            </section>
            
            <section className="pt-2">
              <h2 className="font-bold text-lg text-gray-900">4. Account & Access</h2>
              <p>You may be required to create an account to access certain features. You agree to:</p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>Provide accurate, up-to-date information.</li>
                <li>Keep your login credentials secure.</li>
                <li>Accept responsibility for all activity under your account.</li>
              </ul>
              <p className="mt-2">We may suspend or terminate your account if we believe it's being used in violation of these Terms.</p>
            </section>
            
            <section className="pt-2">
              <h2 className="font-bold text-lg text-gray-900">5. Content Ownership and License</h2>
              <p>You retain ownership of any content you upload to KenshDrive.</p>
              <p>By uploading content, you grant us a non-exclusive, royalty-free license to host and deliver your files for the purpose of providing the service.</p>
              <p>We do not claim ownership of your content and will not use it for any purpose beyond service functionality.</p>
            </section>
            
            <section className="pt-2">
              <h2 className="font-bold text-lg text-gray-900">6. Limitation of Liability</h2>
              <p>KenshDrive is provided "as is" and "as available." We do not guarantee uninterrupted or error-free service.</p>
              <p>We are not liable for:</p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>Data loss or corruption</li>
                <li>Service interruptions</li>
                <li>Unauthorized access to user data</li>
                <li>Damages resulting from the use or inability to use the service</li>
              </ul>
              <p className="mt-2">Your use of the service is at your own risk.</p>
            </section>
            
            <section className="pt-2">
              <h2 className="font-bold text-lg text-gray-900">7. Termination</h2>
              <p>We reserve the right to suspend or terminate your access at any time, without notice, for any reason, including violation of these Terms.</p>
              <p>You may stop using the service at any time. Content may be deleted upon termination.</p>
            </section>
            
            <section className="pt-2">
              <h2 className="font-bold text-lg text-gray-900">8. Modifications to Terms</h2>
              <p>We may update these Terms at any time. Changes will be posted here with an updated "Effective Date." Continued use of the service after changes means you accept the new Terms.</p>
            </section>
            
            <section className="pt-2">
              <h2 className="font-bold text-lg text-gray-900">9. Governing Law</h2>
              <p>These Terms are governed by the laws of india. Any legal disputes must be filed in the courts of that jurisdiction.</p>
            </section>
            
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