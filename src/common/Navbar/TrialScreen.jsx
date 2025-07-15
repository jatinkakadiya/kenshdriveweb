import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function TrialScreen() {

    const navigete = useNavigate()
    return (
        <div className="relative w-full h-[220px] md:h-[250px] flex items-center justify-center overflow-hidden pb-10">
            <img
                src="https://res.cloudinary.com/dmwiolmq1/image/upload/v1748178390/freetrial-bg-img_dcxfav.png"
                alt="Free Trial Background"
                className="absolute inset-0 w-full h-full object-cover z-0"
            />
            <div className="absolute inset-0 bg-black/70 flex flex-col md:flex-row items-center justify-between px-4 md:px-16 py-8 z-10">
                <div className="flex-1 flex flex-col items-center md:items-start">
                    <h2 className="text-white font-bold mb-3 text-2xl md:text-3xl text-center md:text-left">Start your free trial today!</h2>
                    <p className="text-white mb-4 md:mb-0 text-center md:text-left max-w-xl">
                        This is a clear and concise call to action that encourages users to sign up for a free trial of StreamVibe.
                    </p>
                </div>
                <button onClick={()=>navigete("/subscription")} className="bg-red-700 hover:bg-red-800 text-white font-bold px-8 py-3 rounded-lg shadow mt-4 md:mt-0 md:ml-8 transition-all duration-200" >
                    Start Free Trial
                </button>
            </div>
        </div>
    );
}