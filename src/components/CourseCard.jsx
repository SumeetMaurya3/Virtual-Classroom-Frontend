import React, { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  updateDoc,
  getDocs,
} from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { useNavigate } from "react-router-dom"; // For redirection

export default function CourseCard({
  id,
  image,
  name,
  price,
  discountPrice,
  type,
  modules = [], // Ensure modules is an array
}) {
  const [ownsCourse, setOwnsCourse] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkOwnership = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const userRef = doc(db, "ClientInfo", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        const isOwned = userData.Courses.some(
          (course) => course.courseId === id
        );
        setOwnsCourse(isOwned);
      }
    };

    checkOwnership();
  }, [id]);

  const purchaseCourse = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        alert("Please sign in to purchase this course.");
        return;
      }

      const userRef = doc(db, "ClientInfo", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        console.error("User not found.");
        return;
      }

      const userData = userSnap.data();

      if (ownsCourse) {
        alert("You already own this course.");
        return;
      }

      // Fetch the modules from the subcollection
      const modulesRef = collection(db, "Courses", id, "modules");
      const modulesSnap = await getDocs(modulesRef);
      const modulesList = modulesSnap.docs.map((doc) => ({
        moduleId: doc.id,
        name: doc.data().name,
        slidesCompleted: 0, // Track progress
        totalSlides: doc.data().slides, // Store total slides
      }));

      const newCourse = {
        courseId: id,
        modules: modulesList,
      };

      await updateDoc(userRef, {
        Courses: [...userData.Courses, newCourse],
        Models: userData.Models + modulesList.length,
      });

      setOwnsCourse(true);
      alert("Course purchased successfully!");
    } catch (error) {
      console.error("Error purchasing course:", error);
    }
  };

  return (
    <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
      <img
        src={image}
        alt={name}
        className="h-80 w-72 object-cover rounded-t-xl"
      />
      <div className="px-4 py-3 w-72">
        <span className="text-gray-400 mr-3 uppercase text-xs">{type}</span>
        <p className="text-lg font-bold text-black truncate block capitalize">
          {name}
        </p>
        <div className="flex items-center">
          <p className="text-lg font-semibold text-black cursor-auto my-3">
            ₹{price}
          </p>
          {discountPrice && (
            <del>
              <p className="text-sm text-gray-600 cursor-auto ml-2">
                ₹{discountPrice}
              </p>
            </del>
          )}

          {ownsCourse ? (
            <button
              onClick={() => navigate(`/course/${id}`)} // Redirect to course page
              className="ml-auto bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600"
            >
              Study
            </button>
          ) : (
            <button
              onClick={purchaseCourse}
              className="ml-auto bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600"
            >
              Buy Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
