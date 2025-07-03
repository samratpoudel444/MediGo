import React from "react";
import Stack from '@mui/material/Stack';
import Button from "@mui/material/Button";
import HomeIcon from '@mui/icons-material/Home';

const SideBar = () => {
	return (
    <div>
      <div className="w-80 h-screen border">
        <Button className="w-full">
          <HomeIcon /> &nbsp; Back to home
        </Button>
      </div>
	  <div class></div>
    </div>
  );
};

export default SideBar;
