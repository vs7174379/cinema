import React, { useEffect, useState } from "react";



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
        amount: selectedPlan.price * 100,
        currency: "INR",
        plan: selectedPlan.name,
        userId: userId, 
      }),
    });

    const data = await res.json();

    const options = {
      key: 'rzp_test_CY6Vuttr0BdTnS',
      amount: selectedPlan.price * 100,
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
        <button
          onClick={handlePayment}
          className="mt-8 w-full bg-red-600 hover:bg-red-700 p-3 rounded-lg font-semibold text-lg"
        >
          Subscribe with Razorpay
        </button>
      </div>
    </div>
  );
}
