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
    const [privacyOpen, setPrivacyOpen] = useState(false);

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
                        <button
                            onClick={() => setPrivacyOpen(true)}
                            className="text-gray-400 hover:text-white transition-colors text-sm"
                        >
                            Privacy Policy
                        </button>
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
    {/* Privacy Policy Modal */}
    <Dialog
      open={privacyOpen}
      onClose={() => setPrivacyOpen(false)}
      className="relative z-50"
      initialFocus={closeButtonRef}
    >
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-3xl w-full rounded-lg bg-white p-6 max-h-[90vh] overflow-y-auto shadow-xl">
          <div className="flex justify-between items-start mb-4">
            <Dialog.Title className="text-2xl font-bold text-gray-800">
              Privacy Policy for KenshDrive
            </Dialog.Title>
            <button
              ref={closeButtonRef}
              onClick={() => setPrivacyOpen(false)}
              className="text-gray-500 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 text-xl font-bold p-1 rounded transition-colors"
              aria-label="Close privacy dialog"
            >
              ✕
            </button>
          </div>
          <div className="text-base text-gray-700 space-y-4 pr-4" style={{ whiteSpace: 'pre-line' }}>
{`
Effective Date: 21/7/25

At KenshDrive, accessible from https://kensdrive.co.in/, we value your privacy and are committed to protecting your personal data. This Privacy Policy outlines the types of information we collect, how we use it, and the choices you have regarding your information.

1. Information We Collect
We collect the following types of data when you use our services:

Personal Information: Such as name, email address, and contact details when voluntarily provided.

Device Information: Browser type, IP address, operating system, and device type.

Usage Data: Pages visited, features used, links clicked, time spent on the website, and referral source.

We do not collect or store sensitive personal data unless necessary and explicitly provided by you.

2. How We Use Your Information
Your information may be used to:

Provide, maintain, and improve our services.

Send notifications and updates.

Respond to customer service requests and technical support.

Monitor analytics and user behavior to enhance functionality.

Prevent fraud and ensure security.

We do not sell or share your personal information with third parties for marketing purposes.

3. Cookies & Tracking Technologies
We use cookies and similar technologies to:

Save your preferences.

Improve website performance.

Analyze traffic and user behavior.

You can disable cookies in your browser settings, but some features may not function properly.

4. Data Security
We use industry-standard security measures such as HTTPS, encryption, and access control to protect your information. While we strive to secure your data, no method of transmission over the internet is 100% secure.

5. Third-Party Services
Our website may use or link to third-party services like analytics, hosting providers, or cloud storage. These services have their own privacy policies, and we encourage you to review them.

6. Children's Privacy
Our service is not intended for children under 13. We do not knowingly collect information from anyone under that age. If you believe a child has provided us with data, contact us and we will remove it.

7. Your Rights
You have the right to:

Access, update, or delete your personal data.

Withdraw consent at any time.

Request a copy of the data we store.

To exercise these rights, please contact us.

8. Changes to This Privacy Policy
We may update this Privacy Policy from time to time. Changes will be posted on this page with a new effective date. Continued use of the site indicates your agreement to the revised terms.

9. Contact Us
If you have questions about this Privacy Policy or your data, contact:

KenshDrive Support
Email: kensdrive@gmail.com
`}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
        </footer>
    );
}