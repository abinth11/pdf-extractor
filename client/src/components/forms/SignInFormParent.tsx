import React, { useState } from "react";
import { Link } from "react-router-dom";
import SignInForm from "./SignIn";

const SignInFormParent: React.FC = () => {
  const [loginError, setLoginError] = useState<string>("");
  const setLoginErr = (error: string) => setLoginError(error);

  return (
    <div className='flex flex-col items-center justify-center w-full gap-4'>
            <SignInForm
              loginError={loginError}
              setResError={setLoginErr}
            />
          <div className='text-link hover:text-hover text-[13px]'>
            <div>
              <Link to={"/sign-up"}>Don't have an account?</Link>
            </div>
          </div>
    </div>
  );
};

export default SignInFormParent;
