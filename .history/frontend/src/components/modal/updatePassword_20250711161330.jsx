import { FormControl, InputLabel, OutlinedInput } from "@mui/material";

const UpdatePassword = () => {
  return (
    <div className="w-1/2 h-full border">
      <div className="text-3xl font-bold text-center">Change password </div>
      <div className="flex flex-col justify-center mt-8">
        <form className="flex flex-col justify-center items-center w-1/2" >
          <FormControl>
            <InputLabel htmlFor="component-outlined">Name</InputLabel>
            <OutlinedInput
              id="component-outlined"
              label="Name"
            />
          </FormControl>
        </form>
        <button>Confirm</button>
      </div>
    </div>
  );
};
export default UpdatePassword;
