import ErrorIcon from "@mui/icons-material/Error";

export const DeletePharmacy = () => {
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm bg-transparent">
      <div className="flex flex-col  border w-1/2 h-1/2 bg-gray-400 text-white">
        <span className="text-3xl">
          <ErrorIcon /> Do you want to Delete Pharmacy?
        </span>
        <div>
          <button>Delete</button>
          <button>Cancel</button>
        </div>
      </div>
    </div>
  );
};
