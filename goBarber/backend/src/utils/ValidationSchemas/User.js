import * as Yup from 'yup';

export const newUserSchema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string().required().min(6),
});

export const updateUserSchema = Yup.object().shape({
  name: Yup.string(),
  email: Yup.string(),
  oldPassword: Yup.string().min(6),
  password: Yup.string()
    .min(6)
    .when('oldPassword', (
      oldPassword,
      field // oldPassword present, password is required
    ) => (oldPassword ? field.required() : field)),
  confirmPassword: Yup.string().when('password', (password, field) =>
    password ? field.required().oneOf([password]) : field
  ),
});
