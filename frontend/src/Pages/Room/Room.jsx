import React from "react";
import { useParams } from "react-router-dom";
import Canvas from "./Canvas";

const Room = () => {
    let { room } = useParams();
  return (
    <>
    <h2>Room: {room} </h2>
    <div className="drawing-area">
      <Canvas />
    </div>
    </>
    )
};

export default Room;