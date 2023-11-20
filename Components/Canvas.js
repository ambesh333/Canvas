import React, { useRef, useState, useEffect } from "react";
import { Stage, Layer, Line } from "react-konva";
import ItemsList from "./ItemsList";
import ImageComponent from "./ImageComponent";
// import CanvasBackground from "./CanvasBackground";
import Navbar from "./Navbar";
import RectangleComponent from "./shapes/Rectangle";
import CircleComponent from "./shapes/Circle";
import "./Styles/canvas.css";
let history = [[]];
let historyStep = 0;

function Canvas() {
  // static canvas dimensions used for scaling ratio
  const stageWidth = 1200,
    stageHeight = 1170;
  // dynamic canvas dimensions
  const [stageDimensions, setStageDimensions] = useState({
    width: stageWidth,
    height: stageHeight,
    scale: 1,
  });
  // stageRef is used for handling callbacks - example: getting canvas positions after drag and rop
  const stageRef = useRef();
  // containerRef is used for dynamic canvas scalling
  // main purpose of containerRef is to get width of parent div of canvas stage
  const containerRef = useRef();
  // dragUrl stores temporary src of dragged image
  const [dragUrl, setDragUrl] = useState();
  // images stores images that are added to canvas
  const [images, setImages] = useState([]);
  // backgroundImage is used for setting backgroundImage of canvas
  const [backgroundImage, setBackgroundImage] = useState();
  // selectedId is used for keeping selected image to handle resizes, z-index priority etc.
  const [selectedId, setSelectedId] = useState(null);

  // function to handle resize of canvas dimensions based on window width or when sidebar is closed or opened
  const handleResize = () => {
    let sceneWidth = containerRef.current.clientWidth;
    let scale = sceneWidth / stageWidth;
    setStageDimensions({
      width: stageWidth * scale,
      height: stageHeight * scale,
      scale: scale,
    });
  };

  // add eventListener for every window resize to call handleResize function
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize, false);
    return () => window.addEventListener("resize", handleResize, false);
  }, []);

  // if clicked on empty space of canvas, including backgroundImage perform deselect item
  const checkDeselect = (e) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    const clikedOnBackground = e.target.getId() === "canvasBackground";
    if (clickedOnEmpty || clikedOnBackground) {
      setSelectedId(null);
    }
  };

  // when element is dragged pass its image src to allow it for adding it to canvas
  const onChangeDragUrl = (dragUrl) => {
    setDragUrl(dragUrl);
  };

  // update image attributes when performing resize
  const handleTransformChange = (newAttrs, i) => {
    let imagesToUpdate = images;
    let singleImageToUpdate = imagesToUpdate[i];
    // update old attributes
    singleImageToUpdate = newAttrs;
    imagesToUpdate[i] = singleImageToUpdate;
    setImages(imagesToUpdate);
  };

  // function to handle adding images on drag and drop to canvas
  const handleOnDrop = (e) => {
    e.preventDefault();
    stageRef.current.setPointersPositions(e);
    setImages(
      images.concat([
        {
          ...stageRef.current.getPointerPosition(),
          src: dragUrl,
        },
      ])
    );
  };

  // function to handle adding images on click
  const handleAddOnClick = (src) => {
    let centerX = stageDimensions.width / 2;
    let centerY = stageDimensions.height / 2;
    setImages(
      images.concat([
        {
          x: centerX,
          y: centerY,
          src: src,
        },
      ])
    );
  };

  // function to handle adding background image of canvas
  const addToBackground = (backgroundUrl) => {
    setBackgroundImage(backgroundUrl);
  };

  // function to handle removing background image of canvas
  const removeBackground = () => {
    setBackgroundImage(null);
  };

  // used for passing image id to image attributes
  const passImageWithId = (image, id) => {
    const imageWithId = {
      ...image,
      id: id,
    };
    return imageWithId;
  };

  // when sidebar state changes this function is being called
  const resizeCanvasOnSidebarChange = () => {
    // wait for sidebar animation to complete
    setTimeout(() => {
      handleResize();
    }, 420);
  };

  const [lines, setLines] = useState([]);
  const [drawing, setDrawing] = useState(false);
  const isDrawing = React.useRef(false);
  const [tool, setTool] = React.useState("pen");

  const [color, setColor] = useState("red");
  const rectRef = useRef();

  const [isPencilSelected, setIsPencilSelected] = useState(false);
  const [isEraserSelected, setIsEraserSelected] = useState(false);
  const [Rectangle, setRectangle] = useState(false);
  const [Circle, setCircle] = useState(false);

  const handleUndo = () => {
    if (historyStep === 0) {
      return;
    }
    historyStep -= 1;
    const previous = history[historyStep];
    setLines(previous);
  };

  const handleRedo = () => {
    if (historyStep === history.length - 1) {
      return;
    }
    historyStep += 1;
    const next = history[historyStep];
    setLines(next);
  };

  const handleMouseDown = (e) => {
    if (!isPencilSelected) {
      return;
    }

    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { tool, points: [pos.x, pos.y] }]);
    checkDeselect(e);
  };

  const handleMouseMove = (e) => {
    // no drawing - skipping
    if (!isDrawing.current) {
      return;
    }
    const stage = stageRef.current.getStage();
    const point = stage.getPointerPosition();

    setLines((prevLines) => {
      const updatedLines = [...prevLines];

      if (
        !updatedLines.length ||
        updatedLines[updatedLines.length - 1].isCompleted
      ) {
        // Start a new line
        updatedLines.push({
          points: [point.x, point.y],
          stroke: color,
          isCompleted: false,
        });
      } else {
        // Add points to the existing line
        const lastLine = updatedLines[updatedLines.length - 1];
        lastLine.points = lastLine.points.concat([point.x, point.y]);
      }

      return updatedLines;
    });
  };

  const handleMouseUp = () => {
    history.push(lines);
    historyStep += 1;
    isDrawing.current = false;
  };

  return (
    <div class="grid grid-cols-12">
      <div class="col-span-10">
        <div class="flex-row w-full">
          <div className=" flex-none h-2/12 bg-black mb-4">
            <Navbar
              setColor={setColor}
              lines={lines}
              setLines={setLines}
              drawing={drawing}
              setDrawing={setDrawing}
              history={history}
              historyStep={historyStep}
              isPencilSelected={isPencilSelected}
              setIsPencilSelected={setIsPencilSelected}
              stageRef={stageRef}
              isEraserSelected={isEraserSelected}
              setIsEraserSelected={setIsEraserSelected}
              handleUndo={handleUndo}
              handleRedo={handleRedo}
              setRectangle={setRectangle}
              setCircle={setCircle}
              setTool={setTool}
            />
          </div>
          <div
            className="flex-none h-10/12 canvas"
            style={{
              position: "relative",
              width: "100%",

              // height: "100%",
              // maxWidth: "1200px",
            }}
            ref={containerRef}
            onDrop={handleOnDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            <Stage
              width={stageDimensions.width}
              height={stageDimensions.height}
              // width={window.innerWidth}
              // height={window.innerHeight}
              // scaleX={stageDimensions.scale}
              // scaleY={stageDimensions.scale}
              ref={stageRef}
              onMouseDown={handleMouseDown}
              onMousemove={handleMouseMove}
              onMouseup={handleMouseUp}
            >
              <Layer>
                {/* {typeof backgroundImage === "string" && (
                  // check if background image is not empty, default state is null
                  <CanvasBackground
                    backgroundUrl={backgroundImage}
                    width={stageWidth}
                    height={stageHeight}
                  />
                )} */}
                {images.map((image, i) => {
                  return (
                    <ImageComponent
                      image={image}
                      shapeProps={passImageWithId(image, `image${i}`)}
                      id={`image${i}`}
                      key={i}
                      isSelected={i === selectedId}
                      onSelect={() => {
                        setSelectedId(i);
                      }}
                      onChange={(newAttrs) => {
                        handleTransformChange(newAttrs, i);
                      }}
                    />
                  );
                })}
                {Rectangle && (
                  <RectangleComponent
                    shapeProps={{
                      x: 20,
                      y: 50,
                      width: 100,
                      height: 100,
                      fill: "red",
                    }}
                    id="rectangle1"
                    isSelected={selectedId === "rectangle1"}
                    onSelect={() => setSelectedId("rectangle1")}
                    onChange={(newAttrs) =>
                      handleTransformChange(newAttrs, "rectangle1")
                    }
                  />
                )}
                {Circle && (
                  <CircleComponent
                    shapeProps={{
                      x: 20,
                      y: 50,
                      radiusX: 50, // half of the width
                      radiusY: 50, // half of the height
                      fill: "red",
                    }}
                    id="Circle1"
                    isSelected={selectedId === "Circle1"}
                    onSelect={() => setSelectedId("Circle1")}
                    onChange={(newAttrs) =>
                      handleTransformChange(newAttrs, "Circle1")
                    }
                  />
                )}
                {/* {rectangles.map((rectangle, i) => (
                  <RectangleComponent
                    key={rectangle.id} // Add a unique key prop
                    shapeProps={rectangle.shapeProps}
                    id={rectangle.id}
                    isSelected={rectangle.isSelected}
                    onSelect={rectangle.onSelect}
                    onChange={(newAttrs) => handleTransformChange(newAttrs, i)}
                    ref={rectRef}
                  />
                ))} */}

                {lines.map((line, i) => (
                  <Line
                    key={i}
                    points={line.points}
                    stroke={color}
                    strokeWidth={5}
                    tension={0.5}
                    lineCap="round"
                    lineJoin="round"
                    globalCompositeOperation={
                      line.tool === "eraser" ? "destination-out" : "source-over"
                    }
                  />
                ))}
              </Layer>
            </Stage>
            {/* <select
            value={tool}
            onChange={(e) => {
              setTool(e.target.value);
            }}
          >
            <option value="pen">Pen</option>
            <option value="eraser">Eraser</option>
          </select> */}
          </div>
        </div>
      </div>

      <div class="col-span-2">
        <ItemsList
          dragUrl={dragUrl}
          onChangeDragUrl={onChangeDragUrl}
          handleAddOnClick={handleAddOnClick}
          addToBackground={addToBackground}
          removeBackground={removeBackground}
          resizeCanvasOnSidebarChange={resizeCanvasOnSidebarChange}
          stageRef={stageRef}
        />
      </div>
    </div>
  );
}

export default Canvas;
