import { useEffect, useState } from "react";
import * as yup from "yup";
import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";
import { selectUser, userAuth } from "../../slices/userSlices";
import { useAppDispatch } from "../../store/store";

const loginForm = yup.object().shape({
  email: yup.string().required("Email is required!").email(),
  password: yup.string().min(5).max(20).required(),
});

interface login {
  email: string;
  password: string;
  type: string;
}
interface props {
  handleChange: () => void;
}

const Login = ({ handleChange }: props) => {
  const [loginError, setLoginError] = useState<string>("");
  const dispatch = useAppDispatch();
  const userError = useSelector(selectUser);
  console.log(userError);
  useEffect(() => {
    if (userError.userReducer.error)
      setLoginError(userError.userReducer.error.toString());
  }, [userError]);

  function handleLogin(data: FieldValues) {
    const config: login = {
      email: data.email,
      password: data.password,
      type: "/signin",
    };

    console.log('1')
    dispatch(userAuth(config));
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginForm) });

  return (
    <form onSubmit={handleSubmit(handleLogin)} onKeyPress={(e)=> e.key === "Enter"&& handleSubmit(handleLogin)}>
      <h1>Sign in</h1>
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
      <input type="submit"  />
      {loginError.length > 0 && <span id="error">{loginError}</span>}
      <p>
        Don't have an account?<span onClick={handleChange}> Sign up</span>
      </p>
    </form>
  );
};

export default Login;
