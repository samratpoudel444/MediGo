import { useQuery } from "@tanstack/react-query";
import DoughnutChart from "./chart/Doughnut";
import axiosInstance from "./utils/AxiosInstance";

const getData = async () => {
  try {
    const response = await axiosInstance.get("/api/v1/userCount");
    return response.data;
  } catch (err) {
    console.log(err);
    throw err; // better to throw error so react-query knows it failed
  }
};

const Analytics = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["countUserNo"],
    queryFn: getData,
  });

  let labels= [];
  let value = [];

    data.message.forEach((item, count)=>
    {
        labels[count]= item.message
    })
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  const ChartBlock = ({ title, chartData }) => (
    <div className="flex flex-col flex-2 items-center justify-center w-[35vw] h-[42vh] mt-8">
      <h1 className="py-3 text-lg font-semibold">{title}</h1>
      <DoughnutChart data={chartData} />
    </div>
  );

  return (
    <div className="w-[80vw] grid grid-col">
      <div className="items-start">
        <ChartBlock title="Users Associated With Medigo" lables={data.message.role} counts={data.message.counts}  />
      </div>
    </div>
  );
};

export default Analytics;
