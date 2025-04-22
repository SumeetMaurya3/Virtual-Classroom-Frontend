import React, { useState, useEffect } from "react";
import { auth, db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import "./HomeProfile.css";

export default function SimpleProfile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const userRef = doc(db, "ClientInfo", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setUserData(userSnap.data());
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }

      setLoading(false);
    };

    fetchUserData();
  }, []);

  if (loading) return <p>Loading...</p>;

  if (!userData) return <p>User not found.</p>;

  const { Name, Courses = [], Models, Completed, Img } = userData;

  // Calculate total models
  const totalModels = Courses.reduce(
    (acc, course) => acc + (course.modules?.length || 0),
    0
  );

  // Calculate completed slides
  const totalSlidesCompleted = Courses.reduce(
    (acc, course) =>
      acc +
      course.modules.reduce(
        (sum, module) => sum + (module.slidesCompleted || 0),
        0
      ),
    0
  );

  // Calculate Completed percentage
  const completedPercentage = Math.floor(totalSlidesCompleted / 7);

  return (
    <div className="flex justify-right">
      <div
        className="max-w-sm rounded overflow-hidden shadow-lg"
        style={{ background: "rgb(13, 13, 13)", color: "rgba(209,213,219,1)" }}
      >
        <div className="relative z-10">
          <img
            className="w-full clippy z-10"
            src={
              "https://img.freepik.com/premium-vector/smiling-male-student-standing-portrait_1316704-57556.jpg"
            }
            alt="User"
          />
          <div className="clippy absolute bottom-0 left-0 top-0 right-0 bg-blue-700 bg-opacity-50 p-4 text-white flex flex-col justify-end items-center"></div>
          <div className="absolute bottom-0 right-0 mb-6 mr-6 rounded-full h-16 w-16 flex items-center bg-green-400 justify-center text-4xl font-thin text-white shadow-2xl">
            +
          </div>
        </div>
        <div className="pt-3 pb-5 px-5 flex flex-col items-center">
          <p className="font-bold text-3xl">{Name}</p>
          <p className="text-gray-500 mb-2">Engineering Student</p>
          <div className="mt-5 flex flex-row justify-center items-start">
            <div className="px-3 text-center">
              <p className="text-gray-500">Courses</p>
              <b className="text-2xl">{Courses.length}</b>
            </div>
            <div className="px-3 text-center">
              <p className="text-gray-500">Models</p>
              <b className="text-2xl">{totalModels}</b>
            </div>
            <div className="px-3 text-center">
              <p className="text-gray-500">Completed</p>
              <b className="text-2xl">{completedPercentage}</b>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
