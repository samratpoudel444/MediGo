import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";
import image from "../../assets/MEDIGO.png"
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/AxiosInstance";


const a = [
  { id: 1, name: "Emily Johnson" },
  { id: 2, name: "Michael Smith" },
  { id: 3, name: "Sophia Williams" },
  { id: 4, name: "James Brown" },
  { id: 5, name: "Olivia Jones" },
  { id: 6, name: "Daniel Garcia" },
  { id: 7, name: "Ava Martinez" },
  { id: 8, name: "William Rodriguez" },
  { id: 9, name: "Mia Davis" },
  { id: 10, name: "Benjamin Lopez" },
  { id: 11, name: "Isabella Anderson" },
  { id: 12, name: "Elijah Thomas" },
  { id: 13, name: "Charlotte Taylor" },
  { id: 14, name: "Lucas Moore" },
  { id: 15, name: "Amelia Jackson" },
  { id: 16, name: "Henry Martin" },
  { id: 17, name: "Harper Lee" },
  { id: 18, name: "Alexander Perez" },
  { id: 19, name: "Evelyn Thompson" },
  { id: 20, name: "Jack White" },
  { id: 21, name: "Ella Harris" },
  { id: 22, name: "Owen Clark" },
  { id: 23, name: "Abigail Lewis" },
  { id: 24, name: "Jacob Hall" },
  { id: 25, name: "Scarlett Young" },
  { id: 26, name: "Logan Allen" },
  { id: 27, name: "Grace King" },
  { id: 28, name: "Ethan Wright" },
  { id: 29, name: "Chloe Scott" },
  { id: 30, name: "Mason Torres" },
  { id: 31, name: "Lily Nguyen" },
  { id: 32, name: "Aiden Hill" },
  { id: 33, name: "Aria Green" },
  { id: 34, name: "Caleb Adams" },
  { id: 35, name: "Zoey Nelson" },
  { id: 36, name: "Samuel Baker" },
  { id: 37, name: "Layla Carter" },
  { id: 38, name: "Noah Roberts" },
  { id: 39, name: "Mila Mitchell" },
  { id: 40, name: "Leo Campbell" },
  { id: 41, name: "Nora Gonzalez" },
  { id: 42, name: "Julian Rivera" },
  { id: 43, name: "Riley Phillips" },
  { id: 44, name: "Isaac Evans" },
  { id: 45, name: "Ellie Turner" },
  { id: 46, name: "Nathan Parker" },
  { id: 47, name: "Penelope Collins" },
  { id: 48, name: "David Edwards" },
  { id: 49, name: "Lillian Stewart" },
  { id: 50, name: "Gabriel Sanchez" },
];

async function fetchChatUsers()
{
	try{
		const response = await axiosInstance.get("/api/v1/getAllChatUser");
		return response.data;
	}
	catch(err)
	{
		console.log(err)
		return err;
	}
}

const SideBar = ({ onSelectUser, selectedUser }) => {
	const[user, setUser]= useState([]);

	const {data:}
  return (
    <div className="flex flex-col h-full">
      {/* Fixed top section */}
      <div className="py-2">
        <Button className="w-full">
          <HomeIcon /> &nbsp; Back to home
        </Button>
        <h1 className="text-2xl text-center font-bold mt-2">Chat App</h1>
      </div>

      {/* Scrollable user list */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {a.map((user) => (
          <div
            key={user.id}
			onClick={()=> onSelectUser(user)}
            className="bg-gray-100 p-2 rounded hover:bg-gray-200 cursor-pointer flex gap-5 text-center "
          >
            <img src={image} className="w-10 h-10 rounded-full" alt="" />
            <a className="mt-2">{user.name}</a>
          </div>
        ))}
      </div>
    </div>
  );
};


export default SideBar;
