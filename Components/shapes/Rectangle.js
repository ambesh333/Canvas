"use client";
import React, { useRef, useEffect, Fragment, useState } from "react";
import { Line, Transformer } from "react-konva";

const RectangleComponent = ({
  shapeProps,
  id,
  isSelected,
  onSelect,
  onChange,
}) => {
  const shapeRef = useRef();
  console.log("shapeRef", shapeRef);
  const transformRef = useRef();
  console.log("shapeProps", shapeProps);

  useEffect(() => {
    if (isSelected) {
      transformRef.current.setNode(shapeRef.current);
      transformRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);
  const [node, setNode] = useState(null);

  const handleDragStart = (e) => {
    const node = shapeRef.current;
    console.log("node", node);
    setNode(node);
    // Store the initial position and dimensions of the rectangle
    const initialPos = {
      x: node.x(),
      y: node.y(),
      width: node.width(),
      height: node.height(),
    };

    node.setAttrs({
      initialPos,
      scaleX: 1.05,
      scaleY: 1.05,
    });

    onChange({
      ...shapeProps,
      x: e.target.x(),
      y: e.target.y(),
    });
    onSelect(e);
    e.target.moveToTop();
  };

  const handleDragEnd = (e) => {
    // const node = shapeRef.current;
    console.log("node", node);
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();

    // Calculate the new width and height
    const newWidth = Math.max(5, node.attrs.initialPos.width * scaleX);
    const newHeight = Math.max(5, node.attrs.initialPos.height * scaleY);

    // Update the width, height, x, and y of the rectangle
    node.width(newWidth);
    node.height(newHeight);
    node.scaleX(1);
    node.scaleY(1);

    const updatedShapeProps = {
      ...shapeProps,
      x: node.x(),
      y: node.y(),
      width: newWidth,
      height: newHeight,
    };

    onChange(updatedShapeProps);
  };

  const handleTransformEnd = (e) => {};

  const { x, y, width, height } = shapeProps;

  // Define the points to draw the rectangle
  const points = [
    x,
    y, // Top-left corner
    x + width,
    y, // Top-right corner
    x + width,
    y + height, // Bottom-right corner
    x,
    y + height, // Bottom-left corner
    x,
    y, // Close the path
  ];

  return (
    <Fragment>
      <Line
        draggable
        onClick={onSelect}
        onTap={onSelect}
        points={points}
        closed
        stroke="black" // Set the border color
        strokeWidth={2} // Set the border width
        tension={0} // Disable tension to make it a straight line
        ref={shapeRef}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onTransformEnd={handleTransformEnd}
      />
      {isSelected && (
        <Transformer
          ref={transformRef}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </Fragment>
  );
};

export default RectangleComponent;
