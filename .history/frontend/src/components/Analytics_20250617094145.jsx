import { useEffect, useState } from "react";
import DoughnutChart from "./chart/Doughnut";

const ChartBlock = ({ title, labels, data }) => (
  <div className="flex flex-col flex-2 items-center justify-center w-[35vw] h-[42vh] mt-8">
    <h1 className="py-3 text-lg font-semibold">{title}</h1>
    <DoughnutChart labels={labels} data={data} />
  </div>
);

const Analytics = () => {
  const [chartsData, setChartsData] = useState({
    appointmentBookings: { labels: [], data: [] },
    usersAssociated: { labels: [], data: [] },
    groupByAges: { labels: [], data: [] },
    anotherCategory: { labels: [], data: [] },
  });

  // Simulate fetching data from an API
  useEffect(() => {
    const fetchChartData = async () => {
      // Mocked data – you can replace this with real API calls
      const fetchedData = {
        appointmentBookings: {
          labels: ["Admin"],
          data: [5],
        },
        usersAssociated: {
          labels: ["Admin", "Doctor", "Patient"],
          data: [2, 12, 45],
        },
        groupByAges: {
          labels: ["0-18", "19-35", "36-60", "60+"],
          data: [10, 25, 15, 8],
        },
        anotherCategory: {
          labels: ["Type A", "Type B", "Type C"],
          data: [6, 14, 20],
        },
      };

      // Set state with the fetched data
      setChartsData(fetchedData);
    };

    fetchChartData();
  }, []);

  return (
    <div className="w-[80vw] flex flex-col">
      <div className="flex items-center justify-center">
        <ChartBlock
          title="Appointment bookings"
          labels={chartsData.appointmentBookings.labels}
          data={chartsData.appointmentBookings.data}
        />
        <ChartBlock
          title="Users Associated With Medigo"
          labels={chartsData.usersAssociated.labels}
          data={chartsData.usersAssociated.data}
        />
      </div>
      <div className="flex flex-row flex-1 py-10">
        <ChartBlock
          title="Group by ages"
          labels={chartsData.groupByAges.labels}
          data={chartsData.groupByAges.data}
        />
        <ChartBlock
          title="Another Category"
          labels={chartsData.anotherCategory.labels}
          data={chartsData.anotherCategory.data}
        />
      </div>
    </div>
  );
};

export default Analytics;
