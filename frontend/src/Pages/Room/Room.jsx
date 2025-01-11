import React from "react";
import { useParams } from "react-router-dom";
import Canvas from "./Canvas";

const Room = () => {
    let { room } = useParams();
  return (
    <>
    <h2>This is a {room} </h2>
    <Canvas />
    </>
    )
};

export default Room;