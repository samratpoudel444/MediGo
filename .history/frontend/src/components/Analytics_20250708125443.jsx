import { useQuery } from "@tanstack/react-query";
import DoughnutChart from "./chart/Doughnut";
import axiosInstance from "./utils/AxiosInstance";
import { FaUserAlt } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const cardData = [
  {
    icon: <FaUserAlt className="text-3xl" />,
    text: "Show Users",
    description: "View and manage all registered users in the system",
    navigate: "../ShowUsers",
    color: "bg-blue-500",
    hoverColor: "hover:bg-blue-600",
  },
  {
    icon: <FaUserDoctor className="text-3xl" />,
    text: "Show Doctors",
    description: "Access and manage all healthcare professionals",
    navigate: "../ShowDoctors",
    color: "bg-green-500",
    hoverColor: "hover:bg-green-600",
  },
];

const getData = async () => {
  try {
    const response = await axiosInstance.get("/api/v1/userCount");
    return response.data.message;
  } catch (err) {
    console.error("Error fetching user count:", err);
    throw err;
  }
};

const Analytics = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["countUserNo"],
    queryFn: getData,
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  if (isError)
    return (
      <div className="flex justify-center items-center h-64 text-red-500">
        Error: {error.message}
      </div>
    );

  // Extract labels and values from data with fallback for undefined data
  const labels = data?.map((item) => item.role) || [];
  const values = data?.map((item) => item.count) || [];

  const ChartBlock = ({ title, labels, count }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center w-full md:w-[35vw] h-[42vh] mt-6 shadow-lg rounded-xl bg-white p-6 border border-gray-200"
    >
      <h1 className="py-3 text-xl font-semibold text-gray-800">{title}</h1>
      {labels.length > 0 ? (
        <DoughnutChart labels={labels} count={count} />
      ) : (
        <p className="text-gray-500">No data available</p>
      )}
    </motion.div>
  );

  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <div className="w-[90vw] max-w-6xl mx-auto flex flex-col gap-8 mt-10 p-4">
      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-gray-800"
      >
        Analytics Dashboard
      </motion.h1>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-col gap-8">
        {/* Chart Card */}
        <ChartBlock
          title="Users Associated With Medigo"
          labels={labels}
          count={values}
        />

        {/* Dynamic Cards */}
        <div className="flex flex-col md:flex-row gap-6 w-full lg:w-auto ">
          {cardData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleCardClick(item.navigate)}
              className={`flex-1 flex flex-col items-center p-6 rounded-xl shadow-md cursor-pointer transition-all duration-300 text-white ${item.color} ${item.hoverColor}`}
            >
              <div className="bg-white/20 p-4 rounded-full mb-4">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">
                {item.text}
              </h3>
              <p className="text-white/80 text-sm text-center mb-4">
                {item.description}
              </p>
              <div className="mt-auto flex items-center">
                <span className="text-sm">View details</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
