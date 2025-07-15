import { useQuery } from "@tanstack/react-query";
import DoughnutChart from "./chart/Doughnut";
import axiosInstance from "./utils/AxiosInstance";
import { FaUserAlt } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MdLocalPharmacy } from "react-icons/md";
import { SiLibreofficewriter } from "react-icons/si";

const cardData = [
  {
    icon: <FaUserAlt className="text-3xl" />,
    text: "Show Users",
    description: "View and manage all registered users",
    navigate: "../ShowUsers",
    color: "bg-blue-500",
  },
  {
    icon: <FaUserDoctor className="text-3xl" />,
    text: "Show Doctors",
    description: "Access healthcare professionals",
    navigate: "../ShowDoctors",
    color: "bg-green-500",
  },

  {
    icon: <MdLocalPharmacy className="text-3xl" />,
    text: "Show Pharmacy",
    description: "Access healthcare Pharmacies",
    navigate: "../ShowAllPharmacies",
    color: "bg-yellow-500",
  },
  {
    icon: <SiLibreofficewriter className="text-3xl" />,
    text: "Show Blogs",
    description: "Get Blogs and manage the Blogs",
    navigate: "../showAllBlogs",
    color: "bg-black",
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

  if (isLoading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
  
  if (isError) return (
    <div className="flex justify-center items-center h-64 text-red-500">
      Error: {error.message}
    </div>
  );

  const labels = data?.map((item) => item.role) || [];
  const values = data?.map((item) => item.count) || [];

  const ChartBlock = ({ title, labels, count }) => (
    <motion.div 
      className="flex flex-col items-center justify-center w-full h-full p-6 rounded-xl bg-white shadow-lg border border-gray-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-xl font-semibold mb-4 text-gray-800">{title}</h1>
      {labels.length > 0 ? (
        <DoughnutChart labels={labels} count={count} />
      ) : (
        <p className="text-gray-500">No data available</p>
      )}
    </motion.div>
  );

  const handleCardClick = (path) => navigate(path);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 h-22 bg-gray-300 text-center flex ">
      <motion.h1
        className="text-3xl font-bold text-gray-800 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-left">a</span>
        Analytics Dashboard
      </motion.h1>

      <div className="flex flex-col lg:flex-col gap-6 h-[400px]">
        <div className="flex-1 min-h-[400px] lg:min-h-full">
          <ChartBlock
            title="Users Associated With Medigo"
            labels={labels}
            count={values}
          />
        </div>

        {/* Cards Section - Fixed width */}
        <div className="w-full lg:w-250 flex flex-row gap-6 ml-10 ">
          {cardData.map((item, index) => (
            <motion.div
              key={index}
              className={`flex flex-col p-6 rounded-xl shadow-md cursor-pointer text-white ${item.color} 
                hover:opacity-90 transition-opacity h-full`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleCardClick(item.navigate)}
            >
              <div className="bg-white/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.text}</h3>
              <p className="text-white/80 text-sm mb-4">{item.description}</p>
              <div className="mt-auto flex items-center text-sm">
                View details
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