import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import Topics from "../components/Topics";
import Head from "../components/Head";

const TopicsUpdated = () => {
  const { mainid } = useParams(); // gets course ID from URL
  const [steps, setSteps] = useState([]);
  const [courseData, setCourseData] = useState(null);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const courseRef = doc(db, "Courses", mainid);
        const courseSnap = await getDoc(courseRef);

        if (courseSnap.exists()) {
          setCourseData(courseSnap.data());

          // Fetch modules
          const modulesRef = collection(db, "Courses", mainid, "modules");
          const modulesSnap = await getDocs(modulesRef);

          const modules = [];
          modulesSnap.forEach((doc) => {
            modules.push({
              title: doc.data().name,
              completed: 0, // Or fetch actual progress from user's data
              total: doc.data().slides || 0,
            });
          });

          setSteps(modules);
        }
      } catch (err) {
        console.error("Error fetching course data: ", err);
      }
    };

    fetchCourseData();
  }, [mainid]);

  return (
    <>
      <Head />
      <div className="flex items-center justify-between h-screen p-5 text-white">
        <h1 className="text-2xl w-1/2 mt-4 font-bold">{courseData?.name}</h1>
        <img
          src={courseData?.RoadMap}
          alt="Course Roadmap"
          className="mt-4 h-full max-w-xl mx-auto "
        />
      </div>

      <h1 className="text-2xl mt-4 pl-10 text-white font-bold">All Topics</h1>
      <div className="bg-black min-h-screen p-10">
        {steps.map((step, index) => (
          <a href={`/study/${step.title}`} key={index}>
            <Topics step={step} />
          </a>
        ))}
      </div>
    </>
  );
};

export default TopicsUpdated;
