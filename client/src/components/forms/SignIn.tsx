import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useHandleForm from "../../hooks/useHandleForm";
import { EmailField,PasswordField } from "../fields";
import AuthError from "../indicator/AuthError";
import AuthApi from "../../api/authApi";
import { useDispatch } from "react-redux";
import { setUser,setToken } from "../../features/slices/userSlice";
import { notify } from "../notify/notify";

interface LoginProps {
  loginError: string;
  setResError: (value: string) => void;
}  

const SignInForm: React.FC<LoginProps> = ({ loginError,setResError }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [loading, setLoading] = useState<boolean>(false);
  const authApi = new AuthApi()
  const [loginState, setLoginState,clearForm] = useHandleForm({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{
    field: string;
    errors: string[];
  } | null>({
    field: "",
    errors: [""],
  });
  const setError = (field: string, errorMessages: string[]) => setErrors({ field, errors: errorMessages });

 const handleSubmit = async (e: React.FormEvent) =>{
  e.preventDefault();
  if (loginState.email?.trim() === "") {
    setError("email", ["Email is required"]);
    return;
  }
  if (loginState.password?.trim() === "") {
    setError("password", ["Password is required"]);
    return;
  }
  try {
    setLoading(true);
    const response = await authApi.signIn(loginState);
    setLoading(false)
    dispatch(setUser(response?.data?.user)) 
    dispatch(setToken({accessToken:response?.data?.accessToken}))
    notify("success",response?.message as string)
    clearForm() 
    navigate('/',{replace:true})  
  } catch (err:any) {
    setLoading(false)
    setResError(err?.response?.data?.message) 
  }
 }

  return (
    <div>
       <form onSubmit={handleSubmit}>
        <div className="flex flex-col justify-center gap-3 px-5 py-2">
          <div className="flex flex-col gap-2">
            <EmailField
              setState={setLoginState}
              errors={errors}
              state={loginState}
              setErrors={setErrors}
            />
            <PasswordField
              setState={setLoginState}
              errors={errors}
              state={loginState}
              setErrors={setErrors}
            />
            {loginError && <AuthError passedError={loginError} />}
          </div>
          <div className="flex flex-col items-center ">
            {loading && (<div className="loaderBar"></div>)}
            {
              <button type="submit"
               className={`${loading&&"cursor-wait"} bg-primary w-full rounded-md px-3 mt-2 py-2 hover:bg-secondary shadow-md cursor-pointer text-white font-semibold transition duration-300 ease-in-out`}>

                {loading?"Processing...":"Sign In"}
              </button>
            }
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignInForm