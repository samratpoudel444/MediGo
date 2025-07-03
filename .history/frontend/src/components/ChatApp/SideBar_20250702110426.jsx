import React from "react";
import Stack from '@mui/material/Stack';
import Button from "@mui/material/Button";
import HomeIcon from '@mui/icons-material/Home';


const SideBar = () => {
	return (
    <div className="flex flex-row gap-1 ">
      <div className="fixed w-80 h-screen border">
        <Button className="w-full">
          <HomeIcon /> &nbsp; Back to home
        </Button>
        <h1 className="text-3xl text-center font-bold">Chat App</h1>
      </div>
      <div className="flex flex-col fixed border ml-80 w-full h-screen">
        <div className="border w-full h-20">
			<img src="" alt="" />
		</div>
        <div className="border w-full h-full"></div> 
		<div className="border w-full h-20"></div>
      </div>
    </div>
  );
};

export default SideBar;
