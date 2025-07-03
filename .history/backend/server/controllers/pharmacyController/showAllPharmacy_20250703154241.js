export const showAllPharmacy = async (req, res, next) => {
  try {
    const data = await phar.find();

    const values = data.map(({ name, latitude, longitude }) => ({
      name,
      latitude,
      longitude,
    }));

   console.log(values);
  } catch (err) {
    next(err);
  }
};
