import React from "react";
import { Button } from "@mui/material";
import { motion } from "framer-motion";
const AboutBnr = () =>{

    return (
      <motion.div
        className="flex flex-col justify-items-start"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          className="m-16 mt-12 w-[9]"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <motion.h1
            className="text-6xl mt-4 text-[#42cbf5]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            About Us
          </motion.h1>

          <motion.p
            className="mt-8 leading-6 text-gray text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Welcome to MediGo, your smart healthcare companion. We are dedicated
            to transforming the healthcare experience through seamless
            technology. MediGo bridges the gap between patients and medical
            professionals with a single, unified platform. With our Appointment
            Booking feature, you can schedule doctor visits with ease and
            flexibility. No more waiting in lines — book from anywhere, anytime.
            <br />
            Our Digital Prescription system ensures your medical records are
            always accessible and secure. Forget paper slips — access your
            prescriptions instantly, whenever you need them. Through Pharmacy
            Navigation, MediGo guides you to the nearest pharmacy with your
            required medicines in stock. Locate, compare, and connect with
            pharmacies in real time. We also offer a secure Chat Platform for
            direct communication with healthcare providers. Ask follow-up
            questions, clarify doubts, or receive instant guidance. Our platform
            is user-friendly, fast, and built with patient safety in mind. Data
            privacy and secure communication are our top priorities.
            <br />
             We support
            healthcare professionals by streamlining consultations and
            prescription management. Whether you're a patient seeking care or a
            provider offering it, MediGo is built for you. We aim to make
            healthcare more accessible, connected, and efficient. Innovation,
            trust, and empathy are at the core of what we do. Join us in
            reshaping the healthcare experience for everyone. MediGo —
            Healthcare. Simplified.
          </motion.p>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, duration: 0.4 }}
          >
            <Button className="!rounded-4xl !mt-8" variant="contained">
              Explore
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    );
};

export default AboutBnr;