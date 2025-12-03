import { useNavigate } from "react-router-dom";
import { socket } from "../socket/socket";
import style from "./JoinGuest.module.css";
import { useEffect, useState ,useCallback } from "react";


function JoinGuest() {
    const [emailId,setEmailId] = useState("");
    const [roomId,setRoomId] = useState("");
    const navigate = useNavigate();
    function handleInput(){
      socket.emit("join-(1)-room",{emailId,roomId});
    }
    const  handleJoinRoom = useCallback((roomId)=>{
        navigate(`/room/${roomId}`);
    },[navigate]);
    useEffect(()=>{
         socket.on("joined-(1)-room",handleJoinRoom);
         return ()=>{
          socket.off("joined-(1)-room",handleJoinRoom);
         }
    },[socket,handleJoinRoom])
    return (
      <div className={style.main_container}>
        <p className={style.top_message}>
          THIS IS ONLY FOR 1 TO 1 VIDEO CHAT — REGISTER FIRST FOR GROUP !!!
        </p>

        <div className={style.main}>
          <input
            type="text"
            placeholder="Enter your Email"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter room Id"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />
          <button onClick={handleInput}>Enter</button>
        </div>
      </div>
    );
  

}

export default JoinGuest