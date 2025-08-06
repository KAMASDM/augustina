"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Hero from "./Hero";
import Services from "./Services";
// import Offers from "./Offers";
import Testimonials from "./Testimonials";
import About from "./About";
import Clients from "./Clients";
// import AboutUs from "../AboutUs/AboutUs";

const HomePage = () => {
  const [homepageData, setHomepageData] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const response = await axios.get(
          "https://sweekarme.in/asiabio/api/homepage/"
        );
        setHomepageData(response.data);
      } catch (err) {
        console.error("Error fetching homepage data:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl text-gray-700">Loading Home Page...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl text-red-600">
          Error: Failed to load homepage data.
        </p>
      </div>
    );
  }

  return (
    <main>
      <Hero heroData= {homepageData}/>
      <About aboutData ={homepageData}/> 
      <Services serviceData ={homepageData}/>
      {/* <Offers offers ={homepageData}/> */}
      <Testimonials testimonials={homepageData}/>
      <Clients clients={homepageData} />
    </main>
  );
};

export default HomePage;