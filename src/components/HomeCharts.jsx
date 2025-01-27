import React from 'react'
import { LineChart } from "@mui/x-charts/LineChart";
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
export default function HomeCharts() {
    const values = [
        { date: '2024-12-01', count: 12 },
        { date: '2024-12-05', count: 8 },
        { date: '2024-12-10', count: 15 },
        { date: '2024-12-15', count: 4 },
        { date: '2024-12-20', count: 20 },
        { date: '2024-12-25', count: 6 },
        { date: '2024-12-30', count: 18 },
      ];
    

  return (
    <>
     <div className="p-5">
        <div>
        <div>
        <h2 className="text-center text-xl font-semibold mb-4 text-white">Last 6 Months Activity Heatmap</h2>
        <CalendarHeatmap
          startDate={new Date('2024-07-01')}
          endDate={new Date('2025-01-27')}
          values={values}
          classForValue={(value) => {
            if (!value) {
              return 'color-empty';
            }
            // Add color scaling classes based on count value
            if (value.count < 5) return 'color-scale-1';
            if (value.count < 10) return 'color-scale-2';
            if (value.count < 15) return 'color-scale-3';
            return 'color-scale-4';
          }}
          tooltipDataAttrs={(value) => {
            if (!value || !value.date) {
              return null;
            }
            return {
              'data-tip': `${value.date}: ${value.count} activities`,
            };
          }}
          showWeekdayLabels
        />
        <style>
          {`
            .color-empty {
              fill: #ebedf0;
            }
            .color-scale-1 {
              fill: #c6e48b;
            }
            .color-scale-2 {
              fill: #7bc96f;
            }
            .color-scale-3 {
              fill: #239a3b;
            }
            .color-scale-4 {
              fill: #196127;
            }
          `}
        </style>
      </div>
          <LineChart
            xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
            series={[
              {
                data: [2, 5.5, 2, 8.5, 1.5, 5],
                area: true,
                color: "#fdb462",
              },
            ]}
            sx={{
              //change left yAxis label styles
              "& .MuiChartsAxis-left .MuiChartsAxis-tickLabel": {
                strokeWidth: "0.4",
                fill: "#FFFF",
              },
              // change all labels fontFamily shown on both xAxis and yAxis
              "& .MuiChartsAxis-tickContainer .MuiChartsAxis-tickLabel": {
                fontFamily: "Roboto",
              },
              // change bottom label styles
              "& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel": {
                strokeWidth: "0.5",
                fill: "#FFFF",
              },
              // bottomAxis Line Styles
              "& .MuiChartsAxis-bottom .MuiChartsAxis-line": {
                stroke: "#FFFF",
                strokeWidth: 0.4,
              },
              // leftAxis Line Styles
              "& .MuiChartsAxis-left .MuiChartsAxis-line": {
                stroke: "#fffF",
                strokeWidth: 0.4,
              },
            }}
            width={450}
            height={200}
          />
          </div>
        </div>
    </>
  )
}
