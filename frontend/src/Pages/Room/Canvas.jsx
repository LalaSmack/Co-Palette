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
        
    }, []);

  return (
    <canvas ref={canvasRef} 
    onMouseDown={startDrawing}
    onMouseMove={drawing}
    onMouseUp={stopDrawing}></canvas>
  )
}

export default Canvas;

  