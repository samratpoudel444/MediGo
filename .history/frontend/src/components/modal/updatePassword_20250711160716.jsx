import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

const UpdatePassword = () => {
  return (
    <div className="w-full h-full border">
      <div>Change password </div>
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
