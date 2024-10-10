import React, { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import "./EditorPage.css";

const EditorPage = ({ imageUrl, onBack }) => {
  const canvasRef = useRef(null); // Reference to the canvas element
  const [canvas, setCanvas] = useState(null); // State to hold the fabric.Canvas instance

  useEffect(() => {
    if (!canvasRef.current) return;

    console.log("Initializing canvas...");

    const newCanvas = new fabric.Canvas(canvasRef.current);
    setCanvas(newCanvas); // Store the canvas instance in state

    // Log canvas instance
    console.log("Canvas instance:", newCanvas);

    // Load the image onto the canvas
    fabric.Image.fromURL(imageUrl, (img) => {
      console.log("Image loaded:", img);
      img.set({
        left: 0,
        top: 0,
        scaleX: newCanvas.width / img.width,
        scaleY: newCanvas.height / img.height,
        selectable: false,
      });
      newCanvas.add(img);
      newCanvas.sendToBack(img);
    });

    // Clean up on component unmount
    return () => {
      console.log("Cleaning up canvas...");
      newCanvas.dispose();
    };
  }, [imageUrl]);

  const addText = () => {
    if (!canvas) return;
    const text = new fabric.Textbox("Your Text Here", {
      left: 100,
      top: 100,
      width: 200,
      fontSize: 20,
      fill: "white",
    });
    canvas.add(text);
  };

  const addRectangle = () => {
    if (!canvas) return;
    const rect = new fabric.Rect({
      left: 150,
      top: 150,
      width: 100,
      height: 100,
      fill: "rgba(255, 0, 0, 0.5)",
    });
    canvas.add(rect);
  };

  const addCircle = () => {
    if (!canvas) return; 
    const circle = new fabric.Circle({
      left: 200,
      top: 200,
      radius: 50,
      fill: "rgba(0, 255, 0, 0.5)",
    });
    canvas.add(circle);
  };

  const downloadImage = () => {
    console.log("Downloading image....");
  };

  return (
    <div className="editor-page">
      <button onClick={onBack}>Back to Search</button>
      <h2>Image Editor</h2>
      <div id="canvas-container">
        <canvas
          ref={canvasRef}
          id="editor-canvas"
          width="800"
          height="600"
        ></canvas>
      </div>
      <div className="controls">
        <button onClick={addText}>Add Text</button>
        <button onClick={addRectangle}>Add Rectangle</button>
        <button onClick={addCircle}>Add Circle</button>
        <button onClick={downloadImage}>Download</button>
      </div>
    </div>
  );
};

export default EditorPage;
