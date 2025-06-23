import React from "react";
import Stack from '@mui/material/Stack';
import Button from "@mui/material/Button";
import HomeIcon from '@mui/icons-material/Home';

const SideBar = () => {
	return (
		<>
			<Stack>
				<Button><HomeIcon></HomeIcon></Button>
			</Stack>
		</>
	);
};

export default SideBar;
