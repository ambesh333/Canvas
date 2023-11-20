import React from "react";
import { Layer, Line } from "react-konva";

export const Drawing = ({ lines, stroke }) => {
  return (
    <Layer>
      {lines.map((line, i) => (
        <Line key={i} points={line} stroke={stroke} />
      ))}
    </Layer>
  );
};
