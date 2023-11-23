"use client";
import React, { useRef, useEffect, Fragment, useState } from "react";
import { Ellipse, Transformer } from "react-konva";

const CircleComponent = ({
  shapeProps,
  id,
  isSelected,
  onSelect,
  onChange,
}) => {
  const shapeRef = useRef();
  const transformRef = useRef();

  useEffect(() => {
    if (isSelected) {
      transformRef.current.setNode(shapeRef.current);
      transformRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  const [node, setNode] = useState(null);

  const handleDragStart = (e) => {
    const node = shapeRef.current;
    setNode(node);

    const initialPos = {
      x: node.x(),
      y: node.y(),
      radiusX: node.radiusX(),
      radiusY: node.radiusY(),
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
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();

    const newRadiusX = Math.max(5, node.attrs.initialPos.radiusX * scaleX);
    const newRadiusY = Math.max(5, node.attrs.initialPos.radiusY * scaleY);

    node.radiusX(newRadiusX);
    node.radiusY(newRadiusY);
    node.scaleX(1);
    node.scaleY(1);

    const updatedShapeProps = {
      ...shapeProps,
      x: node.x(),
      y: node.y(),
      radiusX: newRadiusX,
      radiusY: newRadiusY,
    };

    onChange(updatedShapeProps);
  };

  const handleTransformEnd = (e) => {};

  const { x, y, radiusX, radiusY } = shapeProps;

  return (
    <Fragment>
      <Ellipse
        draggable
        onClick={onSelect}
        onTap={onSelect}
        x={x}
        y={y}
        radiusX={radiusX}
        radiusY={radiusY}
        stroke="black"
        strokeWidth={2}
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

export default CircleComponent;
