import React, { useState } from "react";
import { Link } from "react-router-dom";
import SignUpForm from "./SignUp";

const SigUpFormParent: React.FC = () => {
  const [signUpError, setSignUpError] = useState<string>("");
  const setSignUpErr = (error: string) => setSignUpError(error);
  return (
    <div className='flex flex-col items-center justify-center w-full gap-3'>
      <>
        <SignUpForm
          setResError={setSignUpErr}
          signUpError={signUpError}
        />
      </>
        <>
          <div className='text-link text-[13px]'> 
            <div>
              <Link to={"/sign-in"}>Already have an account?</Link>
            </div>
          </div>
        </>
    </div>
  );
};

export default SigUpFormParent;
