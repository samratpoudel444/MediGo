import { useQuery } from "@tanstack/react-query";
import DoughnutChart from "./chart/Doughnut";
import axiosInstance from "./utils/AxiosInstance";

const getData = async () => {
  try {
    const response = await axiosInstance.get("/api/v1/userCount");
    return response.data; // response.data = { message: [...] }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const Analytics = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["countUserNo"],
    queryFn: getData,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  // Extract 'message' array from data first
  const messageData = data.message || [];

  const labels = messageData.map((item) => item.role);
  const counts = messageData.map((item) => item.count);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Users by Role",
        data: counts,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
        hoverOffset: 10,
      },
    ],
  };

  const ChartBlock = ({ title, data }) => (
    <div className="flex flex-col flex-2 items-center justify-center w-[35vw] h-[42vh] mt-8">
      <h1 className="py-3 text-lg font-semibold">{title}</h1>
      <DoughnutChart data={data} />
    </div>
  );

  return (
    <div className="w-[80vw] grid grid-col">
      <div className="items-start">
        <ChartBlock title="Users Associated With Medigo" data={chartData} />
      </div>
    </div>
  );
};

export default Analytics;
