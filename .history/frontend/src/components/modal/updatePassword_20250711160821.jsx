import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

const UpdatePassword = () => {
  return (
    <div className="w-1/2 h-full border">
      <div className="text-3xl font-bold ">Change password </div>
      <div>
        <TextField
          hiddenLabel
          id="filled-hidden-label-small"
          variant="filled"
          size="small"
        />
        <button>Confirm</button>
      </div>
    </div>
  );
};
export default UpdatePassword;
