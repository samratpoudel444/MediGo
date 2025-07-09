import ErrorIcon from "@mui/icons-material/Error";

export const DeletePharmacy = () => {
  return (
    <div>
      <div className="flex justify-Center item center border w-1/2 h-1/2 bg-gray-400 text-white">
        <span className="text-3xl">
          <ErrorIcon /> Do you want to Delete Pharmacy?
        </span>
      </div>
    </div>
  );
};
