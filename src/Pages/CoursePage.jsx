import React, { useState, useRef } from 'react';
import CourseCard from '../components/CourseCard';
import Head from '../components/Head';
import Foot from '../components/Foot';

export default function CoursePage() {
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const dropdownMenuRef = useRef(null);

  const handleDropdownToggle = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleOptionClick = (region) => {
    setSelectedRegion(region);
    setDropdownVisible(false);
  };

  const handleOutsideClick = (event) => {
    if (
      dropdownMenuRef.current &&
      !dropdownMenuRef.current.contains(event.target)
    ) {
      setDropdownVisible(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <>
      <Head />
      <div className='flex justify-between p-10'>

      <div className="text-white font-bold text-xl ">All Courses</div>
      

      {/* Dropdown & Input Component */}
      <div className="w-full max-w-sm min-w-[200px]">
        <div className="relative mt-2">
          <div className="absolute top-1 left-1 flex items-center">
            <button
              id="dropdownButton"
              className="rounded border border-transparent py-1 px-1.5 text-center flex items-center text-sm transition-all text-slate-600"
              onClick={handleDropdownToggle}
            >
              <span id="dropdownSpan" className="text-ellipsis overflow-hidden">
                {selectedRegion}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-4 w-4 ml-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            </button>
            <div className="h-6 border-l border-slate-200 ml-1"></div>
            <div
              ref={dropdownMenuRef}
              id="dropdownMenu"
              className={`min-w-[150px] overflow-hidden absolute left-0 w-full mt-10 ${
                isDropdownVisible ? '' : 'hidden'
              } bg-white border border-slate-200 rounded-md shadow-lg z-10`}
            >
              <ul id="dropdownOptions">
                {['All', 'Purchased', 'Not Purchased'].map((region) => (
                  <li
                    key={region}
                    className="px-4 py-2 text-slate-600 hover:bg-slate-50 text-sm cursor-pointer"
                    data-value={region}
                    onClick={() => handleOptionClick(region)}
                  >
                    {region}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <input
            type="text"
            className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pr-12 pl-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            placeholder="DBMS..."
          />
          <button
            className="absolute right-1 top-1 rounded bg-slate-800 p-1.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      </div>

      <div>
        <CourseCard />
      </div>
      <Foot/>
    </>
  );
}
