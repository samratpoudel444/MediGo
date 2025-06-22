
function getDoctorDetails()
{
    try{

    }
    catch(err)
    {

    }
}


function AppointmentFormModal() {


  return (
    <div
      id="popup-modal"
      className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm bg-blur bg-opacity-50"
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
              Make an Appointment
            </h3>

            <p className="text-gray-600 mb-4">
              Enter Details:
            </p>
            <div>
                <form action="">
                      <Typography variant="h3" className="text-gray-600 text-center">
            Register User
          </Typography>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormControl fullWidth>
              <TextField
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                error={Boolean(errors.firstName)}
              />
              {errors.firstName && (
                <FormHelperText error>{errors.firstName}</FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth>
              <TextField
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                error={Boolean(errors.lastName)}
              />
              {errors.lastName && (
                <FormHelperText error>{errors.lastName}</FormHelperText>
              )}
            </FormControl>
          </div>
          div

          <FormControl fullWidth>
            <TextField
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={Boolean(errors.email)}
            />
            {errors.email && (
              <FormHelperText error>{errors.email}</FormHelperText>
            )}
          </FormControl>

          <FormControl fullWidth>
            <TextField
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={Boolean(errors.password)}
            />
            {errors.password && (
              <FormHelperText error>{errors.password}</FormHelperText>
            )}
          </FormControl>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormControl fullWidth>
              <TextField
                label="Date of Birth"
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                error={Boolean(errors.dob)}
              />
              {errors.dob && (
                <FormHelperText error>{errors.dob}</FormHelperText>
              )}
            </FormControl>
            </div>
                </form>
            </div>


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
