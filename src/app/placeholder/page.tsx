"use client";
import React, { useEffect, useState } from "react";
import { socket } from "@/connections/socket";
import { createGroup, fetchGroupByUsername } from "@/lib/group";
import { fetchChatByGroupId, createChat } from "@/lib/chat";
import { joinGroup } from "@/lib/user";
import type { IGroup } from "@/types/group";
import type { IChat } from "@/types/chat";

type UsernameProps = { username: string };

function MainComp({ username }: UsernameProps) {
  const [newGroupName, setNewGroupName] = useState("");
  const [joinGroupName, setJoinGroupName] = useState("");
  const [activeGroup, setActiveGroup] = useState<IGroup | null>(null);
  const [groups, setGroups] = useState<IGroup[]>([]);
  const [chats, setChats] = useState<IChat[]>([]);
  const [text, setText] = useState("");

  //fetch groups when username changes
  useEffect(() => {
    let cancelled = false;

    const loadGroups = async () => {
      const trimmed = username.trim();
      if (!trimmed) {
        setGroups([]);
        return;
      }

      try {
        const fetched = await fetchGroupByUsername(trimmed);
        if (!cancelled) setGroups(fetched ?? []);
      } catch {
        if (!cancelled) setGroups([]);
      }
    };

    loadGroups();
    setActiveGroup(null);

    return () => {
      cancelled = true;
    };
  }, [username]);

  useEffect(() => {
    let cancelled = false;

    const loadMessages = async () => {
      if (!activeGroup) return;
      const id = activeGroup.id;
      if (!id) {
        setChats([]);
        return;
      }
      try {
        const fetched = await fetchChatByGroupId(id);
        if (!cancelled) setChats(fetched ?? []);
      } catch {
        if (!cancelled) setChats([]);
      }
    };

    loadMessages();

    return () => {
      cancelled = true;
    };
  }, [activeGroup]);

  const handleNewMessage = (message: IChat) => {
    console.log("New message received:", message);
    console.log("Active group:", activeGroup);
    if (activeGroup && message.groupId === activeGroup.id) {
      setChats((prev) => [...prev, message]);
    }
  };

  useEffect(() => {
    socket.on("messageToClient", handleNewMessage);
    return () => {
      socket.off("messageToClient", handleNewMessage);
    };
  }, [activeGroup]);

  const addGroup = async () => {
    const trimmed = newGroupName.trim();
    if (!trimmed) return;

    const admin = username || "Anon";
    try {
      const created = await createGroup(trimmed, admin);
      if (activeGroup !== null) socket.emit("leave_group", activeGroup.id);
      setActiveGroup(created);
      socket.emit("join_group", created.id);
      setGroups((prev) => [...prev, created]);
      return created;
    } catch (err) {
      console.error("Failed to create group:", err);
      return;
    }
  };

  const BtjoinGroup = async () => {
    const groupId = joinGroupName.trim();
    if (!groupId) return;
    try {
      const group = await joinGroup(username || "Anon", groupId);
      if (activeGroup !== null) socket.emit("leave_group", activeGroup.id);
      setActiveGroup(group);
      socket.emit("join_group", group.id);
      setGroups((prev) => [...prev, group]);
    } catch (err) {
      console.error("Failed to join group:", err);
    }
  };

  const removeGroup = (id: string) =>
    setGroups((prev) => prev.filter((g) => g.id !== id));

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!activeGroup) return;
    if (!text.trim()) return;

    const sender = username || "Anon";
    try {
      const created = await createChat(activeGroup.id, text, sender);
      socket.emit("messageToServer", created, activeGroup.id);
      setChats((prev) => [...prev, created]);
      setText("");
      return created;
    } catch (err) {
      console.error("Failed to create chat:", err);
      return;
    }
  };

  return (
    <>
      <div style={{ flex: 1, flexDirection: "column", gap: 12 }}>
        {/* Groups List */}
        <div
          style={{
            flex: 1,
            border: "1px solid #ddd",
            padding: 12,
            borderRadius: 6,
            marginBottom: 12,
          }}
        >
          <h3 style={{ marginTop: 0 }}>Groups</h3>
          <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
            <input
              placeholder="New group name"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
              style={{ flex: 1 }}
            />
            <button onClick={addGroup}>Add</button>
          </div>
          <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
            <input
              placeholder="Join a group"
              value={joinGroupName}
              onChange={(e) => setJoinGroupName(e.target.value)}
              style={{ flex: 1 }}
            />
            <button onClick={BtjoinGroup}>Join</button>
          </div>
          <ul
            style={{
              margin: 0,
              padding: 0,
              listStyle: "none",
              maxHeight: 300,
              overflow: "auto",
            }}
          >
            {groups.map((g) => (
              <li
                key={g.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "6px 8px",
                  borderBottom: "1px solid #f0f0f0",
                }}
              >
                <span>{g.name}</span>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <button
                    onClick={() => {
                      if (activeGroup !== null)
                        socket.emit("leave_group", activeGroup.id);
                      setActiveGroup(g);
                      socket.emit("join_group", g.id);
                    }}
                    style={{ marginLeft: 8 }}
                  >
                    Select
                  </button>
                  {g.adminUsername === username && (
                    <button
                      onClick={() => removeGroup(g.id)}
                      style={{ marginLeft: 8 }}
                    >
                      Remove
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
        {/* Private Chat lists */}
        <div
          style={{
            flex: 1,
            border: "1px solid #ddd",
            padding: 12,
            borderRadius: 6,
          }}
        >
          <h3 style={{ marginTop: 0 }}>Dms</h3>
          <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
            <input
              placeholder="Join a group"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
              style={{ flex: 1 }}
            />
            <button onClick={addGroup}>Join</button>
          </div>
          <ul
            style={{
              margin: 0,
              padding: 0,
              listStyle: "none",
              maxHeight: 300,
              overflow: "auto",
            }}
          >
            {groups.map((g) => (
              <li
                key={g.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "6px 8px",
                  borderBottom: "1px solid #f0f0f0",
                }}
              >
                <span>{g.name}</span>
                <button
                  onClick={() => removeGroup(g.id)}
                  style={{ marginLeft: 8 }}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div
        style={{
          flex: 1,
          border: "1px solid #ddd",
          padding: 12,
          borderRadius: 6,
          marginLeft: 12,
        }}
      >
        {activeGroup !== null && (
          <>
            <h3 style={{ marginTop: 0 }}>Chat</h3>
            <div style={{ fontSize: 12, color: "#555", marginBottom: 8 }}>
              You are chatting as {username.trim() || "Anon"}
            </div>
            <div> Group Name : {activeGroup.name}</div>
            <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
              <form
                onSubmit={sendMessage}
                style={{
                  display: "flex",
                  gap: 8,
                  marginBottom: 16,
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <input
                  placeholder="Message"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  style={{ flex: 1 }}
                />
                <button type="submit">Send</button>
              </form>
            </div>
            <div
              style={{
                maxHeight: 340,
                overflow: "auto",
                borderTop: "1px solid #f0f0f0",
                paddingTop: 8,
              }}
            >
              {chats.map((m) => (
                <div key={m.id} style={{ marginBottom: 8 }}>
                  <div style={{ fontSize: 12, color: "#555" }}>
                    {`${m.username} ${new Date(m.createdAt).toLocaleString()}`}
                  </div>
                  <div
                    style={{
                      background: "#f7f7f7",
                      padding: 8,
                      borderRadius: 6,
                    }}
                  >
                    {m.message}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default function PlaceholderPage() {
  const [username, setUsername] = useState("");
  const [usernameDraft, setUsernameDraft] = useState("");
  const handleUsernameSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = usernameDraft.trim();
    if (!trimmed) return;
    setUsername(trimmed);
    setUsernameDraft("");
  };

  return (
    <main style={{ padding: 16 }}>
      <form
        onSubmit={handleUsernameSubmit}
        style={{
          display: "flex",
          gap: 8,
          marginBottom: 16,
          alignItems: "center",
        }}
      >
        <input
          placeholder="Enter username"
          value={usernameDraft}
          onChange={(e) => setUsernameDraft(e.target.value)}
          style={{ flex: 1, maxWidth: 240 }}
        />
        <button type="submit">Set Username</button>
        <span style={{ fontSize: 12, color: "#555" }}>
          Active user: {username || "Anon"}
        </span>
      </form>
      <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
        <MainComp username={username} />
      </div>
    </main>
  );
}
