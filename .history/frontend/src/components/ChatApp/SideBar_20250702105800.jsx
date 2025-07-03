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
		<h1></h1>
      </div>
	  <div className="fixed border ml-80 w-full h-screen">fsd</div>
    </div>
  );
};

export default SideBar;
