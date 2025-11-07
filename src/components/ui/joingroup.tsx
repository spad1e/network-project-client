import { InputBox } from "./inputbox";
import type { InputValue } from "@/types/input";
import { useManage } from "../context/ManageProvider";
import { joinGroup } from "@/lib/user";
import { socket } from "@/connections/socket";
export function JoinGroup() {
  const { loadGroup } = useManage();
  const handleSubmit = async (
    inputValue: InputValue<"text">,
  ): Promise<void> => {
    console.log(inputValue);
    const group = await joinGroup(inputValue);
    // socket.emit("join_group", group.id);
    await loadGroup();
    return Promise.resolve();
  };
  return (
    <div className="relative grid h-full grid-cols-1 grid-rows-2">
      <h1 className="col-span-1 row-span-1">Please Enter Group ID</h1>
      <div className="col-span-1 row-span-1">
        <InputBox type_box={"text"} handleSubmit={handleSubmit} />
      </div>
    </div>
  );
}
