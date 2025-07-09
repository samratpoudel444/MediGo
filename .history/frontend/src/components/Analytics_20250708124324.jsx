import { useQuery } from "@tanstack/react-query";
import DoughnutChart from "./chart/Doughnut";
import axiosInstance from "./utils/AxiosInstance";
import { FaUserAlt } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";

const cardData = [
  {
    icon: <FaUserAlt className="text-3xl text-blue-600" />,
    text: "Show Users",
    navigate: "ShowUsers",
  },
  {
    icon: <FaUserDoctor className="text-3xl text-green-600" />,
    text: "Show Doctors",
    navigate: "ShowDoctors",
  },
];

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

  // Extract labels and values from data
  const labels = data.map((item) => item.role);
  const values = data.map((item) => item.count);

  const ChartBlock = ({ title, labels, count }) => (
    <div className="flex flex-col items-center justify-center w-[35vw] h-[42vh] mt-6 shadow-md rounded-lg bg-white p-6 border border-gray-300 hover:shadow-xl transition-shadow duration-300">
      <h1 className="py-3 text-lg font-semibold">{title}</h1>
      <DoughnutChart labels={labels} count={count} />
    </div>
  );

  return (
    <div className="w-[80vw] grid grid-cols-2 gap-8 mt-10">
      {/* Chart Card */}
      <ChartBlock
        title="Users Associated With Medigo"
        labels={labels}
        count={values}
      />

      {/* Dynamic Cards */}
      <div className="flex flex-col gap-6">
        {cardData.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-5 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 cursor-pointer"
          
          >
            <div>{item.icon}</div>
            <div className="text-xl font-medium">{item.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Analytics;
