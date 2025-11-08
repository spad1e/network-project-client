import { InputBox } from "./inputbox"
import type { InputValue } from "@/types/input"
import { useManage } from "../context/ManageProvider";
import { joinGroup } from "@/lib/user";
import { useFloatPanel } from "../context/FloatPanelProvider";
import { connectSocket, getSocket } from "@/connections/socket";
export function JoinGroup(){
    const {loadGroup} = useManage();
    const { hidePanel } = useFloatPanel();
    const socket = getSocket();
    if (!socket.connected) {
      connectSocket();
    }
    const handleSubmit = async (inputValue: InputValue<"text">): Promise<void> => {
      const group = await joinGroup(inputValue);
      socket.emit("join_group", group.id);
      await loadGroup();
      hidePanel();
      return Promise.resolve();
    };
    return <div className="h-full grid grid-cols-1 grid-rows-2 relative">
        <h1 className="row-span-1 col-span-1">
            Please Enter Group ID
        </h1>
        <div className="row-span-1 col-span-1">
            <InputBox type_box={"text"} handleSubmit={handleSubmit}/>
        </div>
        
    </div>
}