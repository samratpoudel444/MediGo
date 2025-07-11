import Chart from "./chart";

import { FaUserAlt } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
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

const Dashboard = () => {
  return (
    <div className="grid grid-cols-2 justify-center items-start gap-10">
      <div className="flex mt-24 ml-100">
        <Chart />
      </div>
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
  );
};

export default Dashboard;
