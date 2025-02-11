import React from "react";
import { useParams } from "react-router-dom";
import Canvas from "./Canvas";

const Room = () => {
    let { roomID } = useParams();
  return (
    <>
    <h2>Room: {roomID} </h2>
    <div className="drawing-area">
      <Canvas />
    </div>
    </>
    )
};

export default Room;