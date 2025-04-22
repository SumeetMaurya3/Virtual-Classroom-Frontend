import React, { useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import { db } from "../config/firebase";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";

export default function PopularCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesCollection = collection(db, "Courses");
        const q = query(
          coursesCollection,
          orderBy("Enrolled", "desc"),
          limit(6)
        ); // Order by Enrolled & limit to 6
        const courseSnapshot = await getDocs(q);
        const courseList = courseSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCourses(courseList);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          id={course.id} // Pass course ID
          image={course.Img}
          name={course.name}
          price={course.price}
          discountPrice={course.discountPrice}
          type={course.Field}
          modules={course.modules || []} // Ensure modules are passed
        />
      ))}
    </div>
  );
}
