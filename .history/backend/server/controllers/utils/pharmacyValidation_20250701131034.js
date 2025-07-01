import yup from 'yup';

export const verifyPharmacyData = yup.object({
  pharmacyName: yup.string().required().trim(),
  licenseNo: yup.string().required(),
  contactNo: yup
    .number()
    .required()
    .test(
      "extract-keys",
      "The keys must be 10",
      (value) => value && Object.keys(value).length === 10
    ),
});