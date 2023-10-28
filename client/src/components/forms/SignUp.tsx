import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import useHandleForm from "../../hooks/useHandleForm";
import AuthError from "../indicator/AuthError";
import { NameField, EmailField, PasswordField } from "../fields";

interface Props {
  signUpError: string;
  setResError: (value: string) => void;
}

const SignUpForm: React.FC<Props> = ({ setResError, signUpError }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [registrationResponse, setRegistrationResponse] = useState<string>("");
  const [signUpState, setSignUpState] = useHandleForm({
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

  const handleSubmit = () => {};

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col justify-center gap-3 px-5 py-2'>
          <div className='flex flex-col gap-2'>
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
            {loading && <div className='loaderBar'></div>}
            {
              <button type="submit" className='bg-primary rounded-md px-3.5 mt-2 py-2.5 hover:bg-secondary shadow-md cursor-pointer text-white font-semibold transition duration-300 ease-in-out'>
                Sign Up
              </button>
            }
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
