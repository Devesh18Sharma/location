require('dotenv').config();
import React, { useState } from "react";
import "./style.css"
import axios from "axios"; // Import Axios for making API requests

function IndexPopup() {
  const ipinfoToken = process.env.IPINFO_TOKEN;
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false); // State for loading button

  const fetchLocation = async () => {
    setLoading(true); // Set loading state

    try {
      // Fetch user's IP address
      const response = await axios.get("https://api64.ipify.org?format=json");
      const userIP = response.data.ip;

      // Fetch country and city from IP address using ipinfo.io API
      const ipinfoResponse = await axios.get(
        `https://ipinfo.io/${userIP}/json?token=e87e9fcd12b9cf`
      );
      const { country, city } = ipinfoResponse.data;

      // Update the data state with the fetched location
      setData(`Your country is ${country} and city is ${city}`);
    } catch (error) {
      console.error("Error fetching location:", error);
      setData("Error fetching location");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center p-8 space-y-4"
      style={{
        width: "500px",
        height: "500px",
      }}
    >
      <h1 className="text-2xl font-semibold">
        Welcome to your{" "}
        <a
          href="https://www.plasmo.com"
          target="_blank"
          rel='noopener'
          className="text-blue-600"
        >
          Location
        </a>{" "}
        Extension!
      </h1>
      <button
        onClick={fetchLocation}
        className={`px-4 py-2 rounded-lg ${
          loading
            ? "bg-gray-400 cursor-wait"
            : "bg-blue-500 hover:bg-blue-600 cursor-pointer"
        }`}
        disabled={loading}
      >
        {loading ? "Loading..." : "Show my location"}
      </button>
      {data && <p className="text-center">{data}</p>}
      <a
        href="https://docs.plasmo.com"
        target="_blank"
        rel='noopener'
        className="text-blue-600"
      >
        View Docs
      </a>
    </div>
  );
}

export default IndexPopup;
