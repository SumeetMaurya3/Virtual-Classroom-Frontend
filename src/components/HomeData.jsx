import React from 'react'
import Chart from "react-apexcharts";

export default function HomeData() {
    const [state, setState] = React.useState({
          
        series: [ 55, 67, 83],
        options: {
          chart: {
            height: 10,
            type: 'radialBar',
          },
          plotOptions: {
            radialBar: {
              dataLabels: {
                name: {
                  fontSize: '22px',
                },
                value: {
                  fontSize: '16px',
                },
                total: {
                  show: true,
                  label: 'Total',
                  formatter: function (w) {
                    // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                    return 249
                  }
                }
              }
            }
          },
          labels: ['OS', 'DBMS', 'NLP'],
        },
      
      
    });
      const userName = "Your Courses";
      const rank = 1234;
      const theme = {
        primaryColor: "rgba(34,211,238,1)",
        secondaryColor: "rgba(209,213,219,1)",
        bgColor: "rgb(13, 13, 13)",
      };
      const difficultyWiseData = [
        { difficulty: "OS", total: 800, solved: 700 },
        { difficulty: "DBMS", total: 900, solved: 600 },
        { difficulty: "NLP", total: 300, solved: 200 },
      ];
    
      const getColor = {
        OS: "bg-green-600",
        DBMS: "bg-amber-300",
        NLP: "bg-red-500",
      };
  return (
    <>
    <div
          className="min-w-xl flex flex-col items-center px-4 py-2  gap-2"
        >
          <div className="w-full flex justify-between p-3">
            <span
              className="text-sm font-semibold"
              style={{ color: theme.secondaryColor }}
            >
              {userName}
            </span>
            <span
              className="text-sm font-semibold pr-1"
              style={{ color: theme.secondaryColor }}
            >
              
            </span>
          </div>

          {/* Overall Progress Section */}
          <div className="lg:flex-row   items-center">
          <div  >
          <Chart
            options={state.options}
            series={state.series}
            type="radialBar"
            height={200}
          />
              </div>

            {/* Difficulty-Wise Progress */}
            <div className="w-full p-2">
              {difficultyWiseData.map((data) => {
                const percentage = (data.solved / data.total) * 100;
                return (
                  <div key={data.difficulty} className="mt-3 first:mt-0 w-full">
                    <div className="flex justify-between px-1">
                      <span
                        className="text-sm"
                        style={{ color: theme.secondaryColor }}
                      >
                        {data.difficulty}
                      </span>
                      <span className="w-[4.5rem] text-end">
                        <span
                          className="font-semibold"
                          style={{ color: theme.primaryColor }}
                        >
                          {data.solved}
                        </span>
                        <span
                          className="text-xs pb-2"
                          style={{ color: theme.secondaryColor }}
                        >
                          {" / " + data.total}
                        </span>
                      </span>
                    </div>
                    <div
                      className={`${
                        getColor[data.difficulty]
                      } bg-opacity-20 w-full rounded-full h-2 dark:bg-gray-700`}
                    >
                      <div style={{ width: `${percentage}%` }}>
                        <div
                          className={`${
                            getColor[data.difficulty]
                          } h-2 rounded-full`}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
    </>
  )
}
