
export const getAllPatientByAge = async (req, res, next) => {
  try {
    const data = await AppointmentTable.aggregate([
      {
        $bucket: {
          groupBy: "$Age",
          boundaries: [0, 16, 71, 200], // buckets: [0-15], [16-70], [71-199]
          default: "Other",
          output: {
            patientCount: { $sum: 1 },
          },
          labels: ["Under 16", "16 to 70", "Above 70"], // MongoDB does not support labels directly; so we handle below
        },
      },
    ]);

    // $bucket doesn't support labels directly, so you can transform the _id afterwards to human-readable labels

    const result = data.map((bucket) => {
      let label;
      if (bucket._id === 0) label = "Under 16";
      else if (bucket._id === 16) label = "16 to 70";
      else if (bucket._id === 71) label = "Above 70";
      else label = "Other";
      return {
        ageGroup: label,
        patientCount: bucket.patientCount,
      };
    });

    if (!data || data.length === 0) {
      return next({
        code: 404,
        message: "Data not found",
      });
    }

    return res.status(200).json({ message: result });
  } catch (err) {
    console.log(err);
    return next({
      code: err.code || 500,
      message: err.message || "Internal Server error",
    });
  }
};
