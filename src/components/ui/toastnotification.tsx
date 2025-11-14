"use client";
import { useEffect, useMemo, useState } from "react";
import { useRealtimeNotification } from "../context/RealtimeNotificationProvider";
import { useManage } from "../context/ManageProvider";
import { useCurrentChat } from "../context/CurrentChatProvider";
import { MessageSquare } from "lucide-react";

type ToastProps = {
  id: string;
  title?: string;
  message: string;
  onClick: () => void;
  onClose: () => void;
  lifeMs?: number;
};

function ToastCard({
  id,
  title,
  message,
  onClick,
  onClose,
  lifeMs = 5000,
}: ToastProps) {
  const [visible, setVisible] = useState(false);
  const [started, setStarted] = useState(false); // triggers progress
  const fadeMs = 200;

  useEffect(() => {
    // enter
    const t = setTimeout(() => {
      setVisible(true);
      setStarted(true);
    }, 10);

    // auto-exit with fade
    const exitTimer = setTimeout(() => {
      setVisible(false);
      const rm = setTimeout(() => onClose(), fadeMs);
      return () => clearTimeout(rm);
    }, lifeMs);

    return () => {
      clearTimeout(t);
      clearTimeout(exitTimer);
    };
  }, [id, lifeMs, onClose]);

  return (
    <button
      type="button"
      onClick={() => {
        setVisible(false);
        setTimeout(onClick, fadeMs);
      }}
      className={[
        "pointer-events-auto relative w-full overflow-hidden rounded-xl",
        "border border-purple-300/40 bg-white/90 px-4 py-3 text-left shadow-xl backdrop-blur-md",
        "transition-all duration-200 hover:shadow-2xl focus:outline-none active:scale-[0.98]",
        visible ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0",
      ].join(" ")}
      style={{ transitionProperty: "opacity, transform, box-shadow" }}
    >
      {/* Accent bar */}
      <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-purple-500 to-fuchsia-500" />

      <div className="flex items-start gap-3">
        <div className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-indigo-500 text-white shadow-md">
          <MessageSquare size={18} />
          <span className="absolute -top-1 -right-1 h-3 w-3 animate-ping rounded-full bg-pink-400/70" />
          <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-pink-500" />
        </div>

        <div className="flex-1">
          {!!title && (
            <div className="mb-0.5 flex items-center justify-between">
              <span className="max-w-[70%] truncate text-sm font-semibold text-purple-700">
                {title}
              </span>
            </div>
          )}
          <p className="max-h-12 overflow-hidden text-sm leading-snug text-gray-800">
            {message}
          </p>
        </div>
      </div>

      {/* Progress bar (shrinks to 0 over lifeMs) */}
      <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-purple-200/60">
        <span
          className="block h-full rounded-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500"
          style={{
            width: started ? "0%" : "100%",
            transitionProperty: "width",
            transitionDuration: `${lifeMs}ms`,
            transitionTimingFunction: "linear",
          }}
        />
      </div>
    </button>
  );
}

export function ToastNotification() {
  const { notification, readNotification } = useRealtimeNotification();
  const { groupMap } = useManage();
  const { updateCurrChat } = useCurrentChat();

  // Stable callbacks per id
  const lifeMs = 5000;
  const handlers = useMemo(() => {
    const map = new Map<
      string,
      { onClick: () => void; onClose: () => void; title?: string }
    >();
    for (const n of notification) {
      if (n.groupId !== undefined) {
        const group = groupMap.get(n.groupId)?.group;
        map.set(n.id, {
          title: group?.name ?? n.sender,
          onClick: () => {
            updateCurrChat({
              id: n.groupId!,
              type: "group",
              name: group?.name ?? "",
            });
            readNotification(n.id);
          },
          onClose: () => readNotification(n.id),
        });
      } else {
        map.set(n.id, {
          title: n.sender,
          onClick: () => {
            updateCurrChat({ id: n.sender, type: "direct", name: n.sender });
            readNotification(n.id);
          },
          onClose: () => readNotification(n.id),
        });
      }
    }
    return map;
  }, [notification, groupMap, updateCurrChat, readNotification]);

  return (
    <div
      className="pointer-events-none fixed top-5 right-5 z-50 flex max-h-[80vh] w-[320px] flex-col items-end gap-3 overflow-hidden"
      aria-live="polite"
      aria-atomic="true"
    >
      {notification.map((n) => {
        const cfg = handlers.get(n.id);
        if (!cfg) return null;
        return (
          <ToastCard
            key={n.id}
            id={n.id}
            title={cfg.title}
            message={n.message}
            onClick={cfg.onClick}
            onClose={cfg.onClose}
            lifeMs={lifeMs}
          />
        );
      })}
    </div>
  );
}
