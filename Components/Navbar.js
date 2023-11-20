import React from "react";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { ArrowTopLeftIcon } from "@radix-ui/react-icons";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import { EraserIcon } from "@radix-ui/react-icons";
import { SquareIcon } from "@radix-ui/react-icons";
import { CircleIcon } from "@radix-ui/react-icons";

import { CirclePicker } from "react-color";

function Navbar({
  lines,
  setLines,
  drawing,
  setDrawing,
  setColor,
  history,
  historyStep,
  setMapMode,
  isPencilSelected,
  setIsPencilSelected,
  isEraserSelected,
  setIsEraserSelected,
  handleRedo,
  handleUndo,
  addRectangle,
  setTool,
}) {
  const ColorList = [
    "#D9E3F0",
    "#F47373",
    "#37D67A",
    "#2CCCE4",
    "#dce775",
    "#ff8a65",
  ];

  const handleColorChange = (value, event) => {
    setColor(value.hex);
  };

  return (
    <div className="navbar flex items-center h-20 p-4">
      <div className="navbar-left flex space-x-4">
        <Pencil1Icon
          className={`w-6 h-6 ${isPencilSelected ? "text-blue-500" : ""}`}
          onClick={() => {
            setIsPencilSelected(!isPencilSelected);
            setIsEraserSelected(false);
            setTool("pen");
          }}
        />
        <EraserIcon
          className={`w-6 h-6 ${isEraserSelected ? "text-blue-500" : ""}`}
          onClick={() => {
            setIsEraserSelected(!isEraserSelected);
            setIsPencilSelected(true);
            setTool("eraser");
          }}
        />
        <ArrowTopLeftIcon className="w-6 h-6" onClick={handleUndo} />
        <ArrowTopRightIcon className="w-6 h-6" onClick={handleRedo} />
        <SquareIcon className="w-6 h-6" onClick={addRectangle} />
        <CircleIcon className="w-6 h-6" />
        <div className="flex">
          <CirclePicker
            className="flex flex-col w-6 h-6"
            width="30px"
            circleSpacing={3}
            colors={ColorList}
            onChange={handleColorChange}
          />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
