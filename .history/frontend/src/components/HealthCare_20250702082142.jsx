import { Button } from "@mui/material";
import React from "react";
import { motion } from "framer-motion";

const HealthCare = () => {
  return (
    <motion.div
      className="w-[97vw] flex flex-col justify-items-start"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div
        className="m-16 mt-12 w-[40%]"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <motion.h3
          className="w-fit h-[30px] p-2 ml-1 text-gray text-xl text-[#42cbf5] bg-gray-50 rounded-2xl flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          MEDICAL
        </motion.h3>
        <motion.h1
          className="text-6xl mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          Healthcare
        </motion.h1>
        <motion.h1
          className="text-6xl mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          Solutions
        </motion.h1>
        <motion.p
          className="mt-8 leading-6 text-gray text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          MediGo is a smart healthcare platform offering appointment booking,
          digital prescriptions, and real-time pharmacy navigation. We simplify
          healthcare access by connecting patients and providers through
          seamless technology. Our secure chat feature enables instant
          communication with doctors anytime, anywhere. MediGo is committed to
          making healthcare more accessible, efficient, and patient-focused.
        </motion.p>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, duration: 0.4 }}
        >
          <Button className="!rounded-4xl !mt-8" variant="contained">
            Find Doctor
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default HealthCare;
