import React, { useState, useEffect } from "react";
import CourseCard from "../components/CourseCard";
import Head from "../components/Head";
import Foot from "../components/Foot";
import { db, auth } from "../config/firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

export default function YourCourses() {
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);

  useEffect(() => {
    if (!auth.currentUser) return;

    const fetchPurchasedCourses = async () => {
      try {
        const userRef = doc(db, "ClientInfo", auth.currentUser.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          console.log("User data:", userSnap.data()); // Debugging

          const purchasedCourseIDs = new Set(
            (userSnap.data().Courses || []).map((course) => course.courseId)
          );

          console.log("Extracted Course IDs:", purchasedCourseIDs); // Debugging

          const coursesCollection = collection(db, "Courses");
          const courseSnapshot = await getDocs(coursesCollection);
          const courseList = courseSnapshot.docs
            .map((doc) => ({ id: doc.id, ...doc.data() }))
            .filter((course) => purchasedCourseIDs.has(course.id));

          console.log("Filtered Courses:", courseList); // Debugging

          setCourses(courseList);
          setFilteredCourses(courseList);
        }
      } catch (error) {
        console.error("Error fetching purchased courses:", error);
      }
    };

    fetchPurchasedCourses();
  }, []);

  // Update filtered courses on search
  useEffect(() => {
    const filtered = courses.filter((course) =>
      course.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCourses(filtered);
  }, [searchQuery, courses]);

  return (
    <>
      <Head />
      <div className="flex justify-between p-10">
        <div className="text-white font-bold text-xl">Your Courses</div>

        {/* Search Input */}
        <div className="w-full max-w-sm min-w-[200px]">
          <input
            type="text"
            className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-4 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            placeholder="Search your courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              id={course.id}
              image={course.Img}
              name={course.name}
              price={course.price}
              discountPrice={course.discountPrice}
              type={course.Field}
              modules={course.modules || []}
            />
          ))
        ) : (
          <div className="text-center text-gray-400 text-lg col-span-full">
            No courses found.
          </div>
        )}
      </div>
      <Foot />
    </>
  );
}
