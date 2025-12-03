import React, { useMemo, createContext, useContext } from "react";

const PeerContext = createContext(null);

export const usePeer = () => useContext(PeerContext);

export const PeerProvider = ({ children }) => {
  const peer = useMemo(() => {
    return new RTCPeerConnection({
      iceServers: [
        {
          urls: [
            "stun:stun.l.google.com:19302",
            "stun:global.stun.twilio.com:3478",
          ],
        },
      ],
    });
  }, []);

  const createOffer = async () => {
    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);
    return offer;
  };

  const createAnswer = async(offer)=>{
    await peer.setRemoteDescription(offer);
   const ans =  await peer.createAnswer();
   await peer.setLocalDescription(ans);
   return ans;
  }

  const setRemoteAns = async(ans)=>{
    await peer.setRemoteDescription(ans);
  }

  return (
    <PeerContext.Provider value={{ peer, createOffer, createAnswer,setRemoteAns }}>
      {children}
    </PeerContext.Provider>
  );
};
