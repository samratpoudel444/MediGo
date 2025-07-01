import yup from 'yup';

export const verifyPharmacyData= yup.object({
   pharmacyName: yup.string().required().trim
})