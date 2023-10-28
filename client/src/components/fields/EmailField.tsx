import React,{ChangeEvent,useState} from 'react'
import ErrorIndicator from '../indicator/ErrorIndicator';
import ErrorTooltip from '../tooltip/ErrorToolTip';
import { FormValues } from '../../types/form-value';

interface Props {
  state: FormValues;
  errors: { field: string; errors: string[] } | null;
  setErrors: (value: null) => void;
  setState: (event: ChangeEvent<HTMLInputElement>) => void;
}

const EmailField:React.FC<Props> = ({state, setState, errors,setErrors}) => {

  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <>
      <div className="flex flex-col gap-0.5">
        <label htmlFor="email" className="text-[14px] text-shadow-black">
          Email <span className="text-red-600">*</span>
        </label>
        <div className="relative flex flex-col justify-center items-center">
          <input type="text" name="email" id="email "value={state.email}
            placeholder="email" onChange={setState} onClick={()=>setErrors(null)}
            className="border  p-2 text-[14px] w-[250px] sm:w-[280px] rounded-md outline-none shadow-md"
          />
          {errors?.field === "email" && (
            <>
              <ErrorTooltip setHover={setIsHovered} />
              <div className={isHovered ? "block" : "hidden"}>
                <ErrorIndicator errors={errors} />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default EmailField;