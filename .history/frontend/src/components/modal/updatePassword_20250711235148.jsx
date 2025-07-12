import { FormControl, InputLabel, OutlinedInput } from "@mui/material";
import ReportIcon from "@mui/icons-material/Report";
import axiosInstance from "../utils/AxiosInstance";
import { useState } from "react";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
const UpdatePassword = ({ id, onClose }) => {
  const [values, setValues] = useState({
    previousPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const updatePassword = async (data) => {
    try {
      const response = await axiosInstance.patch(
        `/api/v1/changePassword/${id}`,
        data
      );
      return response.data.message;
    } catch (err) {
      console.log(err);
      throw err.response.data;
    }
  };

  const handleChange = (e) => {
    setValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const mutation = useMutation({
    mutationFn: updatePassword,
    onSuccess: (data) => {
      toast.success(data);
      setValues({
        previousPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      onClose();
    },
    onError: (err) => {
      console.log("from toast",err)
      toast.error(err);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !values.previousPassword ||
      !values.confirmPassword ||
      !values.newPassword
    ) {
      toast.error("Please provide the required data");
      return;
    }

    if (values.newPassword !== values.confirmPassword) {
      toast.error("Password and confirm Password Incorrect");
      return;
    }
    mutation.mutate(values);
  };

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
          <form
            className="flex flex-col justify-center items-center gap-5"
            onSubmit={handleSubmit}
          >
            <FormControl>
              <InputLabel htmlFor="component-outlined">
                Previous Password
              </InputLabel>
              <OutlinedInput
                id="previousPassword"
                name="previousPassword"
                value={values.previousPassword}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="component-outlined">New Password</InputLabel>
              <OutlinedInput
                id="newPassword"
                name="newPassword"
                value={values.newPassword}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="component-outlined">
                Confirm Password
              </InputLabel>
              <OutlinedInput
                id="confirmPassword"
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
              />
            </FormControl>
            <div className="flex gap-5 ml-4 mt-5">
              <button
                className="rounded-2xl px-3 py-2 bg-black hover:bg-gray-500 "
                type="submit"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "Updating..." : "Confirm"}
              </button>
              <button
                className="rounded-2xl px-3 py-2 bg-red-500 hover:bg-red-700 "
                onClick={onClose}
                type="button"
              >
                Cancel
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};
export default UpdatePassword;
