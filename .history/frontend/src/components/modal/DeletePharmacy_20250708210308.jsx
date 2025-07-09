import ErrorIcon from "@mui/icons-material/Error";

export const DeletePharmacy = () => {
  return (
    <div className="flex justify-center item center border w-1/2 h-1/2 bg-gray-400 text-white text">
      <span>
        <ErrorIcon /> Do you want to Delete Pharmacy?
      </span>
    </div>
  );
};
