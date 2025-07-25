import React, { useEffect, useRef, useState } from 'react';
import { Apihelper } from '../common/service/ApiHelper';
import { useNavigate } from 'react-router-dom';

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
    const [Plans, setPlans] = useState([]);
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
    async function listplan() {
        try {
            const res = await Apihelper.Activeplan()
            setPlans(res.data.data)
            console.log(res.data.data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        listplan()
    }, []);

    const navigate = useNavigate();

    // Razorpay payment handler
    const handleRazorpay = async (plan) => {
        let user = null;
        let token = null;
        try {
          user = JSON.parse(localStorage.getItem("userinfo"));
          token = localStorage.getItem("token");
        } catch {
          user = null;
          token = null;
        }
      
        if (!token) {
          navigate("/login");
          return;
        }
      
        try {
          // ✅ Step 1: Create order from backend
          const orderRes = await Apihelper.crearteorder({
            userid: user?._id,
            premiumType: plan.name,
            price: plan.price,
            days: plan.durationInDays,
          });
      
          const order = orderRes.data.data.razorpayDetails;
      
          // ✅ Step 2: Razorpay checkout options
          const options = {
            key: "rzp_test_zGCQXPmnJfWXkO",
            amount: order.amount,
            currency: order.currency,
            name: "KenshMovis",
            description: `Subscribe to ${plan.name} plan`,
            order_id: order.id, // Razorpay Order ID
            handler: async function (response) {
              try {
                // ✅ Step 3: Call upgrade API
                await Apihelper.upgradplan({
                  type: plan.name,
                  orderId: orderRes.data.data._id, // MongoDB doc ID
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  user: user,
                });
                alert("Payment and upgrade successful!");
              } catch (err) {
                alert("Payment succeeded but backend failed: " + err.message);
              }
            },
            prefill: {
              name: user?.name || "",
              email: user?.email || "",
              contact: user?.phone || "",
            },
            theme: { color: "#dc2626" },
          };
      
          const rzp = new window.Razorpay(options);
          rzp.open();
        } catch (error) {
          alert("Order creation failed: " + error.message);
        }
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

                <div className="w-full mb-6">
                    x
                </div>
                <div className="flex flex-col md:flex-row md:space-x-6 gap-6">
                    {Plans.map((plan, index) => (
                        <div className="flex-1 mb-4 md:mb-0" key={index}>
                            <div className={`relative bg-[#18181b] rounded-2xl p-6 h-full flex flex-col shadow-lg border border-gray-800 ${plan._id ? 'ring-2 ring-red-500' : ''}`}>
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
                                        {/* {planType === 'yearly' && (
                                            <div className="mt-2">
                                                <span className="bg-green-600 text-white px-2 py-1 rounded text-xs font-semibold">
                                                    Save {calculateSavings(plansData.monthly[index].price, plan.price)}%
                                                </span>
                                            </div>
                                        )} */}
                                    </div>
                                    <p className="text-gray-200 text-sm">{plan.features.Content}</p>
                                </div>
                                <div className="mb-4 space-y-2">
                                    {/* Debug log for features */}

                                    {plan.features && Object.entries(plan.features).length > 0 ? (
                                        Object.entries(plan.features).map(([key, value], i) => (
                                            <div className="flex items-center" key={i}>
                                                <svg className={`w-5 h-5 mr-2 ${value === true ? 'text-green-500' : value === false ? 'text-red-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                    {value === true ? (
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                    ) : value === false ? (
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                    ) : (
                                                        <circle cx="12" cy="12" r="10" />
                                                    )}
                                                </svg>
                                                <span className="text-white font-semibold mr-2">{key}:</span>
                                                <span className="text-gray-200">{String(value)}</span>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-gray-400">No features available</div>
                                    )}
                                </div>
                                <div className="mt-auto">
                                    <button className='bg-red-600 text-white w-full py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors'
                                        onClick={() => handleRazorpay(plan)}
                                    >
                                        <span className="block mb-1">Choose {plan.name} Plan</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="my-10"></div>

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
