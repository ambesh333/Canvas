"use client";
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

  lineWidth,
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
            passImageWithId={passImageWithId}
            images={images}
            lines={lines}
            color={color}
            lineWidth={lineWidth}
          />
        ))}
      </Layer>
    </Stage>
  );
};

export default StageCanvas;
