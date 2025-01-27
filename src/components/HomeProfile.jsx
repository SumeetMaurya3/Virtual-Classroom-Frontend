import React from "react";
import "./HomeProfile.css";
import SimpleProfile from "./SimpleProfile";
import HomeCharts from "./HomeCharts";
import HomeData from "./HomeData";
import CourseCard from "./CourseCard";
const HomeProfile = () => {
  // Static data for demonstration


  return (
    <div className="overflow-hidden">
      <div className="lg:flex md:border-b-2 md:border-slate-700">
        <SimpleProfile/>
        <div className="lg:flex-row  grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 ">
        <HomeData/>
        <HomeCharts/>
        </div>
      </div>

      
    </div>
  );
};

export default HomeProfile;
