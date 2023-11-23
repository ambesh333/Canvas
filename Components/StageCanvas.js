// StageCanvas.jsx
import React from "react";
import { Stage, Layer, Line } from "react-konva";
import GroupComponent from "./GroupComponents/GroupComponent";
import ImageComponent from "./ImageComponent";

const StageCanvas = ({
  stageDimensions,
  stageRef,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  groups,
  selectedId,
  setSelectedId,
  handleTransformChange,
  Circle,
  Rectangle,
  images,
  lines,
  color,
  passImageWithId,
}) => {
  return (
    <Stage
      width={stageDimensions.width}
      height={stageDimensions.height}
      ref={stageRef}
      onMouseDown={handleMouseDown}
      onMousemove={handleMouseMove}
      onMouseup={handleMouseUp}
    >
      <Layer>
        {groups.map((group) => (
          <GroupComponent
            key={group.id}
            group={group}
            selectedId={selectedId}
            handleTransformChange={handleTransformChange}
            Circle={Circle}
            Rectangle={Rectangle}
            setSelectedId={setSelectedId}
          />
        ))}
        {images.map((image, i) => (
          <ImageComponent
            key={i}
            image={image}
            shapeProps={passImageWithId(image, `image${i}`)}
            id={`image${i}`}
            isSelected={i === selectedId}
            onSelect={() => {
              setSelectedId(i);
            }}
            onChange={(newAttrs) => {
              handleTransformChange(newAttrs, i);
            }}
          />
        ))}
        {lines.map((line, i) => (
          <Line
            key={i}
            points={line.points}
            stroke={line.points[0].color || color}
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
  );
};

export default StageCanvas;
