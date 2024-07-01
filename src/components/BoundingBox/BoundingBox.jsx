import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Stage, Layer, Circle, Line, Image as KonvaImage } from "react-konva";

const BoundingBox = forwardRef((_, ref) => {
  const [dots, setDots] = useState([]);
  const [image, setImage] = useState(null);
  const [imageWidth, setImageWidth] = useState(800);
  const [imageHeight, setImageHeight] = useState(600);
  const stageRef = useRef(null);

  useImperativeHandle(ref, () => ({
    clearAnnotations() {
      setDots([]);
    },

    getCoordinates() {
      if (dots.length === 4) {
        return dots;
      } else {
        return [];
      }
    },
  }));

  // Function to handle mouse clicks
  const handleClick = (e) => {
    if (dots.length >= 4) return; // Only allow up to 4 dots

    // Get the mouse position relative to the stage
    const stage = e.target.getStage();
    const { x, y } = stage.getPointerPosition();
    const offsetX = (800 - imageWidth) / 2;
    const offsetY = (600 - imageHeight) / 2;

    if (
      x >= offsetX &&
      x <= offsetX + imageWidth &&
      y >= offsetY &&
      y <= offsetY + imageHeight
    ) {
      // Add the new dot to the array
      setDots([...dots, { x, y }]);
      console.log("coordinates:", x, y);
    }
  };

   // Function to handle touch events and prevent default behavior
   const handleTouchStart = (e) => {
    e.evt.preventDefault(); // Prevent the default behavior of the touch event
    handleClick(e);
  };

  const handleTouchMove = (e) => {
    e.evt.preventDefault(); // Prevent the default behavior of the touch event
    handleClick(e);
  };


  // Draw the bounding box if there are 4 dots
  const lines =
    dots.length === 4
      ? [
          [dots[0].x, dots[0].y, dots[1].x, dots[1].y],
          [dots[1].x, dots[1].y, dots[2].x, dots[2].y],
          [dots[2].x, dots[2].y, dots[3].x, dots[3].y],
          [dots[3].x, dots[3].y, dots[0].x, dots[0].y],
        ]
      : [];

  useEffect(() => {
    const img = new window.Image();
    img.src = "/images/image01.jpg"; // Correct path to the image
    img.onload = () => {
      let imgWidth = img.width;
      let imgHeight = img.height;

      // Calculate the aspect ratio
      const aspectRatio = imgWidth / imgHeight;

      // Resize the image to fit within 800x600 while maintaining aspect ratio
      if (imgWidth > 800 || imgHeight > 600) {
        if (aspectRatio > 1) {
          // Wider than tall
          imgWidth = 800;
          imgHeight = imgWidth / aspectRatio;
        } else {
          // Taller than wide
          imgHeight = 600;
          imgWidth = imgHeight * aspectRatio;
        }
      }

      setImageWidth(imgWidth);
      setImageHeight(imgHeight);
      setImage(img);

      if (stageRef.current) {
        stageRef.current.width(800);
        stageRef.current.height(600);
      }

      console.log("Image successfully loaded:", img.src);
    };
    img.onerror = () => {
      console.error("Image failed to load:", "/images/image01.jpg");
    };
  }, []);

  return (
    <div className="bounding-box-container">
      <Stage 
        width={imageWidth} 
        height={imageHeight} 
        onClick={handleClick} 
        onTouchStart={handleTouchStart}  // Add touch event listener
        onTouchMove={handleTouchMove}   // Add touch event listener for moving
        ref={stageRef}
        >
        <Layer>
          {image && (
            <KonvaImage
              image={image}
              width={imageWidth}
              height={imageHeight}
              x={(800 - imageWidth) / 2}
              y={(600 - imageHeight) / 2}
            />
          )}

          {/* Draw dots */}
          {dots.map((dot, index) => (
            <Circle
              key={index}
              x={dot.x}
              y={dot.y}
              radius={5}
              fill="red"
              stroke="black"
              strokeWidth={1}
            />
          ))}
          {/* Draw lines to form the bounding box */}
          {lines.map((line, index) => (
            <Line key={index} points={line} stroke="blue" strokeWidth={2} />
          ))}
        </Layer>
      </Stage>
    </div>
  );
});

export default BoundingBox;
