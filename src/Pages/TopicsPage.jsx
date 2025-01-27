import React from 'react'
import Head from '../components/Head';
import Foot from '../components/Foot';



export default function TopicsPage() {
  const steps = [
    { title: "Learn the basics", completed: 31, total: 31 },
    { title: "Learn Important Sorting Techniques", completed: 7, total: 7 },
    { title: "Solve Problems on Arrays [Easy -> Medium -> Hard]", completed: 38, total: 40 },
    { title: "Binary Search [1D, 2D Arrays, Search Space]", completed: 31, total: 32 },
    { title: "Strings [Basic and Medium]", completed: 15, total: 15 },
    { title: "Learn LinkedList [Single LL, Double LL, Medium, Hard Problems]", completed: 25, total: 31 },
  ];
  return (
    <div className='bg-black'>
      <Head/>
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
    <img src="./roadmapdsa.png" alt="Roadmap DSA Image" class="w-full mx-auto" />
  </div>
</div>
<h1 className="text-2xl mt-4 pl-10 text-white font-bold">All Topics</h1>
<a href="/study">

    <div className="bg-black min-h-screen p-10">
      {steps.map((step, index) => (
        <div
          key={index}
          className="bg-gray-800 text-white rounded-lg shadow-lg p-4 mb-4"
        >
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">{step.title}</h2>
            <span className="text-sm">
              {step.completed}/{step.total}
            </span>
          </div>
          <div className="w-full bg-gray-700 h-2 rounded-full">
            <div
              className="bg-red-500 h-2 rounded-full"
              style={{ width: `${(step.completed / step.total) * 100}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
    </a>
<Foot/>
    </div>
  )
}
