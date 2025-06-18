import React from "react";
import { motion } from "framer-motion";
import scope from "../assets/scope.png";
import { Button } from "@mui/material";

const CardSectionCard = ({title, description, buttonText, iconSrc }) => {
  // Animation variants
  const cardVariants = {
    initial: {
      opacity: 0,
      y: 50,
      scale: 0.9
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    },
    hover: {
      y: -8,
      scale: 1.02,
      boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const childVariants = {
    initial: {
      opacity: 0,
      y: 20
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const iconVariants = {
    initial: {
      scale: 0,
      rotate: -180
    },
    animate: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay: 0.2
      }
    },
    hover: {
      scale: 1.1,
      rotate: 10,
      transition: {
        duration: 0.2
      }
    }
  };

  const buttonVariants = {
    initial: {
      opacity: 0,
      scale: 0.8
    },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
        delay: 0.4
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2
      }
    },
    tap: {
      scale: 0.95
    }
  };

  return (
    <motion.div
      className="h-[70%] w-[20%] bg-white rounded-3xl flex flex-col p-6 shadow-lg cursor-pointer"
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
    >
      {/* Header */}
      <motion.div 
        className="flex items-center justify-between mb-4"
        variants={childVariants}
      >
        <motion.h2 
          className="text-xl font-semibold text-gray-800"
          variants={childVariants}
        >
         {title}
        </motion.h2>
        <motion.div
          className="w-12 h-12 bg-[#42cbf5] rounded-xl overflow-hidden flex items-center justify-center"
          variants={iconVariants}
          whileHover="hover"
        >
          <motion.img
            src={scope}
            alt="scope"
            className="w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          />
        </motion.div>
      </motion.div>

      {/* Description */}
      <motion.p 
        className="text-sm text-gray-600 mt-2"
        variants={childVariants}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {description}
      </motion.p>

      {/* Button */}
      <motion.div 
        className="mt-auto flex justify-center mb-2"
        variants={childVariants}
      >
        <motion.div
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <Button 
            className="!rounded-2xl !w-[140px]" 
            variant="contained"
            component={motion.button}
            whileHover={{
              boxShadow: "0 4px 20px rgba(66, 203, 245, 0.3)"
            }}
          >
           {}
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default CardSectionCard;