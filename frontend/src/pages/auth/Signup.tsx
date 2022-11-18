import { useEffect, useState } from "react";
import * as yup from "yup";
import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";
import { selectUser, userAuth } from "../../slices/userSlices";
import { useAppDispatch } from "../../store/store";

const loginForm = yup.object().shape({
  name: yup.string().min(5).max(15).required(),
  email: yup.string().required("Email is required!").email(),
  password: yup.string().min(5).max(20).required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password must match!"),
});

interface login {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  type: string;
}
interface props {
  handleChange: () => void;
}

const Login = ({ handleChange }: props) => {
  const [loginError, setLoginError] = useState<string>("");
  const dispatch = useAppDispatch();
  const userError = useSelector(selectUser);

  useEffect(() => {
    if (userError.userReducer.error)
      setLoginError(userError.userReducer.error.toString());
  }, [userError]);

  function handleSignup(data: FieldValues) {
    console.log(data);
    const config: login = {
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
      name: data.name,
      type: "/user",
    };

    dispatch(userAuth(config));
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginForm) });

  return (
    <form onSubmit={handleSubmit(handleSignup)}>
      <h1>Sign up</h1>
      <div>
        <label htmlFor="email">Nickname</label>
        <input
          type="text"
          className={errors.name ? "input_error" : ""}
          placeholder="edusantanaw"
          {...register("name")}
        />
        <p className="error">
          {errors?.name && <>{errors.name.message} </>}
        </p>
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          className={errors.email ? "input_error" : ""}
          placeholder="example@email.com"
          {...register("email")}
        />
        <p className="error">{errors?.email && <>{errors.email.message} </>}</p>
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className={errors.password ? "input_error" : ""}
          placeholder="*******"
          {...register("password")}
        />
        <p className="error">
          {errors?.password && <>{errors.password.message} </>}
        </p>
      </div>
      <div>
        <label htmlFor="confirm password">confirm password</label>
        <input
          type="password"
          className={errors.confirmPassword ? "input_error" : ""}
          placeholder="*******"
          {...register("confirmPassword")}
        />
        <p className="error">
          {errors?.confirmPassword && <>{errors.confirmPassword.message} </>}
        </p>
      </div>
      <input type="submit" />
      {loginError.length > 0 && <span id="error">{loginError}</span>}
      <p>
        Do you have an account?<span onClick={handleChange}> Sign in</span>
      </p>
    </form>
  );
};

export default Login;
