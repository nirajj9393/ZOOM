import { useEffect, useState, useRef } from "react";
import styles from "./Chat.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";

import { socket } from "../socket/socket";

function Chat() {
  const [whileTyping, setWhileTyping] = useState("");
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [joined, setJoined] = useState(false);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    socket.on("chat-message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("chat-message");
    };
  }, []);

  const joinRoom = () => {
    if (!name.trim() || !room.trim()) return;

    socket.emit("join-room", { name, room });
    setJoined(true);
  };

  const sendMsg = () => {
    if (whileTyping.trim() === "") return;

    const msgObj = {
      text: whileTyping,
      senderId: socket.id,
      senderName: name,
      room: room,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    socket.emit("chat-message", msgObj);
    setWhileTyping("");
  };

  if (!joined) {
    return (
      <div className={styles["join-wrapper"]}>
        <div className={styles["join-container"]}>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Enter room name"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />

          <button onClick={joinRoom}>Join Chat</button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles["chat-display"]}>
      <div className={styles["chat-msg"]}>
        {messages.map((m, index) => (
          <div
            key={index}
            className={
              m.senderId === socket.id
                ? styles["my-msg"]
                : styles["other-msg"]
            }
          >
            <div className={styles["sender-name"]}>
              {m.senderId === socket.id ? "You" : m.senderName}
            </div>

            <div className={styles["msg-text"]}>{m.text}</div>
            <div className={styles["msg-time"]}>{m.time}</div>
          </div>
        ))}

        <div ref={bottomRef}></div>
      </div>

      <div className={styles["msg-send"]}>
        <input
          type="text"
          value={whileTyping}
          placeholder="Type a message.."
          onChange={(e) => setWhileTyping(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMsg()}
        />

        <FontAwesomeIcon
          icon={faPaperPlane}
          className={styles["send-icon"]}
          onClick={sendMsg}
        />
      </div>
    </div>
  );
}

export default Chat;
