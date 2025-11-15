import { InputBox } from "./inputbox";
import type { InputValue } from "@/types/input";
import { createGroup } from "@/lib/group";
import { useFloatPanel } from "../context/FloatPanelProvider";
import { useManage } from "../context/ManageProvider";
import { socket } from "@/connections/socket";
import { FloatText } from "./floattext";
export function CreateGroup() {
  // const socket = getSocket();
  // if (!socket.connected) {
  //   connectSocket();
  // }
  const { showPanel } = useFloatPanel();
  const { loadGroup } = useManage();
  const handleSubmit = async (
    inputValue: InputValue<"text">,
  ): Promise<void> => {
    const group = await createGroup(inputValue);
    socket.emit("joinGroup", group.id);
    showPanel(<FloatText message={group.id} />);
    await loadGroup();
  };
  return (
    <div className="relative grid h-full grid-cols-1 grid-rows-2">
      <h1 className="col-span-1 row-span-1">Please Enter Group Name:</h1>

      <div className="col-span-1 row-span-1">
        <InputBox type_box={"text"} handleSubmit={handleSubmit} />
      </div>
    </div>
  );
}
