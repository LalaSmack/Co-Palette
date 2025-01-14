import React from "react";
import { useEffect, useRef, useState } from "react";

const Canvas = () => {
    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);

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
      }
    };
    const drawing = ({ nativeEvent }) => {
      if (!isDrawing) {
        return;
      }
      const { offsetX, offsetY } = nativeEvent;
      contextRef.current.lineTo(offsetX, offsetY);
      contextRef.current.stroke();
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

  