
const UpdatePassword= ()=>
{
  return (
    <div className="w-full h-full border">
      <div>Change password </div>
      <div>
        <TextField
          hiddenLabel
          id="filled-hidden-label-small"
          defaultValue="Small"
          variant="filled"
          size="small"
        />
        <button>Confirm</button>
      </div>
    </div>
  );
}
export default UpdatePassword;

