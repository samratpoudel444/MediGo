import React from "react";
import Stack from '@mui/material/Stack';
import Button from "@mui/material/Button";
import HomeIcon from '@mui/icons-material/Home';


const SideBar = () => {
	return (
  
      <div >
        <Button className="w-full">
          <HomeIcon /> &nbsp; Back to home
        </Button>
        <h1 className="text-3xl text-center font-bold">Chat App</h1>
      </div>
      
  );
};

export default SideBar;
