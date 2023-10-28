import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import useHandleForm from "../../hooks/useHandleForm";
import AuthError from "../indicator/AuthError";
import { NameField, EmailField, PasswordField } from "../fields";
import AuthApi from "../../api/authApi";
import { notify } from "../notify/notify";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../../featrues/slices/userSlice";

interface Props {
  signUpError: string;
  setResError: (value: string) => void;
}

const SignUpForm: React.FC<Props> = ({ setResError, signUpError }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [loading, setLoading] = useState<boolean>(false);
  const [signUpState, setSignUpState,clearForm] = useHandleForm({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{
    field: string;
    errors: string[];
  } | null>({ field: "", errors: [""] });
  const setError = (field: string, errorMessages: string[]) =>
    setErrors({ field, errors: errorMessages });
  const authApi = new AuthApi();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (signUpState?.name?.trim() === "") {
      setError("name", ["Name is required"]);
      return;
    }
    if (signUpState.email?.trim() === "") {
      setError("email", ["Email is required"]);
      return;
    }
    if (signUpState.password?.trim() === "") {
      setError("password", ["Password is required"]);
      return;
    }
    try {
      setLoading(true);
      const response = await authApi.signUp(signUpState);
      setLoading(false)
      dispatch(setUser(response?.data?.user)) 
      dispatch(setToken(response?.data?.accessToken))
      notify("success",response?.message as string)
      clearForm()
      navigate('/')
    } catch (err:any) {
      setLoading(false)
      setResError(err?.response?.data?.message) 
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col justify-center gap-3 px-5 py-2'>
          <div className='flex flex-col gap-2 mb-2'>
            <NameField
              state={signUpState}
              errors={errors}
              setState={setSignUpState}
            />
            <EmailField
              state={signUpState}
              errors={errors}
              setState={setSignUpState}
              setErrors={setErrors}
            />
            <PasswordField
              state={signUpState}
              errors={errors}
              setState={setSignUpState}
              setErrors={setErrors}
            />
          </div>
          {signUpError && <AuthError passedError={signUpError} />}
          <div className='flex  flex-col items-center'>
            {
              <button
                type='submit'
                disabled={loading}
                className={`${
                  loading && "cursor-wait"
                } w-full bg-primary rounded-md px-3 mt-2 py-2 hover:bg-secondary shadow-md cursor-pointer text-white font-semibold transition duration-300 ease-in-out`}
              >
                {loading ? "Processing..." : "Sign Up"}
              </button>
            }
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
