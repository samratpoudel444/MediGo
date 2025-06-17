import { Button } from "@mui/material";
import React from "react";
import { motion } from "framer-motion";

export const ContactBnr = () => {
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
        <motion.h1
          className="text-6xl mt-4 text-[#42cbf5]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          Contact us
        </motion.h1>
        <motion.p
          className="mt-8 leading-6 text-gray text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique
          maxime reiciendis ullam deserunt minima recusandae quia nesciunt
          quidem, ad cumque quibusdam adipisci laboriosam voluptates quos
          exercitationem ad cumque quibusdam adipisci laboriosam voluptates quos
          exercitationem esse. A, ex eius!
        </motion.p>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, duration: 0.4 }}
        >
          <Button className="!rounded-4xl !mt-8" variant="contained">
            Call
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ContactBnr;
