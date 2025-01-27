import React from 'react'
import "./HomeProfile.css";
export default function SimpleProfile() {

const userName = "Sumeet Maurya";
const rank = 1234;
const theme = {
  primaryColor: "rgba(34,211,238,1)",
  secondaryColor: "rgba(209,213,219,1)",
  bgColor: "rgb(13, 13, 13)",
};
const totalQuestions = 2000;
const totalSolved = 1500;

const difficultyWiseData = [
  { difficulty: "Easy", total: 800, solved: 700 },
  { difficulty: "Medium", total: 900, solved: 600 },
  { difficulty: "Hard", total: 300, solved: 200 },
];

const getColor = {
  Easy: "bg-green-600",
  Medium: "bg-amber-300",
  Hard: "bg-red-500",
};

  return (
    <div  className="flex justify-right ">
              <div
                className="max-w-sm rounded overflow-hidden shadow-lg"
                style={{ background: theme.bgColor, color: theme.secondaryColor }}
              >
                <div className="relative">
                  <img
                    className="w-full clippy"
                    src="https://images.pexels.com/photos/3779448/pexels-photo-3779448.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                    alt="Sunset in the mountains"
                  />
                  <div className="clippy absolute bottom-0 left-0 top-0 right-0 bg-blue-700 bg-opacity-50 p-4 text-white flex flex-col justify-end items-center"></div>
                  <div className="absolute bottom-0 right-0 mb-6 mr-6 rounded-full h-16 w-16 flex items-center bg-green-400 justify-center text-4xl font-thin text-white shadow-2xl">
                    +
                  </div>
                </div>
                <div className="pt-3 pb-5 px-5 flex flex-col items-center">
                  <p className="font-bold text-3xl">Sumeet Maurya</p>
                  <p className="text-gray-500 mb-2">Engineering Student</p>
                  <div className="mt-5 flex flex-row justify-center items-start">
                    <div className="px-3 text-center">
                      <p className="text-gray-500">Courses</p>
                      <b className="text-2xl">3</b>
                    </div>
                    <div className="px-3 text-center">
                      <p className="text-gray-500">Models</p>
                      <b className="text-2xl">249</b>
                    </div>
                    <div className="px-3 text-center">
                      <p className="text-gray-500">Completed</p>
                      <b className="text-2xl">100</b>
                    </div>
                  </div>
                </div>
              </div>
            </div>
    
  )
}
