import React from "react";
import Stack from '@mui/material/Stack';
import Button from "@mui/material/Button";
import HomeIcon from '@mui/icons-material/Home';

const SideBar = () => {
	return (
		<div className="w-80 border">
			<Stack>
				<Button> Back to home <HomeIcon/></Button>
			</Stack>
		</div>
	);
};

export default SideBar;
