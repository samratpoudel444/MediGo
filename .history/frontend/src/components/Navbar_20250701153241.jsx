import React, { useEffect, useState } from "react";
import doctorImage from "../assets/doctor.png";
import scope from "../assets/scope.png";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { motion, useScroll,useTransform } from "framer-motion";


const navItems = [
  { text: "About", link: "/home" },
  { text: "Services", link: "/services" },
  { text: "Doctor", link: "/doctors" },
  { text: "Blog", link: "/blogs" },
  { text: "Contact", link: "/contact" },
];

const Navbar = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const { scrollY } = useScroll();
  const [dropDown, setDropDown]= useState(false)
  
  const navbarY = useTransform(scrollY, [0, 100], [0, -5]);
  const navbarScale = useTransform(scrollY, [0, 100], [1, 0.98]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Enhanced animation variants
  const navbarVariants = {
    initial: {
      y: -100,
      opacity: 0,
      scale: 0.95
    },
    animate: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const logoVariants = {
    initial: {
      x: -60,
      opacity: 0,
      rotate: -180,
      scale: 0.3
    },
    animate: {
      x: 0,
      opacity: 1,
      rotate: 0,
      scale: 1,
      transition: {
        duration: 1.4,
        ease: [0.68, -0.55, 0.265, 1.55],
        delay: 0.3
      }
    },
    hover: {
      scale: 1.05,
      rotate: [0, -5, 5, 0],
      transition: {
        duration: 0.6,
        ease: "easeInOut"
      }
    }
  };

  const textLogoVariants = {
    initial: {
      x: -40,
      opacity: 0,
      filter: "blur(10px)"
    },
    animate: {
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: 1,
        ease: "easeOut",
        delay: 0.8
      }
    },
    hover: {
      scale: 1.02,
      color: "#36b7e0",
      textShadow: "0 0 20px rgba(66, 203, 245, 0.3)",
      transition: {
        duration: 0.3
      }
    }
  };

  const navItemVariants = {
    initial: {
      y: -40,
      opacity: 0,
      filter: "blur(12px)",
      rotateX: 90,
      scale: 0.8
    },
    animate: (index) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      rotateX: 0,
      scale: 1,
      transition: {
        duration: 0.9,
        ease: [0.68, -0.55, 0.265, 1.55],
        delay: 0.6 + index * 0.1
      }
    }),
    hover: {
      y: -6,
      scale: 1.1,
      rotateX: -10,
      color: "#42cbf5",
      textShadow: [
        "0 0 0px rgba(66, 203, 245, 0)",
        "0 0 20px rgba(66, 203, 245, 0.6)",
        "0 4px 8px rgba(66, 203, 245, 0.3)"
      ],
      transition: {
        duration: 0.4,
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    },
    tap: {
      scale: 0.95,
      y: -2
    }
  };

  const backgroundImageVariants = {
    initial: {
      x: 300,
      opacity: 0,
      scale: 0.7,
      rotate: 15,
      filter: "blur(20px)"
    },
    animate: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotate: 0,
      filter: "blur(0px)",
      transition: {
        duration: 2,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.8
      }
    },
    hover: {
      scale: 1.03,
      x: -5,
      filter: "brightness(1.15) contrast(1.1)",
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    initial: {
      scale: 0,
      opacity: 0,
      y: -50,
      rotate: -90
    },
    animate: {
      scale: 1,
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: {
        duration: 1,
        ease: [0.68, -0.55, 0.265, 1.55],
        delay: 1.2
      }
    },
    hover: {
      scale: 1.08,
      y: -2,
      boxShadow: "0 10px 30px rgba(66, 203, 245, 0.4)",
      background: "linear-gradient(135deg, #42cbf5 0%, #36b7e0 100%)",
      color: "#ffffff",
      transition: {
        duration: 0.3,
        type: "spring",
        stiffness: 300
      }
    },
    tap: {
      scale: 0.95,
      y: 0
    }
  };

  const floatingParticlesVariants = {
    animate: {
      y: [-20, -40, -20],
      opacity: [0.3, 0.8, 0.3],
      scale: [1, 1.2, 1],
      transition: {
        duration: 4,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  };

  return (
    <nav className="relative bg-white w-full h-[80px] px-4 text-white font-bold text-xl overflow-visible">
      <div className="flex items-center h-full text-black w-fit">
        {/* Logo Section */}
        <div className="w-[20%] ml-12 flex items-center mr-12">
          <img
            src={scope}
            alt="Scope image"
            className="w-[35%] h-[35%] object-contain mt-8 cursor-pointer hover:scale-105 transition-transform duration-300"
          />
          <div className="ml-8 text-3xl text-[#42cbf5] cursor-pointer font-bold hover:scale-105 transition-transform duration-300">
            <a href="/home"> MediGO</a>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="w-[40%] flex items-center justify-start z-10">
          {navItems.map((item, index) => (
            <div
              key={item.text}
              onMouseEnter={() => setHoveredItem(item.text)}
              onMouseLeave={() => setHoveredItem(null)}
              className="relative mt-6"
            >
              <Link
                href={item.link}
                className="text-black mr-12 transition-colors duration-300 font-medium cursor-pointer relative hover:text-[#42cbf5] hover:scale-110 inline-block"
              >
                {item.text}

                {/* Underline animation */}
                <div
                  className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-[#42cbf5] to-[#36b7e0] transition-all duration-300 ${
                    hoveredItem === item.text ? "w-full" : "w-0"
                  }`}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Background Image */}
      {/* <div className="absolute top-[0px] right-0">
        <img
          className="w-[700px] hover:scale-105 transition-transform duration-300"
          src="./navimage.png"
          alt=""
        />
      </div> */}

      {/* Profile Button */}
      <div className="absolute -top-[-22px] right-[20px] z-20 flex flex-col justify-center align-center gap-1">
        <Button
        onClick={()=>setDropDown(!dropDown)}
          variant="contained"
          className="!bg-white !rounded-2xl px-4 py-2 flex items-center justify-center !text-black text-xl font-bold shadow-lg border border-gray-100 hover:!bg-[#42cbf5] hover:!text-white transition-all duration-300 hover:scale-105"
          style={{
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
          }}
        >
          <motion.span initial={{ opacity: 0.8 }} whileHover={{ opacity: 1 }}>
            <a>Profile</a>
          </motion.span>
        </Button>
        {dropDown && (
          <div className="bg-gray-400 h-20 w-55 flex flex-col gap-3 opacity-">
            <button>View Profile</button>
            <button>Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;