"use client";
import { BoxPanel } from "@/components/BoxPanel";
import { Group } from "@/components/Group";
import { GroupChat } from "@/components/GroupChat";
import { Private } from "@/components/Private";
import { IdleChat } from "@/components/IdleChat";
import { useFloatPanel } from "@/components/context/FloatPanelProvider";
import type { InputValue } from "@/types/input";
import { JoinGroup } from "@/components/ui/joingroup";
import type { IGroup } from "@/types/group";
import { useCurrentChat } from "@/components/context/CurrentChatProvider";
import { DirecChat } from "@/components/DirectChat";
import type { ICurrChat } from "@/types/chat";
import { useRealtimeNotification } from "@/components/context/RealtimeNotificationProvider";
import { fetchGroupMembersById } from "@/lib/group";

export default function HomePage() {
  const { showPanel } = useFloatPanel();
  const { updateCurrChat, currChat } = useCurrentChat();
  const { readNotification, map_notification } = useRealtimeNotification();

  const handleSubmit = (inputValue: InputValue<"text">): Promise<void> => {
    return Promise.resolve();
  };
  const handleUpdateCurrChat = (c: ICurrChat | undefined): Promise<void> => {
    updateCurrChat(c);
    if (c && map_notification.get(JSON.stringify({ id: c.id, type: c.type }))) {
      readNotification(
        map_notification.get(JSON.stringify({ id: c.id, type: c.type }))!.id,
      );
      // }
    }
    return Promise.resolve();
  };
  const component = <h1>Hello</h1>;
  return (
    <div className="relative h-screen w-full">
      {/* Grid panels */}
      <div className="order-1 grid h-full w-full grid-cols-1 grid-rows-3 gap-6 p-6 sm:max-h-[calc(100vh)] sm:grid-cols-2 sm:grid-rows-2">
        <div className="row-span-1 h-full">
          <BoxPanel
            boxName={
              <h1 className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-2xl font-bold text-transparent drop-shadow-md">
                {"Online Friend"}
              </h1>
            }
            bgColor="sea-blue"
            page={
              <Private
                setState={handleUpdateCurrChat}
                currChat={currChat?.id ?? null}
                type={currChat?.type || ""}
              />
            }
          />
        </div>
        <div className="order-3 row-span-1 h-full sm:order-2 sm:row-span-2">
          <BoxPanel
            boxName={
              !currChat ? (
                <h1 className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-2xl font-bold text-transparent drop-shadow-md">
                  {"Let's Chat"}
                </h1>
              ) : (
                <div className="flex flex-col gap-1 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-2xl font-bold text-transparent drop-shadow-md">
                  <h1>{currChat.name}</h1>
                  {currChat.type === "group" && (
                    <h2 className="text-sm">ID: {currChat.id}</h2>
                  )}
                </div>
              )
            }
            bgColor="grass-green"
            page={
              currChat && currChat.type == "group" ? (
                <GroupChat
                  chat={{ id: currChat.id, name: currChat.name } as IGroup}
                  handleSubmit={handleSubmit}
                />
              ) : currChat && currChat.type == "direct" ? (
                <DirecChat
                  chat={{ id: currChat.name, name: currChat.name } as IGroup}
                  handleSubmit={handleSubmit}
                />
              ) : (
                <IdleChat />
              )
            }
            actionName={
              <div className="flex gap-2">
                {currChat?.type === "group" && (
                  <button
                    className="rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 px-4 py-2 font-semibold text-white transition-all duration-200 hover:scale-105 hover:from-purple-600 hover:to-blue-600 hover:shadow-lg active:from-purple-700 active:to-blue-700"
                    onClick={async () => {
                      try {
                        const members = await fetchGroupMembersById(
                          currChat!.id,
                        );
                        showPanel(
                          <div className="">
                            <h1 className="mb-4 text-2xl font-bold">
                              Group Members
                            </h1>
                            <div className="p-2 rounded-lg bg-gray-300">
                              {members.map((member) => (
                                <div key={member.username} className="flex">
                                  {/* <p>xxx</p> */}
                                  <p>{member.username}</p>
                                </div>
                              ))}
                            </div>
                          </div>,
                        );
                      } catch (error) {
                        console.error("Error fetching group members:", error);
                      }
                    }}
                  >
                    Members
                  </button>
                )}
                <button
                  className="rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 px-4 py-2 font-semibold text-white transition-all duration-200 hover:scale-105 hover:from-purple-600 hover:to-blue-600 hover:shadow-lg active:from-purple-700 active:to-blue-700"
                  onClick={() => {
                    handleUpdateCurrChat(undefined);
                  }}
                >
                  Left Chat
                </button>
              </div>
            }
          />
        </div>
        <div className="order-2 row-span-1 h-full sm:order-3">
          <BoxPanel
            boxName={
              <h1 className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-2xl font-bold text-transparent drop-shadow-md">
                {"Group"}
              </h1>
            }
            bgColor="sky-blue"
            page={
              <Group
                setState={handleUpdateCurrChat}
                currChat={currChat?.id ?? null}
                type={currChat?.type || ""}
              />
            }
            actionName={
              <button
                className="rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 px-4 py-2 font-semibold text-white transition-all duration-200 hover:scale-105 hover:from-purple-600 hover:to-blue-600 hover:shadow-lg active:from-purple-700 active:to-blue-700"
                onClick={() => {
                  showPanel(<JoinGroup />);
                }}
              >
                Join Group
              </button>
            }
          />
        </div>
      </div>
    </div>
  );
}
