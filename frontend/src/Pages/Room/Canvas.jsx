import React from "react";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";

const socket = io("http://localhost:5000");

const Canvas = () => {
    const { roomID } = useParams();
    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);

    useEffect(() => {
      socket.emit("join_room", roomID);
      console.log("joined room", roomID);
      
      socket.on("drawing", ({ offsetX, offsetY }) => {
        contextRef.current.lineTo(offsetX, offsetY);
        contextRef.current.stroke();
      }, [roomID]);

      socket.on("clearCanvas", () => {
        contextRef.current.clearRect(0, 0, window.innerHeight * 1, window.innerHeight * 0.75);
      });
    });

    const startDrawing = ({ nativeEvent }) => {
        setIsDrawing(true);
        const { offsetX, offsetY } = nativeEvent;
        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX, offsetY);
    };

    const stopDrawing = ({ nativeEvent }) => {
      setIsDrawing(false);
      contextRef.current.closePath();
    };

    const clearCanvas = (event) => {
      if (event.key === "Delete") {
        console.log("clearing canvas");
        contextRef.current.clearRect(0, 0, window.innerHeight * 1, window.innerHeight * 0.75);
        socket.emit("clearCanvas", roomID);
      }
    };
    const drawing = ({ nativeEvent }) => {
      if (!isDrawing) {
        return;
      }
      const { offsetX, offsetY } = nativeEvent;
      contextRef.current.lineTo(offsetX, offsetY);
      contextRef.current.stroke();
      socket.emit("drawing", { roomID, offsetX, offsetY });
    };

    useEffect(() => {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      canvas.height = window.innerHeight* 0.75;
      canvas.width = window.innerHeight * 1;
      canvas.style = "border: 1px solid black";
      canvas.style.backgroundColor = "white";

      context.lineCap = "round";
      context.strokeStyle = "black";
      context.lineWidth = 5;
      contextRef.current = context;

      window.addEventListener("keydown", clearCanvas);

      return () => window.removeEventListener("keydown",clearCanvas);
        
    }, []);

  return (
    <canvas ref={canvasRef} 
    onMouseDown={startDrawing}
    onMouseMove={drawing}
    onMouseUp={stopDrawing}
    onKeyDown={clearCanvas}></canvas>
  )
}

export default Canvas;

  