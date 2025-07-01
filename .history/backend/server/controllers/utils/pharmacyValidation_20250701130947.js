import yup from 'yup';

export const verifyPharmacyData= yup.object({
   pharmacyName: yup.string().required().trim(),
   licenseNo: yup.string().required(),
   contactNo: yup.number().required().test('ex')
})