// Canvas.jsx

import React, { useRef, useState } from "react";
import BoundingBox from "../BoundingBox/BoundingBox";
import "./Canvas.css";

export default function Canvas() {
  const boundingBoxRef = useRef(null);
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);

    switch (selectedValue) {
      case "cast":
        console.log("Cast Surface selected");
        break;
      case "product":
        console.log("Product Surface selected");
        break;
      case "tiebar":
        console.log("Tie-bar Annotation selected");
        break;
      case "mask":
        console.log("Mask Annotation selected");
        break;
      default:
        console.log("Unknown option selected");
    }
  };

  const handleReset = () => {
    
    if(boundingBoxRef.current){
      boundingBoxRef.current.clearAnnotations();
      console.log("resetting annotations...");
    }
    else{
      console.log("not working ");
    }
  };

  const showCoordinates = () => {
    
    if(boundingBoxRef.current){
      const coordinates = boundingBoxRef.current.getCoordinates();
      if (coordinates.length > 0) {
        const coordsStr = coordinates.map((dot, index) => `(${dot.x.toFixed(2)}, ${dot.y.toFixed(2)})`).join(', ');
        alert(`Bounding Box Coordinates:\n${coordsStr}`);
        console.log("Bounding box coordinates:", coordsStr);
      } else {
        console.log("No bounding box coordinates available.");
      }
    }else{
      console.log("Couldn't get ref coordinates");
    }
  }

  return (
    <div className="canvas-container">
      <header className="header">
        <h1>Annotation Tool</h1>
      </header>
      <div className="main-section">
        <main className="main-content">
          <BoundingBox
            ref={boundingBoxRef}
          />
        </main>
        <aside className="right-panel">
          <button onClick={handleReset}>Reset</button>
          <select value={selectedOption} onChange={handleOptionChange}>
            <option value="" disabled>Select an option</option>
            <option value="cast">Cast Surface</option>
            <option value="product">Product Surface</option>
            <option value="tiebar">Tie-bar Annotation</option>
            <option value="mask">Mask Annotation</option>
          </select>
          <button onClick={showCoordinates}>
            Show Results
          </button>
          {/* Add more buttons as needed */}
        </aside>
      </div>
    </div>
  );
}
