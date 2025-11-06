import { useState } from "react";
import type { InputType } from "@/types/input";
import type { InputValue } from "@/types/input";



interface InputBoxProps<T extends InputType> {
  type_box: T;
  handleSubmit: (inputValue: InputValue<T>) => Promise<void>;
  Button?: React.ComponentType<{ onClick?: () => void , inputValue? : string}>;
}

export function InputBox<T extends InputType>({
    type_box,
    handleSubmit,
    Button,
}: InputBoxProps<T>){

    const [inputValue, setInputValue] = useState<InputValue<T>>(
      (type_box === "text" ? "" : "") as InputValue<T>
    );
    
    const handleChange = (text: string) => {
      setInputValue(text as InputValue<T>);

    };
    return (
      <div className="flex w-full gap-4">
        <input
          className="h-10 w-full rounded-2xl border-1 bg-white/80 px-2 text-black focus:bg-white/100"
          placeholder={type_box === "text" ? "Hello" : undefined}
          type={type_box === "text" ? "text" : "number"}
          value={inputValue}
          pattern={type_box === "number" ? "[0-9]*" : ""}
          onChange={(event) => {
            handleChange(event.target.value);
          }}
          onKeyDown={async(e) => {
            if (e.key == "Enter") {
              if (type_box === "text" && inputValue !== "") {
                await handleSubmit(inputValue);
              }
              if (type_box === "number" && inputValue) {
                await handleSubmit(inputValue);
              }
              setInputValue((type_box === "text" ? "" : "") as InputValue<T>);
            }
          }}
        />
        {Button && (
          <Button
            onClick={async() => {
              if (type_box === "text" && inputValue !== "") {
                await handleSubmit(inputValue);
              }
              if (type_box === "number" && inputValue) {
                await handleSubmit(inputValue);
              }
              setInputValue((type_box === "text" ? "" : null) as InputValue<T>);
            }}
            inputValue={inputValue}
          />
        )}
      </div>
    );
} 