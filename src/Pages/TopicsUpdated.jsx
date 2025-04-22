import React from "react";
import Topics from "../components/Topics";
import Head from "../components/Head";

const TopicsUpdated = () => {
  const steps = [
    {
      title: "The Basics of Data Structures And Algorithms",
      completed: 31,
      total: 31,
    },
    { title: "Basics of Array in DSA", completed: 7, total: 7 },
    {
      title: "Basics of Linked List for DSA",
      completed: 38,
      total: 40,
    },
    {
      title: "Search Techniques in programming and their pros and cons",
      completed: 31,
      total: 32,
    },
    { title: "Basics of Strings for DSA", completed: 15, total: 15 },
    {
      title: "Basics of Linked LIst and its types",
      completed: 25,
      total: 31,
    },
  ];
  return (
    <>
      <Head />
      <div>
        <div class="flex items-center justify-between h-screen">
          <div className="text-white font-bold p-5 relative">
            {/* <div className="overflow-hidden ">
    <img 
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShZch04gEZvFKbNot16qAJm-PlPmb82z9RqQ&s" 
      alt="Product" 
      className="h-full w-full object-cover "
    />
  </div> */}
            <h1 className="text-2xl mt-4">Data Structures and Algorithms</h1>
          </div>

          <div class="md:w-1/2 sm:w-full">
            <img
              src="/images/roadmapdsa.png"
              alt="Roadmap DSA Image"
              class="w-full mx-auto"
            />
          </div>
        </div>
      </div>
      <h1 className="text-2xl mt-4 pl-10 text-white font-bold">All Topics</h1>
      <div className="bg-black min-h-screen p-10">
        {steps.map((step, index) => (
          <a href={`/study/${step.title}`}>
            <Topics key={index} step={step} />
          </a>
        ))}
      </div>
    </>
  );
};

export default TopicsUpdated;
