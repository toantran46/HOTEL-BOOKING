export const checkEmail = (yup) =>
  yup
    .string()
    .required("This field is required")
    .matches(
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
      "Please enter correct email!"
    );

export const checkStringRequired = (yup) =>
  yup.string().required("This field is required");

export const checkSelect = (yup) => {
  yup.object().required("This field is required");
};

export const checkPassWord = (yup) =>
  yup
    .string()
    .required("This field is require.")
    .matches(
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}?/,
      "Password must be at least 8 characters with one uppercase letter, one lowercase letter, and one special character"
    );

export const checkConfirmPassword = (yup) =>
  yup.string().oneOf([yup.ref("password"), null], "Passwords must match");

export const checkPhone = (yup) =>
  yup
    .string()
    .required("this field is require.")
    .matches(/^0[0-9]{9}$/, "Please enter correct phone number!");
