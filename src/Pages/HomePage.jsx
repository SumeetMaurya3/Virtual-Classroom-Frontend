import React, { useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Head from "../components/Head.jsx";
import HomeProfile from "../components/HomeProfile.jsx";
import PopularCourses from "../components/PopularCourses.jsx";
import Foot from "../components/Foot.jsx";

export default function HomePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <Head />
      {user ? (
        <HomeProfile />
      ) : (
        <div className="text-center text-white text-xl py-10">
          Please{" "}
          <a href="/login" className="text-blue-500 underline">
            login
          </a>{" "}
          to continue
        </div>
      )}
      <PopularCourses />
      <Foot />
    </>
  );
}
