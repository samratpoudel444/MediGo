import { FormControl, InputLabel, OutlinedInput } from "@mui/material";

const UpdatePassword = () => {
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
      <div className="w-1/2 h-1/2 border rounded-2xl ml-60 flex flex-col justify-center items-center">
        <div className="text-3xl font-bold text-center">Change password </div>
        <div className="flex flex-col justify-center mt-8">
          <form className="flex flex-col justify-center items-center">
            <FormControl>
              <InputLabel htmlFor="component-outlined">
                Previous Password
              </InputLabel>
              <OutlinedInput id="component-outlined" label="Name" />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="component-outlined">
                Previous Password
              </InputLabel>
              <OutlinedInput id="component-outlined" label="Name" />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="component-outlined">
                Previous Password
              </InputLabel>
              <OutlinedInput id="component-outlined" label="Name" />
            </FormControl>
          </form>
          <button>Confirm</button>
        </div>
      </div>
    </div>
  );
};
export default UpdatePassword;
