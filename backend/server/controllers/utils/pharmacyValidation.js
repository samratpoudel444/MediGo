import yup from 'yup';

export const verifyPharmacyData = yup.object({
  pharmacyName: yup.string().required().trim(),
  licenseNo: yup.string().required(),
  contactNo: yup
    .string()
    .required("Contact number is required")
    .matches(/^\d{10}$/, "Contact number must be exactly 10 digits"),
  email: yup.string().required("Please provide email").email(),
  latitude: yup
    .number("please provie valid Lognitude")
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : value
    )
    .required("Latitude is required")
    .min(-90, "Latitude must be between -90 and 90")
    .max(90, "Latitude must be between -90 and 90"),
  longitude: yup
    .number("please provie valid Lognitude")
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : value
    )
    .required("Longitude is required")
    .min(-180, "Longitude must be between -180 and 180")
    .max(180, "Longitude must be between -180 and 180"),
});