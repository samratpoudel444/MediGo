function AppointmentFormModal() {
  return (
    <div
      id="popup-modal"
      className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm bg-black bg-opacity-30"
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-500">
          <button
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            ✕
          </button>

          <div className="p-5 text-center">
            <h3 className="mb-5 text-xl font-semibold text-gray-800">
              Doctor Details
            </h3>

            <p className="text-gray-600 mb-4">
              Doctor information will appear here.
            </p>

            <button className="text-white bg-blue-600 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2">
              Submit
            </button>
            <button className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-400 font-medium rounded-lg text-sm px-5 py-2.5">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppointmentFormModal;
