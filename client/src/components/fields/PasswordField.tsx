import React, { useState, ChangeEvent } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { FormValues } from "../../types/form-value";
import ErrorIndicator from "../indicator/ErrorIndicator";
import ErrorTooltip from "../tooltip/ErrorToolTip";

interface PasswordFieldProps {
  state: FormValues;
  errors: { field: string; errors: string[] } | null;
  setState: (event: ChangeEvent<HTMLInputElement>) => void;
  setErrors: (value: null) => void;
}

const PasswordField: React.FC<PasswordFieldProps> = ({
  state,
  errors,
  setState,
  setErrors,
}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isShowPass, setIsShowPass] = useState<boolean>(false);

  return (
    <div className="flex flex-col items-start relative">
      <label htmlFor="password" className="text-[14px] text-shadow-black">
        Password <span className="text-red-600">*</span>
      </label> 
      <div>
        <div className="relative flex flex-col justify-center items-center ">
          <input
            type={isShowPass ? "text" : "password"}
            placeholder="password"
            onClick={() => setErrors(null)}
            className="border  p-2 text-[14px] w-[250px] sm:w-[280px] rounded-md outline-none shadow-md"
            value={state.password}
            name="password"
            id="password"
            onChange={setState}
          />
          {errors?.field === "password" && (
            <>
              <ErrorTooltip setHover={setIsHovered} />
              <div className={isHovered ? "block" : "hidden"}>
                <ErrorIndicator errors={errors} />
              </div>
            </>
          )}
        </div>
        {errors?.field !== "password" && (
          <>
            {isShowPass ? (
              <BsEye
                style={{
                  position: "absolute",
                  right: "5%",
                  top: "59%",
                  fontSize: "15px",
                  cursor:"pointer"
                }}
                onClick={() => setIsShowPass(!isShowPass)}
              />
            ) : (
              <BsEyeSlash
                style={{
                  position: "absolute",
                  right: "5%",
                  top: "59%",
                  fontSize: "15px",
                  cursor:"pointer"
                }}
                onClick={() => setIsShowPass(!isShowPass)}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PasswordField;