import { useEffect, useCallback } from "react";
import { socket } from "../socket/socket";
import { usePeer } from "../provider/peer";

function OneToOneVideoCall() {
  const { createOffer, createAnswer, setRemoteAns } = usePeer();

  // When another user joins, WE send the offer
  const handleNewUserJoined = useCallback(async ({ emailId }) => {
    console.log(`New user joined with email: ${emailId}`);

    const offer = await createOffer();
    socket.emit("call-(1)-user", { emailId, offer });
  }, [createOffer]);

  // When WE receive an incoming call
  const handleIncomingCall = useCallback(async ({ from, offer }) => {
    console.log("Incoming call from:", from, offer);

    const ans = await createAnswer(offer);
    socket.emit("call-(1)-accepted", { emailId: from, ans });
  }, [createAnswer]);

  // When our call gets accepted
  const handleCallAccepted = useCallback(async ({ ans }) => {
    console.log("Call accepted:", ans);
    await setRemoteAns(ans);
  }, [setRemoteAns]);

  useEffect(() => {
    // Register socket listeners
    socket.on("user-(1)-joined", handleNewUserJoined);
    socket.on("incomming-(1)-call", handleIncomingCall);
    socket.on("call-(1)-accepted", handleCallAccepted);

    return () => {
      // Cleanup
      socket.off("user-(1)-joined", handleNewUserJoined);
      socket.off("incomming-(1)-call", handleIncomingCall);
      socket.off("call-(1)-accepted", handleCallAccepted);
    };
  }, [handleNewUserJoined, handleIncomingCall, handleCallAccepted]);

  return (
    <div>
      <h1>One-To-One Video Call</h1>
    </div>
  );
}

export default OneToOneVideoCall;
