import React, { useEffect, useState } from "react";
import "../pay.css"



export default function Subscription() {
    const [plan, setPlan] = useState("Basic");
    const [userId, setUserId] = useState(null);
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await fetch(`https://cinema-flame-seven.vercel.app/api/user/profile`, {
                    method: "GET",
                    credentials: "include", // sends cookies
                });

                if (!res.ok) {
                    throw new Error("Failed to fetch profile");
                }

                const data = await res.json();
                setUserId(data.user._id);

            } catch (err) {
                console.error(err.message);
                setUserId(null);
            }
        };

        fetchProfile();
    }, []);

    const plans = [
        { name: "Basic", price: 899, label: "$8.99", quality: "Good", devices: "1", devicesList: ["Mobile", "Tablet"] },
        { name: "Standard", price: 1399, label: "$13.99", quality: "Better", devices: "2", devicesList: ["Mobile", "Tablet", "Laptop"] },
        { name: "Premium", price: 1799, label: "$17.99", quality: "Best", devices: "4", devicesList: ["Mobile", "Tablet", "Laptop", "TV"] },
    ];

    const handlePayment = async () => {
        const selectedPlan = plans.find((p) => p.name === plan);

        const res = await fetch(`${import.meta.env.VITE_API_URL}user/payment/create-order`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                amount: selectedPlan.price,
                currency: "INR",
                plan: selectedPlan.name,
                userId: userId,
            }),
        });

        const data = await res.json();

        const options = {
            key: 'rzp_test_CY6Vuttr0BdTnS',
            amount: selectedPlan.price,
            currency: "INR",
            name: "Cinema Subscription",
            description: `${selectedPlan.name} Plan`,
            order_id: data.orderId,
            handler: async function (response) {
                const verifyRes = await fetch(`${import.meta.env.VITE_API_URL}user/payment/verify`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                        plan: selectedPlan.name,
                        userId: userId,
                    }),
                });

                const verifyData = await verifyRes.json();
                if (verifyData.success) {
                    alert("🎉 Subscription activated!");
                    // 👉 you can also setState or refetch user profile
                } else {
                    alert("❌ Payment verification failed");
                }
            },
            theme: { color: "#F59E0B" },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    };


    return (
        <div className="px-6 py-10 text-white flex justify-center items-center">
            <div className="glass bg-white/10 backdrop-blur-md rounded-2xl shadow-lg w-full max-w-3xl p-8">
                <h1 className="text-3xl font-bold mb-6 text-center">Choose Your Cinema Plan</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {plans.map((p) => (
                        <label
                            key={p.name}
                            className={`p-6 rounded-xl border bg-black/20 backdrop-blur-md cursor-pointer transition ${plan === p.name
                                ? "border-yellow-500 bg-yellow-500/20"
                                : "border-gray-500 hover:border-yellow-400"
                                }`}
                        >
                            <input
                                type="radio"
                                name="plan"
                                value={p.name}
                                checked={plan === p.name}
                                onChange={(e) => setPlan(e.target.value)}
                                className="hidden"
                            />
                            <h2 className="text-xl font-semibold mb-2">{p.name}</h2>
                            <p className="text-2xl font-bold">{p.label}</p>
                            <p className="mt-2 text-sm">Quality: {p.quality}</p>
                            <p className="text-sm">Devices: {p.devices}</p>
                            <ul className="mt-2 text-xs text-gray-300 list-disc list-inside">
                                {p.devicesList.map((device) => (
                                    <li key={device}>{device}</li>
                                ))}
                            </ul>
                        </label>
                    ))}
                </div>
                
                <button onClick={handlePayment} class="pay-btn">
                    <span class="btn-text">Pay Now</span>
                    <div class="icon-container">
                        <svg viewBox="0 0 24 24" class="icon card-icon">
                            <path
                                d="M20,8H4V6H20M20,18H4V12H20M20,4H4C2.89,4 2,4.89 2,6V18C2,19.11 2.89,20 4,20H20C21.11,20 22,19.11 22,18V6C22,4.89 21.11,4 20,4Z"
                                fill="currentColor"
                            ></path>
                        </svg>
                        <svg viewBox="0 0 24 24" class="icon payment-icon">
                            <path
                                d="M2,17H22V21H2V17M6.25,7H9V6H6V3H18V6H15V7H17.75L19,17H5L6.25,7M9,10H15V8H9V10M9,13H15V11H9V13Z"
                                fill="currentColor"
                            ></path>
                        </svg>
                        <svg viewBox="0 0 24 24" class="icon dollar-icon">
                            <path
                                d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"
                                fill="currentColor"
                            ></path>
                        </svg>

                        <svg viewBox="0 0 24 24" class="icon wallet-icon default-icon">
                            <path
                                d="M21,18V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5A2,2 0 0,1 5,3H19A2,2 0 0,1 21,5V6H12C10.89,6 10,6.9 10,8V16A2,2 0 0,0 12,18M12,16H22V8H12M16,13.5A1.5,1.5 0 0,1 14.5,12A1.5,1.5 0 0,1 16,10.5A1.5,1.5 0 0,1 17.5,12A1.5,1.5 0 0,1 16,13.5Z"
                                fill="currentColor"
                            ></path>
                        </svg>

                        <svg viewBox="0 0 24 24" class="icon check-icon">
                            <path
                                d="M9,16.17L4.83,12L3.41,13.41L9,19L21,7L19.59,5.59L9,16.17Z"
                                fill="currentColor"
                            ></path>
                        </svg>
                    </div>
                </button>

            </div>
        </div>
    );
}
