import React, { useState } from 'react';

const plansData = {
    monthly: [
        {
            name: 'Basic',
            price: 99.99,
            features: {
                Content: 'Access to a wide selection of movies and shows, including some new releases.',
                Devices: 'Watch on one device simultaneously',
                'Cancel Anytime': 'Yes',
                HDR: 'No',
                'Dolby Atmos': 'No',
                'Ad- Free': 'No',
                'Offline Viewing': 'No',
                'Family Sharing': 'No'
            }
        },
        {
            name: 'Standard',
            price: 150.99,
            tag: 'Popular',
            features: {
                Content: 'Access to a wider selection of movies and shows, including most new releases and exclusive content.',
                Devices: 'Watch on Two device simultaneously',
                'Cancel Anytime': 'Yes',
                HDR: 'Yes',
                'Dolby Atmos': 'Yes',
                'Ad- Free': 'Yes',
                'Offline Viewing': 'Yes, for select titles.',
                'Family Sharing': 'Yes, up to 5 family members.'
            }
        },
        {
            name: 'Premium',
            price: 200.99,
            features: {
                Content: 'Access to widest selection of movies and shows, including all new releases and Offline Viewing',
                Devices: 'Watch on Four device simultaneously',
                'Cancel Anytime': 'Yes',
                HDR: 'Yes',
                'Dolby Atmos': 'Yes',
                'Ad- Free': 'Yes',
                'Offline Viewing': 'Yes, for all titles.',
                'Family Sharing': 'Yes, up to 6 family members.'
            }
        }
    ],
    yearly: [
        {
            name: 'Basic',
            price: 999.99,
            features: {
                Content: 'Access to a wide selection of movies and shows, including some new releases.',
                Devices: 'Watch on one device simultaneously',
                'Cancel Anytime': 'Yes',
                HDR: 'No',
                'Dolby Atmos': 'No',
                'Ad- Free': 'No',
                'Offline Viewing': 'No',
                'Family Sharing': 'No'
            }
        },
        {
            name: 'Standard',
            price: 1129.99,
            tag: 'Popular',
            features: {
                Content: 'Access to a wider selection of movies and shows, including most new releases and exclusive content.',
                Devices: 'Watch on Two device simultaneously',
                'Cancel Anytime': 'Yes',
                HDR: 'Yes',
                'Dolby Atmos': 'Yes',
                'Ad- Free': 'Yes',
                'Offline Viewing': 'Yes, for select titles.',
                'Family Sharing': 'Yes, up to 5 family members.'
            }
        },
        {
            name: 'Premium',
            price: 1490.99,
            features: {
                Content: 'Access to widest selection of movies and shows, including all new releases and Offline Viewing',
                Devices: 'Watch on Four device simultaneously',
                'Cancel Anytime': 'Yes',
                HDR: 'Yes',
                'Dolby Atmos': 'Yes',
                'Ad- Free': 'Yes',
                'Offline Viewing': 'Yes, for all titles.',
                'Family Sharing': 'Yes, up to 6 family members.'
            }
        }
    ]
};

