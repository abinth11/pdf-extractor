import { ChangeEvent, useState } from "react";
import { FormValues } from "../types/form-value";

type FormEventHandler = (
  event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
) => void;

const useHandleForm = (initialState: FormValues) => {
  const [state, setState] = useState<FormValues>(initialState);

  const handleInput: FormEventHandler = (event: any) => {
    setState((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };
  const clearForm = () => setState(initialState);
  const setValues = (values: FormValues) => setState(values);

  return [state, handleInput, clearForm, setValues] as const;
};

export default useHandleForm;
