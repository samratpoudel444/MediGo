import yup from 'yup';

export const verifyPassword= yup.object({
    email: yup.string().required("Please provide email").email(),
      newpassword: yup
        .string()
        .required("Please provide the password")
        .min(8, "Password must be at least 8 characters")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[0-9]/, "Password must contain at least one number")
        .matches(
          /[@$!%*?&]/,
          "Password must contain at least one special character"
        ),
})