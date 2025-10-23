import { useState } from "react";
import type { InputType } from "@/types/input";
import type { InputValue } from "@/types/input";



interface InputBoxProps<T extends InputType> {
  type_box: T;
  handleSubmit: (inputValue: InputValue<T>) => void;
}

export function InputBox<T extends InputType>({
    type_box,
    handleSubmit
}: InputBoxProps<T>){

    const [inputValue, setInputValue] = useState<InputValue<T>>(
      (type_box === "text" ? "" : null) as InputValue<T>
    );
    
    const handleChange = (text: string) => {
      setInputValue(text as InputValue<T>);

    };
    return (
      <input
        className="h-10 w-full rounded-2xl border-1 bg-white px-2 text-black opacity-80 focus:opacity-100"
        placeholder={type_box === "text" ? "Hello" : undefined}
        type={type_box === "text" ? "text" : "number"}
        value={inputValue as any}
        pattern={type_box === "number" ? "[0-9]*" : ""}
        onChange={(event) => {
          handleChange(event.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key == "Enter") {
            if (type_box === "text" && inputValue !== "") {
              handleSubmit(inputValue);
            }
            if (type_box === "number" && inputValue) {
              handleSubmit(inputValue);
            }
            setInputValue((type_box === "text" ? "" : null) as InputValue<T>);
          }
        }}
      />
    );
} 