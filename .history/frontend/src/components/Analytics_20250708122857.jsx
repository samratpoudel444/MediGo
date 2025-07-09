import { useQuery } from "@tanstack/react-query";
import DoughnutChart from "./chart/Doughnut";
import axiosInstance from "./utils/AxiosInstance";

const getData = async () => {
  try {
    const response = await axiosInstance.get("/api/v1/userCount");
    return response.data.message;
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

  let labels = [];
  let values = [];

  data.forEach((item, index) => {
    labels[index] = item.role;
    values[index] = item.count;
  });

  const ChartBlock = ({ title, labels, count }) => (
    <div className="flex flex-col flex-2 items-center justify-center w-[35vw] h-[42vh] mt-6  shadow-md">
      <h1 className="py-3 text-lg font-semibold">{title}</h1>
      <DoughnutChart labels={labels} count={count} />
    </div>
  );

  return (
    <div className="w-[80vw] grid grid-col">
      <div className="items-start">
        <div></div>
        <ChartBlock
          title="Users Associated With Medigo"
          labels={labels}
          count={values}
        />
      </div>
    </div>
  );
};

export default Analytics;
