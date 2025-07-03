export const showAllPharmacy = async (req, res, next) => {
  try {
    const data = await AppointmentTable.find();

    const values = data.map(({ name, latitude, longitude }) => ({
      name,
      latitude,
      longitude,
    }));

   console.log(values)
  } catch (err) {
    next(err);
  }
};
