import React, { useState } from "react";

export default function Subscription() {
  const [plan, setPlan] = useState("Basic");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Selected Plan:", plan);
    // API call to save subscription choice goes here
  };

  const plans = [
    { name: "Basic", price: "$8.99", quality: "Good", devices: "1", devicesList: ["Mobile", "Tablet"] },
    { name: "Standard", price: "$13.99", quality: "Better", devices: "2", devicesList: ["Mobile", "Tablet", "Laptop"] },
    { name: "Premium", price: "$17.99", quality: "Best", devices: "4", devicesList: ["Mobile", "Tablet", "Laptop", "TV"] },
  ];

  return (
    <div className=" px-6 py-10 text-white flex justify-center items-center ">
      <form
        onSubmit={handleSubmit}
        className="glass bg-white/10 backdrop-blur-md  rounded-2xl shadow-lg w-full max-w-3xl p-8"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">Choose Your Cinema Plan</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((p) => (
            <label
              key={p.name}
              className={`p-6 rounded-xl border bg-black/20 backdrop-blur-md glass cursor-pointer transition ${plan === p.name ? "border-red-500 bg-red-500/20" : "border-gray-500 hover:border-red-400"}`}
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
              <p className="text-2xl font-bold">{p.price}</p>
              <p className="mt-2 text-sm">Quality: {p.quality}</p>
              <p className="text-sm">Devices: {p.devices}</p>
              <ul className="mt-2 text-xs text-gray-300 backdrop-blur-md list-disc list-inside">
                {p.devicesList.map((device) => (
                  <li key={device}>{device}</li>
                ))}
              </ul>
            </label>
          ))}
        </div>
        <button
          type="submit"
          className="mt-8 w-full bg-red-600 hover:bg-red-700 p-3 rounded-lg font-semibold text-lg"
        >
          Continue
        </button>
      </form>
    </div>
  );
}
