import { InputBox } from "./inputbox"
import type { InputValue } from "@/types/input"
export function JoinGroup(){
    const handleSubmit = (inputValue: InputValue<"number">): void => {
        console.log(inputValue);
    }
    return <div className="h-full grid grid-cols-1 grid-rows-2 relative">
        <h1 className="row-span-1 col-span-1">
            Please Enter Group ID
        </h1>
        <div className="row-span-1 col-span-1">
            <InputBox type_box={"number"} handleSubmit={handleSubmit}/>
        </div>
        
    </div>
}