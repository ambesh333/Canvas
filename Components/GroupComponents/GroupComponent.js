import React from "react";
import { Group } from "react-konva";
import CircleComponent from "../shapes/Circle";
import RectangleComponent from "../shapes/Rectangle";

const GroupComponent = ({
  group,
  selectedId,
  handleTransformChange,
  Circle,
  Rectangle,
  setSelectedId,
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
      </Group>
    )
  );
};

export default GroupComponent;
