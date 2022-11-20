import * as yup from "yup";

// schemas validations
const emailSchema = yup.object({
  email: yup.string().email().required(),
});

const passwordSchema = yup.object({
  password: yup.string().min(5).max(20).required(),
});

const nameSchema = yup.object({
  name: yup.string().min(5).max(15).required(),
});

// validation function
export async function validate(value: string, type: string): Promise<void> {
  let res = false;

  switch (type) {
    case "email":
      {
        await emailSchema
          .isValid({ email: value })
          .then((response) => {
            res = response;
          })
          .catch((e) => {
            res = e;
          });
      }
      break;

    case "password":
      {
        await passwordSchema
          .isValid({ password: value })
          .then((response) => {
            res = response;
          })
          .catch((e) => {
            res = e;
          });
      }
      break;

    case "name": {
      await nameSchema
        .isValid({ name: value })
        .then((response) => {
          res = response;
        })
        .catch((e) => {
          res = e;
        });
    }

    default:
      res;
  }

  if (res) return;

  throw `${type} is invalid`;
}
