import ErrorIcon from "@mui/icons-material/Error";

export const DeletePharmacy = () => {
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm bg-transparent">
      <div className="flex flex-col text-center border w-1/2 h-80 bg-gray-400 text-white rounded-2xl font-bold">
        <span className="text-3xl mt-8">
          <ErrorIcon /> Delete Pharmacy
        </span>

        <div className="py-15 font-bold">Are you sure you want to remove the pharmacy from the system</div>

        <div>
          <button>Delete</button>
          <button>Cancel</button>
        </div>
      </div>
    </div>
  );
};
