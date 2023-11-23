"use client";
import React from "react";
import { Group } from "react-konva";
import CircleComponent from "../shapes/Circle";
import RectangleComponent from "../shapes/Rectangle";
import ImageComponent from "../ImageComponent";
import { Line } from "react-konva";

const GroupComponent = ({
  group,
  selectedId,
  handleTransformChange,
  Circle,
  Rectangle,
  setSelectedId,
  images,
  passImageWithId,
  lines,
  color,
  lineWidth,
}) => {
  return (
    group.visible && (
      <Group key={group.id}>
        {Circle && (
          <CircleComponent
            shapeProps={{
              x: 20,
              y: 50,
              radiusX: 50,
              radiusY: 50,
              fill: "red",
            }}
            id={`Circle${group.id}`}
            isSelected={selectedId === `Circle${group.id}`}
            onSelect={() => setSelectedId(`Circle${group.id}`)}
            onChange={(newAttrs) =>
              handleTransformChange(newAttrs, `Circle${group.id}`)
            }
          />
        )}
        {Rectangle && (
          <RectangleComponent
            shapeProps={{
              x: 20,
              y: 50,
              width: 100,
              height: 100,
              fill: "red",
            }}
            id={`Rectangle${group.id}`}
            isSelected={selectedId === `Rectangle${group.id}`}
            onSelect={() => setSelectedId(`Rectangle${group.id}`)}
            onChange={(newAttrs) =>
              handleTransformChange(newAttrs, `Rectangle${group.id}`)
            }
          />
        )}
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
            stroke={color}
            strokeWidth={lineWidth}
            tension={0.5}
            lineCap="round"
            lineJoin="round"
            globalCompositeOperation={
              line.tool === "eraser" ? "destination-out" : "source-over"
            }
          />
        ))}
      </Group>
    )
  );
};

export default GroupComponent;
