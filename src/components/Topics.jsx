import React from "react";

const Topics = ({ step }) => {
  return (
    <div className="flex">
      <div className="bg-gray-800 text-white rounded-lg shadow-lg p-4 mb-4 w-5/6">
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
      <div className="text-white flex justify-center items-center border-solid border-2 border-grey-600 rounded-lg w-1/6 m-2">
        <button className=" p-2">Download Notes</button>
      </div>
    </div>
  );
};

export default Topics;
