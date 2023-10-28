import React, { ChangeEvent, useState } from "react";
import { FormValues } from "../../types/form-value";
import ErrorIndicator from "../indicator/ErrorIndicator";
import ErrorTooltip from "../tooltip/ErrorToolTip";

interface Props {
  state: FormValues;
  errors: { field: string; errors: string[] } | null;
  setState: (event: ChangeEvent<HTMLInputElement>) => void;
}

const NameField: React.FC<Props> = ({state,errors,setState}) => {

  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <div className="flex flex-col gap-0.5 mb-0.5">
      <label htmlFor="name" className="text-[14px] text-shadow-black">
        Name <span className="text-red-600">*</span>
      </label>
      <div className="relative flex flex-col justify-center items-end">
        <input type="text" name="name" id="name"
          value={state.name} placeholder="name" onChange={setState}
     className="border  p-2 text-[14px] w-[250px] sm:w-[280px] rounded-md outline-none shadow-md"/>
        {errors?.field === "name" && ( 
          <>
            <ErrorTooltip setHover={setIsHovered} />
            <div className={isHovered ? "block" : "hidden"}>
              <ErrorIndicator errors={errors} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NameField;