export default function SubscriptionsScreen() {
    const [planType, setPlanType] = useState('monthly');
    const plans = plansData[planType];
    const [activeTab, setActiveTab] = useState(0); // Default to first tab
    const handlePlanTypeChange = (type) => {
        setPlanType(type);
    };

    const calculateSavings = (monthlyPrice, yearlyPrice) => {
        const monthlyYearTotal = monthlyPrice * 12;
        const savings = ((monthlyYearTotal - yearlyPrice) / monthlyYearTotal * 100).toFixed(0);
        return savings;
    };

    return (
        <div className="max-w-7xl mx-auto pt-10 px-4">
            <div className="mb-8"></div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between bg-[#18181b] rounded-xl p-6 mb-6 gap-4">
                <div className="flex-1 flex flex-col gap-2">
                    <div className='text-2xl font-bold mb-0 text-white'>Choose the plan that's right for you</div>
                    <p className='mt-0 text-gray-300'>Join StreamVibe and select from our flexible subscription options tailored to suit your viewing preferences. Get ready for non-stop entertainment!</p>
                </div>
                <div className="flex items-center justify-end w-full md:w-auto">
                    <div className="pt-4 md:pt-0">
                        <div className="flex gap-3 bg-black rounded-lg p-1 w-full">
                            <button
                                className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-200 ${planType === 'monthly' ? 'bg-[#18181b] text-white' : 'bg-black text-gray-300 hover:bg-gray-700'}`}
                                onClick={() => handlePlanTypeChange('monthly')}
                            >
                                Monthly
                            </button>
                            <button
                                className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-200 ${planType === 'yearly' ? 'bg-[#18181b] text-white' : 'bg-black text-gray-300 hover:bg-gray-700'}`}
                                onClick={() => handlePlanTypeChange('yearly')}
                            >
                                Yearly
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-6">
                {/* Show message and input only once above all cards */}
                <div className="mb-4 text-red-600 font-semibold text-center">
                    Add a link to get 7 days free on the Basic plan.
                </div>
                <div className="w-full mb-6">
                    <div className="flex flex-col sm:flex-row gap-3 mx-auto w-full sm:max-w-lg">
                        <input
                            type="text"
                            className="w-full sm:flex-1 py-2 px-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500
                 text-white placeholder:text-white bg-transparent"
                            placeholder="Enter link"
                        />
                        <button
                            className="w-full sm:w-auto bg-red-600 text-white rounded-lg px-6 py-2 font-semibold hover:bg-red-700 transition-colors"
                            type="button"
                        >
                            Submit
                        </button>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row md:space-x-6 gap-6">
                    {plans.map((plan, index) => (
                        <div className="flex-1 mb-4 md:mb-0" key={index}>
                            <div className={`relative bg-[#18181b] rounded-2xl p-6 h-full flex flex-col shadow-lg border border-gray-800 ${plan.tag ? 'ring-2 ring-red-500' : ''}`}>
                                {plan.tag && (
                                    <div className="absolute top-4 right-4">
                                        <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow">Most Popular</span>
                                    </div>
                                )}
                                <div className="mb-4">
                                    <div className='text-white text-xl font-semibold mb-3 flex justify-between items-center'>
                                        <span>{plan.name}</span>
                                    </div>
                                    <div className="mb-3">
                                        <h2 className="text-3xl font-bold text-white mb-0 flex items-end">
                                            <span className="mr-1">₹</span>
                                            <span>{plan.price}</span>
                                            <span className="ml-1 text-base font-medium">/{planType}</span>
                                        </h2>
                                        {planType === 'yearly' && (
                                            <div className="mt-2">
                                                <span className="bg-green-600 text-white px-2 py-1 rounded text-xs font-semibold">
                                                    Save {calculateSavings(plansData.monthly[index].price, plan.price)}%
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-gray-200 text-sm">{plan.features.Content}</p>
                                </div>
                                <div className="mb-4 space-y-2">
                                    <div className="flex items-center">
                                        <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L6 13.25l1.41-1.41L9.75 14.17l6.84-6.84L18 8.75z" /></svg>
                                        <span className="text-white">{plan.features.Devices}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <svg className={`w-5 h-5 mr-2 ${plan.features.HDR === 'Yes' ? 'text-green-500' : 'text-red-500'}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            {plan.features.HDR === 'Yes' ? (
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            ) : (
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            )}
                                        </svg>
                                        <span className="text-white">HDR</span>
                                    </div>
                                    <div className="flex items-center">
                                        <svg className={`w-5 h-5 mr-2 ${plan.features['Ad- Free'] === 'Yes' ? 'text-green-500' : 'text-red-500'}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            {plan.features['Ad- Free'] === 'Yes' ? (
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            ) : (
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            )}
                                        </svg>
                                        <span className="text-white">Ad Free</span>
                                    </div>
                                </div>
                                <div className="mt-auto">
                                    <button className='bg-red-600 text-white w-full py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors'>
                                        <span className="block mb-1">Choose {plan.name} Plan</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="my-10"></div>
            <div className="text-2xl font-bold text-white mb-2">Compare our plans and find the right one for you</div>
            <p className="text-gray-300 mb-6">StreamVibe offers three different plans to fit your needs: Basic, Standard, and Premium. Compare the features of each plan and choose the one that's right for you.</p>
            <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full text-center bg-[#18181b] rounded-xl overflow-hidden mb-10">
                    <thead>
                        <tr>
                            <th className='text-left px-4 py-3 text-gray-200 text-base font-semibold'>Features</th>
                            {plans.map((plan, idx) => (
                                <th className='w-1/4 text-left px-4 py-3 text-gray-200 text-base font-semibold' key={idx}>
                                    {plan.name}
                                    {plan.tag && <span className="bg-red-600 text-white px-2 py-1 rounded-full text-xs font-bold ml-2">{plan.tag}</span>}
                                    <div className="text-red-500 mt-1 font-semibold">
                                        ₹{plan.price}/{planType}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(plans[0].features).map((feature, i) => (
                            <tr key={i} className="border-t border-gray-800">
                                <td className='text-left px-4 py-2 text-gray-300'>{feature}</td>
                                {plans.map((plan, idx) => (
                                    <td className='text-left px-4 py-2 text-gray-100' key={idx}>{plan.features[feature]}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Mobile Tabs */}
            {/* <div className="block md:hidden mt-8">
                <div className="bg-[#18181b] rounded-xl pt-1 mb-3">
                    <ul className="flex border-b border-gray-700 mb-3">
                        {plans.map((plan, index) => (
                            <li className="flex-1" key={index}>
                                <button
                                    className={`w-full py-2 text-center font-semibold rounded-t-lg transition-colors duration-200 ${index === 1 ? 'bg-gray-800 text-white' : 'bg-gray-700 text-gray-300'}`}
                                    onClick={() => {}}
                                >
                                    {plan.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    {plans.map((plan, index) => (
                        <div key={index} className={`rounded-xl bg-[#18181b] text-white p-4 mb-4 ${index === 1 ? '' : 'hidden'}`}>
                            <h5 className="text-xl font-bold mb-2">₹{plan.price}/{planType}</h5>
                            {Object.entries(plan.features).map(([key, value], i) => (
                                <p key={i} className="mb-1"><span className="font-semibold">{key}:</span> {value}</p>
                            ))}
                        </div>
                    ))}
                </div>
            </div> */}

            {/* Mobile Tabs */}
            <div className="block md:hidden mt-8">
                <div className="bg-[#18181b] rounded-xl pt-1 mb-3">
                    <ul className="flex border-b border-gray-700 mb-3">
                        {plans.map((plan, index) => (
                            <li className="flex-1" key={index}>
                                <button
                                    className={`w-full py-2 text-center font-semibold rounded-t-lg transition-colors duration-200 ${activeTab === index ? 'bg-black text-white' : 'bg-[#18181b] text-gray-300'
                                        }`}
                                    onClick={() => setActiveTab(index)}
                                >
                                    {plan.name}
                                    {plan.tag && (
                                        <span className=" text-white px-2 py-0.5 rounded-full text-xs font-bold ml-1">
                                            {/* {plan.tag} */}
                                        </span>
                                    )}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`rounded-xl bg-[#18181b] text-white p-4 mb-4 ${activeTab === index ? 'block' : 'hidden'
                                }`}
                        >
                            <div className="flex justify-between items-center mb-3">
                                <h5 className="text-xl font-bold">₹{plan.price}/{planType}</h5>
                                {planType === 'yearly' && (
                                    <span className="bg-green-600 text-white px-2 py-1 rounded text-xs font-semibold">
                                        Save {calculateSavings(plansData.monthly[index].price, plan.price)}%
                                    </span>
                                )}
                            </div>

                            {Object.entries(plan.features).map(([key, value], i) => (
                                <div key={i} className="mb-3">
                                    <p className="font-semibold text-gray-300">{key}</p>
                                    <p className="text-white">{value}</p>
                                </div>
                            ))}

                            <button className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold mt-4 hover:bg-red-700 transition-colors">
                                Choose {plan.name} Plan
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
