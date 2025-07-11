import Chart from "./chart";
import { FaUserAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { MdLocalPharmacy } from "react-icons/md";
import { SiLibreofficewriter } from "react-icons/si";


const cardData = [
  {
    icon: <FaUserAlt className="text-3xl" />,
    text: "Show Users",
    description: "View All the Users Associated with you",
    navigate: "../ShowUsers",
    color: "bg-blue-500",
  },

  {
    icon: <SiLibreofficewriter className="text-3xl" />,
    text: "Show Blogs",
    description: "Get All your blogs and manage it",
    navigate: "doctor/showBlogs",
    color: "bg-black",
  },
];

const Dashboard = () => {
  return (
    <div className="flex flex-col justify-center items-start gap-10">
      <div className="flex mt-24 ml-100">
        <Chart />
      </div>
        <div className="w-full lg:w-250 flex flex-row gap-6 ml-10 mt-24">
          {cardData.map((item, index) => (
            <motion.div
              key={index}
              className={`flex flex-col p-6 rounded-xl shadow-md cursor-pointer text-white ${item.color} 
                hover:opacity-90 transition-opacity h-full w-1/2`}
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
