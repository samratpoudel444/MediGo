import { FormControl, InputLabel, OutlinedInput } from "@mui/material";
import ReportIcon from "@mui/icons-material/Report";
import axiosInstance from "../utils/AxiosInstance";
import { useState } from "react";
const UpdatePassword = ({id, onClose}) => {
     const [values, setValues] = useState({
       previousPassword: "",
       newPassword: "",
       confirmPassword: "",
     }); 

  const updatePassword= async()=>
  {
    try{
      const response= await axiosInstance.post('/',data)
    }
    catch(err)
    {
      console.log(err);
    }
  }

  return (
    <div
      className="fixed
      inset-0
      z-50
      flex
      justify-center
      items-center
      backdrop-blur-sm
      bg-transparent"
    >
      <div className="w-1/2 h-1/2 border rounded-2xl ml-60 flex flex-col justify-center items-center bg-gray-400 text-white">
        <div className="text-3xl font-bold text-center">
          Change password <ReportIcon />{" "}
        </div>
        <div className="flex flex-col justify-center mt-8">
          <form className="flex flex-col justify-center items-center gap-5">
            <FormControl>
              <InputLabel htmlFor="component-outlined">
                Previous Password
              </InputLabel>
              <OutlinedInput
                id="previousPassword"
                label="Name"
                value={form.previousPassword}
              />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="component-outlined">New Password</InputLabel>
              <OutlinedInput
                id="newPassword"
                label="Name"
                value={form.newPassword}
              />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="component-outlined">
                Confirm Password
              </InputLabel>
              <OutlinedInput
                id="confirmPassword"
                label="Name"
                value={form.confirmPassword}
                onChange={}
              />
            </FormControl>
          </form>
          <div className="flex gap-5 ml-4 mt-5">
            <button className="rounded-2xl px-3 py-2 bg-black ">Confirm</button>
            <button
              className="rounded-2xl px-3 py-2 bg-red-500 "
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UpdatePassword;
