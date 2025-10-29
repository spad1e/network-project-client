import { InputBox } from "./inputbox"
import type { InputValue } from "@/types/input"
import { createGroup } from "@/lib/group";
import { useFloatPanel } from "../context/FloatPanelProvider";
import { useManage } from "../context/ManageProvider";
import { socket } from "@/connections/socket";
export function CreateGroup(){
    const {hidePanel}= useFloatPanel();
    const {loadGroup} = useManage();
    const handleSubmit = async(inputValue: InputValue<"text">): Promise<void> => {
        const group  = await createGroup(inputValue);
        socket.emit("join_group", group.id);
        hidePanel();
        loadGroup();
        console.log(group)
    }
    return <div className="h-full grid grid-cols-1 grid-rows-2 relative">
        <h1 className="row-span-1 col-span-1">
            Please Enter Group Name: 
        </h1>
        
        <div className="row-span-1 col-span-1">
            <InputBox type_box={"text"} handleSubmit={handleSubmit}/>
        </div>
        
    </div>
}