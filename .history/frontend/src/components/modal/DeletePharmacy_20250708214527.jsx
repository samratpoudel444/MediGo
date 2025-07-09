import ErrorIcon from "@mui/icons-material/Error";

export const DeletePharmacy = () => {
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm bg-transparent">
      <div className="flex flex-col text-center border w-1/2 h-80 bg-gray-400 text-white rounded-3xl ">
        <div>
          <span className="text-4xl mt-8 font-bold ">
            <ErrorIcon /> Delete Pharmacy
          </span>
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-2.5 text-black hover:text-gray-900 dark:hover:text-white"
          >
            ✕
          </button>
        </div>

        <div className="py-15 text-xl">
          Are you sure you want to remove the pharmacy from the system?
        </div>

        <div className="flex justify-center gap-5">
          <button className=" bg-red-600 px-3 py-2 rounded-xl hover:bg-red-700 ">
            Delete
          </button>
          <button className="bg-gray-500 px-3 py-2 rounded-xl hover:bg-gray-700">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
